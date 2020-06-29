import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from "./Book";

class BooksGrid extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired,
    }

    render() {

        const {books, onChangeBookShelf} = this.props

        return (
            <ol className="books-grid">
                {books.map((book)=> (
                    <li key={book.id} className={''}>
                        <Book
                            book={book}
                            onChangeBookShelf={onChangeBookShelf}
                        />
                    </li>
                ))}
            </ol>

        )
    }


}

export default BooksGrid