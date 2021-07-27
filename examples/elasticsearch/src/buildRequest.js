import buildRequestFilter from "./buildRequestFilter";
import moment from "moment";

function buildFrom(current, resultsPerPage) {
  if (!current || !resultsPerPage) return;
  return (current - 1) * resultsPerPage;
}

function buildSort(sortDirection, sortField) {
  if (sortDirection && sortField) {
    return [{[`${sortField}`]: sortDirection}];
  }
}

function buildMatch(searchTerm) {
  return searchTerm
    ? {
      multi_match: {
        query: searchTerm,
        fields: ["title", "contentCleaned", "keywords"]
      }
    }
    : {match_all: {}};
}

/*

  Converts current application state to an Elasticsearch request.

  When implementing an onSearch Handler in Search UI, the handler needs to take the
  current state of the application and convert it to an API request.

  For instance, there is a "current" property in the application state that you receive
  in this handler. The "current" property represents the current page in pagination. This
  method converts our "current" property to Elasticsearch's "from" parameter.

  This "current" property is a "page" offset, while Elasticsearch's "from" parameter
  is a "item" offset. In other words, for a set of 100 results and a page size
  of 10, if our "current" value is "4", then the equivalent Elasticsearch "from" value
  would be "40". This method does that conversion.

  We then do similar things for searchTerm, filters, sort, etc.
*/
export default function buildRequest(state) {
  const {
    current,
    filters,
    resultsPerPage,
    searchTerm,
    sortDirection,
    sortField
  } = state;

  const sort = buildSort(sortDirection, sortField);
  const match = buildMatch(searchTerm);
  const size = resultsPerPage;
  const from = buildFrom(current, resultsPerPage);
  const filter = buildRequestFilter(filters);

  const body = searchTerm ? {
    // Static query Configuration
    // --------------------------
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-highlighting.html
    highlight: {
      fragment_size: 200,
      number_of_fragments: 5,
      fields: {
        title: {},
        keywords: {},
        contentCleaned: {}
      }
    },
    //https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-source-filtering.html#search-request-source-filtering
    _source: ["id", "url", "title", "contentCleaned", "keywords", "summary", "publishTime", "domain", "processTime", "domainName", "level"],
    min_score: 3,
    collapse: {
      field: "title.keyword"
    },
    aggs: {
      domainName: {terms: {field: "domainName.keyword", size: 30}},
      keywords: {terms: {field: "keywords.keyword", size: 100}},
      level: {
        range: {
          field: "level",
          ranges: [
            {to: 1, key: "普通"},
            {from: 1, key: "重要"}
          ]
        }
      },
      publishTime: {
        range: {
          field: "publishTime",
          ranges: [
            {from: moment().subtract(1, "days").toISOString(), key: "一日内"},
            {from: moment().subtract(1, "weeks").toISOString(), key: "一周内"},
            {from: moment().subtract(1, "months").toISOString(), key: "一个月内"},
            {from: moment().subtract(1, "quarters").toISOString(), key: "一季度内"},
            {from: moment().subtract(1, "years").toISOString(), key: "一年内"},
            {key: "所有时间"}
          ]
        }
      },
    },

    // Dynamic values based on current Search UI state
    // --------------------------
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/full-text-queries.html
    query: {
      bool: {
        must: [match],
        ...(filter && {filter})
      }
    },
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-sort.html
    ...(sort && {sort}),
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-from-size.html
    ...(size && {size}),
    ...(from && {from})
  } : {
    // Static query Configuration
    // --------------------------
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-highlighting.html
    highlight: {
      fragment_size: 200,
      number_of_fragments: 5,
      fields: {
        title: {},
        keywords: {},
        contentCleaned: {}
      }
    },
    //https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-source-filtering.html#search-request-source-filtering
    _source: ["id", "url", "title", "contentCleaned", "keywords", "summary", "publishTime", "domain", "processTime", "domainName", "level"],
    collapse: {
      field: "title.keyword"
    },
    aggs: {
      domainName: {terms: {field: "domainName.keyword", size: 30}},
      keywords: {terms: {field: "keywords.keyword", size: 100}},
      level: {
        range: {
          field: "level",
          ranges: [
            {to: 1, key: "普通"},
            {from: 1, key: "重要"}
          ]
        }
      },
      publishTime: {
        range: {
          field: "publishTime",
          ranges: [
            {from: moment().subtract(1, "days").toISOString(), key: "一日内"},
            {from: moment().subtract(1, "weeks").toISOString(), key: "一周内"},
            {from: moment().subtract(1, "months").toISOString(), key: "一个月内"},
            {from: moment().subtract(1, "quarters").toISOString(), key: "一季度内"},
            {from: moment().subtract(1, "years").toISOString(), key: "一年内"},
            {key: "所有时间"}
          ]
        }
      },
    },

    // Dynamic values based on current Search UI state
    // --------------------------
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/full-text-queries.html
    query: {
      bool: {
        must: [match],
        ...(filter && {filter})
      }
    },
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-sort.html
    ...(sort && {sort}),
    // https://www.elastic.co/guide/en/elasticsearch/reference/7.x/search-request-from-size.html
    ...(size && {size}),
    ...(from && {from})
  };

  return body;
}
