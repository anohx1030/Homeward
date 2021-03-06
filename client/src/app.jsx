import React, { Component } from 'react'
import { render } from 'react-dom'
import Login from './login.jsx'
import Preferences from './preferences.jsx'
import Profile from './profile.jsx'
const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = function () {
      let obj = {
        userNumber: null,
        loggedIn: false,
        number:null,
      };
      return obj;
    }();
    this.letterChange = this.letterChange.bind(this)
  }
  letterChange(e) {
    let obj = Object.assign({}, this.state);
    console.log(obj.winner)
    //if the current space is empty
    if (obj.winner === 'no') {
      if (obj.letters[e.target.id] === '-') {
        //assign the 'current turn' letter to the clicked space
        obj.letters[e.target.id] = obj.turn;
        //check if the marked box completes a win
        if (obj.letters['1'] !== "-" && obj.letters['1'] === obj.letters['2'] && obj.letters['1'] === obj.letters['3']) { obj.winner = obj.letters['1'] }
        if (obj.letters['1'] !== "-" && obj.letters['1'] === obj.letters['4'] && obj.letters['1'] === obj.letters['7']) { obj.winner = obj.letters['1'] }
        if (obj.letters['1'] !== "-" && obj.letters['1'] === obj.letters['5'] && obj.letters['1'] === obj.letters['9']) { obj.winner = obj.letters['1'] }
        if (obj.letters['2'] !== "-" && obj.letters['2'] === obj.letters['5'] && obj.letters['2'] === obj.letters['8']) { obj.winner = obj.letters['2'] }
        if (obj.letters['3'] !== "-" && obj.letters['3'] === obj.letters['6'] && obj.letters['3'] === obj.letters['9']) { obj.winner = obj.letters['3'] }
        if (obj.letters['3'] !== "-" && obj.letters['3'] === obj.letters['5'] && obj.letters['3'] === obj.letters['7']) { obj.winner = obj.letters['3'] }
        if (obj.letters['4'] !== "-" && obj.letters['4'] === obj.letters['5'] && obj.letters['4'] === obj.letters['6']) { obj.winner = obj.letters['4'] }
        if (obj.letters['7'] !== "-" && obj.letters['7'] === obj.letters['8'] && obj.letters['7'] === obj.letters['9']) { obj.winner = obj.letters['7'] }
        //then alternate to the other player's turn
        obj.turn === "X" ? obj.turn = "O" : obj.turn = "X"
      }
    }
    if (obj.winner !== "no") {
      setTimeout(function () { alert(`${obj.winner}` + ' has won the game!') }, 200)
    }
    this.setState(obj)
  }

  registerUser(e){
console.log(e)
  }

  render() {
    let pageToRender;
    if (this.state.loggedIn === false) { pageToRender = <Login /> }
    if (this.state.loggedIn === "test1") { pageToRender = <Preferences /> }
    if (this.state.loggedIn === "test2") { pageToRender = <Profile /> }
    return (
      <div id="App">
        {pageToRender}
      </div>
    )
  }
}
//app constructor ends


render(<App />, document.getElementById('content'));

