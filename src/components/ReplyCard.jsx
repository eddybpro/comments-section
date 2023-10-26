import PropTypes from "prop-types";
import {
  MinusIcon,
  PlusIcon,
  ReplyIcon,
  DeleteIcon,
  EditIcon,
} from "../assets";
import "./ReplyCard.css";
import AddReply from "./AddReply";
import { useState } from "react";

function ReplyCard(props) {
  console.log(props.addReply);
  const [addReply, setAddReply] = useState(false);
  const [deleteReply, setDeleteReply] = useState(false);

  const handleDelete = () => {
    setAddReply(false);
    setDeleteReply(false);
  };
  return (
    <div className="Wrapper">
      <div className={deleteReply ? "RepliesBox blur" : "RepliesBox"}>
        <div className="RepliesBox-UserBox">
          <picture>
            <source srcSet={props.user.image.webp} type="image/webp" />

            <img
              src={props.user.image.png}
              alt={props.user.username}
              className="RepliesBox-UserBox-UserImg"
            />
          </picture>
          <h2 className="RepliesBox-UserBox-UserName">{props.user.username}</h2>
          {props.user.username == props.currentUser.username && (
            <button className="RepliesBox-UserBox-CurrentUser">you</button>
          )}
          <p className="RepliesBox-UserBox-CreatedAt">{props.createdAt}</p>
        </div>
        <p className="RepliesBox-Comment">
          <span className="RepliesBox-Comment-ReplyTo">
            @{props.replyingTo}
          </span>
          {props.content}
        </p>
        {props.user.username == props.currentUser.username ? (
          <div className="RepliesBox-DelEdiBtns">
            <button className="RepliesBox-DelEdiBtns-DelBtn">
              <img src={DeleteIcon} alt="" />
              delete
            </button>
            <button className="RepliesBox-DelEdiBtns-EdiBtn">
              <img src={EditIcon} alt="" />
              edit
            </button>
          </div>
        ) : (
          <button
            className="RepliesBox-ReplyBtn"
            onClick={() => setAddReply(true)}
          >
            <img src={ReplyIcon} alt="" />
            reply
          </button>
        )}
        <div className="RepliesBox-BtnsBox">
          <button className="RepliesBox-BtnsBox-PlusBtn" aria-label="plus">
            <img src={PlusIcon} alt="" />
          </button>
          <button className="RepliesBox-BtnsBox-ValueBtn" value={props.score}>
            {props.score}
          </button>
          <button className="RepliesBox-BtnsBox-MinusBtn" aria-label="minus">
            <img src={MinusIcon} alt="" />
          </button>
        </div>
      </div>

      {addReply && (
        <div className="Wrapper-AddReply">
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
    </div>
  );
}

ReplyCard.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  replyingTo: PropTypes.string,
  score: PropTypes.number,
  addReply: PropTypes.bool,
};

export default ReplyCard;
