import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    myBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then((myBooks) => {
          this.setState(() => ({
            myBooks
          }))
        })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
        .then((book,shelf) => {
          this.setState((currentState) => ({
            myBooks: currentState.myBooks
          }))
    })

    
  }

  shelves = [
    {
      id: 'wantToRead',
      name: "Want to Read",
    },
    {
      id: 'currentlyReading',
      name: "Currently Reading",
    },
    {
      id: 'read',
      name: "Read",
    },
  ]

  render() {



    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage myBooks={this.state.myBooks} onChangeBookShelf={this.updateBook} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { this.shelves.map((shelf) => (
                  <BookShelf
                      key={`shelf_${shelf.id}`}
                      shelfId={shelf.id}
                      shelfName={shelf.name}
                      books={this.state.myBooks.filter((b) => (
                          b.shelf === shelf.id
                      ))}
                      onChangeBookShelf={this.updateBook}
                  />
                  ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
