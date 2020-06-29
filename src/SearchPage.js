import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

class SearchPage extends Component {
    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        onChangeBookStatus: PropTypes.func.isRequired,

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
                            resultBooks,
                            resultText: `${resultBooks.length} books found for "${adjustedQuery}"`
                        }))
                    }
                })
        }

    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query, resultBooks, resultText } = this.state
        const { myBooks, onChangeBookStatus } = this.props

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
                                <ol className="books-grid"></ol>
                                <span>{resultText}</span>
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
