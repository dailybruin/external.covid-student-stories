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

const ScrollContainer = styled("div")`
  height: 92.5vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
`;

const NumberContainer = styled("div")`
  width: 20%;
  color: #5e6363;
  font-size: 15px;
  background-color: #b7c0c0;
  background-color: white;
  text-align: center;
  padding: 30px;
  border: 2px solid #c3c9c9;
  border-radius: 10px;
`;

const GraphContainer = styled("div")`
  width: 35%;
  height: 400px;
  padding: 30px;
  background-color: #b7c0c0;
  background-color: white;
  border: 2px solid #c3c9c9;
  border-radius: 10px;
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
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#5e6363"
                }}
              >
                Number of Responses: {this.state.data.count}
              </div>
              <div
                className={css`
                  display: flex;
                  justify-content: space-between;
                  padding: 0 10% 0 10%;
                  margin: 5vh 5vw 5vh 5vw;
                  flex-wrap: wrap;
                `}
              >
                <GraphContainer>
                  <PieChart data={this.state.data.curr_location_breakdown} />
                </GraphContainer>
                <GraphContainer>
                  <StackedBar data={this.state.data.feelings}></StackedBar>
                </GraphContainer>
                <NumberContainer>
                  <div style={{ fontSize: 100, fontWeight: "bold" }}>
                    {this.state.data.numKnowPositives}
                  </div>
                  students know someone who has tested positive for Covid-19.
                </NumberContainer>
              </div>
              <Map component={Map} count={count} citiesList={cities} />
              <WordCloud />
            </div>
          )}
        </ScrollContainer>
      </>
    );
  }
}
