import React, { Component } from 'react';
import './App.css';
import './components/navbar/NavBar'
import BlogList from './components/lists/BlogList'
import Navbar from './components/navbar/NavBar';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "70px" }}>
          <BlogList />
        </div>
      </div>
    );
  }
}

export default App;
