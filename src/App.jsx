import { useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";

export default function App() {
  
  const [newUpvoteMessageText, setNewUpvoteMessageText] = useState("");
  const [newDownvoteMessageText, setNewDownvoteMessageText] = useState("");
  
  const upvotes = useQuery("listUV") || [];
  const downvotes = useQuery("listDV") || [];
  const ranking = useQuery("sort") || [];

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
      <ul>
        {ranking.map(entry => (
          <li key={entry[1]}>
            <span>{entry[1]}:</span>
            <span> <a style = {{color:'Chartreuse'}}> +{entry[2]}</a> <a style={{color:'red'}}> -{entry[3]}</a></span>
          </li>
        ))}
      </ul>
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
