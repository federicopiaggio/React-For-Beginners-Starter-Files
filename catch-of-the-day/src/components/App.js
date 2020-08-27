import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
export default class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  addFish = (fish) => {
    //copia del objeto fishes
    const fishes = { ...this.state.fishes };
    //pusheo una instancia de fish
    fishes[`fish ${Date.now()}`] = fish;
    //agrego al state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
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
