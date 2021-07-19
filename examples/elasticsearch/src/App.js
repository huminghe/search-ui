import React from "react";
import logo from './logo.svg';

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  WithSearch,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting
} from "@elastic/react-search-ui";
import {Layout, MultiCheckboxFacet, SingleSelectFacet} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import buildRequest from "./buildRequest";
import runRequest from "./runRequest";
import applyDisjunctiveFaceting from "./applyDisjunctiveFaceting";
import buildState from "./buildState";

const config = {
  debug: true,
  hasA11yNotifications: true,
  onResultClick: () => {
    /* Not implemented */
  },
  onAutocompleteResultClick: () => {
    /* Not implemented */
  },
  onAutocomplete: async ({searchTerm}) => {
    const requestBody = buildRequest({searchTerm});
    const json = await runRequest(requestBody);
    const state = buildState(json);
    return {
      autocompletedResults: state.results
    };
  },
  onSearch: async state => {
    const {resultsPerPage} = state;
    const requestBody = buildRequest(state);
    // Note that this could be optimized by running all of these requests
    // at the same time. Kept simple here for clarity.
    const responseJson = await runRequest(requestBody);
    const responseJsonWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
      responseJson,
      state,
      ["domain", "publishTime"]
    );
    return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage);
  }
};

export default function App() {
  return (
    <div className="App">
      <div className="App-header" align="center">
        <img src={logo} className="App-logo" alt="logo" height={100} width={100}/>
        <h2 align="center">国网高培中心知识萃取平台</h2>
      </div>
      <p></p>
      <SearchProvider config={config}>
        <WithSearch mapContextToProps={({wasSearched}) => ({wasSearched})}>
          {({wasSearched}) => (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "title",
                        urlField: "url",
                        shouldTrackClickThrough: true,
                        clickThroughTags: ["test"]
                      }}
                      autocompleteSuggestions={true}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={[
                            {
                              name: "相关性",
                              value: "",
                              direction: ""
                            },
                            {
                              name: "发布时间-从晚到早",
                              value: "publishTime",
                              direction: "desc"
                            },
                            {
                              name: "发布时间-从早到晚",
                              value: "publishTime",
                              direction: "asc"
                            }
                          ]}
                        />
                      )}
                      <Facet
                        field="domain"
                        label="domain"
                        filterType="any"
                        isFilterable={true}
                        view={MultiCheckboxFacet}
                      />
                      <Facet field="publishTime" label="发布时间" filterType="any" view={SingleSelectFacet}/>
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="title"
                      urlField="url"
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo/>}
                      {wasSearched && <ResultsPerPage/>}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging/>}
                />
              </ErrorBoundary>
            </div>
          )}
        </WithSearch>
      </SearchProvider>
    </div>
  );
}
