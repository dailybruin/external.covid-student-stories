import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import InfiniteScroll from "react-infinite-scroller";

const StoriesContainer = styled("div")`
  height: 90vh;
  width: 100%;
  display: flex;
  background-color: lightcoral;
`;

const FiltersContainer = styled("div")`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  background-color: lightblue;
`;

const ScrollContainer = styled("div")`
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const StoryEntry = styled("div")`
  box-sizing: border-box;
  border: 2px solid lightgreen;
  margin: 5px;
  padding: 5px;
`;

export default class StoriesPage extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <StoriesContainer>
          <FiltersContainer></FiltersContainer>
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
                      <b>
                        {row.major} at {row.school}:
                      </b>{" "}
                      {row.testimony}
                    </StoryEntry>
                  )
              )}
            </InfiniteScroll>
          </ScrollContainer>
        </StoriesContainer>
      </>
    );
  }
}
