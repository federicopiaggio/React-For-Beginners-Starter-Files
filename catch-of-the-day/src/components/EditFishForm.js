import React, { Component } from "react";
import { PropTypes } from "prop-types";

//react no permite cambiar el valor de state desde un input desde el value, por eso es necesario escuchar el evento del target y subir esa información directo al inventory/app y ahi cargarlo al state de esa manera podemos acceder a ese valor y guardarlo en updatedFish

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
  };
  handleChange = (event) => {
    console.log(event.currentTarget.value);
    //actualizar el fish
    //coppia del current fish y acceder al nombre que le pusimos en los inputs y demás elementos del edit y actualizar con el valor cambiado
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    const { name, status, price, desc, image } = this.props.fish;
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={desc} />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          {" "}
          Remove Fish{" "}
        </button>
      </div>
    );
  }
}

export default EditFishForm;
