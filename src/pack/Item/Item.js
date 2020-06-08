import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      weight: 0,
      qty: 1
    };
  }

  handleUpdate = evt => {
    this.setState({ [evt.target.name]: evt.target.value }, () => {
      // pass this state up to parent here...
    });
  };

  render() {
    return (
      <tr>
        <td>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.props.name}
            onChange={this.handleUpdate}
          />
        </td>

        <td>
          <input
            name="weight"
            type="number"
            value={this.props.weight}
            placeholder="0"
            onChange={this.handleUpdate}
          />
          <select name="units">
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </td>

        <td>
          <p>Qty</p>
          <input
            type="number"
            value={this.props.qty}
            name="qty"
            placeholder="1"
            onChange={this.handleUpdate}
          />
        </td>
      </tr>
    );
  }
}
