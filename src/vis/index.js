import React from "react";
import "./main.scss";
import styled from "styled-components";

import { Treemap, makeWidthFlexible } from "react-vis";

const data = {
  title: "",
  color: 1,
  children: [
    {
      title: "title",
      color: 1,
      children: [
        {
          name: "0.2",
          size: 680.9902143327051,
          color: 0.9877830886701155,
          style: {
            border: "thin solid blue",
          },
        },
        {
          name: "0.7",
          size: 699.086062912123,
          color: 0.8344425977692935,
          style: {
            border: "thin solid blue",
          },
        },
        {
          name: "0.2",
          size: 680.9902143327051,
          color: 0.9877830886701155,
          style: {
            border: "thin solid blue",
          },
        },
      ],
    },
    {
      name: "0.2",
      size: 680.9902143327051,
      color: 0.9877830886701155,
      style: {
        border: "thin solid red",
      },
    },
    {
      name: "0.7",
      size: 699.086062912123,
      color: 0.8344425977692935,
      style: {
        border: "thin solid red",
      },
    },
    {
      name: "0.8",
      size: 756.3596694398784,
      color: 0.20353843627878554,
      style: {
        border: "thin solid red",
      },
    },
  ],
};

const FlexibleTreemap = makeWidthFlexible(Treemap);

export default class TreemapGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredNode: false,
      hoveredItemWeight: "",
    };
  }

  render() {
    const treeProps = {
      animation: {
        damping: 50,
        stiffness: 500,
      },
      data: this.props.data || data,
      height: 500,
      mode: "squarify",
      padding: 0,
      onLeafMouseOver: (x) =>
        this.setState(
          { hoveredNode: true, hoveredItemWeight: x.data.weightString },
          () => console.log(x.data)
        ),
      onLeafMouseOut: () => this.setState({ hoveredNode: false }),
    };
    return (
      <div style={{ width: "50vw" }}>
        <FlexibleTreemap style={{ background: "none" }} {...treeProps} />
        <p>{this.state.hoveredItemWeight}</p>
      </div>
    );
  }
}

const ItemWeightHover = styled.div``;
