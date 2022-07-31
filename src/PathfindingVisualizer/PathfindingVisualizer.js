import React, { Component , useState } from 'react'
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import { dijkstra ,getNodesInShortestPathOrder} from '../Algorithms/DijkstrasAlgorithm';

export class PathfindingVisualizer extends Component {
    
    

    constructor(props) {
        super();
        this.state = {
          grid: []
          
        };
      }

      componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
      }

     showVisited(visitedNodesInOrder){
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                return;
            }
            else{
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
                  }, 10 * i);
            }

     }
    }
     
    

    visualizeDijkstra(){
        const {grid} =this.state;
        const start=grid[10][10];
        const end=grid[10][30];
        const visitedNodesInOrder = dijkstra(grid,start,end);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(end);
        this.showVisited(visitedNodesInOrder);
    }

    
    
  render() {
    const {grid} = this.state;
    

    return (
      <div className='parent'>
      <div className='header'>
        <h1>Pathfinding Visualizer</h1>
      </div>
      <div className='InfoBox'>
        
        <button className='algoName' onClick={() => this.visualizeDijkstra()}>Visualize</button>
      </div>
      <div className="grid">
      {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {col,row,isStart,isEnd} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isEnd={isEnd}></Node>
                  );
                })}
              </div>
            );
          })}
           
        </div>
      </div>
    )
  }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart : row === 10 && col === 10,
      isEnd :row ===10 && col ===30,
      distance :Infinity,
      isVisited: false,
      previousNode: null
    };
  };

export default PathfindingVisualizer