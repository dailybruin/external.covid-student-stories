import { MAP_year_to_yearName, swapMap } from "./mappings";

/*
 * This file is used to store utility functions.
 */

export function preprocessSheetsData(rawData) {
  //   let newData = [];
  //   rawData.forEach(element => {
  //     newData.push({
  //       school: element["What school do you attend?"],
  //       major: element["What is your major?"],
  //       doneDifferently:
  //         element[
  //           "What do you think your school, country, or community could have done differently regarding this situation?"
  //         ],
  //       testimony: element["How has Covid-19 affected you?"],
  //       anythingElse:
  //         element[
  //           "Anything else? Feel free to share anything you have on your mind."
  //         ]
  //     });
  //   });
  //   return newData
  return rawData;
}

/*
 * NOTE: used in below function, filterAllowsShow
 *
 * Returns whether a selection (what you click in the filter menu)
 * and a data entry (from the database) match for a given column (from the database).
 * i.e. "Fourth-year+" which you click, is equivalent to "Fourth-year and higher" from the Google Form.
 */
export function selectionMatchesEntry(column, selection, entry) {
  // console.log([selection, entry]);
  if (selection === entry) return true;
  switch (column) {
    case "year":
      if (selection === "Fourth-year+" && entry == "Fourth-year and higher")
        return true;
      if (selection === "Graduate" && entry == "Graduate") return true;
      break;
  }
  return false;
}

/*
 * Returns whether to show a row based on filterState, the current filter state.
 */
export function filterAllowsShow(filterState, row) {
  // this code is terrible
  for (let i = 0; i < filterState.length; i++) {
    let e = filterState[i];
    if (
      e.selection != "All" &&
      !selectionMatchesEntry(e.column, e.selection, row[e.column])
    )
      return false;
  }
  return true;
}

const MAP_SELECTION_YEAR = swapMap(MAP_year_to_yearName);

export function getQueryString(responseSelections) {
  if (!responseSelections) return "";
  let queryString = "";
  console.log(responseSelections);
  const yearObject = responseSelections.find(e => e.column == "year");
  const schoolObject = responseSelections.find(e => e.column == "school");
  console.log(yearObject);
  console.log(schoolObject);
  console.log(schoolObject.selections[0] != "All");

  if (yearObject.selections[0] != "All") {
    console.log("yearobject");
    console.log(yearObject);
    queryString +=
      "year=" +
      yearObject.selections.map(sel => MAP_SELECTION_YEAR[sel]).join("+");
  }

  if (schoolObject.selections[0] != "All") {
    console.log("schoolobject");
    console.log(schoolObject);
    if (queryString != "") {
      queryString += "&";
    }
    queryString += "school=" + schoolObject.selections.join("+");
  }
  console.log(queryString);
  return queryString;
}
