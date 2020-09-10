import React from "react";
import "./main.scss";
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
      hoveredItem: "",
      hoveredCategory: "",
      hoveredItemBaseColor: "",
      hoveredNode: null,
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
        <FlexibleTreemap style={{ background: "none" }} {...treeProps} />
        <Breadcrumb {...breadcrumbProps} />
        <p style={{ textAlign: "center" }}>Here is some more shit</p>
      </div>
    );
  }
}
