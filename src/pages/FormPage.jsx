import React from "react";
import styled from "styled-components";
import { colleges } from './colleges';
import Select from 'react-select';


const Background = styled("div")`
  background-color: white;
  width: 80%;
`;

const Question = styled("div")`
  margin: 20px auto;
  width: 100%;
`;

const Header = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 30px;
`;

const Comment = styled("div")`
  font-size: 24px;
`;

const SearchableDropDown = styled("div")`

`;

const OptionsList = styled("datalist")`
  height: 100px;
`;

const ShortResponse = styled("input")`

`;

const MultipleChoice = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Choice = styled("div")`
  display: flex;
  flex-direction: row;
`;

const SubQuestionRow = styled("div")`
  display: flex;
  flex-direction: row;
`;

const SubQuestionCell = styled("div")`
  width: 25%;
  display: inline-block;
`;

const LongResponse = styled("textarea")`

`;

const SEARCHABLE_DROPDOWN = 0;
const SHORT_RESPONSE = 1;
const LONG_RESPONSE = 2;
const MCQ = 3;
const MULTIPLE_MCQ = 4;

// do not change 'name' entry
const ques = [
  {
    question: "What school do you attend?",
    type: SEARCHABLE_DROPDOWN,
    choices: colleges,
    comment: "",
    required: true,
    id: 0,
    name: "entry.1220080233"
  },
  {
    question: "What is your major?",
    type: SHORT_RESPONSE,
    choices: [],
    comment: "",
    required: true,
    id: 1,
    name: "entry.1853942599"
  },
  {
    question: "What is your school year?",
    type: MCQ,
    choices: [
      "High School",
      "Freshman",
      "Sophomore",
      "Junior",
      "Senior",
      "Grad Student"
    ],
    comment: "",
    required: true,
    id: 2,
    name: "entry.839894665"
  },

  {
    question: "What is your hometown?",
    type: SHORT_RESPONSE,
    choices: [],
    comment:
      "The place you grew up. If your hometown is not in the USA, type in (City, Country)",
    required: true,
    id: 3,
    name: "entry.1167345863"
  },
  {
    question: "What is your ethnicity?",
    type: SHORT_RESPONSE,
    choices: [],
    comment: '',
    required: false,
    id: 4,
    name: "entry.77328821"
  },
  {
    question: "Have you or someone you know tested positive for COVID-19?",
    type: MCQ,
    choices: ["Yes", "No"],
    comment: "",
    required: true,
    id: 5,
    name: "entry.342592833"
  },
  {
    question: "How has COVID-19 affected the way you feel about the following?",
    type: MULTIPLE_MCQ,
    choices: [
      "Not worried",
      "Somewhat worried",
      "Very worried",
      "Prefer not to share"
    ],
    subquestions: [
      "Financial status",
      "Housing situation",
      "Academic situation",
      "Your government's response",
      "Physical well-being",
      "Mental/social well-being"
    ],
    comment: "",
    required: true,
    id: 6
  },
  {
    question:
      "What do you think your school, country or community could have done differently regarding this situation?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "",
    required: false,
    id: 7
  },
  {
    question: "How has COVID-19 affected you?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "",
    required: false,
    id: 8
  },
  {
    question:
      "Anything else? Feel free to share anything you have on your mind.",
    type: LONG_RESPONSE,
    choices: [],
    comment:
      "Also, feel free to drop any links to photos, videos, or art that could help tell your story.",
    required: false,
    id: 9
  },
  {
    question: "Are you comfortable with us publishing your response on our Stories page?",
    type: MCQ,
    choices: ["Yes", "No"],
    comment: "",
    required: true,
    id: 10
  },
  {
    question: "Are you comfortable with us publishing your response on social media?",
    type: MCQ,
    choices: ["Yes", "No"],
    comment: "",
    required: true,
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
      change: false,
      college: null
    };
  }

  handleChange = (selectedOption) => {
    this.setState({college : selectedOption.value});
    console.log(`Option selected:`, selectedOption, this.state.college);
  };
  render() {
    const questions = ques.map((question) => {
      const title = (
        <div>{question.question}</div>
      );
      let type = null;
      if (question.type == SEARCHABLE_DROPDOWN)
      {
        const optionsList = question.choices.map((option) => ({value: option, label: option}));
        type = (
          <SearchableDropDown>
            <Select
              onChange={this.handleChange}
              options={optionsList}
            />
            <input type="hidden" name={question.name} value={this.state.college} />
          </SearchableDropDown>
        );
      }
      else if (question.type == SHORT_RESPONSE)
      {
        type = (
          <ShortResponse type="text" name={question.name} id={question.id}/>
        );
      }
      else if (question.type == MCQ)
      {
        const choices = question.choices.map((choice, index) => {
          const choiceId = question.id + "_choice_" + index;
          return (
            <Choice>
              <input type="radio" id={choiceId} name={question.name} value={choice}/>
              <label for={choiceId}>{choice}</label>
            </Choice>
          );
        });
        type = (
          <MultipleChoice>
            {choices}
          </MultipleChoice>
        );
      }
      else if (question.type == MULTIPLE_MCQ)
      {
        const choices = question.choices.map((choice) => {
          return (
            <SubQuestionCell>{choice}</SubQuestionCell>
          );
        });
        const choicesRow = (
          <SubQuestionRow>
            <SubQuestionCell/>
            {choices}
          </SubQuestionRow>
        );
        const rows = question.subquestions.map((subquestion, rowIndex) => {
          const inputs = question.choices.map((choice, choiceIndex) => {
            const choiceId = question.id + "_choice_" + rowIndex + '_' + choiceIndex;
            return (
              <SubQuestionCell>
                <input type="radio" id={choiceId} name={question.name + "_" + rowIndex} value={choice}/>
              </SubQuestionCell>
            );
          });
          return (
            <SubQuestionRow>
              <SubQuestionCell>{subquestion}</SubQuestionCell>
              {inputs}
            </SubQuestionRow>
          );
        });

        type = (
          <MultipleChoice>
            {choicesRow}
            {rows}
          </MultipleChoice>
        );
      }
      else if (question.type == LONG_RESPONSE)
      {
        type = (
          <LongResponse name={question.name} id={question.id}/>
        );
      }

      return (
        <Question id={question.id}>
          <Header>
            {title}
            {question.required ? ' * Required' : null}
          </Header>
          {question.comment != "" ? <Comment>{question.comment}</Comment> : null}
          {type}
        </Question>
      )
    });
    return (
      <Background>
        <form>
          {questions}
          <input type="submit" value="Submit"/>
        </form>
      </Background>
    );
  }
}

export default FormPage;
