import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import Loading from './Loading'
import shortId from 'shortid'

class SearchPage extends React.Component {
  state = {
    searchedBooks: [],
    loading: false
  }

  componentDidMount() {
    this.clearSearch()
  }

  changeBookshelf = (book, newBookshelf) => {
    this.setState({ loading: true })
    BooksAPI.update(book, newBookshelf).then(result => {
      this.setState({ loading: false })
    })
  }

  clearSearch = () => {
    this.setState({ searchedBooks: [], loading: false})
  }

  onSearchBoxChange = (event) => {
    const query = event.target.value.trim()

    this.setState({ loading: true })

    if (query.length === 0) {
      this.clearSearch()
      return
    }

    BooksAPI.search(query, 20).then(result => {
      if (!Array.isArray(result)) {
        this.clearSearch()
        return
      }

      this.setState({ searchedBooks: result, loading: false })
    }).catch(error => {
      this.clearSearch()
    });
  }

  render () {
    return (
      <div>
        <Loading loading={this.state.loading} />
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
      </div>
    )
  }
}

export default SearchPage
