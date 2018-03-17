import React, { Component } from 'react';
import './IndexPage.css'
import PropTypes from 'prop-types'

class BookShelf extends Component{

    static propTypes = {
       book: PropTypes.object.isRequired,
       handleInputChange: PropTypes.func.isRequired,
       index:PropTypes.number.isRequired,
       shelf:PropTypes.string.isRequired
     }

render(){
    const { book,handleInputChange,index,shelf } = this.props

    return(


              <li key={book.title}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e)=>{handleInputChange(e,index)}} value={shelf} >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{(book.authors)?book.authors[0]:null}</div>
                </div>
              </li>


    )
}


}


export default BookShelf;
