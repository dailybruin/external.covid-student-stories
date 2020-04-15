import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import Masonry from "react-masonry-css";
import Select from "react-select";
import { SortSelect, ReactSortSelect } from "../components/SortButtons";
import { getQueryString } from "../utils/functions";
import { MAP_year_to_yearName } from "../utils/mappings";
import {
  filterfieldNames,
  responseColumns,
  reactSortOptions,
  sortOptions,
} from "../utils/properties";
import Upvote from "../components/Upvote.js";
import debounce from "lodash.debounce";
import axios from "axios";
import anon_profile from "../images/anon.jpg";
import "./masonry.css";
import SharePost from "../components/SharePost";
import Cookies from "universal-cookie";

const mediaQueries = {
  mobile: "@media (max-width: 700px)",
  notMobile: "@media (min-width: 701px)",
  tablet: "@media (max-width: 900px)",
};
const { mobile } = mediaQueries;
const Container = styled("div")`
  width: 100%;
  height: 92.5vh;
  display: flex;
  overflow: scroll;
  font-family: Avenir;

  ${mobile} {
    flex-direction: column;
  }
`;

const FiltersContainer = styled("div")`
  background-color: #f9f9f9;
`;

const ResponsesContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  height: 100%;

  ${mobile} {
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
  color: #6d6b67;
  color: black;
  ${mobile} {
    font-size: 13px;
  }
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
  border-top: 1px dotted #c3c9c9;
  padding-top: 15px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Hdr = styled("div")`
  font-size: 30px;
  margin-bottom: 5px;
  margin-top: 15px;
  ${mobile} {
    margin-top: 10px;
    margin-bottom: 3px;
    font-size: 16px;
  }
`;

const cookies = new Cookies();

export default class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFieldNames: filterfieldNames.map((element, key) => ({
        column: element.column,
        selections: ["All"],
        key: key,
      })),
      selectedReactionSort: 0, // 0 means latest
      selectedSort: 0, // 0 means no sort
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
    this.loadStories(
      getQueryString(
        this.state.selectedFieldNames,
        this.state.selectedSort,
        this.state.selectedReactionSort
      )
    );
  }

  loadStories(queryString) {
    this.setState({ isLoading: true }, () => {
      axios(
        `https://covidstudents.dailybruin.com/api/stories/?${queryString}&i=${this.state.currPage}`
      )
        .then((results) => {
          const newStories = results.data.map((d) => {
            const pk = d.pk;
            return { ...d.fields, pk };
          });
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
    if (
      element != undefined &&
      element.scrollHeight - element.scrollTop - 3000 <= element.clientHeight
    ) {
      loadStories(
        getQueryString(
          this.state.selectedFieldNames,
          this.state.selectedSort,
          this.state.selectedReactionSort
        )
      );
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
      () =>
        this.loadStories(
          getQueryString(
            newSelectedFieldNames,
            this.state.selectedSort,
            this.state.selectedReactionSort
          )
        )
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
        {/* <div
          className={css`
            height: 200px;
          `}
        ></div> */}
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
              color: #626969;
              position: sticky;
              top: 0;
              transition: all 300ms ease-in-out;
              border-right: 1px solid #d3d3d3;
              ${mobile} {
                padding-top: 0;
                padding-left: 0.8em;
                width: 100%;
                overflow: hidden;
                border-bottom: 1px solid #212529;
                background-color: #fff;
                height: ${this.state.filtersOpen ? "92.5vh" : "22px"};
              }
            `}
          >
            <div onClick={this.toggleFilters} className={css``}>
              Filters / Sorting
              {/* <span
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
              </span> */}
            </div>
            <div
              className={css`
                font-size: 18px;
                line-height: 30px;
                ${mobile} {
                  font-size: 14px;
                  line-height: 22px;
                }
              `}
            >
              <Hdr>Sort</Hdr>
              <div
                className={css`
                  padding-left: 20px;
                `}
              >
                <SortSelect
                  options={sortOptions}
                  placeholder="sort by..."
                  // value={MAP_sort_to_label[this.state.selectedSort]}
                  onChange={(val) => {
                    this.setState(
                      {
                        selectedSort: val.value,
                        stories: [],
                        currPage: 1,
                      },
                      () => {
                        this.loadStories(
                          getQueryString(
                            this.state.selectedFieldNames,
                            val.value,
                            this.state.selectedReactionSort
                          )
                        );
                      }
                    );
                  }}
                />
                <ReactSortSelect
                  options={reactSortOptions}
                  placeholder="sort by reacc..."
                  // value={MAP_reaction_to_label[this.state.selectedReactionSort]}
                  onChange={(val) => {
                    this.setState(
                      {
                        selectedReactionSort: val.value,
                        stories: [],
                        currPage: 1,
                      },
                      () => {
                        this.loadStories(
                          getQueryString(
                            this.state.selectedFieldNames,
                            this.state.selectedSort,
                            val.value
                          )
                        );
                      }
                    );
                  }}
                />
              </div>
              <Hdr>Filter</Hdr>

              {filterfieldNames.map((element) => (
                <FilterDropdown {...element} onClick={this.onFilterClick} />
              ))}
            </div>
          </FiltersContainer>
          <ResponsesContainer>
            <div
              className={css`
                height: 100%;
                width: 100%;
                overflow: auto;
                padding: 20px;
                ${mobile} {
                  padding: 0px;
                }
              `}
              onScroll={this.handleStoriesScroll}
              ref="scrollview"
            >
              {stories.length == 0 && (
                <div
                  className={css`
                    align-self: center;
                    text-align: center;
                    font-size: 18px;
                  `}
                >
                  No results
                </div>
              )}
              <Masonry
                breakpointCols={this.breakpointCols}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {stories.map(
                  (row) =>
                    row.year && (
                      <div
                        className={css`
                          display: flex;
                          flex-direction: column;
                          width: 100%;
                        `}
                      >
                        <PersonEntry>
                          <div
                            className={css`
                              display: flex;
                              align-items: middle;
                              height: auto;
                            `}
                          >
                            <img
                              className={css`
                                height: 45px;
                                margin-left: -5px;
                                margin-right: 8px;
                                margin-top: 4px;
                              `}
                              src={anon_profile}
                            />
                            <div>
                              <b
                                className={css`
                                  font-size: 20px;
                                  color: #5e6363;
                                  font-weight: 700;
                                  ${mobile} {
                                    font-size: 17px;
                                  }
                                `}
                              >
                                {MAP_year_to_yearName[row.year]}{" "}
                                {row.major != "N/A" && `${row.major} major`}
                              </b>
                              <div
                                className={css`
                                  margin-top: -4px;
                                  font-size: 14px;
                                  ${mobile} {
                                    font-size: 13px;
                                    margin-top: 0;
                                  }
                                `}
                              >
                                {row.school && `at ${row.school}`}
                              </div>
                            </div>
                          </div>

                          {responseColumns.map(
                            (response) =>
                              row[response.column] != "" && (
                                <ResponseEntry>
                                  <div>
                                    <div
                                      className={css`
                                        font-weight: 400;
                                        margin-bottom: 4px;
                                        color: #586572;
                                      `}
                                    >
                                      <b>{response.question}</b>
                                    </div>
                                  </div>
                                  <div>{row[response.column]}</div>
                                </ResponseEntry>
                              )
                          )}
                          <InteractionContainer>
                            <Upvote
                              id={row.pk}
                              love={row.reactLove}
                              sad={row.reactSad}
                              like={row.reactUp}
                              angry={row.reactAngry}
                              total={row.reactTotal}
                            ></Upvote>
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
        {window.location.pathname == "/stories" &&
        cookies.get("submittedCovidStory") == undefined ? (
          <a
            href="/form"
            className={css`
              padding: 10px 20px;
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                0 3px 6px rgba(0, 0, 0, 0.23);
              position: absolute;
              bottom: 20px;
              right: 20px;
              text-decoration: none;
              background-color: #6d6b67;
              color: #fff;
              border-radius: 4px;
              transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
              &:hover {
                color: #fff;
                text-decoration: none;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
                  0 6px 6px rgba(0, 0, 0, 0.23);
              }
            `}
          >
            Share Your Story
          </a>
        ) : (
          <></>
        )}
      </>
    );
  }
}
