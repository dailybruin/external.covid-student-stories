import React from "react";
import { css } from "emotion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { SymbolDef, AST_DefClass } from "terser";

/*
fieldName: string
elements: string[]
*/

export default class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selected: ["All"],
    };
  }

  setIcon(category, selected) {
    if (selected.includes(category)) {
      return <IoIosCheckmarkCircle></IoIosCheckmarkCircle>;
    } else {
      return <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>;
    }
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
              >
                {this.setIcon(category, selected)}
                {category}
              </div>
            </div>
          ))}
      </>
    );
  }
}
