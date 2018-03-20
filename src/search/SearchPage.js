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

    searchQuery = debounce((query)=>{
        (query.length >=3)?
            BooksAPI.search(query).then(res=>{
                    //call BooksAPI.get function to recieve shelf of book
                    const bookList = res.map((book)=>BooksAPI.get(book.id))
                    Promise.all(bookList).then((res)=> {
                        (this.state.searchWord.length>=3)?
                            this.setState({searchBookList:res})
                            :this.setState({searchBookList:[]})
                    })
                })
            :this.setState({searchBookList:[]})


    },500)


    handleInputChange=(e)=>{
        let query = e.target.value;
        this.setState({searchWord:query});
        this.searchQuery(this.state.searchWord)
    }


    handleSelectChange=(e,index,book)=>{
        let shelf = e.target.value;
        if (shelf !== "none")
            this.setState((prevState,prop)=>{
                book['shelf'] = shelf;
                BooksAPI.update(book,shelf).then((res)=>{
                    if(res)
                        alert("Successfully added to your shelf")
                        let newBookList = this.state.searchBook;
                        newBookList[index] = book
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
                         />



                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                {
                (searchBookList.length>0)?
                    searchBookList.map((book,index)=>(
                        <BookShelf
                         index={index}
                         book={book}
                         handleSelectChange={this.handleSelectChange}
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
