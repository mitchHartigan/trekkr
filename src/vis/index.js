import React from "react";
import "./main.scss";

import { Treemap, makeWidthFlexible } from "react-vis";

function _getRandomData(total) {
  const totalLeaves = total || Math.random() * 20;
  const leaves = [];
  for (let i = 0; i < totalLeaves; i++) {
    leaves.push({
      name: total ? total : String(Math.random()).slice(0, 3),
      size: Math.random() * 1000,
      color: Math.random(),
      style: {
        border: "thin solid red",
      },
    });
  }
  return {
    title: "",
    color: 1,
    children: leaves,
  };
}

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
  render() {
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300,
      },
      data: this.props.data || data,
      height: 500,
      mode: "squarify",
    };
    return (
      <div style={{ width: "40vw" }}>
        <FlexibleTreemap {...treeProps} />
      </div>
    );
  }
}
