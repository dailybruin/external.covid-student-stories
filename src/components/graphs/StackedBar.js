import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { Bar } from "react-chartjs-2";

function StackedBar(props) {
  return (
    <Bar
      data={{
        labels: ["On Campus", "Off Campus", "Home", "Other"],
        datasets: [
          {
            label: "Dataset 1",
            backgroundColor: ["#657778", "#C6D3D5", "#ADC5DF", "#a1afbc"],
            data: [
              props.data.onCampus,
              props.data.offCampus,
              props.data.home,
              props.data.other
            ]
          },
          {
            label: "Dataset 2",
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
        },
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }}
    />
  );
}

export default StackedBar;
