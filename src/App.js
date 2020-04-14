import React, { useEffect } from "react";
import { StoriesPage, FormPage, DataPage } from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
} from "react-router-dom";
// import ReactGA from "react-ga";
// import { createBrowserHistory } from "history";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import debounce from "lodash.debounce";
import { css } from "emotion";

// const history = createBrowserHistory();

// history.listen((location) => {
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });
/*
school	
major	
year	
ethnicity	
hometown	worryFinancial	worryHousing	worryAcademic	worryGovernment	worryPhysical	worryMental	
responseCommunity	responseAffected	responseElse responseDoneDifferently
comfortablePublish	knowPositive	currentLocation
*/

function Bottom() {
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    window.addEventListener("scroll", handleStoriesScroll);
  });
  const handleStoriesScroll = debounce((e) => {
    if (
      window.innerHeight + window.scrollY + 40 >= document.body.offsetHeight &&
      location.pathname == "/" &&
      document.getElementById("lolcanufindme")
    ) {
      window.removeEventListener("scroll", handleStoriesScroll);
      setTimeout(function () {
        history.push("/stories");
      }, 500);
    }
  }, 50);
  return <div></div>;
}

function App() {
  return (
    <div className="App">
      <iframe name="blackhole" style={{ display: "none" }}></iframe>
      <Router>
        <Switch>
          <Route exact path="/">
            <Title />
            <Navbar highlighted="stories" />
            <StoriesPage></StoriesPage>
            <Bottom />
            <div id="lolcanufindme" />
          </Route>
          <Route exact path="/stories">
            <Navbar highlighted="stories" />
            <StoriesPage></StoriesPage>
          </Route>
          <Route exact path="/data">
            <Navbar highlighted="data" />
            <DataPage></DataPage>
          </Route>
          <Route exact path="/form">
            <Navbar highlighted="form" />
            <FormPage></FormPage>
          </Route>
          <Route exact path="/formsubmitted">
            <Navbar highlighted="form" />
            <div
              className={css`
                padding: 120px 20%;
                font-size: 20px;
              `}
            >
              Thanks for sharing!
              <br />
              <br />
              We have recorded your response. We will review it and you should
              see it on the page shortly! Navigate to the{" "}
              <Link
                to="/stories"
                className={css`
                  text-decoration: underline !important;
                  font-weight: bold;
                  color: #586572 !important;
                  &:hover {
                  }
                `}
              >
                Stories
              </Link>{" "}
              tab to see what others have shared.
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
