import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import ReactList from "react-list";
import { isMatch } from "../utils/preprocess";
import { MAP_year_to_yearName } from "../utils/mappings";
import { isElementOfType } from "react-dom/test-utils";

const StoriesContainer = styled("div")`
  /* height: 90vh; */
  height: 100%;
  width: 100%;
  display: flex;
  /* background-color: #636f71; */
`;

const FiltersContainer = styled("div")`
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 30px;
  line-height: 30px;
  cursor: pointer;
`;

const ScrollContainer = styled("div")`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
`;

const StoryEntry = styled("div")`
  box-sizing: border-box;
  /* width: 100%; */
  margin: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  flex: 1;
`;

const StoryProfile = styled("div")`
  box-sizing: border-box;
  background-color: #b7c0c0;
  padding: 5px 10px 5px 10px;
  font-weight: 500;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const StoryResponse = styled("div")`
  padding: 15px;
  font-family: "Avenir";
`;

const Questions = styled("div")`
  box-sizing: border-box;
  font-weight: 600;
  /* background-color: #ebebeb; */
  font-family: "Avenir";
  font-size: 20px;
  padding: 20px;
  text-align: center;
`;

const QuestionAndResponsesContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const filterfieldNames = [
  { fieldName: "School", column: "school", categories: ["All", "UCLA", "USC"] },
  {
    fieldName: "Major",
    column: "major",
    categories: ["All", "CS", "Math", "we should bin these"]
  },
  {
    fieldName: "Year",
    column: "year",
    categories: [
      "All",
      "High School",
      "First-year",
      "Second-year",
      "Third-year",
      "Fourth-year+",
      "Graduate"
    ]
  }
];

const responseTypes = [
  {
    type: "responseCommunity",
    question: "How has your community responded to the Covid-19 pandemic?"
  },
  {
    type: "responseAffected",
    question: "How has Covid-19 affected you?"
  },
  // {
  //   type: "responseElse",
  //   question: "Is there anything we didn't ask that you would like to share?"
  // },
  {
    type: "responseDoneDifferently",
    question:
      "Is there anything you think your school or community could/should have done differently regarding this situation?"
  }
];

function showData(selectedFieldNames, row) {
  if (row.testimony == "") return false;
  // this code is terrible
  for (let i = 0; i < selectedFieldNames.length; i++) {
    let e = selectedFieldNames[i];
    if (e.selection != "All" && !isMatch(e.column, e.selection, row[e.column]))
      return false;
  }
  return true;
}

export default class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFieldNames: filterfieldNames.map((element, key) => ({
        column: element.column,
        selection: "All",
        key: key
      })),
      responseSelections: responseTypes.map((element, key) => ({
        type: element.type,
        question: element.question,
        selected: true,
        key: element.key
      }))
    };
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(column, selection) {
    let newSelectedFieldNames = this.state.selectedFieldNames;
    let selectedfieldName = newSelectedFieldNames.find(
      element => element.column == column
    );
    selectedfieldName.selection = selection;
    this.setState({ selectedFieldNames: newSelectedFieldNames });
  }

  render() {
    let { data } = this.props;
    const { selectedFieldNames, responseSelections } = this.state;
    data = data.filter(row => showData(selectedFieldNames, row));
    return (
      <>
        <StoriesContainer>
          <FiltersContainer>
            {filterfieldNames.map(element => (
              <FilterDropdown {...element} onClick={this.onFilterClick} />
            ))}
          </FiltersContainer>

          <QuestionAndResponsesContainer>
            <Questions>
              {responseTypes.map(element => {
                let newResponseSelections = responseSelections;
                let responseSelected = newResponseSelections.find(
                  e => e.type == element.type
                );
                return (
                  <div
                    className={css`
                      color: ${responseSelected.selected ? "red" : "black"};
                      cursor: pointer;
                    `}
                    onClick={() => {
                      let newResponseSelections = responseSelections;
                      let responseSelected = newResponseSelections.find(
                        e => e.type == element.type
                      );
                      console.log(responseSelected.question);
                      responseSelected.selected = !responseSelected.selected;
                      this.setState({
                        responseSelections: newResponseSelections
                      });
                    }}
                  >
                    {element.question}
                  </div>
                );
              })}
            </Questions>
            <ScrollContainer>
              <div
                className={css`
                  height: 100%;
                  width: 50%;
                  overflow: auto;
                `}
              >
                <ReactList
                  axis="y"
                  threshold={50}
                  length={data.length}
                  itemRenderer={idx => {
                    let row = data[idx];
                    return (
                      <div
                        className={css`
                          display: flex;
                          flex-direction: column;
                          width: 100%;
                        `}
                      >
                        <b>
                          {MAP_year_to_yearName[row.year]} {row.major} major at{" "}
                          {row.school}
                        </b>

                        {responseSelections.map(
                          response =>
                            response.selected && (
                              <StoryEntry>{row[response.type]}</StoryEntry>
                            )
                        )}
                      </div>
                    );
                  }}
                  type="variable"
                />
              </div>
            </ScrollContainer>
          </QuestionAndResponsesContainer>
        </StoriesContainer>
      </>
    );
  }
}
