import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {
  render() {

    const{
        col,
        row,
        isStart,
        isEnd,
        distance,
        isVisited,

    } =this.props;

    const extraClassName= isEnd ? 'node-end' :
    isStart ? 'node-start' : '';


    return (
      <div 
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}>
      </div>
    )
  }
}

export default Node
