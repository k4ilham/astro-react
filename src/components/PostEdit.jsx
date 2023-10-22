//import useState
import { useState } from "react";

//import API
import api from "../services/api";
export default function PostEdit({ postID, postTitle, postContent }) {
  //define state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState(postTitle);
  const [content, setContent] = useState(postContent);

  //state validation
  const [errors, setErrors] = useState([]);

  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  //method update post
  const updatePost = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //send data with API
    await api
      .post(`/api/posts/${postID}`, formData)
      .then(() => {
        //redirect to posts index
        window.location.href = "/posts";
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {errors.image && (
                    <div className="alert alert-danger mt-2">
                      {errors.image[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title Post"
                  />
                  {errors.title && (
                    <div className="alert alert-danger mt-2">
                      {errors.title[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Content</label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    placeholder="Content Post"
                  ></textarea>
                  {errors.content && (
                    <div className="alert alert-danger mt-2">
                      {errors.content[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-sm shadow border-0"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}