import React from "react";
import "./main.scss";
import { data } from "../pack/BackpackData/exampleData";
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
      hovered: false,
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
      hovered,
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
      onLeafMouseOver: (x, evt) => {
        this.setState({
          hoveredItemWeight: x.data.weightString,
          hoveredNode: x,
          hoveredCategory: x.parent.data.title,
          hoveredItem: x.data.value,
          hoveredItemBaseColor: x.data.baseColor,
        });
      },
    };

    const displayProps = {
      hidden: !hoveredNode,
      category: hoveredCategory,
      item: hoveredItem,
      weight: hoveredItemWeight,
      baseColor: hoveredItemBaseColor,
    };

    return (
      <Container>
        <MouseArea
          onMouseMove={(evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.setState({ x: evt.clientX, y: evt.clientY });
          }}
          onMouseLeave={(evt) => {
            evt.preventDefault();
            this.setState({ hoveredNode: null });
          }}
        >
          <FlexibleTreemap style={{ background: "none" }} {...treeProps} />
          <Tooltip x={this.state.x} y={this.state.y} {...displayProps} />
        </MouseArea>
      </Container>
    );
  }
}

const MouseArea = styled.div`
  display: flex;
  width: 48vw;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48vw;
  height: auto;
`;
