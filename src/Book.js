import React from 'react';

class Book extends React.Component {
  state = {
    bookshelf: "none"
  }

  handleChange = (event) => {
    this.setState({bookshelf: event.target.value});
    this.props.onBookshelfChange(this.props.book, event.target.value);
  }

  componentDidMount() {
    this.setState({
      bookshelf: this.props.book.shelf
    })
  }

  render() {
    let book = this.props.book

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.bookshelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
        </div>
      </li>
    )
  }
}

export default Book