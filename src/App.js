import React from "react";
import "./index.css";
import BackpackData from "./pack/BackpackData";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Open+Sans+Condensed&display=swap");
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <BackpackData />
    </>
  );
}

export default App;
