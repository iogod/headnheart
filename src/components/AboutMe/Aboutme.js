import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import podcastimg from "../../img/podimg.png";
import "./aboutme.scss";

const yearsArray = ["20+ Years", "10+ Years", "5+ Years", "2+ Years"].map(
  (t, index) => {
    return (
      <span key={index} className="years">
        {t}
      </span>
    );
  }
);
const twenties = ["Auto Loan Industries"].map((t, index) => {
  return (
    <span key={index} className="aboutme__twenties">
      {t}
    </span>
  );
});
const tens = ["Journalism", "Content Creation"].map((t, index) => {
  return (
    <span key={index} className="aboutme__twenties">
      {t}
    </span>
  );
});

const fives = ["Sales ", "Management", "Advertising", "Marketing"].map(
  (t, index) => {
    return (
      <span key={index} className="aboutme__twenties">
        {t}
      </span>
    );
  }
);
const twos = ["DEI Committee Chair"].map((t, index) => {
  return (
    <span key={index} className="aboutme__twenties">
      {t}
    </span>
  );
});

function Aboutme() {
  return (
    <Container fluid className="mgsmall">
      <section id="about" className="aboutme">
        <Row md={12}>
          <Col
            md={12}
            lg={6}
            className="align-items-center  justify-content-center aboutme__space"
          >
            <Row>
              <h1 className="aboutme__title">Deshaun Sheppard</h1>
            </Row>
            <Row>
              <img
                className="aboutme__img"
                src={require("../../img/drs.png")}
                alt="DRS"
              ></img>
            </Row>
            <Row>
              <h3 className="aboutme__subtitle">
                Vehicle Title Solutions Expert
              </h3>
            </Row>

            <p className="aboutme__description">
              I started out in the auto loan industry at the age of 14. Yes,
              14... During my 20 year career, I’ve performed vehicle title
              transactions such as lien perfections, corrections, lien releases,
              repossessions, and redemptions for some of the largest lenders in
              the country.
            </p>
            <p className="aboutme__description">
              I’ve also managed departments that include customer service, state
              to state transfer, duplicate title, 2nd lien, and lien release
              requests.
            </p>

            <p className="aboutme__description">
              I’m currently a Lender Solutions Expert providing innovative,
              efficient, and industry leading title solutions across the
              lifecycle of an auto loan for banks and credit unions nationwide.
            </p>
          </Col>

          <Col
            className="aboutme__video  justify-content-center "
            md={12}
            lg={6}
          >
            <Row className="mgmd">
              {/* <img
                className="aboutme__video--pod"
                src={podcastimg}
                alt="podcast"
              ></img> */}
              <video
                className="aboutme__video--pod"
                controls
                poster={podcastimg}
                // src={podcast}
                width="600"
                height="600"
              ></video>
            </Row>
          </Col>
        </Row>

        <Row className="ca">
          {yearsArray[0]}
          {twenties}

          {yearsArray[1]}
          {tens}

          {yearsArray[2]}
          {fives}

          {yearsArray[3]}
          {twos}
        </Row>
      </section>
    </Container>
  );
}

export default Aboutme;
