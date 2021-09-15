import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15;
  country="in";
  apiKey=process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            height={3}
          />
          <Switch>
            <Route exact path="/">
              <News
                progress={this.setProgress}
                key="general"
                pageSize={this.pageSize}
                country={this.country}
                category={"general"}
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/science">
              <News
                progress={this.setProgress}
                key="science"
                pageSize={this.pageSize}
                country={this.country}
                category={"science"}
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/health">
              <News
                progress={this.setProgress}
                key="health"
                pageSize={this.pageSize}
                country={this.country}
                category={"health"}
                apiKey={this.apiKey}/>
            </Route>
            <Route exact path="/technology">
              <News
                progress={this.setProgress}
                key="technology"
                pageSize={this.pageSize}
                country={this.country}
                category={"technology"}
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/sports">
              <News
                progress={this.setProgress}
                key="sports"
                pageSize={this.pageSize}
                country={this.country}
                category={"sports"}
                apiKey={this.apiKey}

                />
            </Route>
            <Route exact path="/business">
              <News
                progress={this.setProgress}
                key="business"
                pageSize={this.pageSize}
                country={this.country}
                category={"business"}
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                progress={this.setProgress}
                key="entertainment"
                pageSize={this.pageSize}
                country={this.country}
                category={"entertainment"}
                apiKey={this.apiKey}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
