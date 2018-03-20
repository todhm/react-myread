import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import *  as BooksAPI  from '../BooksAPI'
import BookShelfList from './BookShelfList'
import './IndexPage.css'
class IndexPage extends Component{

    state ={bookList:[]}


    handleInputChange=(e,index,book)=>{
        const shelf=e.target.value;
        this.setState((prevState,prop)=>{
            BooksAPI.update(book,shelf).then((res)=>{
                BooksAPI.getAll().then((res)=>{
                    this.setState((prevState,prop)=>({bookList:res}));
                })
            });


        })
    }

    /**
    * @description get the total book Lists.
    */
    componentDidMount(){
        BooksAPI.getAll().then((res) => {
            this.setState((prevState,prop)=>({bookList:res}));
        })
    }


    render(){
        const {bookList} = this.state
        let wantToRead =  bookList.filter((book)=>book.shelf==="wantToRead")
        let currentlyReading = bookList.filter((book)=>book.shelf==="currentlyReading")
        let read =  bookList.filter((book)=>book.shelf==="read");
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                    <BookShelfList
                        bookList={wantToRead}
                        label="Want To Read"
                        handleInputChange={this.handleInputChange}
                        />
                    <BookShelfList
                        bookList={currentlyReading}
                        label="Currently Reading"
                        handleInputChange={this.handleInputChange}

                        />
                    <BookShelfList
                        bookList={read}
                        label="Read"
                        handleInputChange={this.handleInputChange}
                        />

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
