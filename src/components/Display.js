import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import './css/display.css'

class Display extends Component {
  
  render(){
    const {
      array,
      algorithm,
      currentCompare,
      currentSwap,
      currentSort,
      pivot,
      comparisons,
      numSwaps
    } = this.props

    const widthNum = Math.floor($(document).width() / (array.length * 3))
    const width = `${widthNum}px`

    const margin = array.length < 10 ? 8
      : array.length < 20 ? 6
      : array.length < 50 ? 4
      : array.length < 100 ? 3
      : array.length < 150 ? 2.5
      : 2
    const marginpx = `${margin}px`

    const nSqaure = <span>O(n<sup>2</sup>) </span>
    const quickTime = <span>O(n log n), or in rare cases O(n<sup>2</sup>)</span>
    const nLogN = <span>O(n log n)</span>
 

    return (
      <div id="body">
          { array.length>0 ? array.map((num, index) => {
            const rectColor = currentSwap.includes(index) ? "#ff4d4d" //red
              : currentCompare.includes(index) ? "#6eff77" //green
              : currentSort.includes(index) ? "#8794ff" //purple
              : index === pivot ? "#ebeb00" //yellow
              : "#78cfc6" //cyan
            return (
              <div  className="rectangle"
                    key={index}
                    style={ {height: `${num}px`, width:width, backgroundColor: rectColor, marginLeft: marginpx, marginRight: marginpx, color:(widthNum >= 30 ? "transparent" : "transparent")} }
              >
              {num}
              </div>
            )
          }) : null }
          <div className="info">
              <span>{algorithm ? "Completes in " : null}</span>
              {algorithm === "Selection Sort" ? nSqaure
              : algorithm === "Insertion Sort" ? nSqaure
              : algorithm === "Quick Sort" ? quickTime
              : algorithm === "Merge Sort" ? nLogN
              : algorithm === "Heap Sort" ? nLogN
              : algorithm === "Bubble Sort" ? nSqaure
              : algorithm === "Gnome Sort" ? nSqaure
              :null
              }
            <br/>
            <span>{ comparisons > 0 ? "Comparisons: " + comparisons : null}</span>&nbsp;&nbsp;
            <span>{numSwaps > 0 ? "Swaps: " + numSwaps : null}</span>
          </div>
      </div>
    );
  }
}

const mapStateToProps = ( {
  array, 
  algorithm,
  currentCompare, 
  currentSort,
  currentSwap, 
  pivot,
  comparisons,
  numSwaps
} ) => ( {
  array, 
  algorithm,
  currentCompare, 
  currentSort, 
  currentSwap, 
  pivot,
  comparisons,
  numSwaps
} );

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Display)