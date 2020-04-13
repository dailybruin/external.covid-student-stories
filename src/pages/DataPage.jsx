import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import axios from "axios";
import PieChart from "../components/graphs/Pie";
import WordCloud from "../components/WordCloud";
import StackedBar from "../components/graphs/StackedBar";
import { Pie } from "react-chartjs-2";
import Map from "../components/MapV2.js";
import { auto } from "@popperjs/core";
import { findByLabelText } from "@testing-library/dom";

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 1100px)"
};

const { mobile } = mediaQueries;
const { tablet } = mediaQueries;

const ScrollContainer = styled("div")`
  height: 94.5vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
`;

const NumberContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 17.5%;
  color: #5e6363;
  font-size: 20px;
  background-color: white;
  text-align: center;
  border: 2px solid #c3c9c9;
  border-radius: 10px;
  padding: 15px;

  ${tablet} {
    width: 45%;
    margin: 2.5%;
  }

  ${mobile} {
    width: 95%;
    margin: 2.5%;
  }
`;

const GraphContainer = styled("div")`
  width: 27.5%;
  height: 400px;
  padding: 30px;
  background-color: #b7c0c0;
  background-color: white;
  border: 2px solid #c3c9c9;
  border-radius: 10px;

  ${tablet} {
    width: 45%;
    margin: 2.5%;
  }

  ${mobile} {
    width: 95%;
    margin: 2.5%;
  }
`;

const StatsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5vh 5% 5vh 5%;

  ${mobile} {
    flex-direction: column;
    align-items: center;
    padding: 5vh 5vw;
  }
`;

const MapContainer = styled("div")`
  padding: 0 5% 5% 5%;
`;

const filterFields = [
  { field: "School", categories: ["All", "UCLA", "USC"] },
  { field: "Major", categories: ["All", "CS", "Math", "we should bin these"] }
];

function showData(selectedFields, row) {
  if (row.testimony == "") return false;
  // this code is terrible
  for (let i = 0; i < selectedFields.length; i++) {
    let e = selectedFields[i];
    if (e.selection != "All" && row[e.field.toLowerCase()] != e.selection)
      return false;
  }
  return true;
}
export default class DataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFields: filterFields.map((element, key) => ({
        field: element.field,
        selection: "All",
        key: key,
        isLoading: true
      })),
      data: {}
    };
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadStories();
  }

  loadStories() {
    this.setState({ isLoading: true }, () => {
      axios(`https://covidstories.dailybruin.com/stories/stats`)
        .then(results => {
          const newStories = results.data;
          this.setState({
            data: newStories
          });
          this.setState({
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({});
        });
    });
  }

  render() {
    const { data } = this.state;
    const { blue } = "blue";
    var cities = [];
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].comfortablePublish);
      if (data[i].knowPositive === "Yes") {
        count += 1;
      }
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].hometown.indexOf(",") > -1) {
        cities.push(data[i].hometown);
      }
    }
    return (
      <>
        <ScrollContainer>
          {!this.state.isLoading && (
            <div
              style={{
                height: "100%",
                overflow: "auto"
              }}
            >
              <div style={{ padding: "5vh 5vw 0 5vw" }}>
                <WordCloud />
              </div>
              <StatsContainer>
                <NumberContainer>
                  <div
                    className={css`
                      font-size: ${this.state.data.count <= 9999
                        ? "calc(10vmin + 10px)"
                        : "calc(7.5vmin)"};
                      font-weight: bold;
                      height: 60%;
                      display: flex;
                      justify-content: center;
                      align-items: flex-end;
                    `}
                  >
                    {this.state.data.count}
                  </div>
                  students have shared their stories
                </NumberContainer>
                <NumberContainer>
                  <div
                    className={css`
                      font-size: ${this.state.data.numKnowPositives <= 9999
                        ? "calc(10vmin + 10px)"
                        : "calc(7.5vmin)"};
                      font-weight: bold;
                      height: 60%;
                      display: flex;
                      justify-content: center;
                      align-items: flex-end;
                    `}
                  >
                    {this.state.data.numKnowPositives}
                  </div>
                  know someone who has tested positive for Covid-19
                </NumberContainer>

                <GraphContainer>
                  <PieChart data={this.state.data.curr_location_breakdown} />
                </GraphContainer>

                <GraphContainer>
                  <StackedBar data={this.state.data.feelings}></StackedBar>
                </GraphContainer>
              </StatsContainer>
              <MapContainer>
                <Map component={Map} count={count} citiesList={cities} />
              </MapContainer>
            </div>
          )}
        </ScrollContainer>
      </>
    );
  }
}
