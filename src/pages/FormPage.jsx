import React from "react";
import styled from "styled-components";

const FormContainer = styled("div")`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 300px;
`;
class FormPage extends React.Component {
  render() {
    return (
      <FormContainer>
        FORM
        <input></input>
        <button>button</button>
        <input></input>
        <button>button</button>
        <button>button</button>
        <button>button</button>
        <input></input>
        <input></input>
        <button>button</button>
        <button>button</button>
        <button>button</button>
      </FormContainer>
    );
  }
}

export default FormPage;
