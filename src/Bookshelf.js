import React from 'react';
import Book from './Book'
import shortId from 'shortid'

const Bookshelf = ({ title, booksInShelf, onChange }) => {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  booksInShelf.map((book) => (
                    <Book key={shortId.generate()} book={book} onBookshelfChange={onChange} />
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Bookshelf