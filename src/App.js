import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
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

  addToBooks = (id) => {
    // If book is already in current book state, do nothing
    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i].id === id) {
        return
      }
    }
    const bookToAdd = this.state.searchResults.filter(book => (book.id === id))
    this.setState((state) => ({
      books: state.books.concat( bookToAdd )
    }))
  }

  bookSearch = (query) => {
    BooksAPI.search(query, 20).then((results) => {
      results.error === "empty query" ?
        this.setState({ searchResults: [] })
        :
        this.setState({ searchResults: results })
    })
  }

  clearSearch = () => {
    this.setState({ searchResults: [] })
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
                       onBookSearch={this.bookSearch}
                       onShelfChange={this.changeShelf}
                       onBookAdd={this.addToBooks}
                       currentBooks={this.state.books}
                       clearSearch={this.clearSearch}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
