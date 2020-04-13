import React, { useState, useEffect } from "react";
import { css } from "emotion";

export const ReactSortSelect = (props) => {
  const [selected, setSelected] = useState({ value: 0, label: "none" });

  function onClick(val) {
    if (selected == val) {
      setSelected({ value: 0, label: "none" });
      props.onChange({ value: 0, label: "none" });
    } else {
      setSelected(val);
      props.onChange(val);
    }
  }
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
      `}
    >
      {props.options.map((opt) => (
        <div
          className={css`
            padding: 3px;
            ${!(selected == opt) && "filter: brightness(70%)"};
          `}
        >
          <img
            onClick={() => onClick(opt)}
            src={opt.img}
            className={css`
              height: 25px;
              width: 25px;
              cursor: pointer;
            `}
          />
        </div>
      ))}
    </div>
  );
};

export const SortSelect = (props) => {
  const [selected, setSelected] = useState({ value: 0, label: "latest" });

  function onClick(val) {
    setSelected(val);
    props.onChange(val);
  }
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
      `}
    >
      {props.options.map((opt) => (
        <div
          className={css`
            padding: 0 5px;
          `}
        >
          <div
            onClick={() => onClick(opt)}
            className={css`
              cursor: pointer;
              ${selected.label == opt.label &&
              "text-shadow: 1px 0 0 currentColor;"}
            `}
          >
            {opt.label}
          </div>
        </div>
      ))}
    </div>
  );
};
