import React, { useEffect, useState } from "react";
import "./BookShelf.css";
import Card from "../../components/card/Card";

export default function BookShelfPage() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBooks);
  }, []);

  const handleRemoveBook = () => {
    const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBooks);
  };

  return (
    <div className="bookshelf">
      <div className="container">
        <h1>Your Bookshelf</h1>
        <div className="list">
          {bookshelf.length === 0 ? (
            <p>No books in your bookshelf</p>
          ) : (
            bookshelf.map((book, index) => (
              <Card
                key={index}
                title={book.title}
                editionCount={book.editionCount}
                isInBookshelf={true}
                onRemove={handleRemoveBook}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
