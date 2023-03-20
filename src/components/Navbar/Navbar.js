import React, { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { validateSignUp } from "../../validation";
import { AuthContext } from "../../Auth";

function Navbar({ popupState, updatePop }) {
  const auth = getAuth();

  const [forgotState, forgotPop] = useState(false);
  const [signInState, setInState] = useState(false);
  const [fullName, setFullName] = useState("");
  const [updateFirst, setupdateFirst] = useState("");
  const [updateLast, setupdateLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [forgotEmail, setforgotEmail] = useState("");
  const [dbUser, setdbUser] = useState(null);
  const [credentialstate, setCredentialstate] = useState(true);
  const [idToken, setIdToken] = useState("");

  const { currentUser } = useContext(AuthContext);
  const handleSettingChange = () => {
    setCredentialstate(!credentialstate);
  };

  const GetToken = async () => {
    getAuth().onAuthStateChanged((user) => {
      user.getIdToken().then((tok) => {});
    });
  };
  useEffect(() => {
    GetToken();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer` + idToken,
    },
  };

  const updateInfo = async () => {};

  const handleForgot = () => {
    const val = !forgotState;
    forgotPop(val);
  };
  const handleSettings = async () => {
    handleSettingChange();
    const pkID = auth.currentUser.uid;
    if (currentUser !== null) {
      await axios
        .post(
          "https://us-central1-hnh-chuki.cloudfunctions.net/resume/users/",
          {
            userID: pkID,
          },
          config
        )
        .then((dbUse) => {
          setdbUser(dbUse);
        })
        .catch((error) => {});
    }
  };

  const handleClear = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPasswordV("");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Logged in as " + email);
        handleClear();
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleChange = (e) => {
    if (e.target.name === "signinbutton") {
      setInState(true);
    } else {
      setInState(false);
    }

    handleClear();
    updatePop();
  };
  const handleLogout = () => {
    signOut(auth)
      .then((res) => {})
      .catch(() => {});
  };

  const sendReset = () => {};

  function FlexItem() {
    return currentUser ? (
      <a onClick={handleLogout}>Logout</a>
    ) : (
      <a
        name="signup"
        onClick={(e) => {
          handleChange(e);
        }}
      >
        Sign Up
      </a>
    );
  }

  const submitReset = () => {
    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        alert("Forgot password sent to email provdied");
        window.location.reload();
      })
      .catch((error) => {});
  };

  const sumbitSignUp = async (signUpObject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        axios.post(
          "https://us-central1-hnh-chuki.cloudfunctions.net/resume/signup",
          { user: signUpObject, uid: auth.currentUser.uid }
        );
      })
      .then(() => {
        alert("Welcome to Head and Heart Media- You're Logged in as " + email);
        window.location.reload();
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          handleClear();
          alert("Email Already In Use - Plese Sign In ");
          setInState(!signInState);
        } else {
          // alert(error.message);
        }
      });
  };

  return (
    <header className="nav">
      <div
        hidden={popupState}
        onClick={handleChange}
        className="popup__overlay"
      ></div>

      <div className="popup__signin">
        <button
          className="popup__signin-button"
          name="signinbutton"
          onClick={(e) => {
            currentUser ? handleSettings() : handleChange(e);
          }}
        >
          {currentUser ? "Logged In" : "Sign In"}
        </button>

        <div hidden={credentialstate} className="popup__changeinfo">
          <form onSubmit={() => console.log("Done")}>
            <div>Personal Info</div>

            <input
              type="text"
              name="updateFirst"
              placeholder={dbUser ? dbUser.data.message.first : " "}
              onChange={(e) => {
                setupdateFirst(e.target.value);
              }}
              required
            />

            <input
              type="text"
              name="updateLast"
              placeholder={dbUser ? dbUser.data.message.last : " "}
              onChange={(e) => {
                setupdateLast(e.target.value);
              }}
              required
            />

            <input
              type="email"
              id="emailchange"
              name="emailchange"
              placeholder={dbUser ? dbUser.data.message.email : " "}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </form>
          <button onClick={() => updateInfo()}> Save Changes </button>

          <button type="sumbit" onClick={() => handleSettingChange()}>
            {" "}
            Close
          </button>
        </div>
      </div>

      <div hidden={popupState} className="popup">
        <div className="popup__form">
          <form
            hidden={!signInState || forgotState}
            onSubmit={(e) => {
              e.preventDefault();

              handleLogin();
            }}
            className="form"
          >
            <input
              type="email"
              id="email"
              name="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="text"
              id="password"
              name="password"
              minLength={6}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            <br />
            <div className="popup__grid">
              <button type="submit">Submit</button>{" "}
              <button onClick={handleChange}>Close</button>
              <button onClick={handleForgot} className="nav__forgotPass">
                Forgot Password?
              </button>
            </div>
          </form>
          <form
            hidden={signInState || forgotState}
            onSubmit={(e) => {
              const name = fullName.split(" ");
              const signUpObject = {
                first: name[0],
                last: typeof name[1] !== "undefined" ? name[1] : " ",
                email: email,
              };
              e.preventDefault();
              if (
                password.toString() === passwordV.toString() &&
                typeof validateSignUp(signUpObject) === "undefined"
              ) {
                sumbitSignUp(signUpObject);
              } else if (password.toString() !== passwordV.toString()) {
                alert("Passwords do not match");
              } else if (!navigator.onLine) {
                alert("Please Check Internet Connection");
              } else {
              }
            }}
            className="form"
          >
            <input
              type="text"
              id="firsname"
              name="fname"
              placeholder="Full Name"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="text"
              id="password"
              name="password"
              minLength={6}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <input
              type="text"
              id="verify_password"
              name="verify_password"
              minLength={6}
              placeholder=" Verify Password"
              onChange={(e) => {
                setPasswordV(e.target.value);
              }}
              required
            />
            <br />
            <div className="popup__grid">
              <button type="submit">Submit</button>{" "}
              <button onClick={handleChange}>Close</button>
            </div>
          </form>

          <form
            className="nav__forgotform"
            hidden={!forgotState}
            onSubmit={(e) => {
              e.preventDefault();
              submitReset();
            }}
          >
            <input
              type="email"
              id="forgotpass"
              name="forgotpass"
              placeholder="Enter email to reset password"
              onChange={(e) => {
                setforgotEmail(e.target.value);
              }}
              required
            />
            <span
              onClick={() => {
                forgotPop(false);
              }}
            >
              Back
            </span>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <ul>
        <li className="nav__item">
          <a href="#about">Bio</a>
        </li>

        <li className="nav__item">
          <a href="#offers">Offers</a>
        </li>

        <li className="nav__item">
          <a href="#comments">Comments</a>
        </li>

        <li className="nav__item">
          <FlexItem />
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
