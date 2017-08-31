/**
 * Created by Shamoun on 8/25/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    onBookAdd: PropTypes.func
  }

  state = {
    shelf: ''
  }

  constructor(props) {
    super(props)
    this.state ={
      shelf: this.props.shelf
    }
  }

  handleShelfChange = (event) => {
    let e = event.target.value
    this.setState({ shelf: e})
    if (this.props.onBookAdd) {
      this.props.onBookAdd(this.props.id)
    }
    this.props.onShelfChange(this.props.id, e)
  }

  render() {
    const { title, authors, imageURL } = this.props
    const { shelf } = this.state
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageURL}}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleShelfChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book;