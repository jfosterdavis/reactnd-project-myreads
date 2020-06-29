import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookAction from "./BookAction";

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired,

    }

    render() {

        const {book, onChangeBookShelf} = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}"` }}></div>
                    <div className="book-shelf-changer">
                        <BookAction
                            book={book}
                            onChangeBookShelf={onChangeBookShelf}
                        />
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>

        )
    }


}

export default Book