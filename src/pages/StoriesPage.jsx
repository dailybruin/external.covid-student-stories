import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import Masonry from "react-masonry-css";
import ReactList from "react-list";
import { filterAllowsShow, selectionMatchesEntry } from "../utils/functions";
import { MAP_year_to_yearName } from "../utils/mappings";
import { filterfieldNames, responseColumns } from "../utils/properties";
import { isElementOfType } from "react-dom/test-utils";
import Upvote from "../components/Upvote.js";
import SwipeableViews from "react-swipeable-views";

import "./masonry.css";

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

const ResponseEntry = styled("div")`
  margin-top: 20px;
  box-sizing: border-box;
  /* width: 100%; */
  /* background-color: #f7f7f7; */
  border-radius: 5px;
  flex: 1;
`;

const PersonEntry = styled("div")`
  background-color: white;
  padding: 20px;
  border: 2px solid lightgreen;
  /* margin: 10px; */
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

const Tab = styled("div")`
  display: inline-block;
  text-align: center;
  width: 50%;
`;

export default class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFieldNames: filterfieldNames.map((element, key) => ({
        column: element.column,
        selection: "All",
        key: key,
      })),
      responseSelections: responseColumns.map((element, key) => ({
        column: element.column,
        question: element.question,
        selected: true,
        key: element.key,
      })),
      tab: 0,
    };
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onQuestionClick = this.onQuestionClick.bind(this);
  }

  /*
   * what to do when the filter is clicked.
   * (this passed in as a callback into the filter buttons)
   */
  onFilterClick(column, selection) {
    let newSelectedFieldNames = this.state.selectedFieldNames;
    let selectedfieldName = newSelectedFieldNames.find(
      (element) => element.column == column
    );
    selectedfieldName.selection = selection;
    this.setState({ selectedFieldNames: newSelectedFieldNames });
  }

  /*
   * what to do when the question is clicked.
   */
  onQuestionClick(element) {
    let newResponseSelections = this.state.responseSelections;
    let responseSelected = newResponseSelections.find(
      (e) => e.column == element.column
    );
    console.log(responseSelected.question);
    responseSelected.selected = !responseSelected.selected;
    this.setState({
      responseSelections: newResponseSelections,
    });
  }

  switchTab(index) {
    this.setState({ tab: index });
  }

  render() {
    let { data } = this.props;
    let { tab } = this.state;
    const { selectedFieldNames, responseSelections } = this.state;
    data = data.filter((row) => filterAllowsShow(selectedFieldNames, row));
    return (
      <>
        <div>
          <Tab onClick={() => this.switchTab(0)}>Words</Tab>
          <Tab onClick={() => this.switchTab(1)}>Stats</Tab>
        </div>
        <SwipeableViews index={tab} onChangeIndex={() => this.switchTab(tab)}>
          <StoriesContainer>
            <FiltersContainer>
              {filterfieldNames.map((element) => (
                <FilterDropdown {...element} onClick={this.onFilterClick} />
              ))}
            </FiltersContainer>

            <QuestionAndResponsesContainer>
              <Questions>
                {responseColumns.map((element) => {
                  let newResponseSelections = responseSelections;
                  let responseSelected = newResponseSelections.find(
                    (e) => e.column == element.column
                  );
                  return (
                    <div
                      className={css`
                        color: ${responseSelected.selected ? "red" : "black"};
                        cursor: pointer;
                      `}
                      onClick={() => this.onQuestionClick(element)}
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
                    width: 100%;
                    overflow: auto;
                  `}
                >
                  {/* <ReactList
                  axis="y"
                  threshold={50}
                  length={data.length}
                  itemRenderer={(idx) => {
                    let row = data[idx];
                    return ( */}
                  <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {data.map((row) => (
                      <div
                        className={css`
                          display: flex;
                          flex-direction: column;
                          width: 100%;
                        `}
                      >
                        <PersonEntry>
                          <b
                            className={css`
                              font-size: 20px;
                            `}
                          >
                            {MAP_year_to_yearName[row.year]} {row.major} major
                            at {row.school}
                          </b>
                          {responseSelections.map(
                            (response) =>
                              response.selected &&
                              row[response.column].length != "" && (
                                <ResponseEntry>
                                  <div>
                                    <b>{response.question}</b>
                                  </div>
                                  <div>{row[response.column]}</div>
                                </ResponseEntry>
                              )
                          )}
                        </PersonEntry>
                        <Upvote id="hello" />{" "}
                        {/* replace hello with the ID of the given entry to allow cookies to work*/}
                      </div>
                    ))}
                  </Masonry>

                  {/* );
                  }}
                  type="variable"
                /> */}
                </div>
              </ScrollContainer>
            </QuestionAndResponsesContainer>
          </StoriesContainer>
          <div
            style={{
              backgroundColor: "red",
              width: "100",
              height: "400px",
            }}
          >
            lol this be stats and shit
          </div>
        </SwipeableViews>
      </>
    );
  }
}
