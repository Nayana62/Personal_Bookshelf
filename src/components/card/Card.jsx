import React, { useEffect, useState } from "react";
import "./Card.css";

export default function Card({ title, editionCount, isInBookshelf, onRemove }) {
  const [isBookInBookshelf, setIsBookInBookshelf] = useState(isInBookshelf);

  useEffect(() => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const isBookAlreadyInShelf = bookshelf.some(
      (item) => item.title === title && item.editionCount === editionCount
    );
    setIsBookInBookshelf(isBookAlreadyInShelf);
  }, [title, editionCount]);

  const handleAddToBookshelf = () => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const book = { title, editionCount };

    bookshelf.push(book);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    setIsBookInBookshelf(true);
  };

  const handleRemoveFromBookshelf = () => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBookshelf = bookshelf.filter(
      (item) => item.title !== title || item.editionCount !== editionCount
    );
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setIsBookInBookshelf(false);
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="card">
      <div>
        <h3>Book title:</h3>
        <p>{title}</p>
      </div>
      <div>
        <h3>Edition count:</h3>
        <p>{editionCount}</p>
      </div>

      {isBookInBookshelf ? (
        <button className="red-btn" onClick={handleRemoveFromBookshelf}>
          Remove from Bookshelf
        </button>
      ) : (
        <button className="green-btn" onClick={handleAddToBookshelf}>
          Add to Bookshelf
        </button>
      )}
    </div>
  );
}
