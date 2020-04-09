import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import axios from "axios";
import PieChart from "../components/graphs/Pie";
import StackedBar from "../components/graphs/StackedBar";

const StoriesContainer = styled("div")`
  height: 90vh;
  width: 100%;
  display: flex;
  background-color: white;
`;

const ScrollContainer = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
`;

const StoryEntry = styled("div")`
  box-sizing: border-box;
  border: 2px solid lightgreen;
  margin: 5px;
  padding: 5px;
`;

const NumberContainer = styled("div")`
  width: 200px;
  height: 200px;
  color: white;
  font-size: 15px;
  color: white;
  background-color: #b7c0c0;
  text-align: center;
  padding: 30px;
  margin: 30px;
`;

const GraphContainer = styled("div")`
  width: 400px;
  height: 400px;
  padding: 30px;
  margin: 30px;
  background-color: #b7c0c0;
`;

const filterFields = [
  { field: "School", categories: ["All", "UCLA", "USC"] },
  { field: "Major", categories: ["All", "CS", "Math", "we should bin these"] },
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
        isLoading: true,
      })),
      data: {},
    };
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadStories();
  }

  loadStories() {
    this.setState({ isLoading: true }, () => {
      axios(`https://covidstories.dailybruin.com/stories/stats`)
        .then((results) => {
          const newStories = results.data;
          this.setState({
            data: newStories,
          });
          this.setState({
            isLoading: false,
          });
        })
        .catch((err) => {
          this.setState({});
        });
    });
  }

  onFilterClick(field, selection) {
    let newSelectedFields = this.state.selectedFields;
    let selectedField = newSelectedFields.find(
      (element) => element.field == field
    );
    selectedField.selection = selection;
    this.setState({ selectedFields: newSelectedFields });
  }

  render() {
    let { data } = this.props;
    const { selectedFields } = this.state;
    data = data.filter((row) => showData(selectedFields, row));

    return (
      <>
        {!this.state.isLoading ? (
          <ScrollContainer>
            <div style={{ height: "100%", overflow: "auto" }}>
              <GraphContainer>
                <PieChart data={this.state.data.curr_location_breakdown} />
              </GraphContainer>
              <GraphContainer>
                <StackedBar
                  data={this.state.data.curr_location_breakdown}
                ></StackedBar>
              </GraphContainer>
              <NumberContainer>
                <div style={{ fontSize: 100, fontWeight: "bold" }}>
                  {" "}
                  {this.state.data.numKnowPositives}{" "}
                </div>
                students know someone who has tested positive for Covid-19.
              </NumberContainer>
            </div>
          </ScrollContainer>
        ) : (
          <></>
        )}
      </>
    );
  }
}
