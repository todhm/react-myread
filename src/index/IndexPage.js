import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import *  as BooksAPI  from '../BooksAPI'
import BookShelf from './BookShelf'
import './IndexPage.css'
class IndexPage extends Component{

    state ={bookList:[]}

    componentDidMount(){
        BooksAPI.getAll().then((res) => {
            this.setState((prevState,prop)=>({bookList:res}));
        })
    }
    handleInputChange=(e,index)=>{
        const shelf=e.target.value;
        this.setState((prevState,prop)=>{
            let targetBook=prevState.bookList[index]
            BooksAPI.update(targetBook,shelf).then((res)=>{
                BooksAPI.getAll().then((res)=>{
                    this.setState((prevState,prop)=>({bookList:res}));
                })
            });


        })
    }

    render(){
        const {bookList} = this.state
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                {bookList.map((book,index)=>{
                    if(book.shelf==="currentlyReading"){
                        return <BookShelf book ={book} handleInputChange={this.handleInputChange} index={index} key={book.id} shelf={book.shelf}/>
                    }
                })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                {bookList.map((book,index)=>{
                    if(book.shelf==="wantToRead"){
                        return <BookShelf book ={book} handleInputChange={this.handleInputChange} index={index} key={book.id} shelf={book.shelf}/>
                    }
                })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                {bookList.map((book,index)=>{
                    if(book.shelf=="read"){
                        return <BookShelf book ={book} handleInputChange={this.handleInputChange} index={index} key={book.id} shelf={book.shelf}/>
                    }
                })}
                    </ol>
                  </div>
                </div>

                </div>
              </div>
                  <div className="open-search">
                    <Link to='/search'>
                        Add a book
                    </Link>
                  </div>
            </div>
        )
    }
}


export default IndexPage
