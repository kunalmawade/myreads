import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Loading from './Loading'

class HomePage extends React.Component {
  state = {
    books: [],
    loading: false
  }

  static bookshelves = [
    { key: 'currentlyReading', value: 'Currently Reading'},
    { key: 'wantToRead', value: 'Want to Read'},
    { key: 'read', value: 'Read'}
  ]

  componentDidMount() {
    this.setState({ loading: true })
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books, loading: false })
    })
  }

  changeBookshelf = (book, newBookshelf) => {
    this.setState({ loading: true })
    BooksAPI.update(book, newBookshelf).then(result => {
      book.shelf = newBookshelf
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }))
      this.setState({ loading: false })
    })
  }

  filterBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => book.shelf === shelf)
  }

  render () {
    return (
      <div>
        <Loading loading={this.state.loading} />

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {
            HomePage.bookshelves.map(bs => (
                <Bookshelf  title={bs.value}
                            key={bs.key}
                            booksInShelf={this.filterBooksByShelf(bs.key)}
                            onChange={this.changeBookshelf}>
                </Bookshelf>
            ))
          }
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
