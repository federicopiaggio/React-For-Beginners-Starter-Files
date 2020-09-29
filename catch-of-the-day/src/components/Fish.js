import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends Component {
  static propTypes = {
    //con Shapes podés especificar las propiedades del objeto que va a recibir de props, para que sea más especifico si alguna no la manda
    details: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  };

  render() {
    const { name, image, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => {
            this.props.addToOrder(this.props.index);
          }}
        >
          {isAvailable ? "Add to cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
