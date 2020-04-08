import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import ReactList from "react-list";
import { Pie } from "react-chartjs-2";
import Map from "../components/MapV2.js";

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
      })),
    };

    this.onFilterClick = this.onFilterClick.bind(this);
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
    var cities = [];
    const { selectedFields } = this.state;

    data = data.filter((row) => showData(selectedFields, row));
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].comfortablePublish);
      if (data[i].knowPositive === "Yes") {
        count += 1;
        // cities.push([data[i].hometown]);
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
          <div style={{ height: "100%", overflow: "auto" }}>
            <GraphContainer>
              <Pie
                data={{
                  labels: ["On Campus", "Off Campus", "Home", "Other"],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: [
                        "#D0D8D9",
                        "#D0D8D9",
                        "#D0D8D9",
                        "#D0D8D9",
                      ],
                      data: [10, 15, 60, 15],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Where are students?",
                    fontFamily: "Calibri",
                    fontSize: 30,
                    fontColor: "white",
                  },
                  legend: {
                    position: "bottom",
                    labels: {
                      // This more specific font property overrides the global property
                      fontColor: "white",
                    },
                  },
                }}
              />
            </GraphContainer>
            <NumberContainer>
              <div style={{ fontSize: 100, fontWeight: "bold" }}> {count} </div>
              students know someone who has tested positive for Covid-19.
            </NumberContainer>
          </div>
          <Map component={Map} count={count} citiesList={cities} />
        </ScrollContainer>
      </>
    );
  }
}
