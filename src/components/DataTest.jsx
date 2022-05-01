import axios from "../api/axios";
import { useEffect, useState } from "react";

export default function DataTest() {
  const [ListOfPosts, setListOfPost] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPost(response.data);
    });
  }, []);
  return (
    <div>
      <h1>Datatest</h1>
      {ListOfPosts.map((value, key) => {
        return (
          <div className="post">
            <br></br>
            <div className="title"> {value.titles}</div>
            <div className="body"> {value.postText}</div>
            <div className="body"> {value.username}</div>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
