import React from "react";
import styled from "styled-components";

export function NewCategoryButton(props) {
  return (
    <CategoryContainer>
      <AddANewCategory onClick={props.onClick}>
        {props.children}
      </AddANewCategory>
    </CategoryContainer>
  );
}

const AddANewCategory = styled.button`
  padding: 10px;
  margin: 0px 10px 20px 10px;
  text-align: center;
  height: 51px;
  border: 2px solid #708f00;
  cursor: pointer;
  color: black;
  border-radius: 2px;
  background-color: transparent;
  &: hover {
    background-color: #708f00;
    transition: background-color 70ms ease-out;
    color: white;
    transition: color 50ms ease;
    box-shadow: 2px 3px 5px #abb6a5;
    transition: box-shadow 30ms ease-out;
  }
  outline: none;
  font-family: Alata;
  font-weight: 300;
  font-size: 14px;
`;

const CategoryContainer = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0vh 10px 0vh 10px;
  margin: 2vh 1vw 1vh 0.5vw;
  border-radius: 0px;
`;
