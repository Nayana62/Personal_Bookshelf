import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedQuery = query.trim();
      setDebouncedValue(trimmedQuery);

      if (trimmedQuery.length <= 2) {
        setBooks([]);
        setLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (query !== "") {
      const handleSearch = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(
              debouncedValue
            )}&limit=10&fields=key,title,edition_count`
          );
          const json = await response.json();
          setBooks(json.docs);
        } catch (error) {
          console.log("Error while fetching data", error);
        } finally {
          setLoading(false);
        }
      };
      handleSearch();
    } else {
      setBooks([]);
    }
  }, [debouncedValue]);

  console.log("debouncedValue", debouncedValue);
  console.log("books", books);

  return (
    <div className="home">
      <div className="container">
        <div className="header">
          <div>
            <h1>Search by book name:</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                name="search"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
          <Link to={"/book-shelf"}>
            <button className="green-btn">My BookShelf</button>
          </Link>
        </div>
        <div>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="cards">
              {books.length === 0 ? (
                <p>No results</p>
              ) : (
                books.map((book) => (
                  <Card
                    key={book.key}
                    title={book.title}
                    editionCount={book.edition_count}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
