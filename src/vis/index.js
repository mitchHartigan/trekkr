import React from "react";
import "./main.scss";
import styled from "styled-components";
import Breadcrumb from "./Breadcrumb";
import Label from "./Label";
import { data } from "./exampleData";

import { Treemap, makeWidthFlexible } from "react-vis";

const FlexibleTreemap = makeWidthFlexible(Treemap);

export default class TreemapGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredItemWeight: "",
      hoveredNode: null,
    };
  }

  render() {
    const { hoveredNode, hoveredItemWeight } = this.state;

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
          { hoveredItemWeight: x.data.weightString, hoveredNode: x },
          () => console.log(x)
        ),
      getLabel: () => {
        if (hoveredNode) {
          return (
            <Label
              containerHeight={hoveredNode.y1 - hoveredNode.y0}
              containerWidth={hoveredNode.x1 - hoveredNode.x0}
            >
              {`${hoveredNode.data.value} (${hoveredNode.data.weightString})`}
            </Label>
          );
        }
      },
      onLeafMouseOut: () => this.setState({ hoveredNode: null }),
    };

    const breadcrumbProps = {
      hidden: !hoveredNode,
      category: hoveredNode ? hoveredNode.parent.data.title : "Category Title",
      item: hoveredNode ? hoveredNode.data.value : "",
      weight: hoveredNode ? hoveredItemWeight : "",
    };

    return (
      <div
        style={{
          width: "50vw",
          height: "auto",
        }}
      >
        <FlexibleTreemap style={{ background: "none" }} {...treeProps} />
        <Breadcrumb {...breadcrumbProps} />
      </div>
    );
  }
}
