import React from "react";
import { StoriesPage, FormPage, DataPage } from "./pages";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import { css } from "emotion";
import Tabletop from "tabletop";
import { preprocessSheetsData } from "./utils/functions";

const Title = styled("div")`
  height: 100vh;
  width: 100%;
  background-color: lightcyan;
  font-size: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddStoryLink = styled(Link)`
  font-size: 36px;
`;

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
          {/*
          <Title>
            <div>COVID STORIES</div>
            <AddStoryLink
              to="/form"
              onClick={() => {
                scroller.scrollTo("navbar", {
                  duration: 500,
                  delay: 0,
                  smooth: "easeInOutQuint",
                });
              }}
            >
              Add Your Story
            </AddStoryLink>
            <div
              className={css`
                position: absolute;
                bottom: 0;
                font-size: 20px;
                padding: 30px;
                box-sizing: border-box;
              `}
            >
              scroll down to see stories
            </div>
          </Title>
          {/* someone make this into a component in the components folder plz */}

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
