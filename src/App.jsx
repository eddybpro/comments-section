import { data } from "./data";
import "./App.css";
import CommentCard from "./components/CommentCard";

function App() {
  return (
    <main>
      <div className="FirstWrapper">
        <div className="FirstWrapper-CommentsBox">
          {data.comments.map((el) => (
            <CommentCard key={el.id} {...el} currentUser={data.currentUser} />
          ))}
        </div>
        <div className="Wrapper-AddCommentBox">
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            placeholder="Add a comment"
            className="Wrapper-AddCommentBox-Comment"
          ></textarea>
          <button className="Wrapper-AddCommentBox-Btn">send</button>
          <picture>
            <source srcSet={data.currentUser.image.webp} type="image/webp" />
            <img
              src={data.currentUser.image.png}
              alt=""
              className="Wrapper-AddCommentBox-UserImg"
            />
          </picture>
        </div>
      </div>
    </main>
  );
}

export default App;
