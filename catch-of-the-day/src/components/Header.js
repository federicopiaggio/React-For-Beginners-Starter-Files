import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    return (
      <>
        <header className="top">
          <h1>
            Catch
            <span className="ofThe">
              <span className="of">Of</span>
              <span className="the">The</span>
            </span>
            day
          </h1>
          <h3 className="tagline">
            <span>{this.props.tagline}</span>
          </h3>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  tagline: PropTypes.string.isRequired,
};

export default Header;
