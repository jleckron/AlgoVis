import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'

import { setArray } from '../reducers/array'
import { setAlgorithm } from '../reducers/algorithm'
import { setSorting } from '../reducers/sorting'
import { setCurrentSort } from '../reducers/currentSort'
import { setComparisons } from '../reducers/comparisons/index'
import { setNumSwaps } from '../reducers/numSwaps/index'

import selectionSort from '../algorithms/selectionSort'
import insertionSort from '../algorithms/insertionSort'
import quickSort from '../algorithms/quickSort'
import mergeSort from '../algorithms/mergeSort'
import heapSort from '../algorithms/heapSort'
import bubbleSort from '../algorithms/bubbleSort'
import gnomeSort from '../algorithms/gnomeSort'

import './css/toolbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
  }

  componentDidMount(){
    const { generateArray } = this.props
    generateArray(30)
  }

  handleClick(algorithm){
    const { updateAlgorithm } = this.props
    updateAlgorithm(algorithm)
  }

  handleSizeChange(event, newValue){
    const { generateArray, array } = this.props
    if(newValue!==array.length){

      generateArray(newValue)
    }
  }

  render(){
    const {
      array,
      algorithm,
      generateArray,
      sorting,
      sort,
    } = this.props

    let redShade = 50 + (3*(array.length/2))
    let greenShade = 50
    let blueShade = 250 - (3 * (array.length/2))

    const muiTheme = createMuiTheme({
      overrides: {
        MuiSlider: {
          root: {
            width: 300,
            alignSelf: "center"
          },
          thumb: {
            color: sorting ? "lightgrey" : `rgba(${redShade}, ${greenShade}, ${blueShade}, 1)`,
          },
          track: {
            color: sorting ? "grey" : `rgba(${redShade}, ${greenShade}, ${blueShade}, 1)`
          },
          rail: {
            color: "grey",
          },
        }
      }
    });

    const color = sorting  ? "rgb(128, 128, 128)" : "rgb(255, 254, 249)"
    const cursor = !sorting ? "pointer" : "auto"
    const runSpeed = 700 - Math.pow(array.length, 2)
    const disabled = ( sorting ? true : false)

    return ( 
      <div id="toolbar">
        <div
          id="generate"
          style={{color: color, cursor: cursor}}
          onClick={() => generateArray(array.length)}>
          New Array
        </div>
        <div
          id="seperate"
          style={{color: color}}>
          |
        </div>
        <div id="dropdown">
          <Dropdown as={ButtonGroup}>
            <Button variant="light">{algorithm ? algorithm : "Select a Sorting Algorithm"}</Button>
              <Dropdown.Toggle split variant={algorithm ? "light" : "danger"} id="dropdown-split-basic" />

              <Dropdown.Menu>
                {algorithm  ? <Dropdown.Item onClick={() => this.handleClick("")}>Select a Sorting Algorithm</Dropdown.Item> : null }
                <Dropdown.Item onClick={() => this.handleClick("Selection Sort")}>Selection Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleClick("Insertion Sort")}>Insertion Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleClick("Bubble Sort")}>Bubble Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleClick("Gnome Sort")}>Gnome Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleClick("Quick Sort")}>Quick Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleClick("Merge Sort")}>Merge Sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.handleClick("Heap Sort")}>Heap Sort</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          id="seperate"
          style={{color: color}}>
          |
        </div>
        <div
          id="generate"
          style={{color: color, cursor: cursor}}
          onClick={!sorting && algorithm ? () => sort(array, algorithm, runSpeed) : null}>
          {algorithm ? <span>Sort!</span> 
            : <span><KeyboardArrowLeft/> Select an Algorithm!</span>
          }
        </div>
        <div id="slider">
        <ThemeProvider theme={muiTheme}>
          <Slider 
            disabled = {disabled}
            min={6}
            max={130}
            defaultValue={40}
            valueLabelDisplay = "auto"
            onChange={this.handleSizeChange}
          />
        </ThemeProvider><br/>
        <span>Size and Speed</span>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ( {
  array, algorithm, sorting,
} ) => ( {
  array, algorithm, sorting
} );

const mapDispatchToProps = () => dispatch => ({
  generateArray: (size) => {
    let arr = []
    while(arr.length<size){
      arr.push(Math.floor(Math.random() * 400) + 20)
    }
    dispatch(setArray(arr))
    dispatch(setCurrentSort([]))
  },

  updateAlgorithm: (algorithm) => {
    dispatch(setAlgorithm(algorithm))
  },

  sort: (array, algorithm, speed) => {
    let doSort = algorithm === "Selection Sort" ? selectionSort
      : algorithm === "Insertion Sort" ? insertionSort
      : algorithm === "Quick Sort" ? quickSort
      : algorithm === "Merge Sort" ? mergeSort
      : algorithm === "Heap Sort" ? heapSort
      : algorithm === "Bubble Sort" ? bubbleSort
      : algorithm === "Gnome Sort" ? gnomeSort
      : null
    dispatch(setNumSwaps(0))
    dispatch(setComparisons(0))
    dispatch(setCurrentSort([]))
    dispatch(setSorting(true))
    doSort(array, dispatch, speed)
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
