import React from "react";
import { IMovie } from "./Interfaces";

const MovieCard: React.FC<IMovie> = ({ tags, title, images }) => {
  return (
    <div>
      <article>
        <img src={images[0].url} className="card-img" alt="" />
        <div className="box-classification"></div>
        <div className="subtitle-box">
          {tags.length ? (
            <span className={`tag tag-category-${tags[0].toLowerCase()}`}>
              {tags[0]}
            </span>
          ) : (
            ""
          )}
          <h2 className="subtitle">{title}</h2>
        </div>
      </article>
    </div>
  );
};

export default MovieCard;
