/*
 * This file is used to store maps.
 */

export const MAP_year_to_yearName = {
  HS: "High School",
  FR: "First-year",
  SO: "Second-year",
  JR: "Third-year",
  SR: "Fourth-year+",
  GR: "Graduate",
};

/*
 * swaps keys with values
 */
export function swapMap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

export const MAP_reaction_to_label = ["none", "love", "sad", "like", "angry"];

export const MAP_sort_to_label = ["latest", "top", "hot"];
