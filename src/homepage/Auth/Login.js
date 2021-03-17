import React, { Component } from "react";
import styled from "styled-components";
import DynamicInput from "../../pack/DynamicInput.elem";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  _handleUpdate = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Form>
        <Title>Login</Title>
        <FieldWrapper>
          <DynamicInput
            inputType="text"
            inputName="email"
            inputValue={email}
            inputPlaceholder="Email"
            fontSize="18"
            handleUpdate={this._handleUpdate}
            inputWidth="100%"
            underlineWidth="100%"
            alwaysShowUnderline
          />
        </FieldWrapper>

        <FieldWrapper>
          <DynamicInput
            inputType="password"
            inputName="password"
            inputValue={password}
            inputPlaceholder="Password"
            fontSize="18"
            handleUpdate={this._handleUpdate}
            underlineWidth="100%"
            inputWidth="100%"
            alwaysShowUnderline
          />
        </FieldWrapper>

        <Button>Sign In</Button>
        <Link to="/register">
          <RedirectText>Don't have an account? Sign Up instead.</RedirectText>
        </Link>
      </Form>
    );
  }
}

const Title = styled.h1`
  font-family: Alata;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  margin: 5px 0px 0px 0px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  border-radius: 5px;
  box-shadow: 2px 1px 5px gray;
  background-color: white;
  padding: 10px 10px 10px 10px;
`;

const FieldWrapper = styled.div`
  margin: 25px 60px 15px 60px;
`;

const Button = styled.button`
  margin: 25px 60px 10px 60px;
  font-family: Alata;
  font-size: 18px;
  padding: 5px 0px 7px 0px;
  cursor: pointer;
  background-color: #607a00;
  &: hover {
    background-color: #708f00;
    transition: background-color 120ms;
  }
  outline: none;
  border: none;
  color: white;
`;

const RedirectText = styled.p`
  font-family: Alata;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  color: black;
`;
