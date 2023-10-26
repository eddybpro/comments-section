import {
  MinusIcon,
  PlusIcon,
  ReplyIcon,
  DeleteIcon,
  EditIcon,
} from "../assets";
import PropTypes from "prop-types";
import ReplyCard from "./ReplyCard";
import AddReply from "./AddReply";
import "./CommentCard.css";
import { useState } from "react";

function CommentCard(props) {
  const [addReply, setAddReply] = useState(false);
  const [deleteReply, setDeleteReply] = useState(false);

  const handleDelete = () => {
    setAddReply(false);
    setDeleteReply(false);
  };
  return (
    <div className="Wrapper">
      <div
        className={
          deleteReply ? "Wrapper-CommentBox blur" : "Wrapper-CommentBox"
        }
      >
        <div className="Wrapper-CommentBox-UserBox">
          <picture>
            <source srcSet={props.user.image.webp} type="image/webp" />

            <img
              src={props.user.image.png}
              alt={props.user.username}
              className="Wrapper-CommentBox-UserBox-UserImg"
            />
          </picture>
          <h2 className="Wrapper-CommentBox-UserBox-UserName">
            {props.user.username}
          </h2>
          {props.user.username === props.currentUser.username && (
            <button>you</button>
          )}
          <p className="Wrapper-CommentBox-UserBox-CreatedAt">
            {props.createdAt}
          </p>
        </div>
        <p className="Wrapper-CommentBox-Comment">{props.content}</p>

        {props.user.username == props.currentUser.username ? (
          <div className="Wrapper-CommentBox-DelEdiBtns">
            <button className="Wrapper-CommentBox-DelEdiBtns-DelBtn">
              <img src={DeleteIcon} alt="" />
              delete
            </button>
            <button className="Wrapper-CommentBox-DelEdiBtns-EdiBtn">
              <img src={EditIcon} alt="" />
              edit
            </button>
          </div>
        ) : (
          <button
            className="Wrapper-CommentBox-ReplyBtn"
            onClick={() => setAddReply(true)}
          >
            <img src={ReplyIcon} alt="" />
            reply
          </button>
        )}
        <div className="Wrapper-CommentBox-BtnsBox">
          <button
            className="Wrapper-CommentBox-BtnsBox-PlusBtn"
            aria-label="plus"
          >
            <img src={PlusIcon} alt="" />
          </button>
          <button
            className="Wrapper-CommentBox-BtnsBox-ValueBtn"
            value={props.score}
          >
            {props.score}
          </button>
          <button
            className="Wrapper-CommentBox-BtnsBox-MinusBtn"
            aria-label="minus"
          >
            <img src={MinusIcon} alt="" />
          </button>
        </div>
      </div>

      {addReply && (
        <div
          className={deleteReply ? "Wrapper-AddReply blur" : "Wrapper-AddReply"}
        >
          <AddReply
            user={props.currentUser}
            repliedTo={props.user.username}
            setDeleteReply={setDeleteReply}
          />
        </div>
      )}

      {deleteReply && (
        <div className="Wrapper-DeleteWrapper">
          <h1 className="Wrapper-DeleteWrapper-Title">Delete comment</h1>
          <p className="Wrapper-DeleteWrapper-Para">
            Are you sure you want to delete this comment? This will remove the
            comment and can&apos;t be undone.
          </p>
          <div className="Wrapper-DeleteWrapper-Btns">
            <button
              className="Wrapper-DeleteWrapper-Btns-CancelBtn"
              onClick={() => setDeleteReply(false)}
            >
              no, cancel
            </button>
            <button
              className="Wrapper-DeleteWrapper-Btns-DelBtn"
              onClick={handleDelete}
            >
              yes, delete
            </button>
          </div>
        </div>
      )}

      <div className="Wrapper-RepliesBox">
        {props.replies.length >= 1
          ? props.replies.map((el) => (
              <ReplyCard key={el.id} {...el} currentUser={props.currentUser} />
            ))
          : ""}
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  score: PropTypes.number,
  replies: PropTypes.array,
  setDeleteReply: PropTypes.func,
};

export default CommentCard;
