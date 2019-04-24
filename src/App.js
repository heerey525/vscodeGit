import React from "react";
import { Router, Route, hashHistory } from 'react-router';
// import logo from "./logo.svg";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: []
    };
  }
  componentWillMount() {
    this.getData();
  }
  getData() {
    fetch("http://127.0.0.1:3000/top/list?idx=2", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ musicList: data.playlist.tracks });
        // document.write(JSON.stringify(data))
      });
  }
  handleClick(id){
    window.location.href='localhost:9000/music'
  }
  render() {
    const {musicList} = this.state;
    return (
      <ul>
        <Router history={hashHistory}>
          <Route path="/music" component={App}/>
        </Router>
        {musicList.map(item => <li key={item.id} onClick={()=>this.handleClick(item.id)}>{item.name}</li>)}
      </ul>
    );
  }
}
