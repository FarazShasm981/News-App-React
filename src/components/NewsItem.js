import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date,source } = props;
    return (
      <div className="container my-3">
        <div className="card" >
          <div style={{display :'flex', justifyContent:'flex-end',position:"absolute",right:'0'}}>
          <span className=" badge rounded-pill bg-danger" style={{left:"50%",zIndex:"1"}}> {source} </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://e0.365dm.com/24/10/1600x900/skysports-george-baldock-sheffield_6711920.jpg?20241009215407"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>{" "}
      </div>
    );
  }


export default NewsItem;
