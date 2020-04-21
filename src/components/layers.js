export const clusterLayer = {
  id: "clusters",
  type: "circle",

  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#F5FCFF",
      10,
      "#DBF3FA",
      20,
      "#B7E9F7",
      30,
      "#92DFF3",
      50,
      "#7AD7F0",
    ],
    "circle-radius": ["step", ["get", "point_count"], 16, 20, 22, 50, 30],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",

  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",

  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#F5FCFF",
    "circle-radius": 5,
    "circle-stroke-width": 0,
    "circle-stroke-color": "#fff",
  },
};
