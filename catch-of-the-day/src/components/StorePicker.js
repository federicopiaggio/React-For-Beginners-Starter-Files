import React, { Component } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  myInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Select the store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit store </button>
      </form>
    );
  }
}

export default StorePicker;
