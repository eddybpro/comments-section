import { PlusIcon, MinusIcon, DeleteIcon, EditIcon } from "../assets";
import PropTypes from "prop-types";
import "./AddReply.css";
import { useRef, useState } from "react";

function AddReply(props) {
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  const [btns, setBtns] = useState(false);
  const [update, setUpdate] = useState(false);

  const myRef = useRef();

  const handleReply = () => {
    setReply(true);
    setBtns(true);
    myRef.current.disabled = true;
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
    myRef.current.disabled = false;
    myRef.current.focus();
    setUpdate(true);
    setBtns(false);
    console.log(edit);
  };

  const handleUpdate = () => {
    setUpdate(false);
    setBtns(true);
  };
  return (
    <div className="ReplyBox">
      <div className="ReplyBox-UserBox">
        <picture>
          <source srcSet={props.user.image.webp} type="image/webp" />
          <img
            src={props.user.image.png}
            alt=""
            className="ReplyBox-UserBox-UserImg"
          />
        </picture>
        <h2 className="ReplyBox-UserBox-UserName">{props.user.username}</h2>
        <button>you</button>
        <p className="ReplyBox-UserBox-UserName-CreatedAt">1 day ago</p>
      </div>
      <textarea
        name="reply"
        ref={myRef}
        aria-label="reply text"
        className="ReplyBox-Reply"
        defaultValue={`@${props.repliedTo},`}
      ></textarea>
      {reply ? (
        update ? (
          <button className="ReplyBox-UpdateBtn" onClick={handleUpdate}>
            update
          </button>
        ) : (
          <div className="RepliesBox-DelEdiBtns">
            <button
              className="RepliesBox-DelEdiBtns-DelBtn"
              onClick={() => props.setDeleteReply(true)}
            >
              <img src={DeleteIcon} alt="" />
              delete
            </button>
            <button
              className="RepliesBox-DelEdiBtns-EdiBtn"
              onClick={handleEdit}
            >
              <img src={EditIcon} alt="" />
              edit
            </button>
          </div>
        )
      ) : (
        <button className="ReplyBox-ReplyBtn" onClick={handleReply}>
          reply
        </button>
      )}
      {btns && (
        <div className="RepliesBox-BtnsBox">
          <button className="RepliesBox-BtnsBox-PlusBtn" aria-label="plus">
            <img src={PlusIcon} alt="" />
          </button>
          <button className="RepliesBox-BtnsBox-ValueBtn" value={0}>
            {0}
          </button>
          <button className="RepliesBox-BtnsBox-MinusBtn" aria-label="minus">
            <img src={MinusIcon} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

AddReply.propTypes = {
  user: PropTypes.object,
  repliedTo: PropTypes.string,
  setDeleteReply: PropTypes.func,
};

export default AddReply;
