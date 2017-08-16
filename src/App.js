import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/search" component={SearchPage} />

        <Route exact path="/" component={HomePage}/>
      </div>
    )
  }
}

export default BooksApp
