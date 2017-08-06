import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true})
    BooksAPI.getAll().then((books) => {
      this.setState({books: books, loading:false})
    })
  }

  changeBookshelf = (book, newBookshelf) => {
    this.setState({loading: true})
    BooksAPI.update(book, newBookshelf).then(result => {
      book.shelf = newBookshelf
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book),
        loading: false
      }))
    })
  }

  currentlyReadingBooks = () => {
    return this.state.books.filter((book) => book.shelf === "currentlyReading")
  }

  wantToReadBooks = () => {
    return this.state.books.filter((book) => {
      return book.shelf === "wantToRead"
    })
  }

  readBooks = () => {
    return this.state.books.filter((book) => book.shelf === "read")
  }

  onSearchBoxChange = (event) => {
    if(event.key === 'Enter') {
      this.searchBooks(event.target.value)
    }
  }

  searchBooks = (query) => {
    this.setState({ loading: true })
    BooksAPI.search(query, 20).then(result => {
      if (Array.isArray(result)) {
        let updatedResult = result.map(newBook => {
          let book = this.state.books.find(book => book.id === newBook.id)

          if (book) {
            newBook.shelf = book.shelf
          }

          return newBook
        })

        this.setState({
          searchedBooks: updatedResult,
          loading: false
        })
      }
    })
  }

  clearSearch = () => {
    this.setState({ searchedBooks: [] })
  }
  render() {
    return (
      <div className="app">
        {
          this.state.loading && (<div className="loading">Loading</div>)
        }

        <Route exact path="/search" render={ () =>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onKeyPress={this.onSearchBoxChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.searchedBooks.map((book) => (
                  <Book key={book.id} book={book} onBookshelfChange={this.changeBookshelf} />
                ))
              }
              </ol>
            </div>
          </div>
        )}></Route>

        <Route exact path="/" render={ () =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.currentlyReadingBooks().map((book) => (
                          <Book key={book.id} book={book} onBookshelfChange={this.changeBookshelf} />
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.wantToReadBooks().map((book) => (
                          <Book key={book.id} book={book} onBookshelfChange={this.changeBookshelf} />
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        this.readBooks().map((book) => (
                          <Book key={book.id} book={book} onBookshelfChange={this.changeBookshelf} />
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" onClick={this.clearSearch}>Add a book</Link>
            </div>
          </div>
        )}></Route>
      </div>
    )
  }
}

export default BooksApp
