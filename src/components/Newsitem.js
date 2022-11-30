import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author,source } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ backgroundColor: "#F9FCFF" }}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%" , zIndex:"1"}}>
              {source}
            </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "http://afiedu.com/wp-content/uploads/2019/03/New-4.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
           
            <p className="card-text">
              <small className="text-muted">
                publish by {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
