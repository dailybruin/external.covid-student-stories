import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { Bar } from "react-chartjs-2";

function StackedBar(props) {
  return (
    <Bar
      data={{
        labels: [
          "Finances",
          "Housing",
          "Academics",
          "Physical Health",
          "Mental Health"
        ],
        datasets: [
          {
            label: "Not worried",
            backgroundColor: [
              "#657778",
              "#657778",
              "#657778",
              "#657778",
              "#657778"
            ],
            data: [
              props.data.finance["Not worried"],
              props.data.housing["Not worried"],
              props.data.academic["Not worried"],
              props.data.physical["Not worried"],
              props.data.mental["Not worried"]
            ]
          },
          {
            label: "Somewhat worried",
            backgroundColor: [
              "#a1afbc",
              "#a1afbc",
              "#a1afbc",
              "#a1afbc",
              "#a1afbc"
            ],
            data: [
              props.data.finance["Somwhat worried"],
              props.data.housing["Somewhat worried"],
              props.data.academic["Somewhat worried"],
              props.data.physical["Somewhat worried"],
              props.data.mental["Somewhat worried"]
            ]
          },
          {
            label: "Very worried",
            backgroundColor: [
              "#D0D8D9",
              "#D0D8D9",
              "#D0D8D9",
              "#D0D8D9",
              "#D0D8D9"
            ],
            data: [
              props.data.finance["Very Worried"],
              props.data.housing["Very Worried"],
              props.data.academic["Very Worried"],
              props.data.physical["Very Worried"],
              props.data.mental["Very Worried"]
            ]
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "How are students feeling?",
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
