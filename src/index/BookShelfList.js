import React, { Component } from 'react';
import BookShelf from './BookShelf'



class BookShelfList extends Component{



    /**
    * @description get the selected book with the index from total book Lists
    * update it based on selected  value option
    * @param {event}  event variable which point to selected book
    * @param {index} index of targeted book in total bookList
    */


    render(){
        const {bookList,label,handleInputChange} = this.props
        return(
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{label}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(bookList.length >0)?
                            bookList.map((book,index)=>{
                                return <BookShelf book={book}
                                                  handleSelectChange={handleInputChange}
                                                  index={index}
                                                  key={book.id}
                                                  shelf={book.shelf}
                                                  />}):
                            null}
                    </ol>
                  </div>
                </div>


        )
    }
}


export default BookShelfList;
