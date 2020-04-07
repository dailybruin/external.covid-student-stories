import React, { Fragment } from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import Masonry from "react-masonry-css";
import {
  filterAllowsShow,
  selectionMatchesEntry,
  getQueryString,
} from "../utils/functions";
import { MAP_year_to_yearName } from "../utils/mappings";
import { filterfieldNames, responseColumns } from "../utils/properties";
import { isElementOfType } from "react-dom/test-utils";
import SwipeableViews from "react-swipeable-views";
import request from "superagent";
import debounce from "lodash.debounce";
import DataPage from "./DataPage";
import WordCloud from "../components/WordCloud";
import axios from "axios";
import SearchableDropdown from "../components/Searchable";
import "./masonry.css";

const Container = styled("div")`
  width: 90%;
  margin: 0 auto;
`;

const StoriesContainer = styled("div")`
  /* height: 90vh; */
  height: 100%;
  width: 100%;
  display: flex;
  /* background-color: #636f71; */
`;

const FiltersContainer = styled("div")`
  height: 100%;
  width: 15%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 30px;
  padding-top: 6.5em;
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
  box-sizing: border-box;
`;

const ResponseEntry = styled("div")`
  margin-top: 20px;
  box-sizing: border-box;
  /* width: 100%; */
  /* background-color: #f7f7f7; */
  border-radius: 5px;
  flex: 1;
  color: #919999;
`;

const PersonEntry = styled("div")`
  background-color: white;
  padding: 20px;
  border: 2px solid #b7c0c0;
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
  font-weight: 400;
  /* background-color: #ebebeb; */
  font-size: 18px;
  padding: 20px;
  text-align: center;
`;

const QuestionAndResponsesContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
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
      stories: [],
      currPage: 1,
      lazyload: {
        error: false,
        hasMore: true,
        isLoading: false,
      },
      tab: 0,
    };
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onQuestionClick = this.onQuestionClick.bind(this);
    this.loadStories = this.loadStories.bind(this);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadStories(getQueryString(this.state.selectedFieldNames));
  }

  loadStories(queryString) {
    this.setState({ isLoading: true }, () => {
      axios(
        `https://covidstories.dailybruin.com/stories/?${queryString}&i=${this.state.currPage}`
      )
        .then((results) => {
          console.log(
            `https://covidstories.dailybruin.com/stories/?${queryString}&i=${this.state.currPage}`
          );
          console.log(queryString);
          console.log("lol");
          const newStories = results.data.map((d) => d.fields);
          console.log(newStories);
          console.log(this.state);
          this.setState({
            hasMore: true,
            isLoading: false,
            stories: [...this.state.stories, ...newStories],
            currPage: this.state.currPage + 1,
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
          });
        });
    });
  }

  handleStoriesScroll = debounce(() => {
    const { loadStories } = this;
    const { error, isLoading, hasMore } = this.state.lazyload;
    if (error || isLoading || !hasMore) return;
    const element = this.refs.scrollview;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      loadStories(getQueryString(this.state.selectedFieldNames));
    }
  }, 50);

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
    this.setState(
      { selectedFieldNames: newSelectedFieldNames, stories: [], currPage: 1 },
      () => this.loadStories(getQueryString(newSelectedFieldNames))
    );
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
    let { tab, stories } = this.state;
    let { error, hasMore, isLoading } = this.state.lazyload;
    const { selectedFieldNames, responseSelections } = this.state;
    data = data.filter((row) => filterAllowsShow(selectedFieldNames, row));
    return (
      <>
        {/* <WordCloud></WordCloud> */}
        <Container>
          <div>
            <Tab onClick={() => this.switchTab(0)}>Words</Tab>
            <Tab onClick={() => this.switchTab(1)}>Stats</Tab>
          </div>
          <SwipeableViews
            index={tab}
            onChangeIndex={() => this.switchTab(tab)}
            className={css`
              width: 100%;
            `}
          >
            <StoriesContainer>
              <FiltersContainer>
                School
                <SearchableDropdown />
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
                          color: ${responseSelected.selected
                            ? "#606666"
                            : "#282b2b"};
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
                    onScroll={this.handleStoriesScroll}
                    ref="scrollview"
                  >
                    <Masonry
                      breakpointCols={2}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {stories.map((row) => (
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
                                row[response.column] != "" && (
                                  <ResponseEntry>
                                    <div>
                                      <b>{response.question}</b>
                                    </div>
                                    <div>{row[response.column]}</div>
                                  </ResponseEntry>
                                )
                            )}
                          </PersonEntry>
                        </div>
                      ))}
                    </Masonry>
                  </div>
                </ScrollContainer>
              </QuestionAndResponsesContainer>
            </StoriesContainer>
            <DataPage data={data}> </DataPage>
          </SwipeableViews>
        </Container>
      </>
    );
  }
}
