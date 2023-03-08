import React, { useEffect, useState, useContext } from "react";

import { ReactComponent as Cancel } from "../../img/SVG/cancel-circle.svg";
import { ReactComponent as HighPri } from "../../img/SVG/star-full.svg";
import { ReactComponent as LowPri } from "../../img/SVG/star-empty.svg";
import { getAuth } from "firebase/auth";
import axios from "axios";
import "./comments.scss";
import dayjs from "dayjs";
import { AuthContext } from "../../Auth";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function Comments({
  deleteCom,
  commentText,
  time,
  companyName,
  docID,
  priority,
  userID,
  authID,
}) {
  const { currentUser } = useContext(AuthContext);

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

  const changePriority = async () => {
    await axios
      .post(
        "https://us-central1-hnh-chuki.cloudfunctions.net/resume/comment/" +
          docID,
        {
          priority: !priority,
        },
        config
      )
      .then((message) => {
        console.log(message);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [user, setUser] = useState();
  const getUser = async () => {
    const person = await axios
      .post(
        "https://us-central1-hnh-chuki.cloudfunctions.net/resume/users/",
        {
          userID: userID,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });

    if (person != null) {
      setUser(person.data.message.first[0]);
    } else {
      setUser(" ");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="com__container">
      <div className="comments">
        <div className="comments__img">
          <span> {currentUser ? user : " "}</span>
        </div>
        <div className="comments__company">{companyName}</div>
        <p className="comments__text">{commentText}</p>
        <div className="comments__time">{dayjs(time).fromNow()}</div>
        <div className="comments__company comments__icons">
          {currentUser &&
            !priority &&
            currentUser.uid === "4vBFJIKp4UMGfoq400574GDUb7i1" && (
              <LowPri onClick={() => changePriority()} fill="white" />
            )}

          {currentUser &&
            priority &&
            currentUser.uid === "4vBFJIKp4UMGfoq400574GDUb7i1" && (
              <HighPri onClick={() => changePriority()} fill="white" />
            )}

          {currentUser &&
            currentUser.uid === userID &&
            currentUser.uid !== "4vBFJIKp4UMGfoq400574GDUb7i1" && (
              <Cancel
                onClick={() => deleteCom(docID.toString())}
                fill="white"
              />
            )}

          {currentUser &&
            currentUser.uid === "4vBFJIKp4UMGfoq400574GDUb7i1" && (
              <Cancel
                onClick={() => deleteCom(docID.toString())}
                fill="white"
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
