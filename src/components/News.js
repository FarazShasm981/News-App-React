import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  // const { country, category, pageSize, setProgress } = props;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const fetchMoreData = async () => {
    try {     
      console.log('API KEY',props.apiKey)
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url, {
        method: "GET"
        // headers: {
          //   "Content-Type": "application/json",
          //   Accept: "application/json",
          // },
        });
      if (!data.ok) throw new Error(`Error: ${data.status}`); // Check HTTP response
      let parsedData = await data.json();
      if (parsedData.status === "error") {
        alert("API error: " + parsedData.message);
      }
      if (!parsedData.articles) throw new Error("No articles found");
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };
  const updateNews = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url, {
        method: "GET"
        // headers: {
        //   "Content-Type": "application/json",
        //   Accept: "application/json",
        // },
      });
      props.setProgress(30);
      if (!data.ok) throw new Error(`Error: ${data.status}`);
      let parsedData = await data.json();
      if (parsedData.status === "error") {
        alert("API error: " + parsedData.message);
      }
      props.setProgress(70);
      if (!parsedData.articles) throw new Error("No articles found");
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Failed to update news:", error.message);
    }
  };

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - InsightNews`;
  }, []);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "30px 0", marginTop: "90px" }}
      >
        Insight News - Top {capitalizeFirstLetter(props.category)}
        {""} Headlines
      </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articles.map((element) => {
                return (
                  <div className="col-md-4">
                    <NewsItem
                      key={element.urlToImage}
                      title={element.title ? element.title.slice(0, 30) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 70)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            ;
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
