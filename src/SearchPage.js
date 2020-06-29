import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import BooksGrid from "./BooksGrid";

class SearchPage extends Component {
    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired,

    }

    state = {
        query: '',
        resultBooks: [],
        resultText: 'Enter a search term above.'
    }

    updateQuery = (query) => {
        const adjustedQuery = query

        this.setState(() => ({
            query: adjustedQuery
        }))

        if (adjustedQuery !== '') //don't send the query if it is blank.
        {
            BooksAPI.search(adjustedQuery)
                .then((resultBooks) => {
                    console.log("search result: ", resultBooks)
                    if (!resultBooks || resultBooks.error) { //if there is a blank/undefined result or an error
                        this.setState(() => ({
                            resultBooks: [],
                            resultText: `No books found for "${adjustedQuery}".  Please try a different search.`
                        }))
                    } else { //else the resultant query appears to contain data, so update the state
                        this.setState(() => ({
                            resultBooks: this.blendResultsWithMyBooks(resultBooks),
                            resultText: `Showing ${resultBooks.length} books found for "${adjustedQuery}"`
                        }))
                    }
                })
        }

    }

    clearQuery = () => {
        this.updateQuery('')
    }

    //take the books resulted from a query, and give the current shelf from my books if able, or set shelf to None
    blendResultsWithMyBooks(booksFromQuery, myBooks = this.props.myBooks) {
        return booksFromQuery.map((qBook) => {
            let newBook = qBook;

            //get any books that are in myBooks
            const matchedBook = myBooks.filter((mB) => (
                mB.id === newBook.id
            ));
            //console.log("Matched book: ", matchedBook)
            //if a match was found, give it that book's shelf.  If not, give it a shelf of none.
            newBook.shelf = matchedBook.length > 0 ? matchedBook[0].shelf : 'none';

            return newBook
        })
    }

    render() {
        const { query, resultBooks, resultText } = this.state
        const { onChangeBookShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={'/'} className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    {
                        resultBooks.length !== 0 ?
                        (
                            <div>
                                <span>{resultText}</span>
                                <BooksGrid
                                    books={resultBooks}
                                    onChangeBookShelf={onChangeBookShelf}
                                />

                            </div>
                    ) : (
                            <div>

                                <span>{resultText}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default SearchPage
