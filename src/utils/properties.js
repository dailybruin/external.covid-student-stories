/*
 * PROPS
 * fieldName: name of field to display in filters bar
 * column: column label in google sheets
 * categories: selections. Note "All" just means show all.
 */
export const filterfieldNames = [
  { fieldName: "School", column: "school", categories: ["All", "UCLA", "USC"] },
  {
    fieldName: "Major",
    column: "major",
    categories: ["All", "CS", "Math", "we should bin these"]
  },
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
      "Graduate"
    ]
  }
];

/*
 * PROPS
 * column: Column label in google sheets.
 * question: Question to display in frontend
 */
export const responseColumns = [
  {
    column: "responseCommunity",
    question: "How has your community responded to the Covid-19 pandemic?"
  },
  {
    column: "responseAffected",
    question: "How has Covid-19 affected you?"
  },
  // {
  //   type: "responseElse",
  //   question: "Is there anything we didn't ask that you would like to share?"
  // },
  {
    column: "responseDoneDifferently",
    question:
      "Is there anything you think your school or community could/should have done differently regarding this situation?"
  }
];
