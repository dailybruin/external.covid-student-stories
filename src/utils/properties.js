import like from "../images/thumbs-up.png";
import love from "../images/love.png";
import haha from "../images/haha.png";
import wow from "../images/waow.png";
import sad from "../images/big-simp.png";
import angry from "../images/amgery.png";

/*
 * PROPS
 * fieldName: name of field to display in filters bar
 * column: column label in google sheets
 * categories: selections. Note "All" just means show all.
 */
export const filterfieldNames = [
  { fieldName: "School", column: "school", categories: ["All", "UCLA", "USC"] },
  // {
  //   fieldName: "Major",
  //   column: "major",
  //   categories: ["All", "CS", "Math", "we should bin these"]
  // },
  {
    fieldName: "Year",
    column: "year",
    categories: [
      "All",
      "High School",
      "First-year",
      "Second-year",
      "Third-year",
      "Fourth-year+",
      "Graduate",
    ],
  },
  // {
  //   fieldName: "Hometown",
  //   column: "home",
  //   categories: ["All", "California", "Out of State", "International"],
  // },
];

/*
 * PROPS
 * column: Column label in google sheets.
 * question: Question to display in frontend
 */
export const responseColumns = [
  {
    column: "responseAffected",
    question: "How has COVID-19 affected you?",
  },
  {
    column: "responseCommunity",
    question: "How has your community responded to the COVID-19 pandemic?",
  },
  {
    column: "responseDoneDifferently",
    question:
      "Is there anything you think your school or community could/should have done differently regarding this situation?",
  },
  // {
  //   type: "responseElse",
  //   question: "Is there anything we didn't ask that you would like to share?"
  // },
];

export const sortOptions = [
  { value: 0, label: "latest" },
  { value: 1, label: "top" },
  { value: 2, label: "hot" },
];

export const reactSortOptions = [
  { value: 3, label: "like", img: like },
  { value: 1, label: "love", img: love },
  { value: 2, label: "sad", img: sad },
  { value: 4, label: "angry", img: angry },
];
