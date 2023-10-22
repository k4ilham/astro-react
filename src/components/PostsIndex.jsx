//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from "../services/api";
export default function PostIndex() {
  //ini state
  const [posts, setPosts] = useState([]);

  //define method "fetchDataPosts"
  const fetchDataPosts = async () => {
    //fetch data from API with Axios
    await api.get("/api/posts").then((response) => {
      //assign response data to state "posts"
      setPosts(response.data.data.data);
    });
  };

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDataPosts"
    fetchDataPosts();
  }, []);

  //method deletePost
  const deletePost = async (id) => {
    //delete with api
    await api.delete(`/api/posts/${id}`).then(() => {
      //call method "fetchDataPosts"
      fetchDataPosts();
    });
  };

  return (
    <table className="table table-bordered">
      <thead className="bg-dark text-white">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Content</th>
          <th scope="col" style={{ width: "15%" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <tr key={index}>
              <td className="text-center">
                <img
                  src={post.image}
                  alt={post.title}
                  width="200"
                  className="rounded"
                />
              </td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td className="text-center">
                <a
                  href={`/posts/edit/${post.id}`}
                  className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                >
                  EDIT
                </a>
                <button
                  onClick={() => deletePost(post.id)}
                  className="btn btn-sm btn-danger rounded-sm shadow border-0"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              <div className="alert alert-danger mb-0">
                Data Belum Tersedia!
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}