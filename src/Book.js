import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookAction from "./BookAction";

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        initialShelf: PropTypes.string.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired,

    }



    render() {

        const {book, initialShelf, onChangeBookShelf} = this.props


        let firstAuthorString, otherAuthorsString

        //handle the different cases of author array
        if (typeof book.authors !== 'undefined' && book.authors) {
            if (book.authors.length > 0) {
                let authorListCopy = [...book.authors] //create a copy of the authors for mutation
                firstAuthorString = authorListCopy.shift().trim()
                if (book.authors.length > 1) { //multiple authors
                    otherAuthorsString = authorListCopy.map((a) => (`, ${a}`))
                } else { //single author
                    otherAuthorsString = ''
                }
            } else { //empty
                firstAuthorString = 'No author'
                otherAuthorsString = ''
            }
        } else { //empty or non existent

            firstAuthorString = 'No author'
            otherAuthorsString = ''
        }

        const authorString = `${firstAuthorString}${otherAuthorsString}`

        //set image links, and handle case where no image link is provided
        let imageThumbnailLink = ''
        if (typeof book.imageLinks !== 'undefined') {
            imageThumbnailLink = book.imageLinks.smallThumbnail
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageThumbnailLink}"` }}></div>
                    <div className="book-shelf-changer">
                        <BookAction
                            book={book}
                            initialShelf={initialShelf}
                            onChangeBookShelf={onChangeBookShelf}
                        />
                    </div>
                </div>
                <div className="book-title">{book.title}</div>

                <div className="book-authors">{authorString}</div>
            </div>

        )
    }


}

export default Book