import buildStateFacets from "./buildStateFacets";
import moment from "moment";

function buildTotalPages(resultsPerPage, totalResults) {
  if (!resultsPerPage) return 0;
  if (totalResults === 0) return 1;
  return Math.ceil(totalResults / resultsPerPage);
}

function buildTotalResults(hits) {
  return hits.total.value;
}

function getHighlight(hit, fieldName, index) {
  if (fieldName === "publishTime") {
    return moment(parseInt(hit._source[fieldName])).format("YYYY-MM-DD HH:mm:ss");
  }
  if (fieldName === "id") {
    return index.toString();
  }
  if (fieldName === "keywords" || fieldName === "summary") {
    return hit._source[fieldName].join(", ");
  }
  if (
    !hit.highlight ||
    !hit.highlight[fieldName] ||
    hit.highlight[fieldName].length < 1
  ) {
    if (fieldName === "contentCleaned") {
      return hit._source[fieldName].substring(0, 300).concat("...");
    }
    return;
  }

  return hit.highlight[fieldName][0];
}

const sortList= ["id", "publishTime", "title", "contentCleaned", "keywords", "summary", "domainName", "url"]
const chineseList = ["id", "发布时间", "标题", "内容", "关键词", "摘要", "来源", "链接"]

function buildResults(hits) {
  const addEachKeyValueToObject = (acc, [key, value]) => ({
    ...acc,
    [key]: value
  });

  const toObject = (value, snippet) => {
    return { raw: value, ...(snippet && { snippet }) };
  };

  return hits.map((record, index) => {
    return Object.entries(record._source)
      .filter(([fieldName, fieldValue]) => sortList.includes(fieldName))
      .sort(([fa, faa], [fb, fbb]) => sortList.indexOf(fa) - sortList.indexOf(fb))
      .map(([fieldName, fieldValue]) => [
        chineseList[sortList.indexOf(fieldName)],
        toObject(fieldValue, getHighlight(record, fieldName, index))
      ])
      .reduce(addEachKeyValueToObject, {});
  });
}

/*
  Converts an Elasticsearch response to new application state

  When implementing an onSearch Handler in Search UI, the handler needs to convert
  search results into a new application state that Search UI understands.

  For instance, Elasticsearch returns "hits" for search results. This maps to
  the "results" property in application state, which requires a specific format. So this
  file iterates through "hits" and reformats them to "results" that Search UI
  understands.

  We do similar things for facets and totals.
*/
export default function buildState(response, resultsPerPage) {
  const results = buildResults(response.hits.hits);
  const totalResults = buildTotalResults(response.hits);
  const totalPages = buildTotalPages(resultsPerPage, totalResults);
  const facets = buildStateFacets(response.aggregations);

  return {
    results,
    totalPages,
    totalResults,
    ...(facets && { facets })
  };
}
