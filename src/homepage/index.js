import React, { Component } from "react";
import Hero from "./Hero";
import Description from "./Description/index";
import GetStarted from "./GetStarted/index";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Description />
        <GetStarted />
      </div>
    );
  }
}
