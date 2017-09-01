/**
 * Created by Shamoun on 8/28/17.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    onBookAdd: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired,
    onBookSearch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.searchTerms = ['Android', 'Art', 'Artificial Intelligence',
      'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat',
      'Biography', 'Brief', 'Business', 'Camus', 'Cervantes',
      'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
      'Cycling', 'Desai', 'Design', 'Development',
      'Digital Marketing', 'Drama', 'Drawing', 'Dumas',
      'Education', 'Everything', 'Fantasy', 'Film', 'Finance',
      'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi',
      'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka',
      'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction',
      'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate',
      'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
      'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
      'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
      'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
      'Virtual Reality', 'Web Development', 'iOS']
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    const match = new RegExp("^" + query + "$", 'i')
    let result = this.searchTerms.filter((term) => match.test(term))
    if (result.length === 1) {
      this.props.onBookSearch(result.toString())
    }
  }

  getShelf = (id) => {
    for (let i = 0; i < this.props.currentBooks.length; i++) {
      if (this.props.currentBooks[i].id === id) {
        return this.props.currentBooks[i].shelf
      }
    }
    return "none"
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={this.state.query}
                   onChange={(event) => (this.updateQuery(event.target.value))}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.props.searchResults.length === 0 &&
            <div>
              <p>Currently showing no results.
                 Press "enter" to perform a search.</p>
              <p>If you've attempted a search already, try a
                 different query! (For example, "Art")</p>
            </div>
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
                        shelf={this.getShelf(book.id)}
                        onShelfChange={this.props.onShelfChange}
                        onBookAdd={this.props.onBookAdd}/>
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;