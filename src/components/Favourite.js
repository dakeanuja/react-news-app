import { useState, useEffect } from "react";
import no_news_found from "../assets/no_news_found.jpg";
import NewsItem from "./NewsItem";
import { toast } from 'react-toastify';

export default function Favourite() {
  const [favArticle, setFavArticle] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteArticles")) || [];
    setFavArticle(saved);
  }, []);

  const handleUnsave = (article) => {
    const updated = favArticle.filter((a) => a.url !== article.url);
    localStorage.setItem("favoriteArticles", JSON.stringify(updated));
    setFavArticle(updated);
    toast.success("Article removed from favourites");
  };

  const handleClearAll=()=>{
    localStorage.removeItem("favoriteArticles");
    setFavArticle([]);
    toast.success("All articles removed from favourites");


  }

  if (favArticle.length === 0) {
    return (
  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
    <img src={no_news_found} alt="No news found" style={{ width: "100px" }} />
    <h4 className="mt-3">No favorites saved yet.</h4>
  </div>
);

  
  }

  return (
    <div className="container my-4">
      {/* Flex container for title and button on same row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">⭐ My Favorites</h2>
        <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      <div className="row">
        {favArticle.map((article, index) => (
          <div className="col-md-4 d-flex align-items-stretch" key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              newsUrl={article.url}
              source={article.source}
              date={article.publishedAt}
              onSave={() => handleUnsave(article)}
              isSaved={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
