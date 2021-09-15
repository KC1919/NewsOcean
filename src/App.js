import React, {useState} from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


const App=()=> {
  let pageSize = 15;
  let country="in";
  const apiKey=process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

  const updateProgress=(prog)=>{
    setProgress(prog);
  }  

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={progress}
            height={3}
          />
          <Switch>
            <Route exact path="/">
              <News
                progress={updateProgress}
                key="general"
                pageSize={pageSize}
                country={country}
                category={"general"}
                apiKey={apiKey}
              />
            </Route>
            <Route exact path="/science">
              <News
                progress={updateProgress}
                key="science"
                pageSize={pageSize}
                country={country}
                category={"science"}
                apiKey={apiKey}
              />
            </Route>
            <Route exact path="/health">
              <News
                progress={updateProgress}
                key="health"
                pageSize={pageSize}
                country={country}
                category={"health"}
                apiKey={apiKey}/>
            </Route>
            <Route exact path="/technology">
              <News
                progress={updateProgress}
                key="technology"
                pageSize={pageSize}
                country={country}
                category={"technology"}
                apiKey={apiKey}
              />
            </Route>
            <Route exact path="/sports">
              <News
                progress={updateProgress}
                key="sports"
                pageSize={pageSize}
                country={country}
                category={"sports"}
                apiKey={apiKey}

                />
            </Route>
            <Route exact path="/business">
              <News
                progress={updateProgress}
                key="business"
                pageSize={pageSize}
                country={country}
                category={"business"}
                apiKey={apiKey}
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                progress={updateProgress}
                key="entertainment"
                pageSize={pageSize}
                country={country}
                category={"entertainment"}
                apiKey={apiKey}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

  export default App;
