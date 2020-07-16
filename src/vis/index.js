import React from "react";
import "./main.scss";

import { Treemap } from "react-vis";

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

const treemapStyle = {
  alignItems: "center",
  borderRadius: "100% ",
  display: "flex",
  justifyContent: "center",
};

export default class DynamicTreemapExample extends React.Component {
  state = {
    hoveredNode: false,
    treemapData: _getRandomData(),
  };

  render() {
    const { hoveredNode } = this.state;
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300,
      },
      width: 350,
      data: this.state.treemapData,
      height: 300,
      mode: "squarify",
    };
    return (
      <div style={treemapStyle}>
        <Treemap {...treeProps} />
      </div>
    );
  }
}
