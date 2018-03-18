import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import BookShelf from '../index/BookShelf';
import *  as BooksAPI  from '../BooksAPI'

class SearchPage extends Component{
    state={
        searchWord:"",
        searchBookList:[]
    }

    searchQuery = (query)=>{
        BooksAPI.search(query).then(res=>{
            //call BooksAPI.get function to recieve shelf of book
            const bookList = res.map((book)=>BooksAPI.get(book.id))
            Promise.all(bookList).then((res)=> this.setState((prevState,prop)=>({searchBookList:res})))

        });

    }


    handleInputChange=(e)=>{
        let query = e.target.value;
        this.setState((prevState,prop)=>({searchWord:query}));
        if(query.length<=3)
            this.setState((prevState)=>({searchBookList:[]}))
    }


    handleSelectChange=(e,index)=>{
        let shelf = e.target.value;
        if (shelf !== "none")
            this.setState((prevState,prop)=>{
                let targetBook = prevState.searchBookList[index];
                targetBook['shelf'] = shelf;
                BooksAPI.update(targetBook,shelf).then((res)=>{
                    if(res)
                        alert("Successfully added to your shelf")
                        let newBookList = this.state.searchBook;
                        newBookList[index] = targetBook
                        this.setState({searchBookList:newBookList})
                });
            })
    }

    render(){
        const {searchBookList}= this.state;
        return(
            <div className="search-books">
              <div className="search-books-bar">
                  <Link to='/' className="close-search">
                        Close
                  </Link>
                <div className="search-books-input-wrapper">
                  <input type="text"
                         onChange={this.handleInputChange}
                         value={this.state.searchWord}
                         placeholder="Search by title or author"
                         onKeyPress={event => {
                             if (event.key === 'Enter') {
                                 this.searchQuery(this.state.searchWord)
                             }
                         }}
                         />



                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                {
                (searchBookList.length>0)?
                    searchBookList.map((book,index)=>(
                        <BookShelf
                         book ={book}
                         handleSelectChange={this.handleSelectChange}
                         index= {index}
                         key={book.id}
                         />
                )):null}
                </ol>
              </div>
            </div>
        )
    }
}

export default SearchPage
