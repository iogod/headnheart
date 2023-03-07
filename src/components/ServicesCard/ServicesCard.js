import "./servicescard.scss";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";

function ServicesCard({ title, serviceSrc }) {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [textBody, setTextBody] = useState("");
  const [showInquire, setInquire] = useState(false);
  const [stateAni, setAnimation] = useState(false);

  function isEmail(val) {
    let regEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const outcome = regEmail.test(val);
    return regEmail.test(val);
  }
  const validateSend = () => {
    if (
      fullName.length > 0 &&
      email.length > 0 &&
      textBody.length > 0 &&
      isEmail(email)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const animationEnable = () => {
    if (validateSend()) {
      setAnimation(!stateAni);
    }
  };

  const handleSubmit = async (e) => {
    const name = fullName.split(" ");

    await axios
      .post("https://us-central1-hnh-chuki.cloudfunctions.net/resume/inquire", {
        packageName: serviceSrc.title,
        firstName: name[0],
        lastName: typeof name[1] === String ? name[1] : " ",
        email: email,
        bodytext: textBody,
      })
      .then(() => {
        alert("Inquiry Submitted");
        setAnimation();
        window.location.reload(false);
      })
      .catch((error) => {
        alert("Error occured please try again");
        setAnimation();
      });
  };
  const handleChange = () => {
    setInquire(!showInquire);
  };
  return (
    <Col id="offers" className="justify-content-right align-items-right">
      <div
        className="servicecard"
        style={{
          animation: stateAni ? "loadingZone 1s ease-in-out infinite" : "none",
        }}
      >
        <div hidden={!showInquire} className="servicecard__flex">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="servicecard__inquire"
          >
            <input
              type="text"
              id="firstN"
              name="fname"
              placeholder="Full Name"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
            <br />
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Comapny"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              required
            />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <br />

            <textarea
              maxLength={"200"}
              rows="7"
              required
              placeholder=" Please leave a quick description and availability (Max 200 characters) "
              onChange={(e) => {
                setTextBody(e.target.value);
              }}
            ></textarea>

            <div onClick={handleChange} className="servicecard__back">
              {" "}
              {"< Back"}
            </div>

            <button
              onClick={() => {
                animationEnable();
              }}
              type="submit"
            >
              SEND INQUIRY
            </button>
          </form>
        </div>

        <div hidden={showInquire} className="listBlock">
          <ul className="servicecard__list">
            <li>{serviceSrc.sub1}</li>

            <li>{serviceSrc.sub2}</li>
            <li>{serviceSrc.sub3}</li>

            <span onClick={handleChange} className="servicecard__btn">
              Submit Inquiry
            </span>
          </ul>
          <div className="titleBlock">{serviceSrc.title}</div>
        </div>
      </div>
    </Col>
  );
}

export default ServicesCard;
