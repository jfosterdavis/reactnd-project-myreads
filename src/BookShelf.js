import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksGrid from "./BooksGrid";

class BookShelf extends Component {
    static propTypes = {
        shelfId: PropTypes.string.isRequired,
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired,
    }

    render() {

        const {shelfId, shelfName, books, onChangeBookShelf} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        key={shelfId}
                        books={books}
                        onChangeBookShelf={onChangeBookShelf}
                    />
                </div>
            </div>

        )
    }


}

export default BookShelf