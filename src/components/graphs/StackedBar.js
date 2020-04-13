import React from "react";
import styled from "styled-components";
import { css } from "emotion";
import { Bar } from "react-chartjs-2";

function StackedBar(props) {
  const green = "green";

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
            backgroundColor: "#5ac476",
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
            backgroundColor: "#F0E68C",
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
            backgroundColor: "#e69595",
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
          fontFamily: "Avenir",
          fontSize: 30,
          fontColor: "#5e6363"
        },
        legend: {
          position: "bottom",
          labels: {
            fontColor: "#5e6363"
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
