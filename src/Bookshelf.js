import React from 'react';
import Book from './Book'
import shortId from 'shortid'

const Bookshelf = ({ bookshelfTitle, booksInShelf, changeBookshelf }) => {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  booksInShelf.map((book) => (
                    <Book key={shortId.generate()} book={book} onBookshelfChange={changeBookshelf} />
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