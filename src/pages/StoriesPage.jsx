import React from "react";
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
import Upvote from "../components/Upvote.js";
import debounce from "lodash.debounce";
import axios from "axios";
import SearchableDropdown from "../components/Searchable";
import Select from "react-select";

import "./masonry.css";

import SharePost from "../components/SharePost";

const Container = styled("div")`
  width: 100%;
  height: 92.5vh;
  display: flex;
  overflow: scroll;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FiltersContainer = styled("div")``;

const ResponsesContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  height: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ResponseEntry = styled("div")`
  margin-top: 20px;
  box-sizing: border-box;
  /* width: 100%; */
  /* background-color: #f7f7f7; */
  border-radius: 5px;
  flex: 1;
  color: #858c8c;
`;

const PersonEntry = styled("div")`
  margin: 10px;
  background-color: white;
  padding: 20px;
  border: 2px solid #c3c9c9;
  border-radius: 10px;
  /* margin: 10px; */
`;

const InteractionContainer = styled("div")`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export default class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFieldNames: filterfieldNames.map((element, key) => ({
        column: element.column,
        selections: ["All"],
        key: key,
      })),
      sortOptions: [
        { value: "recent", label: "most recent" },
        { value: "reacted", label: "most reacted" },
        { value: "random", label: "random" },
      ],
      selectedSort: null,
      stories: [],
      currPage: 1,
      lazyload: {
        error: false,
        hasMore: true,
        isLoading: false,
      },
      filtersOpen: false,
    };
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onSortClick = this.onSortClick.bind(this);
    this.loadStories = this.loadStories.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);

    this.breakpointCols = {
      default: 2,
      700: 1,
    };
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
          const newStories = results.data.map((d) => d.fields);
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
    console.log([
      element.scrollHeight - element.scrollTop,
      element.clientHeight,
    ]);
    if (
      element.scrollHeight - element.scrollTop - 200 <=
      element.clientHeight
    ) {
      loadStories(getQueryString(this.state.selectedFieldNames));
    }
  }, 50);

  /*
   * what to do when the filter is clicked.
   * (this passed in as a callback into the filter buttons)
   */
  onFilterClick(column, selections) {
    let newSelectedFieldNames = this.state.selectedFieldNames;
    let selectedfieldName = newSelectedFieldNames.find(
      (element) => element.column == column
    );
    selectedfieldName.selections = selections;
    this.setState(
      { selectedFieldNames: newSelectedFieldNames, stories: [], currPage: 1 },
      () => this.loadStories(getQueryString(newSelectedFieldNames))
    );
  }

  // I based it off the previous two functions, but I'm not sure if I'm using "getQueryString" correctly.
  onSortClick(selectedSort) {
    this.setState({ selectedSort });
    /*this.loadStories(getQueryString(selection));*/
  }

  toggleFilters() {
    this.setState({ filtersOpen: !this.state.filtersOpen });
  }

  render() {
    let { tab, stories } = this.state;
    let { error, hasMore, isLoading } = this.state.lazyload;
    const { selectedFieldNames } = this.state;
    return (
      <>
        <Container>
          <FiltersContainer
            className={css`
              z-index: 20;
              width: 20%;
              padding: 20px;
              display: flex;
              flex-direction: column;
              flex-shrink: 0;
              box-sizing: border-box;
              line-height: 30px;
              cursor: pointer;
              color: #626969;
              position: sticky;
              top: 0;
              transition: all 300ms ease-in-out;
              @media (max-width: 600px) {
                padding-top: 0;
                width: 100%;
                overflow: hidden;
                border-bottom: 1px solid #212529;
                background-color: #fff;
                height: ${this.state.filtersOpen ? "92.5vh" : "30px"};
              }
            `}
          >
            <div onClick={this.toggleFilters} className={css``}>
              Filters{" "}
              <span
                className={css`
                  writing-mode: vertical-rl;
                  text-orientation: mixed;
                  padding-bottom: 2px;
                  @media (min-width: 601px) {
                    display: none;
                  }
                `}
              >
                {this.state.filtersOpen ? "‹" : "›"}
              </span>
            </div>
            <div>
              {filterfieldNames.map((element) => (
                <FilterDropdown {...element} onClick={this.onFilterClick} />
              ))}
              <Select
                options={this.state.sortOptions}
                placeholder="sort by..."
                value={this.state.selectedSort}
                onChange={this.onSortClick}
              />
            </div>
          </FiltersContainer>
          <ResponsesContainer>
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
                breakpointCols={this.breakpointCols}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {stories.map(
                  (row, i) =>
                    row.year && (
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
                              color: #5e6363;
                              font-weight: 700;
                            `}
                          >
                            {MAP_year_to_yearName[row.year]} {row.major} major
                            at {row.school}
                          </b>
                          {responseColumns.map(
                            (response) =>
                              row[response.column] != "" && (
                                <ResponseEntry>
                                  <div>
                                    <b
                                      className={css`
                                        font-weight: 600;
                                        color: #5e6363;
                                      `}
                                    >
                                      {response.question}
                                    </b>
                                  </div>
                                  <div>{row[response.column]}</div>
                                </ResponseEntry>
                              )
                          )}
                          <InteractionContainer>
                            <Upvote id={i}></Upvote>
                            <SharePost row={row} />
                          </InteractionContainer>
                        </PersonEntry>
                      </div>
                    )
                )}
              </Masonry>
            </div>
          </ResponsesContainer>
        </Container>
      </>
    );
  }
}
