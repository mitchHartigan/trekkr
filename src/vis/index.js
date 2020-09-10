import React from "react";
import "./main.scss";
import Breadcrumb from "./Breadcrumb";
import { data } from "./exampleData";
import styled from "styled-components";
import { Tooltip } from "./Tooltip";

import { Treemap, makeWidthFlexible } from "react-vis";

const FlexibleTreemap = makeWidthFlexible(Treemap);

export default class TreemapGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredItemWeight: "",
      hoveredItem: "",
      hoveredCategory: "",
      hoveredItemBaseColor: "",
      hoveredNode: null,
      x: null,
      y: null,
    };
  }

  render() {
    const {
      hoveredNode,
      hoveredItemWeight,
      hoveredCategory,
      hoveredItem,
      hoveredItemBaseColor,
    } = this.state;

    const treeProps = {
      animation: {
        damping: 30,
        stiffness: 200,
        noWobble: true,
      },
      data: this.props.data || data,
      height: 500,
      mode: "binary",
      padding: 0,
      onLeafMouseOver: (x) =>
        this.setState(
          {
            hoveredItemWeight: x.data.weightString,
            hoveredNode: x,
            hoveredCategory: x.parent.data.title,
            hoveredItem: x.data.value,
            hoveredItemBaseColor: x.data.baseColor,
          },
          () => console.log(x)
        ),
      onLeafMouseOut: () => this.setState({ hoveredNode: null }),
    };

    const displayProps = {
      hidden: !hoveredNode,
      category: hoveredCategory,
      item: hoveredItem,
      weight: hoveredItemWeight,
      baseColor: hoveredItemBaseColor,
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "48vw",
          height: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "48vw",
            height: "auto",
          }}
          onMouseMove={(evt) => {
            this.setState({ x: evt.clientX, y: evt.clientY });
          }}
        >
          <FlexibleTreemap style={{ background: "none" }} {...treeProps} />
          <Tooltip x={this.state.x} y={this.state.y} {...displayProps} />
        </div>
        <p style={{ textAlign: "center" }}>Here is some more shit</p>
      </div>
    );
  }
}

const MouseArea = styled.div``;
