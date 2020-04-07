import React from "react";
import { StoriesPage, FormPage, DataPage } from "./pages";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import styled from "styled-components";
import { css } from "emotion";
import Tabletop from "tabletop";
import { preprocessSheetsData } from "./utils/functions";

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
  componentDidMount() {
    Tabletop.init({
      key: "1iVHXhygVYOPzm7lRWSFrEVOquX3X7gTV-Ixu1Gy1fh4",
      callback: (googleData) => {
        this.setState({
          data: preprocessSheetsData(googleData),
        });
      },
      simpleSheet: true,
    });
  }
  render() {
    if (!this.state) return <div>Loading...</div>;
    return (
      <div className="App">
        <Router>
          <Title />

          <Navbar />

          <Switch>
            <Route exact path="/">
              <StoriesPage data={this.state.data}></StoriesPage>
            </Route>
            <Route exact path="/data">
              <DataPage data={this.state.data}></DataPage>
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
