import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
  static propTypes = {
    removeFromOrder: PropTypes.func,
    fishes: PropTypes.object,
    order: PropTypes.object,
  };
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    //aca preguntamos si hay fish para que no de error cuando queramos cargar del localstorage
    const isAvailable = fish && fish.status === "available";
    //guardamos las propiedades de la transformación en un objeto para no tener que repetir el codigo en los distintos componentes que tengan el mismo classname y animation
    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 500, exit: 500 },
    };
    //evitar el glitch cuando carga de localstorage los fish que tengamos
    if (!fish) return null;
    if (!isAvailable) {
      return (
        //acá cargamos las propiedades del csstransition con el objeto que creamos anteriormente
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available{" "}
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count} </span>
              </CSSTransition>
            </TransitionGroup>
            un {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
