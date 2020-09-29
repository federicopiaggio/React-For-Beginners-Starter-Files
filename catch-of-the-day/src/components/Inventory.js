import React, { Component } from "react";
import { PropTypes } from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {/* recorro el todo el state de fishes que tengo en app y lo mapeo en nuevos arrays luego de ser convertido en array cada una de las keys y creo un componente de edicion de fish por cada uno que poseo en el menu*/}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            //para poder usar el key cuando lo mandamos al App componente
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
