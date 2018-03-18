import React from 'react'
import { Route,Switch } from 'react-router-dom'
import SearchPage from './search/SearchPage'
import IndexPage from './index/IndexPage'
import NotFound from './NotFound'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
          <Switch>
              <Route exact path='/search' render={() => (
                              <SearchPage/>
                          )}/>
              <Route exact path='/' render={() => (
                              <IndexPage/>
                          )}/>
              <Route path='*' render={() => (
                              <NotFound/>
                          )}/>
          </Switch>
      </div>
    )
  }
}

export default BooksApp
