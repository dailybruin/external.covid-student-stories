import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import ReactList from "react-list";

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
export default class StoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFields: filterFields.map((element, key) => ({
        field: element.field,
        selection: "All",
        key: key
      }))
    };
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(field, selection) {
    let newSelectedFields = this.state.selectedFields;
    let selectedField = newSelectedFields.find(
      element => element.field == field
    );
    selectedField.selection = selection;
    this.setState({ selectedFields: newSelectedFields });
  }

  render() {
    let { data } = this.props;
    const { selectedFields } = this.state;
    data = data.filter(row => showData(selectedFields, row));
    return (
      <>
        <StoriesContainer>
          <FiltersContainer>
            {filterFields.map(element => (
              <FilterDropdown {...element} onClick={this.onFilterClick} />
            ))}
          </FiltersContainer>
        
         <QuestionAndResponsesContainer>
            <Questions>
              <div>How has Covid-19 affected you?</div>
              <div>
                What do you think your school, country, or community could have
                done differently regarding this situation?
              </div>
            </Questions>
            <ScrollContainer>
              <div style={{ height: "100%", overflow: "auto" }}>
                <ReactList
                  axis="y"
                  threshold={50}
                  length={data.length}
                  itemRenderer={idx => {
                    let row = data[idx];
                    return (
                      <StoryEntry>
                        <b>
                          {row.major} at {row.school}:
                        </b>{" "}
                        {console.log(row)}
                        {row.testimony}
                      </StoryEntry>
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
