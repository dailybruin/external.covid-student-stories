import React from "react";
import styled from "styled-components";
import { colleges, states, state_abbreviations, countries } from "./data";
import { css } from "emotion";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const desktopSizes = {
  question: "21px",
  comment: "16px",
  choice: "18px",
  short_response: "18px",
  long_response: "14px",
  requirement: "14px",
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
  /* box-sizing: border-box; */
  background-color: white;
  width: 100%;
  max-width: 650px;
  padding: 0 20px;
  padding: 140px 0;
  margin: 50px auto 50px auto;
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
  font-weight: bold;
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
  :focus {
    border-bottom: 2px solid #4185f7;
    margin-bottom: -1px;
  }
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
  line-height: 20px;
  height: 20px;
  > input {
    width: 20px;
    height: 20px;
    margin: 0;
  }
  label > input {
    margin-left: 5px;
    font-size: ${desktopSizes.other_option};
    -webkit-appearance: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #bbb;
  }
  label > input:focus {
    border-bottom: 2px solid #4185f7;
    margin-bottom: -1px;
  }
`;

const SubQuestionRow = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;
  min-height: 50px;
`;

const SubQuestionCell = styled("div")`
  width: 17.5%;
  display: inline-block;
  font-size: ${desktopSizes.choices_header};
  text-align: center;
  input {
    margin: 0;
    width: 20px;
    height: 20px;
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
  padding: 5px;
  :focus {
    border: 2px solid #4185f7;
    margin: -1px;
  }
`;

const MultipleShortResponse = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Field = styled("div")`
  span {
    font-weight: bold;
  }
  width: 30%;
  font-size: ${desktopSizes.short_response};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SEARCHABLE_DROPDOWN = 0;
const SHORT_RESPONSE = 1;
const LONG_RESPONSE = 2;
const MCQ = 3;
const MULTIPLE_MCQ = 4;
const MULTIPLE_SHORT_RESPONSE = 5;

// do not change 'name' entry
const ques = [
  {
    question: "What school do you attend?",
    type: SEARCHABLE_DROPDOWN,
    choices_labels: colleges,
    choices_values: colleges,
    other_option: false,
    comment: "",
    required: true,
    id: 0,
    name: "school",
  },
  {
    question: "What is your major?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment: "If not applicable, put N/A.",
    required: true,
    id: 1,
    name: "major",
  },
  {
    question: "What is your school year?",
    type: MCQ,
    choices: [
      "High School",
      "First Year",
      "Second Year",
      "Third Year",
      "Fourth Year",
      "Grad Student",
    ],
    values: ["HS", "FR", "SO", "JR", "SR", "GR"],
    values: ["HS", "FR", "SO", "JR", "SR", "GR"],
    other_option: false,
    comment: "",
    required: true,
    id: 2,
    name: "year",
  },

  {
    question: "What is your hometown?",
    type: MULTIPLE_SHORT_RESPONSE,
    fields: [
      {
        name: "city",
        title: "City",
        type: SHORT_RESPONSE,
        required: true,
      },
      {
        name: "state",
        title: "(Optional) State",
        type: SEARCHABLE_DROPDOWN,
        required: false,
        options_labels: states,
        options_values: state_abbreviations,
      },
      {
        name: "country",
        title: "(Optional) Country",
        type: SEARCHABLE_DROPDOWN,
        required: false,
        options_labels: countries,
        options_values: countries,
      },
    ],
    other_option: false,
    comment:
      'City, State. If your hometown is not in the USA, type in "City, Country"',
    required: true,
    id: 3,
    name: "hometown",
  },
  {
    question: "(Optional) What is your ethnicity?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment: "",
    required: false,
    id: 4,
    name: "ethnicity",
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
    values: [
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
    name: "currentLocation",
  },
  {
    question: "Have you or someone you know tested positive for COVID-19?",
    type: MCQ,
    choices: ["Yes", "No", "Prefer not to answer"],
    values: ["Y", "N"],
    other_option: false,
    comment: "",
    required: true,
    id: 6,
    name: "knowPositive",
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
    values: ["NW", "SW", "VW", "NA"],
    values: ["NW", "SW", "VW", "NA"],
    values: ["NW", "SW", "VW", "NA"],
    other_option: false,
    subquestions: [
      "Financial status",
      "Housing situation",
      "Academic situation",
      "Your government's response",
      "Physical well-being",
      "Mental/social well-being",
    ],
    subquestion_names: [
      "worryFinancial",
      "worryHousing",
      "worryAcademic",
      "worryGovernment",
      "worryPhysical",
      "worryMental",
    ],
    comment: "",
    required: true,
    id: 7,
  },
  {
    name: "responseAffected",
    question: "(Optional) How has COVID-19 affected you?",
    type: LONG_RESPONSE,
    charLimit: 1000,
    choices: [],
    comment:
      "This is unlike anything we've experienced before. Tell us about anything and everything. How has your life, or the lives of people around you, changed due to the novel coronavirus pandemic? How has the world changed? 1,000 character limit.",
    required: false,
    id: 8,
  },
  {
    name: "responseCommunity",
    question:
      "(Optional) How has your community responded to the Covid-19 pandemic?",
    type: LONG_RESPONSE,
    charLimit: 500,
    choices: [],
    comment:
      "You can tell us about your local officials’ responses to the crisis, how your university addresses social distancing concerns or even how residents of your community have been helping each other through this time. 500 character limit.",
    required: false,
    id: 9,
  },
  {
    name: "responseDoneDifferently",
    question:
      "(Optional) Is there anything you think your school or community could/should have done differently regarding this situation?",
    type: LONG_RESPONSE,
    charLimit: 500,
    choices: [],
    comment: "500 character limit.",
    required: false,
    id: 10,
  },
  {
    question:
      "(Optional) Is there anything we didn't ask that you would like to share?",
    type: LONG_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "Also, feel free to drop any links to photos, videos, or art that could help tell your story.",
    required: false,
    id: 11,
    name: "responseElse",
  },
  {
    question:
      "(Optional) Do you have any photos or videos that you captured that could helps us tell your story? Share the links here.",
    type: LONG_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "Other art forms are welcome and appreciated, too! Just make sure what you're submitting has permissions to be shared and utilized on this platform.",
    required: false,
    id: 12,
    name: "mediaLinks",
  },
  {
    question:
      "(Optional) If you shared art with us, please let us know how to attribute your work!",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "First name, last name, age. If you would like to remain anonymous with your work, let us know here.",
    required: false,
    id: 13,
    name: "artCredit",
  },
  {
    question:
      "Are you comfortable with us publishing your response on our Stories page?",
    type: MCQ,
    choices: ["Yes", "No"],
    values: ["Y", "N"],
    other_option: false,
    comment: "",
    required: true,
    id: 14,
    name: "comfortablePublish",
  },
];
class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseAffected: "",
      responseDoneDifferently: "",
      responseCommunity: "",
    };
  }

  handleChange = (selectedOption) => {
    console.log(selectedOption);
  };
  setValue = (value) => {
    return value;
  };
  getValue = (val) => {
    return val;
  };
  render() {
    const questions = ques.map((question) => {
      const title = <div>{question.question}</div>;
      let type = null;
      if (question.type == SEARCHABLE_DROPDOWN) {
        const optionsList = question.choices_labels.map((option, index) => ({
          label: option,
          value: question.choices_values[index],
        }));
        type = (
          <SearchableDropDown>
            <CreatableSelect
              onChange={this.handleChange}
              options={optionsList}
              placeholder="Select or type your answer..."
              name={question.name}
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
                value={question.values[index]}
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
                name={question.name + "_other"}
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
                  name={question.subquestion_names[rowIndex]}
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
          <>
            <LongResponse
              name={question.name}
              id={question.id}
              placeholder="Your Answer"
              maxLength={`${question.charLimit}`}
              required={question.required}
              onChange={(e) => {
                const val = e.target.value;
                switch (question.name) {
                  case "responseCommunity":
                    this.setState({ responseCommunity: val });
                    break;
                  case "responseDoneDifferently":
                    this.setState({ responseDoneDifferently: val });
                    break;
                  case "responseAffected":
                    this.setState({ responseAffected: val });
                    break;
                }
              }}
            />
            {question.charLimit && (
              <div
                className={css`
                  float: right;
                  font-size: 12px;
                `}
              >
                Chars:{" "}
                {this.state[question.name]
                  ? this.state[question.name].length
                  : 0}{" "}
                / {question.charLimit}
              </div>
            )}
          </>
        );
      } else if (question.type == MULTIPLE_SHORT_RESPONSE) {
        const fields = question.fields.map((field, fieldIndex) => {
          if (field.type == SHORT_RESPONSE) {
            return (
              <Field>
                <span>{field.title + ": "}</span>

                <ShortResponse
                  type="text"
                  name={field.name}
                  id={question.id + "_" + field.name}
                  placeholder="Your Answer"
                  required={field.required}
                />
              </Field>
            );
          } else if (field.type == SEARCHABLE_DROPDOWN) {
            const optionsList = field.options_labels.map((option, index) => ({
              label: option,
              value: field.options_values[index],
            }));
            return (
              <Field>
                <span>{field.title + ": "}</span>
                <SearchableDropDown>
                  <Select
                    onChange={this.handleChange}
                    options={optionsList}
                    placeholder="Select or type..."
                    name={field.name}
                    required={field.required}
                  />
                </SearchableDropDown>
              </Field>
            );
          }
        });
        type = <MultipleShortResponse>{fields}</MultipleShortResponse>;
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
          <br />
          <br />
          <hr />
          <br />
        </Question>
      );
    });
    return (
      <Background>
        <Top>
          <h1>Covid-19 Student Stories</h1>
          <p>
            Before you leave, this will only take a minute! The form consists of
            mostly multiple choice questions with a few optional free responses
            down below.
            <br />
            <br />
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
        <form
          action="https://covidstories.dailybruin.com/stories/create/"
          method="POST"
        >
          {questions}
          <input type="submit" value="Submit" />
        </form>
      </Background>
    );
  }
}

export default FormPage;
