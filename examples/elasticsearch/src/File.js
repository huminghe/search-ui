import React from "react";
import {withRouter} from "react-router-dom";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

import getFile from "./getFile";
import cookie from "react-cookies";
import logo from "./logo.png";

export class File extends React.Component {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    this.state = {params: params, response: "加载中"};
  }

  async componentDidMount() {
    let params = this.state.params;
    const filePath = params.get("filePath");
    const accountName = cookie.load("accountName");
    const response = await getFile(filePath, accountName);
    this.setState({response: response});
  }

  async componentDidUpdate() {
    // window.close();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" align="center">
          <img src={logo} className="App-logo" alt="logo" height={200} width={750}/>
        </div>
        <h1 align="center">{this.state.response}</h1>
        <h1 align="center">如果被浏览器拦截，请解除拦截～</h1>
      </div>
    )
  }

}

export default withRouter(File);
