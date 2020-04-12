import React from "react";
import { StoriesPage, FormPage, DataPage } from "./pages";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import { useTransition, animated } from "react-spring";

/*
school	
major	
year	
ethnicity	
hometown	worryFinancial	worryHousing	worryAcademic	worryGovernment	worryPhysical	worryMental	
responseCommunity	responseAffected	responseElse responseDoneDifferently
comfortablePublish	knowPositive	currentLocation
*/
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Title />
          <Navbar />
          <Switch>
            <Route exact path="/">
              <StoriesPage></StoriesPage>
            </Route>
            <Route exact path="/data">
              <DataPage></DataPage>
            </Route>
            <Route exact path="/form">
              <FormPage></FormPage>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
