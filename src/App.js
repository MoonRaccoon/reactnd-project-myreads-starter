import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (id, shelf) => {
    this.setState((state) => {
      books: state.books.map((book) => {
        if (book.id == id) {
          book.shelf = shelf;
        }
      })
    })

    BooksAPI.update({id: id}, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks currentBooks={this.state.books}
                     onShelfChange={this.changeShelf}/>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
