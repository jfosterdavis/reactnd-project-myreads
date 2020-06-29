import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookAction extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired,

    }

    constructor(props) {
        super(props);
        this.state = {
            currentShelf: props.book.shelf,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({currentShelf: event.target.value});

        //when a change happens, also update the app state using the supplied function
        this.props.onChangeBookShelf(this.props.book, event.target.value);
    }

    render() {

        const {book, onChangeBookShelf} = this.props

        return (
                <select value={this.state.currentShelf} onChange={this.handleChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
        )
    }


}

export default BookAction