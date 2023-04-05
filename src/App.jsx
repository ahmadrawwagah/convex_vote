import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  
  const [newUpvoteMessageText, setNewUpvoteMessageText] = useState("");
  const [newDownvoteMessageText, setNewDownvoteMessageText] = useState("");
  
  const upvotes = useQuery("listUV") || [];
  const downvotes = useQuery("listDV") || [];
  const messages = useQuery("sort") || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation("sendMessage");

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendupvote(event) {
    event.preventDefault();
    setNewUpvoteMessageText("");
    await sendMessage({ body: newUpvoteMessageText, author: "upvote" });
  }
  async function handleSenddownvote(event) {
    event.preventDefault();
    setNewDownvoteMessageText("");
    await sendMessage({ body: newDownvoteMessageText, author: "downvote" });
  }


  return (
    <main>
      <h1>Convex Votes</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <div>Upvotes: {upvotes.length}</div>
      <div>Downvotes: {downvotes.length}</div>
      <form onSubmit={handleSendupvote}>
      <input
          value={newUpvoteMessageText}
          onChange={event => setNewUpvoteMessageText(event.target.value)}
          placeholder="upvote this..."
        />
        <input type="submit" value="upvote"/>
      </form>
      <form onSubmit={handleSenddownvote}>
      <input
          value={newDownvoteMessageText}
          onChange={event => setNewDownvoteMessageText(event.target.value)}
          placeholder="downvote this..."
        />
        <input type="submit" value="downvote"/>
      </form>
    </main>
  );
}
