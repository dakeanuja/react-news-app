import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchNews } from "../services/newsServices.js";
import NewsItem from "./NewsItem.js";
import no_news_found from "../assets/no_news_found.jpg";
import "./NewsComponent.css";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

export default function NewsComponent({ category }) {
  const { searchQuery } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasMore, setHasMore] = useState(true);
  const [savedArticles, setSavedArticles] = useState(() =>
    JSON.parse(localStorage.getItem("favoriteArticles") || "[]")
  );
  const pageSize = 6;

  // ✅ Handle network status (online/offline)
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ✅ Handle Save / Unsave
  const handleSave = (article) => {
    let updated = [...savedArticles];
    const exists = updated.find((a) => a.url === article.url);

    if (exists) {
      updated = updated.filter((a) => a.url !== article.url);
      toast.info("Removed from favourites");
    } else {
      updated.push(article);
      toast.success("Added to favourites");
    }

    localStorage.setItem("favoriteArticles", JSON.stringify(updated));
    setSavedArticles(updated);
  };

  // ✅ Load news
  const loadNews = async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);
      const data = await fetchNews(searchQuery || category, pageNumber, pageSize);

      if (data.status === "error" && data.code === "maximumResultsReached") {
        // When API free limit reached
        setHasMore(false);
        return;
      }

      if (append) {
        setArticles((prev) => [...prev, ...data.articles]);
      } else {
        setArticles(data.articles);
      }

      setTotalResults(data.totalResults);
      setHasMore(pageNumber * pageSize < data.totalResults);
    } catch (error) {
      toast.error("Error fetching news");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    setPage(1);
    loadNews(1, false);
  }, [searchQuery, category]);

  // ✅ Infinite scroll handler
  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNews(nextPage, true);
  };

  // ✅ Loading placeholder
  if (loading && articles.length === 0) {
    return (
      <div className="container my-4">
        <h2 className="mb-4">Top Headlines</h2>
        <div className="row">
          {[...Array(6)].map((_, i) => (
            <div className="col-md-4 d-flex align-items-stretch" key={i}>
              <div className="card my-3 placeholder-glow" style={{ width: "18rem" }}>
                <div className="bg-secondary" style={{ height: "180px" }}></div>
                <div className="card-body">
                  <h5 className="card-title placeholder col-8"></h5>
                  <p className="card-text placeholder col-10"></p>
                  <button className="btn btn-primary disabled placeholder col-6"></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ No news found
  if (!loading && articles.length === 0) {
    return (
      <div className="text-center my-5">
        <img src={no_news_found} alt="No news found" style={{ width: "300px" }} />
        <h4 className="mt-3">No News Found</h4>
      </div>
    );
  }

  // ✅ Title logic
  const categoryTitles = {
    general: "Top Headlines",
    business: "Business News",
    entertainment: "Entertainment News",
    sports: "Sports News",
    health: "Health News",
    science: "Science News",
    technology: "Technology News",
  };
  const title = searchQuery
    ? `Search results for "${searchQuery}"`
    : categoryTitles[category] || "Top Headlines";

  return (
    <>
      {!isOnline && (
        <div
          style={{
            backgroundColor: "#ff4d4f",
            color: "white",
            textAlign: "center",
            padding: "8px",
            position: "fixed",
            top: 0,
            width: "50%",
            zIndex: 9999,
          }}
        >
          🚫 No internet connection
        </div>
      )}

      <div className="container my-4">
        <h2 className="mb-4">{title}</h2>

        {/* ✅ Infinite Scroll Section */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h5 className="text-center my-3">Loading more articles...</h5>}
          endMessage={
            <p className="text-center text-muted my-3">
               You're all caught up! <br />
              (API limit reached)
            </p>
          }
        >
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4 d-flex align-items-stretch" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  source={article.source}
                  date={article.publishedAt}
                  onSave={() => handleSave(article)}
                  isSaved={savedArticles.some((a) => a.url === article.url)}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
