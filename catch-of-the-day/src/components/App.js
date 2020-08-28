import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

export default class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    //primero reanudamos state del localhost en
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    //chequeamos que haya algo en la referencia al localhost y lo cargamos al order como jsonobject parseado ya que esta como string
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    //cuando se monta el componente, agrega los pescados a la base de firebase del state fishes
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    //guardando en el localstorage las ordenes que vamos haciendo, el state order devuelve un objeto, el cual hay que convertirlo a json para poder leerlo
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
    console.log("updated");
  }

  componentWillUnmount() {
    //cuando se desmonta suelta la ref de firebase
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    //copia del objeto fishes
    const fishes = { ...this.state.fishes };
    //pusheo una instancia de fish
    fishes[`fish ${Date.now()}`] = fish;
    //agrego al state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    //carga la lista de pescados de muestra
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //copia del objeto order
    const order = { ...this.state.order };
    //agregar a la orden
    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  };

  render() {
    const storeName = this.props.match.params.storeId;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline={storeName} />
          <ul className="fishes">
            {/* accedo a todas las keys del objeto fishes que está dentro del state y hago un map por cada una, es necesario ponerle una key, en este caso es la key misma del fishes */}
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}
