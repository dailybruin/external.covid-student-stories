import React from "react";
import { css } from "emotion";
import styled from "styled-components";
import { IoIosSquareOutline } from "react-icons/io";
import { IoIosSquare } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { colleges } from "../pages/data";
import CreatableSelect from "react-select/creatable";

/*
fieldName: string
elements: string[]
*/
const FilterField = styled("div")`
  font-family: "Avenir";
`;

export default class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.column == "school" ? true : false,
      selected: ["All"],
    };
  }

  setIcon(category, selected) {
    if (selected.includes(category)) {
      return <IoIosSquare></IoIosSquare>;
    } else {
      return <IoIosSquareOutline></IoIosSquareOutline>;
    }
  }

  setFilterArrow(filterFieldName, expanded) {
    if (expanded) {
      return <IoIosArrowDown> </IoIosArrowDown>;
    } else {
      return <IoIosArrowForward> </IoIosArrowForward>;
    }
  }

  handleInputChange = (inputValue, actionMeta) => {
    if (!inputValue) {
      this.props.onClick(this.props.column, ["All"]);
      return;
    }
    this.props.onClick(this.props.column, [inputValue.value]);
  };

  render() {
    const { expanded, selected } = this.state;
    const { fieldName, column, categories, onClick } = this.props;
    return (
      <>
        <div
          onClick={() => this.setState({ expanded: !expanded })}
          className={css`
            display: flex;
            cursor: pointer;
          `}
        >
          <div
            className={css`
              padding-right: 10px;
            `}
          >
            {this.setFilterArrow(fieldName, expanded)}
          </div>
          <FilterField>
            <b>{fieldName}</b>
          </FilterField>
        </div>
        {expanded &&
          (column == "school" ? (
            <div
              className={css`
                padding: 5px 0;
                padding-left: 20px;
              `}
            >
              <CreatableSelect
                isClearable
                onChange={this.handleInputChange}
                options={colleges.map((option, index) => ({
                  label: option,
                  value: option,
                }))}
                placeholder="Your college"
              />
            </div>
          ) : (
            categories.map((category, idx) => (
              <div key={idx}>
                <div
                  onClick={() => {
                    if (category === "All") {
                      this.setState({ selected: ["All"] });
                      onClick(column, ["All"]);
                    } else if (!selected.includes(category)) {
                      if (selected.includes("All")) {
                        this.setState({ selected: [category] });
                        onClick(column, [category]);
                      } else {
                        var joined = selected.concat(category);
                        this.setState({ selected: joined });
                        onClick(column, joined);
                      }
                    } else {
                      var newState = selected.filter((x) => x != category);
                      this.setState({ selected: newState });
                      onClick(column, newState);
                    }
                  }}
                  className={css`
                    padding-left: 25px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                  `}
                >
                  <div
                    className={css`
                      padding-right: 10px;
                    `}
                  >
                    {this.setIcon(category, selected)}
                  </div>
                  <div>{category}</div>
                </div>
              </div>
            ))
          ))}
      </>
    );
  }
}
