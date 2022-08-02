import React, { Component , useState } from 'react'
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import { dijkstra ,getNodesInShortestPathOrder} from '../Algorithms/DijkstrasAlgorithm';


//Start and End positions

let StartRow=10;
let StartCol=5;
let EndRow=15;
let EndCol=35;


export class PathfindingVisualizer extends Component {
    
    

    constructor(props) {
        super();
        this.state = {
          grid: [],
          mouseIsPressed:false,
          st:"Wall",
          
        };
      }

      componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
      }

      handleMouseDown(row, col) {
        var st="Wall";
        if(row === StartRow && col === StartCol)
        {
            st="Start";
        }
        else if(row === EndRow && col === EndCol)
        {
            st="End";
        }
        this.setState({st:st});
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col, st);
        this.setState({grid: newGrid, mouseIsPressed: true, st: st });
      }

      handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) 
        return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col, this.state.st);
        this.setState({grid: newGrid});
      }

      handleMouseUp() {

        this.setState({ mouseIsPressed: false , st:"Wall"});
      }



      showFinalPath(nodesInShortestPathOrder)
      {
        for(let i=1;i <nodesInShortestPathOrder.length -1; i++)
        {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                console.log(node.row+" & "+ node.col);
                document.getElementById(`node-${node.row}-${node.col}`).className =
      'node node-final';
              }, 50 * i);
        }
      }

     showVisited(visitedNodesInOrder,nodesInShortestPathOrder){
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.showFinalPath(nodesInShortestPathOrder);
                  }, 10*i);
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
        const start=grid[StartRow][StartCol];
        console.log(StartRow +" "+ StartCol);
        const end=grid[EndRow][EndCol];
        const visitedNodesInOrder = dijkstra(grid,start,end);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(end,start);
        this.showVisited(visitedNodesInOrder,nodesInShortestPathOrder);
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
                  const {col,row,isStart,isEnd,isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      mouseIsPressed={this.mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}></Node>
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
      isStart : row === StartRow && col === StartCol,
      isEnd :row ===EndRow && col === EndCol,
      isWall: false,
      distance :Infinity,
      isVisited: false,
      previousNode: null
    };
  };

  const getNewGridWithWallToggled = (grid, row, col,st) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    if(st === "Start"){
        const start=newGrid[StartRow][StartCol];
        const oldStart = {
            ...start,
            isStart: false,
            previousNode:null,
            distance:Infinity
        }
        newGrid[StartRow][StartCol] = oldStart;
        const newStart = {
            ...node,
            isStart: true,
            previousNode: null,
            distance:Infinity
            
            
          };
          StartRow=row;
          StartCol=col;
          newGrid[row][col] = newStart;
    }
    else if(st ==="End")
    {
        const end=newGrid[EndRow][EndCol];
        const oldEnd = {
            ...end,
            isEnd: false,
            
        }
        newGrid[EndRow][EndCol] = oldEnd;
        const newEnd = {
            ...node,
            isEnd: true,
          };
          EndRow=row;
          EndCol=col;
          newGrid[row][col] = newEnd;

    }
    else{
        const newNode={
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
    }
    
    
    return newGrid;
  };

export default PathfindingVisualizer