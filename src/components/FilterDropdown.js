import React from "react";
import { css } from "emotion";

/*
fieldName: string
elements: string[]
*/
export default class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selected: "All",
    };
  }
  render() {
    const { expanded, selected } = this.state;
    const { fieldName, column, categories, onClick } = this.props;
    return (
      <>
        <div onClick={() => this.setState({ expanded: !expanded })}>
          <b>
            {fieldName} ({selected})
          </b>
        </div>
        {expanded &&
          categories.map((category, idx) => (
            <div key={idx}>
              <div
                className={css`
                  color: ${selected == category ? "red" : "black"};
                `}
                onClick={() => {
                  onClick(column, category);
                  this.setState({ selected: category });
                }}
              >
                ---{category}
              </div>
            </div>
          ))}
      </>
    );
  }
}
