import React, { Component } from "react";
import Item from "../Item/Item";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <input type="text" value="Category Name" />
        <table>
          <tbody>
            <Item />
          </tbody>
        </table>
      </div>
    );
  }
}
