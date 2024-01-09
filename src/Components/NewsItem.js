import React from "react";
import "./NewsItem.css";

const NewsItem = ({ title, description, url, urlToImage, publishedAt }) => {
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(publishedAt).toLocaleDateString(
    undefined,
    dateOptions
  );

  return (
    <div className="news-item">
      <img className="news-img" src={urlToImage} alt={urlToImage} />
      <h3>
        <a href={url}>{title}</a>
      </h3>
      <p>{description}</p>
      <p className="date">{formattedDate}</p>
    </div>
  );
};

export default NewsItem;
