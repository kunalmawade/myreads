import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Book from './Book'
import shortId from 'shortid'

class BooksApp extends React.Component {
  static bookshelves = [
    { key: 'currentlyReading', value: 'Currently Reading'},
    { key: 'wantToRead', value: 'Want to Read'},
    { key: 'read', value: 'Read'}
  ]

  state = {
    books: [],
    searchedBooks: [],
    loading: false
  }

  componentDidMount() {
    if (window.location.pathname === '/') {
      this.showLoading()
    }
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      this.hideLoading()
    })
  }

  changeBookshelf = (book, newBookshelf) => {
    this.showLoading()
    BooksAPI.update(book, newBookshelf).then(result => {
      book.shelf = newBookshelf
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }))
      this.hideLoading()
    })
  }

  filterBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => book.shelf === shelf)
  }

  clearSearch = () => {
    this.setState({ searchedBooks: []})
    this.hideLoading()
  }

  showLoading = () => {
    this.setState({ loading: true })
  }

  hideLoading = () => {
    this.setState({ loading: false })
  }

  findBooks = (query) => {
    BooksAPI.search(query, 20).then(result => {
      if (!Array.isArray(result)) {
        this.clearSearch()
        return
      }

      const searchedBooks = result.map(newBook => {
        const book = this.state.books.find(book => book.id === newBook.id)

        if (book) {
          newBook.shelf = book.shelf
        }

        return newBook
      })

      this.setState({ searchedBooks })
      this.hideLoading()
    }).catch(error => {
      this.clearSearch()
    });
  }


  onSearchBoxChange = (event) => {
    const query = event.target.value.trim()

    if (query.length === 0) {
      this.clearSearch()
      return
    }

    this.showLoading()
    this.findBooks(query)
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
                <input type="text" placeholder="Search by title or author" onChange={this.onSearchBoxChange}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.searchedBooks.map((book) => (
                  <Book key={shortId.generate()} book={book} onBookshelfChange={this.changeBookshelf} />)
                )
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
            {
              BooksApp.bookshelves.map(bs => (
                  <Bookshelf  bookshelfTitle={bs.value}
                              key={bs.key}
                              booksInShelf={this.filterBooksByShelf(bs.key)}
                              changeBookshelf={this.changeBookshelf}>
                  </Bookshelf>
              ))
            }
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
