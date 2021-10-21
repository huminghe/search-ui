import React from "react";
import logo from './logo.png';
import {withRouter} from "react-router-dom";

import {
  ErrorBoundary,
  SearchProvider,
  WithSearch,
  PagingInfo,
  Paging,
  Sorting
} from "@elastic/react-search-ui";
import {
  ResultsPerPage,
  SearchBox,
  Facet,
  Results
} from "./container"
import {Layout} from "@elastic/react-search-ui-views";
import {MultiCheckboxFacet, SingleSelectFacet} from "./view";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import buildRequest from "./buildRequest";
import runRequest from "./runRequest";
import applyDisjunctiveFaceting from "./applyDisjunctiveFaceting";
import buildState from "./buildState";
import checkAuth from "./checkAuth";
import cookie from "react-cookies";

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
      ["domainName", "publishTime", "level", "keywords"]
    );
    return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage);
  }
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    this.state = {params: params};
  }

  async componentDidMount() {
    let params = this.state.params;
    let ts = params.get("ts");
    let tsSign = params.get("tsSign");
    let accountName = params.get("accountName");
    if (!ts) {
      ts = cookie.load("ts");
    }
    if (!tsSign) {
      tsSign = cookie.load("tsSign");
    }
    if (!accountName) {
      accountName = cookie.load("accountName");
    }
    cookie.save("ts", ts, {path: "/", maxAge: 600});
    cookie.save("tsSign", tsSign, {path: "/", maxAge: 600});
    cookie.save("accountName", accountName, {path: "/", maxAge: 600});
    const returnData = await checkAuth(ts, tsSign);
    this.setState({ts: ts, tsSign: tsSign, returnData: returnData.replaceAll("\"", ""), accountName: accountName});
  }

  render() {

    const auth = this.state.returnData;
    if (auth === "true") {
      return (
        <div className="App">
          <div className="App-header" align="center">
            <img src={logo} className="App-logo" alt="logo" height={200} width={750}/>
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
                            titleField: "标题",
                            urlField: "链接",
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
                              label={"排序方式"}
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
                            field="domainName"
                            label="来源"
                            filterType="any"
                            isFilterable={true}
                            view={MultiCheckboxFacet}
                          />
                          <Facet field="publishTime" label="发布时间" filterType="any" view={SingleSelectFacet} show={8}/>
                          <Facet
                            field="keywords"
                            label="关键词"
                            filterType="any"
                            isFilterable={true}
                            view={MultiCheckboxFacet}
                          />
                          <Facet field="level" label="级别" filterType="any" view={MultiCheckboxFacet} show={3}/>
                        </div>
                      }
                      bodyContent={
                        <Results
                          titleField="标题"
                          urlField="链接"
                          shouldTrackClickThrough={true}
                        />
                      }
                      bodyHeader={
                        <React.Fragment>
                          {wasSearched && <PagingInfo
                            view={({start, end, totalResults}) => (
                              <div className="paging-info">
                                <strong>
                                  共 {totalResults} 条结果， 显示第 {start} - {end} 条
                                </strong>
                              </div>
                            )}
                          />}
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
    } else {
      return (
        <div className="App">
          <div className="App-header" align="center">
            <img src={logo} className="App-logo" alt="logo" height={200} width={750}/>
          </div>
          <p></p>
          <h1 align="center">未登录，请登录后访问～</h1>
        </div>
      );
    }
  }

}

export default withRouter(App);
