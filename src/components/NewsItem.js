import React from "react";
//import "./NewsComponent.css";

export default function NewsItem({
  title,
  description,
  imageUrl,
  newsUrl,
  source,
  date,
  onSave,
  isSaved
}) {
  return (
    <>
      <div
        className="card my-3"
        style={{ width: "18rem", position: "relative" }}
      >
        <span
        className="badge bg-danger"
        style={{ position: "absolute", right: "10px", top: "10px" }}
      >
          {source&&source.name ? source.name : "Unknown"}
        </span>
        <img
          src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p>
            {description
              ? description.slice(0, 100) + "..."
              : "Description not available"}
          </p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Read More
          </a>
        </div>
        <div 
  className="card-footer d-flex justify-content-between align-items-center" 
  style={{ fontSize: "0.99rem" }}
>
  <small className="text-muted">
    Published on {new Date(date).toLocaleDateString()}
  </small>

  <i
    className={`fa-${isSaved ? "solid" : "regular"} fa-bookmark fa-sm`}
    style={{ cursor: "pointer", color: isSaved ? "blue" : "gray" }}
   onClick={(e) => {
  const el = e.currentTarget;  // Save the element reference immediately
  el.classList.add("animate");
  onSave();

  setTimeout(() => {
    el.classList.remove("animate");  // Use saved reference
  }, 400);
}}
  ></i>
</div>

        
      </div>
    </>
  );
}
