import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import FilterDropdown from "../components/FilterDropdown";
import ReactList from "react-list";

const StoriesContainer = styled("div")`
  height: 90vh;
  width: 100%;
  display: flex;
  background-color: #93A3A4;
`;

const FiltersContainer = styled("div")`
height: 100%;
width: 20%;
display: flex;
flex-direction: column;
box-sizing: border-box;
padding: 30px;
line-height: 30px;
cursor: pointer;
`;

const ScrollContainer = styled("div")`
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  background-color: #636F71;
  text-align: center;
  padding: 30px;

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
export default class DataPage extends React.Component {
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
    var count = 0;
    for(var i = 0; i < data.length; i++){
      console.log(data[i].comfortablePublish);
      if(data[i].knowPositive === "Yes")
        count += 1;
    }

    return (
      <>
        <StoriesContainer>
          <FiltersContainer>
            {filterFields.map(element => (
              <FilterDropdown {...element} onClick={this.onFilterClick} />
            ))}
          </FiltersContainer>
          <ScrollContainer>
            <div>

            </div>
            <div style={{ height: "100%", overflow: "auto" }}>
            <NumberContainer>
              <div style={{fontSize: 100, fontWeight: "bold"}}> {count} </div>
              students know someone who has tested positive for Covid-19
            </NumberContainer>
            </div>
          </ScrollContainer>
        </StoriesContainer>
      </>
    );
  }
}
