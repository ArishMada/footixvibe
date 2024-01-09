import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import  apiKey from './config';

const NewList = () => {
  const [articles, setArticles] = useState([]); 

  const url =
    "https://newsapi.org/v2/everything?" +
    "q=premier%20league OR soccer OR laliga OR champions%20league OR league OR UEFA&" +
    "language=en&" +
    "apiKey="+apiKey;

  useEffect(() => {
    console.log(apiKey)
    const getArticles = async () => {
      const response = await axios.get(url);
      setArticles(response.data.articles);
      console.log(response);
    };

    getArticles();
  }, [url]);
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const limitedArticles = shuffleArray(articles).slice(0, 12);

  return (
    <div className="news-container" id="#News">
      <h1 className="primary-subheading">News</h1>
      <div className="news">
        {shuffleArray(limitedArticles).map((article) => (
          <NewsItem
            key={article.title} // Ensure each item has a unique key
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.urlToImage}
            publishedAt={article.publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default NewList;
