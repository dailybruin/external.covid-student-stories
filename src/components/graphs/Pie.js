import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { Pie } from "react-chartjs-2";

function PieChart(props) {
  return (
    <Pie
      data={{
        labels: ["On Campus", "Off Campus", "Home", "Other"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: ["#657778", "#C6D3D5", "#ADC5DF", "#a1afbc"],
            data: [
              props.data.onCampus,
              props.data.offCampus,
              props.data.home,
              props.data.other
            ]
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Where are students?",
          fontFamily: "Calibri",
          fontSize: 30,
          fontColor: "white"
        },
        legend: {
          position: "bottom",
          labels: {
            fontColor: "white"
          }
        }
      }}
    />
  );
}

export default PieChart;
