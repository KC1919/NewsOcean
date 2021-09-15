import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
        <div className="card my-3">
        <span style={{zIndex:"1",left:"90%"}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-danger" rel="noreferrer">
              Read More
            </a>
            <div className="d-flex justify-content-around mt-4">
            <p className="card-text"><small className="text-muted">Author: {!author?"Unknown":author},</small></p>
            <p className="card-text"><small className="text-muted">Date: {new Date(date).toGMTString()}</small></p>
            </div>
            
          </div>
          
        </div>
      </div>
    );
  }
}

export default NewsItem;
