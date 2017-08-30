/**
 * Created by Shamoun on 8/28/17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onBookSearch(this.state.query)
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <form onSubmit={this.handleSubmit}>
              <input type="text"
                     placeholder="Search by title or author"
                     value={this.state.query}
                     onChange={(event) => (this.updateQuery(event.target.value))}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {this.props.searchResults.length === 0 &&
            <p>Currently showing no results. If you've attempted a search
               already, try a different query! (For example, "Art")</p>
          }
          <ol className="books-grid">
            {this.props.searchResults
              .map((book) => (
                <li key={book.id}>
                  <Book id={book.id}
                        title={book.title}
                        authors={book.authors ? book.authors.join(", ") : ''}
                        imageURL={book.imageLinks ?
                          `url(${book.imageLinks.thumbnail})` : ''}
                        shelf={book.shelf ? book.shelf : "none"}
                        onShelfChange={this.props.onShelfChange}/>
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;