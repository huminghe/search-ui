import React from "react";
import {withRouter} from "react-router-dom";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

import getFile from "./getFile";
import cookie from "react-cookies";

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
    window.close();
  }

  render() {
    return (
      <div>
        <p>${this.state.response}</p>
      </div>
    )
  }

}

export default withRouter(File);
