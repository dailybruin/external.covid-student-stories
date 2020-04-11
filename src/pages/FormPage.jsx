import React from "react";
import styled from "styled-components";
<<<<<<< HEAD
import { colleges, countries, states } from './data';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
=======
import { colleges } from "./colleges";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
>>>>>>> master

const SHEET_ID = '1QmoG1FXzcZW5NDrzsMrflLf5_zNirHNqdNI_ObV1IKk';
const ACCESS_TOKEN = 'ya29.a0Ae4lvC3uXEjYz7fzrMq8V3ChwsktBVOzfDuPDokD60TSsX7itPZaEDOoyFq5H7fhvyRgr7oxfhJ7rlaLR3ExyyieUTOTZkAFHNMopOXGLU8PNT4qOW1R_0COU5Yadh89KGJgEJdoWg61lhvUl54i8H7XVxmM_jf1wz4';


const desktopSizes = {
<<<<<<< HEAD
  question: '21px',
  comment: "16px",
=======
  question: "21px",
  comment: "14px",
>>>>>>> master
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
  background-color: white;
  width: 50%;
  margin: auto auto 50px auto;
  font-family: "Avenir";
  input {
    font-family: "Avenir";
  }
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
  font-size: ${desktopSizes.long_response};;
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
    choices: colleges,
    other_option: false,
    comment: "",
    required: true,
    id: 0,
<<<<<<< HEAD
    name: "school"
=======
    name: "entry.1220080233",
>>>>>>> master
  },
  {
    question: "What is your major?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment: "If not applicable, put N/A.",
    required: true,
    id: 1,
<<<<<<< HEAD
    name: "major"
=======
    name: "entry.1853942599",
>>>>>>> master
  },
  {
    question: "What is your school year?",
    type: MCQ,
    choices: [
      "High School",
<<<<<<< HEAD
      "Freshman",
      "Sophomore",
      "Junior",
      "Senior",
      "Grad Student"
=======
      "First Year",
      "Second Year",
      "Third Year",
      "Fourth Year or higher",
      "Grad Student",
>>>>>>> master
    ],
    values: [
      "HS",
      "FR",
      "SO",
      "JR",
      "SR",
      "GR"
    ],
    other_option: false,
    comment: "",
    required: true,
    id: 2,
<<<<<<< HEAD
    name: "year"
=======
    name: "entry.839894665",
>>>>>>> master
  },

  {
    question: "What is your hometown?",
    type: MULTIPLE_SHORT_RESPONSE,
    fields: [
      {
        name:'city',
        title: "City",
        type: SHORT_RESPONSE,
        required: true,
      },
      {
        name:'state',
        title: "State",
        type: SEARCHABLE_DROPDOWN,
        required: false,
        options: states
      },
      {
        name:'country',
        title: "Country",
        type: SEARCHABLE_DROPDOWN,
        required: false,
        options: countries
      }
    ],
    other_option: false,
    comment:
      "City, State. If your hometown is not in the USA, type in \"City, Country\"",
    required: false,
    id: 3,
<<<<<<< HEAD
    name: "hometown"
=======
    name: "entry.1167345863",
>>>>>>> master
  },
  {
    question: "What is your ethnicity?",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment: "",
    required: false,
    id: 4,
<<<<<<< HEAD
    name: "ethnicity"
=======
    name: "entry.77328821",
>>>>>>> master
  },
  {
    question: "Where are you staying right now?",
    type: MCQ,
<<<<<<< HEAD
    choices: ["School (On-campus)", "School (Off-campus)", "Home", "Friend's place", "Prefer not to answer"],
    values: ["School (On-campus)", "School (Off-campus)", "Home", "Friend's place", "Prefer not to answer"],
=======
    choices: [
      "School (On-campus)",
      "School (Off-campus)",
      "Home",
      "Friend's place",
      "Prefer not to answer",
    ],
>>>>>>> master
    other_option: true,
    comment: "",
    required: true,
    id: 5,
<<<<<<< HEAD
    name: "currentLocation"
=======
    name: "entry.342592833",
>>>>>>> master
  },
  {
    question: "Have you or someone you know tested positive for COVID-19?",
    type: MCQ,
    choices: ["Yes", "No", "Prefer not to answer"],
    values: ["Y", "N"],
    other_option: false,
    comment: "",
    required: true,
<<<<<<< HEAD
    id: 6,
    name: "knowPositive"
=======
    id: 5,
    name: "entry.342592833",
>>>>>>> master
  },
  {
    question: "How has COVID-19 affected the way you feel about the following?",
    type: MULTIPLE_MCQ,
    choices: [
      "Not worried",
      "Somewhat worried",
      "Very worried",
<<<<<<< HEAD
      "Prefer not to share"
    ],
    values: [
      "NW",
      "SW",
      "VW",
      "NA"
=======
      "Prefer not to share",
>>>>>>> master
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
    subquestion_names: [
      'worryFinancial',
      'worryHousing',
      'worryAcademic',
      'worryGovernment',
      'worryPhysical',
      'worryMental'
    ],
    comment: "",
    required: true,
<<<<<<< HEAD
    id: 7
=======
    id: 6,
>>>>>>> master
  },
  {
    question:
      "How has your community responded to the Covid-19 pandemic?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "You can tell us about your local officials’ responses to the crisis, how your university addresses social distancing concerns or even how residents of your community have been helping each other through this time. 2,000 character limit",
    required: false,
<<<<<<< HEAD
    id: 8
  },
  {
    question:
      "Is there anything you think your school or community could/should have done differently regarding this situation?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "2,000 character limit",
    required: false,
    id: 9
=======
    id: 7,
>>>>>>> master
  },
  {
    question: "How has COVID-19 affected you?",
    type: LONG_RESPONSE,
    choices: [],
    comment: "This is unlike anything we've experienced before. Tell us about anything and everything. How has your life, or the lives of people around you, changed due to the novel coronavirus pandemic? How has the world changed? 2,000 character limit",
    required: false,
<<<<<<< HEAD
    id: 10
=======
    id: 8,
>>>>>>> master
  },
  {
    question:
      "Is there anything we didn't ask that you would like to share?",
    type: LONG_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "Also, feel free to drop any links to photos, videos, or art that could help tell your story.",
    required: false,
<<<<<<< HEAD
    id: 11
  },
  {
    question:
      "Do you have any photos or videos that you captured that could helps us tell your story? Share the links here.",
    type: LONG_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "Other art forms are welcome and appreciated, too! Just make sure what you're submitting has permissions to be shared and utilized on this platform.",
    required: false,
    id: 12
  },
  {
    question:
      "If you shared art with us, please let us know how to attribute your work!",
    type: SHORT_RESPONSE,
    choices: [],
    other_option: false,
    comment:
      "First name, last name, age. If you would like to remain anonymous with your work, let us know here.",
    required: false,
    id: 13
  },
  {
    question: "Are you comfortable with us publishing your response on our Stories page?",
=======
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
>>>>>>> master
    type: MCQ,
    choices: ["Yes", "No"],
    values: ["Y", "N"],
    other_option: false,
    comment: "",
    required: true,
<<<<<<< HEAD
    id: 14
  }
=======
    id: 10,
  },
>>>>>>> master
];
class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      college: null,
      city: null,
      state: null,
      country: null
=======
      index: 0,
      category: false,
      change: false,
      college: null,
>>>>>>> master
    };
  }

  updateSheet = () => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //update this token with yours. 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          repeatCell: {
            range: {
              startColumnIndex: 0,
              endColumnIndex: 1,
              startRowIndex: 0,
              endRowIndex: 1,
              sheetId: 0
            },
            cell: {
              userEnteredValue: {
                "numberValue": 10
              },
            },
            fields: "*"
          }
        }]

      })
    })
  };

  handleChange = (selectedOption) => {
<<<<<<< HEAD
    this.setState({college : selectedOption.value});
=======
    this.setState({ college: selectedOption.value });
    console.log(`Option selected:`, selectedOption, this.state.college);
>>>>>>> master
  };
  getValue = (val) => {
    return val;
  }
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
<<<<<<< HEAD
              <input type="radio" id={choiceId} name={question.name} value={question.values[index]} required={question.required}/>
=======
              <input
                type="radio"
                id={choiceId}
                name={question.name}
                value={choice}
                required={question.required}
              />
>>>>>>> master
              <label for={choiceId}>{choice}</label>
            </Choice>
          );
        });
        const other_choice = !question.other_option ? null : (
          <Choice>
<<<<<<< HEAD
              <input type="radio" id={question.id + '_other_option'} name={question.name} value="" required={question.required}/>
              <label for={question.id + '_other_option'}>
                Other: 
                <input type="text" name={question.name+'_other'} id={question.name+'_other'} placeholder='Your Answer'/>
              </label>
=======
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
>>>>>>> master
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
<<<<<<< HEAD
                <input type="radio" id={choiceId} name={question.subquestion_names[rowIndex]} value={question.values[choiceIndex]} required={question.required} />
=======
                <input
                  type="radio"
                  id={choiceId}
                  name={question.name + "_" + rowIndex}
                  value={question.values[choiceIndex]}
                  required={question.required}
                />
>>>>>>> master
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
      else if (question.type == MULTIPLE_SHORT_RESPONSE)
      {
        const fields = question.fields.map((field, fieldIndex) => {
          if (field.type == SHORT_RESPONSE)
          {
            return (
              <Field>
                <span>{field.title + ": "}</span>
                <ShortResponse type="text" name={field.name} id={question.id+'_'+field.name} placeholder='Your Answer' required={field.required}/>
              </Field>
            );
          }
          else if (field.type == SEARCHABLE_DROPDOWN)
          {
            return (
              <Field>
                <span>{field.title + ": "}</span>
                <SearchableDropDown>
                  <Select
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    options={field.options}
                  />
                  <input type="hidden" name={field.name} required={field.required} />
                </SearchableDropDown>
              </Field>
            );
          }
        });
        type = (
          <MultipleShortResponse>
            {fields}
          </MultipleShortResponse>
        )
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
<<<<<<< HEAD
        <hr/>
        <form onSubmit={this.updateSheet()}>
=======
        <hr />
        <form>
>>>>>>> master
          {questions}
          <input type="submit" value="Submit" />
        </form>
      </Background>
    );
  }
}

export default FormPage;
