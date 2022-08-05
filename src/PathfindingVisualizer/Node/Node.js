import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {
  render() {

    const{
        col,
        row,
        isStart,
        isEnd,
        isWall,
        isWeighted,
        onMouseDown,
        onMouseEnter,
        onMouseUp,

    } =this.props;

    const extraClassName= isEnd ? 'node-end' :
    isStart ? 'node-start' : isWall ? 'node-wall': isWeighted ? 'node-weighted' :'';


    return (
      <div 
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    )
  }
}

export default Node
