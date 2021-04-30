import React, { Component } from 'react';
import  Toolbar  from './Toolbar.js'
import Display from './Display.js'
import './css/home.css'

export default class Home extends Component {
    render(){
      return (
          <div>
            <div id="intro">
                <h3>Welcome to AlgoVis by Jack Leckrone</h3>
                <p>Just another sorting algorithm visualizer (SEIZURE WARNING)</p>
            </div>
            <Toolbar />
            <Display />
          </div>
      );
    }
}