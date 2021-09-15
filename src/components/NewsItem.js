import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card my-3">
        <span
          style={{ zIndex: "1", right: "0%", top: "-1.5%" }}
          className="position-absolute badge rounded-pill bg-danger"
        >
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img src={imageUrl} className="card-img-top" alt="Not found" />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}</p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-danger"
            rel="noreferrer"
          >
            Read More
          </a>
          <div className="d-flex justify-content-around mt-4">
            <p className="card-text">
              <small className="text-muted">
                Author: {!author ? "Unknown" : author},
              </small>
            </p>
            <p className="card-text">
              <small className="text-muted">
                Date: {new Date(date).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
