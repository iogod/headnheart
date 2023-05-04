import React, { useState, useEffect } from "react";
import "./former.scss";
import axios from "axios";
import { getAuth } from "firebase/auth";

function Former({ updateComment }) {
  const auth = getAuth();
  const [loadingState, setLoadingState] = useState(false);
  const [idToken, setidToken] = useState("");
  const GetToken = async () => {
    getAuth().onAuthStateChanged((user) => {
      user.getIdToken().then((tok) => {
        setidToken(tok);
      });
    });
  };
  useEffect(() => {
    GetToken();
  }, []);
  const config = {
    headers: {
      Authorization: `Bearer ` + idToken,
    },
  };

  const Spinner = () => {
    return <div class="spinner-border" role="status"></div>;
  };

  const handleSubmit = async () => {
    setLoadingState(true);
    await axios
      .post(
        "https://us-central1-hnh-chuki.cloudfunctions.net/resume/comment",
        {
          commentText: textBody,

          companyName: company,
          priority: false,
          eyedee: auth.currentUser.uid,
        },
        config
      )
      .then((doc) => {
        const newComment = {
          datum: {
            commentText: doc.data.commentText,
            userID: auth.currentUser.uid,
            priority: doc.data.priority,
            time: doc.data.time,
            companyName: doc.data.companyName,
          },
          docID: doc.data.id,
        };

        updateComment(newComment);

        window.location.reload(false);
      })
      .catch((error) => {
        alert(error);
        setLoadingState(false);
      });
  };

  const [company, setCompany] = useState("");
  const [textBody, setTextBody] = useState("");

  return (
    <div className="big">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (auth.currentUser !== null) {
            handleSubmit();
          } else {
            alert("Please login/sign up to comment");
          }
        }}
        className="form"
      >
        <input
          type="text"
          id="cname"
          name="cname"
          placeholder="Company Name"
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          required
        />
        <br />
        <textarea
          maxLength={"250"}
          rows="6"
          placeholder=" Please leave a review (Max 250 characters)"
          onChange={(e) => {
            setTextBody(e.target.value);
          }}
          required
        ></textarea>
        <br />
        {loadingState && <Spinner />}
        <button hidden={loadingState} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Former;
