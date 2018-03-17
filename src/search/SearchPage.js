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

    debouncedSearch = debounce((query)=>{
        BooksAPI.search(query).then((res)=>{
            this.setState((prevState,prop)=>({searchBookList:res}));
        })
    },500)


    handleInputChange=(e)=>{
        let query = e.target.value;
        this.setState((prevState,prop)=>({searchWord:query}));
        if(query.length>=3)
        this.debouncedSearch(query)
    }


    handleSelectChange=(e,index)=>{
        let shelf = e.target.value;
        if (shelf !== "none")
            this.setState((prevState,prop)=>{
                let targetBook = prevState.searchBookList[index];
                BooksAPI.update(targetBook,shelf).then((res)=>{
                    if(res)
                        alert("Successfully added to your shelf")
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
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text"
                         onChange={this.handleInputChange}
                         value={this.state.searchWord}
                         placeholder="Search by title or author"
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
                         handleInputChange={this.handleSelectChange}
                         index= {index}
                         key={book.id}
                         shelf={book.shelf? book.shelf :"none"}
                         />
                )):null}
                </ol>
              </div>
            </div>
        )
    }
}

export default SearchPage
