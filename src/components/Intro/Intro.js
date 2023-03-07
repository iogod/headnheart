import React from "react";
import "./intro.scss";
import Row from "react-bootstrap/Row";
import logo from "../../../src/img/hnh1.png";

function Intro() {
  return (
    <div>
      <header className="intro mglarge">
        <Row className="intro__title ">
          <img alt="logo" className="intro__logo" src={logo} />
        </Row>
        <Row>
          <h1>
            Providing innovative content, advertising, marketing, and promotion
            of services to connect and help you grow
          </h1>
        </Row>

        <Row>
          <div className="intro__seen">As Seen On</div>
        </Row>

        <Row>
          <div className="intro__seen--assets">
            <img src={require("../../img/seen1.png")} alt="no1"></img>
            <img src={require("../../img/seen2.png")} alt="no2"></img>
            <img src={require("../../img/seen3.png")} alt="no3"></img>
          </div>
        </Row>
      </header>
    </div>
  );
}

export default Intro;
