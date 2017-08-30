/**
 * Created by Shamoun on 8/28/17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
  }

  booksOnShelf = (shelf) => {
    return (
      this.props.currentBooks
        .filter((book) => (book.shelf == shelf))
        .map((book) => (
          <li key={book.id}>
            <Book id={book.id}
                  title={book.title}
                  authors={book.authors.join(", ")}
                  imageURL={`url(${book.imageLinks.thumbnail})`}
                  shelf={shelf}
                  onShelfChange={this.props.onShelfChange}/>
          </li>
        )))
  }

  render() {
    return (
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
                  {this.booksOnShelf("currentlyReading")}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.booksOnShelf("wantToRead")}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.booksOnShelf("read")}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;