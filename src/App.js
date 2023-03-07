import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Container from "react-bootstrap/Container";
import "./sass/layout.scss";
import AboutMe from "./components/AboutMe/Aboutme";
import Services from "./components/Services/Services";
import CommentContainer from "./components/CommentContainer/CommentContainer";
import { getApp } from "firebase/app";
import { AuthProvider } from "./Auth";
function App() {
  const [signUp, updateNavbar] = useState(true);
  const updatePopState = () => {
    updateNavbar(!signUp);
  };
  return (
    <AuthProvider>
      <React.Fragment>
        <Navbar updatePop={updatePopState} popupState={signUp} key={1}></Navbar>

        <Container fluid="xl">
          <Intro key={2} />
          <AboutMe key={3} />
          <Services key={4} />

          <CommentContainer
            updatePop={updatePopState}
            popupState={signUp}
            key={5}
          />
        </Container>
      </React.Fragment>
    </AuthProvider>
  );
}

export default App;
