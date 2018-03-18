import React from 'react'
import { Route,Switch } from 'react-router-dom'
import SearchPage from './search/SearchPage'
import IndexPage from './index/IndexPage'
import NotFound from './NotFound'
import './App.css'

class BooksApp extends React.Component {
  
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
