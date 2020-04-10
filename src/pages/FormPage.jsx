import React from "react";
import styled from "styled-components";
import { colleges } from "./colleges";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const desktopSizes = {
  question: "21px",
  comment: "14px",
  choice: "18px",
  short_response: "18px",
  long_response: "14px",
  requirement: "12px",
  choices_header: "18px",
  other_option: "16px",
};

const Top = styled("div")`
  h1 {
    font-size: 40px;
  }
`;

const Title = styled("div")`
  margin-right: 5px;
`;

const Requirement = styled("span")`
  color: red;
  font-size: ${desktopSizes.requirement};
  line-height: 24px;
`;
const Background = styled("div")`
  background-color: white;
  width: 50%;
  margin: auto auto 50px auto;
  font-family: "Roboto";
  hr {
    border: 0.5px solid #ddd;
    margin: 25px auto;
  }
`;

const Question = styled("div")`
  width: 100%;
`;

const Header = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: ${desktopSizes.question};
`;

const Comment = styled("div")`
  font-size: ${desktopSizes.comment};
  margin-top: 3px;
  margin-bottom: 15px;
`;

const SearchableDropDown = styled("div")``;

const ShortResponse = styled("input")`
  font-size: ${desktopSizes.short_response};
  -webkit-appearance: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbb;
`;

const MultipleChoice = styled("div")`
  display: flex;
  flex-direction: column;
  label {
    margin-left: 5px;
  }
`;

const Choice = styled("div")`
  display: flex;
  flex-direction: row;
  margin: 3px 0;
  font-size: ${desktopSizes.choice};
  line-height: 18px;
  height: 18px;
  label > input {
    margin-left: 5px;
    font-size: ${desktopSizes.other_option};
    -webkit-appearance: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #bbb;
  }
`;

const SubQuestionRow = styled("div")`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eee;
  min-height: 50px;
`;

const SubQuestionCell = styled("div")`
  width: 17.5%;
  display: inline-block;
  font-size: ${desktopSizes.choices_header};
  text-align: center;
  input {
    margin: auto;
  }
`;

const SubQuestionHeader = styled("div")`
  width: 30%;
  display: inline-block;
  font-size: ${desktopSizes.choices_header};
`;

const LongResponse = styled("textarea")`
  -webkit-appearance: none;
  outline: none;
  border: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: none;
  width: 100%;
  height: 200px;
  font-size: ${desktopSizes.long_response};
  padding: 2px;
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
    other_option: false,
    comment: "",
    required: true,
    id: 0,
    name: "entry.1220080233",
  },
  {
    question: "What is your major?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment: "If not applicable, put N/A.",
    required: true,
    id: 1,
    name: "entry.1853942599",
  },
  {
    question: "What is your school year?",
    type: MCQ,
    choices: [
      "High School",
      "First Year",
      "Second Year",
      "Third Year",
      "Fourth Year or higher",
      "Grad Student",
    ],
    other_option: false,
    comment: "",
    required: true,
    id: 2,
    name: "entry.839894665",
  },

  {
    question: "What is your hometown?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "The place you grew up. If your hometown is not in the USA, type in 'City, Country'",
    required: true,
    id: 3,
    name: "entry.1167345863",
  },
  {
    question: "What is your ethnicity?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment: "",
    required: false,
    id: 4,
    name: "entry.77328821",
  },
  {
    question: "Where are you staying right now?",
    type: MCQ,
    choices: [
      "School (On-campus)",
      "School (Off-campus)",
      "Home",
      "Friend's place",
      "Prefer not to answer",
    ],
    other_option: true,
    comment: "",
    required: true,
    id: 5,
    name: "entry.342592833",
  },
  {
    question: "Have you or someone you know tested positive for COVID-19?",
    type: MCQ,
    choices: ["Yes", "No", "Prefer not to answer"],
    other_option: false,
    comment: "",
    required: true,
    id: 5,
    name: "entry.342592833",
  },
  {
    question: "How has COVID-19 affected the way you feel about the following?",
    type: MULTIPLE_MCQ,
    choices: [
      "Not worried",
      "Somewhat worried",
      "Very worried",
      "Prefer not to share",
    ],
    values: ["NW", "SW", "VW", "Prefer not to share"],
    other_option: false,
    subquestions: [
      "Financial status",
      "Housing situation",
      "Academic situation",
      "Your government's response",
      "Physical well-being",
      "Mental/social well-being",
    ],
    comment: "",
    required: true,
    id: 6,
  },
  {
    question:
      "What do you think your school, country or community could have done differently regarding this situation?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "",
    required: false,
    id: 7,
  },
  {
    question: "How has COVID-19 affected you?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "",
    required: false,
    id: 8,
  },
  {
    question:
      "Anything else? Feel free to share anything you have on your mind.",
    type: LONG_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "Also, feel free to drop any links to photos, videos, or art that could help tell your story.",
    required: false,
    id: 9,
  },
  {
    question:
      "Are you comfortable with us publishing your response on our Stories page?",
    type: MCQ,
    choices: ["Yes", "No"],
    other_option: false,
    comment: "",
    required: true,
    id: 10,
  },
  {
    question:
      "Are you comfortable with us publishing your response on social media?",
    type: MCQ,
    choices: ["Yes", "No"],
    other_option: false,
    comment: "",
    required: true,
    id: 10,
  },
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
      college: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ college: selectedOption.value });
    console.log(`Option selected:`, selectedOption, this.state.college);
  };
  render() {
    const questions = ques.map((question) => {
      const title = <div>{question.question}</div>;
      let type = null;
      if (question.type == SEARCHABLE_DROPDOWN) {
        const optionsList = question.choices.map((option) => ({
          value: option,
          label: option,
        }));
        type = (
          <SearchableDropDown>
            <CreatableSelect
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              options={optionsList}
            />
            <input
              type="hidden"
              name={question.name}
              value={this.state.college}
              required={question.required}
            />
          </SearchableDropDown>
        );
      } else if (question.type == SHORT_RESPONSE) {
        type = (
          <ShortResponse
            type="text"
            name={question.name}
            id={question.id}
            placeholder="Your Answer"
            required={question.required}
          />
        );
      } else if (question.type == MCQ) {
        const choices = question.choices.map((choice, index) => {
          const choiceId = question.id + "_choice_" + index;
          return (
            <Choice>
              <input
                type="radio"
                id={choiceId}
                name={question.name}
                value={choice}
                required={question.required}
              />
              <label for={choiceId}>{choice}</label>
            </Choice>
          );
        });
        const other_choice = !question.other_option ? null : (
          <Choice>
            <input
              type="radio"
              id={question.id + "_other_option"}
              name={question.name}
              value=""
              required={question.required}
            />
            <label for={question.id + "_other_option"}>
              Other:
              <input
                type="text"
                name={question.name}
                id={question.name + "_other"}
                placeholder="Your Answer"
              />
            </label>
          </Choice>
        );
        type = (
          <MultipleChoice>
            {choices}
            {other_choice}
          </MultipleChoice>
        );
      } else if (question.type == MULTIPLE_MCQ) {
        const choices = question.choices.map((choice) => {
          return <SubQuestionCell>{choice}</SubQuestionCell>;
        });
        const choicesRow = (
          <SubQuestionRow>
            <SubQuestionHeader />
            {choices}
          </SubQuestionRow>
        );
        const rows = question.subquestions.map((subquestion, rowIndex) => {
          const inputs = question.choices.map((choice, choiceIndex) => {
            const choiceId =
              question.id + "_choice_" + rowIndex + "_" + choiceIndex;
            return (
              <SubQuestionCell>
                <input
                  type="radio"
                  id={choiceId}
                  name={question.name + "_" + rowIndex}
                  value={question.values[choiceIndex]}
                  required={question.required}
                />
              </SubQuestionCell>
            );
          });
          return (
            <SubQuestionRow>
              <SubQuestionHeader>{subquestion}</SubQuestionHeader>
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
      } else if (question.type == LONG_RESPONSE) {
        type = (
          <LongResponse
            name={question.name}
            id={question.id}
            placeholder="Your Answer"
            maxlength={2000}
            required={question.required}
          />
        );
      }

      return (
        <Question id={question.id}>
          <Header>
            <Title>{title}</Title>
            <Requirement>{question.required ? " *Required" : null}</Requirement>
          </Header>
          {question.comment != "" ? (
            <Comment>{question.comment}</Comment>
          ) : (
            <Comment></Comment>
          )}
          {type}
          <hr />
        </Question>
      );
    });
    return (
      <Background>
        <Top>
          <h1>Covid-19 Student Stories</h1>
          <p>
            The Daily Bruin is collecting student stories related to the
            Covid-19 pandemic to help students learn more about each others'
            experiences.
            <br />
            <br />
            Leave a response below to share your stories with us and let others
            know how you are doing.
          </p>
        </Top>
        <hr />
        <form>
          {questions}
          <input type="submit" value="Submit" />
        </form>
      </Background>
    );
  }
}

export default FormPage;
