import React, { useState, useEffect } from "react";
import "./commentContainer.scss";
import { Row } from "react-bootstrap";
import Comments from "../../components/Comments/Comments";
import Former from "../../components/Former/Former";
import axios from "axios";

import { getAuth } from "firebase/auth";

function CommentContainer({ updatePop }) {
  const auth = getAuth();

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

  const [formState, setFormCount] = useState(false);
  const toggleForm = () => {
    if (auth.currentUser === null) {
      alert("Please Create an Account to leave a comment");
      updatePop();
    } else {
      setFormCount(true);
    }
  };
  let [dat, setData] = useState([]);

  const AddComment = (comm) => {
    setData((oldArray) => {
      return [...oldArray, comm];
    });
  };

  const DoThat = async () => {
    const { data } = await axios
      .get(
        "https://us-central1-hnh-chuki.cloudfunctions.net/resume/comments",
        config
      )
      .catch((error) => {
        console.log(error);
      });

    if (data != null) {
      setData(data);
    }
  };
  useEffect(() => {
    DoThat();
  }, []);

  const deleteComment = async (commentID) => {
    await axios
      .delete(
        "https://us-central1-hnh-chuki.cloudfunctions.net/resume/comment/" +
          commentID,
        config
      )

      .then(() => {
        setData(
          dat.filter((comment) => {
            return comment.docID !== commentID;
          })
        );
      })
      .catch((error) => {});
  };
  return (
    <div>
      <Row className="comment__toggle justify-content-center align-items-center">
        {formState ? <Former updateComment={AddComment} /> : null}
        <a className="comment__btn" onClick={toggleForm}>
          <label id="comments">Leave a Testimonal/Comment</label>
        </a>

        {/* <Comments /> */}
        {dat.map((comment, index) => {
          return (
            <Comments
              deleteCom={deleteComment}
              docID={comment.docID}
              key={index}
              commentText={comment.datum.commentText}
              username={comment.datum.userID[0]}
              userID={comment.datum.userID}
              time={comment.datum.time}
              priority={comment.datum.priority}
              companyName={comment.datum.companyName}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default CommentContainer;
