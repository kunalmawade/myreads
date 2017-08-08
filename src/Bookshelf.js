import React from 'react';
import Book from './Book'

const Bookshelf = (props) => {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  props.booksInShelf.map((book) => (
                    <Book key={book.id} book={book} onBookshelfChange={props.changeBookshelf} />
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