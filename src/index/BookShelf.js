import React, { Component } from 'react';
import './IndexPage.css'
import PropTypes from 'prop-types'


/**
* @description render bookshelf compoent inside parnet ol
* @param {book} book object contain all the information about book
* @param {index} index of book in total bookList
* @param {handleSelectChange} function to change status of this book.
*/

const BookShelf = props=>{
    let {book,index,handleSelectChange} = props
    let thumbnail = (book.imageLinks)? book.imageLinks.thumbnail : "";
    let author = (book.authors)? book.authors[0]:"";
    let shelf = book.shelf? book.shelf :"none";
    return(
          <li key={book.title}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{backgroundImage: `url(${thumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e)=>{handleSelectChange(e,index)}} value={shelf} >
                    <option value="undefined" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{author}</div>
            </div>
          </li>
    )

}

BookShelf.propTypes = {
   book: PropTypes.object.isRequired,
   handleSelectChange: PropTypes.func.isRequired,
   index:PropTypes.number.isRequired
 }

export default BookShelf;
