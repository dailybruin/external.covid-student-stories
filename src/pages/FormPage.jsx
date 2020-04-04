import React from "react";
import styled from "styled-components";

const Background = styled("div")`
  background-color: white;
`;

const ques = [
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
    question: "How has COVID-19 affected the way you feel about the following?",
    type: "multiple choice",
    choices: 4,
    answers: [
      "not worried",
      "somewhat worried",
      "very worried",
      "prefer not to share"
    ],
    comment: "",
    requirement: "required",
    id: 6
  },
  {
    question:
      "What do you think your school, country or community could have done differently regarding this situation?",
    type: "free response",
    choices: 0,
    answers: [],
    comment: "",
    requirement: "skippable",
    id: 7
  },
  {
    question: "How has COVID-19 affected you?",
    type: "free response",
    choices: 0,
    answers: [],
    comment: "",
    requirement: "skippable",
    id: 8
  },
  {
    question:
      "Anything else? Feel free to share anything you have on your mind.",
    type: "free response",
    choices: 0,
    answers: [],
    comment:
      "Also, feel free to drop any links to photos, videos, or art that could help tell your story.",
    requirement: "skippable",
    id: 9
  },
  {
    question: [
      "Are you comfortable with us publishing your response on our Stories page?",
      "Are you comfortable with us publishing your response on social media?"
    ],
    type: "free response",
    choices: 2,
    answers: ["yes", "no"],
    comment: "",
    requirement: "required",
    id: 10
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
    if (index < 10) {
      this.setState({ index: index + 1 });
    }
    if (index == 6) {
      this.setState({ category: true });
    }
    console.log(index);
  }
  render() {
    const { index, category, change } = this.state;
    let button, header, qnum, question;
    // circular button handling
    if (index != 10) {
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
    // question number
    if (!category) {
      qnum = index + 1;
    } else {
      qnum = index - 6;
    }
    // question type
    if (ques[this.state.index].type == "free response") {
      question = (
        <form>
          <input type="text" id="q" placeholder="type your answer here" />
        </form>
      );
    } else if (ques[this.state.index].type == "multiple choice") {
    }
    return (
      <Background>
        <h1>{header}</h1>
        <h2>{qnum}</h2>
        <h2>
          <label htmlFor="q">{ques[this.state.index].question}</label>
        </h2>
        {question}
        {button}
      </Background>
    );
  }
}

export default FormPage;
