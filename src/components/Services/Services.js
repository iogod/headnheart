import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import ServicesCard from "../ServicesCard/ServicesCard";

function Services() {
  const serviceSource = {
    A: {
      title: "H&H Promotion Package",
      sub1: "Press Releases",
      sub2: "Email Blasts",
      sub3: "Social Media Posts",
    },
    B: {
      title: "H&H Network Package",
      sub1: "H&H Promotion Package",
      sub2: "Industry referrals",
      sub3: "Industry event attendance",
    },
    C: {
      title: "H&H Relationship Package",
      sub1: "H&H Promotion & Network Packages",
      sub2: "Marketing and Advertising Management",
      sub3: "Campaigns",
    },
  };

  return (
    <Container className="mgsmall">
      <Row>
        <ServicesCard serviceSrc={serviceSource.A} title="Package A" />
        <ServicesCard serviceSrc={serviceSource.B} title="Package B" />
        <ServicesCard serviceSrc={serviceSource.C} title="Package C" />
      </Row>
    </Container>
  );
}

export default Services;
