import React, { useEffect } from "react";
import { StoriesPage, FormPage, DataPage } from "./pages";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import debounce from "lodash.debounce";

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
  console.log(history);
  console.log("Fuck");
  console.log(location.pathname);
  useEffect(() => {
    window.addEventListener("scroll", handleStoriesScroll);
  });
  const handleStoriesScroll = debounce((e) => {
    if (
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight &&
      location.pathname == "/" &&
      location.pathname != "/stories" &&
      location.pathname != "/data" &&
      location.pathname != "/form"
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
      <Router>
        <Switch>
          <Route exact path="/">
            <Title />
            <Navbar highlighted="stories" />
            <StoriesPage></StoriesPage>
            <Bottom />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
