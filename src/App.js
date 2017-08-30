import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (id, shelf) => {
    this.setState((state) => {
      books: state.books.map((book) => {
        if (book.id === id) {
          book.shelf = shelf;
        }
      })
    })

    BooksAPI.update({id: id}, shelf)
  }

  bookSearch = (query) => {
    BooksAPI.search(query, 20).then((results) => {
      results.error === "empty query" ?
        this.setState({ searchResults: [] })
        :
        this.setState({ searchResults: results })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks currentBooks={this.state.books}
                     onShelfChange={this.changeShelf}/>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks searchResults={this.state.searchResults}
                       onBookSearch={this.bookSearch}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
