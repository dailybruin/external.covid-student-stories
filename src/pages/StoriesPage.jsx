import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import InfiniteScroll from "react-infinite-scroller";

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
`;

const ScrollContainer = styled("div")`
  height: 100%;
  /* width: 80%; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
`;

const StoryEntry = styled("div")`
  box-sizing: border-box;
  margin: 20px;
  width: 30%;
  background-color: #f7f7f7;
  border-radius: 5px;
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

export default class StoriesPage extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <StoriesContainer>
          <FiltersContainer>
            this is the filters container haha
          </FiltersContainer>
          <QuestionAndResponsesContainer>
            <Questions>
              <div>How has Covid-19 affected you?</div>
              <div>
                What do you think your school, country, or community could have
                done differently regarding this situation?
              </div>
            </Questions>
            <ScrollContainer ref={ref => (this.scrollParentRef = ref)}>
              <InfiniteScroll
                pageStart={0}
                loadMore={() => null}
                hasMore={true || false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                getScrollParent={() => this.scrollParentRef}
              >
                {console.log(data)}
                {data.map(
                  row =>
                    row.testimony != "" && (
                      <StoryEntry>
                        <StoryProfile>
                          {row.major} at {row.school}:
                        </StoryProfile>
                        <StoryResponse>{row.testimony}</StoryResponse>
                      </StoryEntry>
                    )
                )}
              </InfiniteScroll>
            </ScrollContainer>
          </QuestionAndResponsesContainer>
        </StoriesContainer>
      </>
    );
  }
}
