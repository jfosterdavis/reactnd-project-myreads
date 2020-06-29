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
    //start by getting all books on my shelves.
      BooksAPI.getAll()
        .then((myBooks) => {
          this.setState(() => ({
            myBooks
          }))
        })
  }

  updateBook = (book, shelf) => {
      //create an updated copy of the book
      let updatedBook = book
      updatedBook.shelf = shelf

      //update the API using the API call to update the shelf
      BooksAPI.update(book, shelf)
        .then((response) => {
            //when the API responds, update the local state
          this.setState((currentState) => ({
            myBooks: currentState.myBooks
                .filter((b) => { //remove the book that is going to be updated
                    return b.id !== book.id
                })
                .concat([updatedBook]) //add the new version of the book
          }))
    })

    
  }

  //an array of the shelves to display on the home screen
  shelvesToDisplay = [
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
                { this.shelvesToDisplay.map((shelf) => (
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
