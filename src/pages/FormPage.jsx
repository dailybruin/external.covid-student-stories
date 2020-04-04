import React from "react";
import styled from "styled-components";

const Background = styled("div")`
  background-color: white;
`;

const basic_ques = [
  {
    question: "What school do you attend?",
    type: "free response",
    choices: 0,
    answers: [],
    comment: "",
    requirement: "required",
    id: 0
  },
  {
    question: "What is your major?",
    type: "free response",
    choices: 0,
    answers: [],
    comment: "",
    requirement: "required",
    id: 1
  },
  {
    question: "What is your school year?",
    type: "multiple choice",
    choices: 6,
    answers: [
      "high school",
      "freshman",
      "sophomore",
      "junior",
      "senior",
      "grad student"
    ],
    comment: "",
    requirement: "required",
    id: 2
  },

  {
    question: "What is your hometown?",
    type: "free response",
    choices: 0,
    answers: [],
    comment:
      "The place you grew up. If your hometown is not in the USA, type in (City, Country)",
    requirement: "required",
    id: 3
  },
  {
    question: "What is your ethnicity?",
    type: "free response",
    choices: 0,
    answers: [],
    comment: "(optional)",
    requirement: "not required",
    id: 4
  },
  {
    question: "Have you or someone you know tested positive for COIVD-19?",
    type: "multiple choice",
    choices: 2,
    answers: ["yes", "no"],
    comment: "",
    requirement: "required",
    id: 5
  },
  {
    question:
      "Have has COVID-19 affected the way you feel about the following?",
    type: "multiple choice",
    choices: 4,
    answers: [
      "not worried",
      "somewhat worried",
      "very worried",
      "prefer not to share"
    ],
    id: 6
  }
];
class FormPage extends React.Component {
  constructor(props) {
    super(props);
    // category: false = the basics
    // category: true = tell us more
    this.state = {
      index: 0,
      category: false,
      change: false
    };
  }
  incIndex() {
    const { index, category, change } = this.state;
    this.setState({ index: index + 1 });
    if (index >= 6) {
      this.setState({ category: true });
    }
  }
  render() {
    const { index, category, change } = this.state;
    let button, header;
    // circular button handling
    if (!change) {
      button = <button onClick={() => this.incIndex()}>NEXT</button>;
    } else {
      button = <button>FINISH</button>;
    }
    // category
    if (!category) {
      header = "the basics";
    } else {
      header = "tell us more";
    }
    return (
      <Background>
        <h1>{header}</h1>
        <h2>{basic_ques[this.state.index].question}</h2>
        {button}
      </Background>
    );
  }
}

export default FormPage;
