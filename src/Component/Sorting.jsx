import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sorting.css';

export const Sorting = () => {
    const [inputValue, setInputValue] = useState('');
    const [array, setArray] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [animationSpeed, setAnimationSpeed] = useState(200);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheck = () => {
        const values = inputValue.split(',').map(value => parseInt(value.trim()));
        if (values.length < 30 && values.every(num => !isNaN(num))) {
            setArray(values);
            setNumbers(values);
        } else {
            alert('Please enter up to 30 valid integers separated by commas.');
        }
    };

    const handleClear = () => {
        setInputValue('');
        setArray([]);
        setNumbers([]);
    }

    const handleShuffle = () => {
        const randomArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
        setInputValue(randomArray.join(','));
        setArray(randomArray);
        setNumbers(randomArray);
    }

    const visualizeSort = (algorithm) => {
        const sortingAlgorithms = {
            bubbleSort: (arr) => {
                const animations = [];
                const array = arr.slice();
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        animations.push([...array]); // Push current state before comparison
                        if (array[j] > array[j + 1]) {
                            [array[j], array[j + 1]] = [array[j + 1], array[j]];
                            animations.push([...array]); // Push current state after swap
                        }
                    }
                }
                return animations;
            },
            insertionSort: (arr) => {
                const animations = [];
                const array = arr.slice();
                for (let i = 1; i < array.length; i++) {
                    let key = array[i];
                    let j = i - 1;
                    animations.push([...array]); // Push current state before insertion
                    while (j >= 0 && array[j] > key) {
                        array[j + 1] = array[j];
                        animations.push([...array]); // Push current state after shifting
                        j -= 1;
                    }
                    array[j + 1] = key;
                    animations.push([...array]); // Push current state after insertion
                }
                return animations;
            },
            selectionSort: (arr) => {
                const animations = [];
                const array = arr.slice();
                for (let i = 0; i < array.length - 1; i++) {
                    let minIdx = i;
                    for (let j = i + 1; j < array.length; j++) {
                        animations.push([...array]); // Push current state before comparison
                        if (array[j] < array[minIdx]) {
                            minIdx = j;
                        }
                    }
                    if (minIdx !== i) {
                        [array[i], array[minIdx]] = [array[minIdx], array[i]];
                        animations.push([...array]); // Push current state after swap
                    }
                }
                return animations;
            },
            mergeSort: (arr) => {
                const animations = [];
                const merge = (left, right) => {
                    let result = [];
                    while (left.length && right.length) {
                        animations.push([...result, ...left, ...right]); // Push current state before merging
                        if (left[0] < right[0]) {
                            result.push(left.shift());
                        } else {
                            result.push(right.shift());
                        }
                    }
                    return result.concat(left, right);
                };
        
                const divide = (arr) => {
                    if (arr.length < 2) return arr;
                    const mid = Math.floor(arr.length / 2);
                    const left = divide(arr.slice(0, mid));
                    const right = divide(arr.slice(mid));
                    return merge(left, right);
                };
                divide(arr);
                return animations;
            },
            quickSort: (arr) => {
                const animations = [];
                const quickSortHelper = (arr, low, high) => {
                    if (low < high) {
                        const pivotIndex = partition(arr, low, high);
                        quickSortHelper(arr, low, pivotIndex - 1);
                        quickSortHelper(arr, pivotIndex + 1, high);
                    }
                };
        
                const partition = (arr, low, high) => {
                    const pivot = arr[high];
                    let i = low - 1;
                    for (let j = low; j < high; j++) {
                        animations.push([...arr]); // Push current state before comparison
                        if (arr[j] < pivot) {
                            i++;
                            [arr[i], arr[j]] = [arr[j], arr[i]];
                        }
                    }
                    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                    animations.push([...arr]); // Push current state after partitioning
                    return i + 1;
                };
        
                quickSortHelper(arr.slice(), 0, arr.length - 1);
                return animations;
            },
            shellSort: (arr) => {
                const animations = [];
                const array = arr.slice();
                let gap = Math.floor(array.length / 2);
                while (gap > 0) {
                    for (let i = gap; i < array.length; i++) {
                        let temp = array[i];
                        let j;
                        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                            array[j] = array[j - gap];
                            animations.push([...array]); // Push current state after shifting
                        }
                        array[j] = temp;
                        animations.push([...array]); // Push current state after insertion
                    }
                    gap = Math.floor(gap / 2);
                }
                return animations;
            },
            heapSort: (arr) => {
                const animations = [];
                const array = arr.slice();
        
                const heapify = (arr, n, i) => {
                    let largest = i;
                    const left = 2 * i + 1;
                    const right = 2 * i + 2;
        
                    if (left < n && arr[left] > arr[largest]) largest = left;
                    if (right < n && arr[right] > arr[largest]) largest = right;
        
                    if (largest !== i) {
                        [arr[i], arr[largest]] = [arr[largest], arr[i]];
                        animations.push([...arr]); // Push current state after swap
                        heapify(arr, n, largest);
                    }
                };
        
                for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
                    heapify(array, array.length, i);
                }
        
                for (let i = array.length - 1; i > 0; i--) {
                    [array[0], array[i]] = [array[i], array[0]];
                    animations.push([...array]); // Push current state after swap
                    heapify(array, i, 0);
                }
        
                return animations;
            }
        };

        const animations = sortingAlgorithms[algorithm](array);

        animations.forEach((step, index) => {
            setTimeout(() => {
                const bars = document.querySelectorAll('.bar');
                const values = document.querySelectorAll('.bar-value');
                
                step.forEach((value, i) => {
                    if (bars[i]) {
                        bars[i].style.height = `${value*2.3}px`;
                        bars[i].classList.toggle('active', true); // Highlight during comparison
                        values[i].textContent = value;

                        setTimeout(() => bars[i].classList.toggle('active', false), 100);
                    }
                });
            }, index * animationSpeed);
        });
    }


    return (
        <div className='container2'>
            <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
                <button className='dropbtn'>CASE STUDIES ▼</button>
                <div className='dropdown-content'>
                    <Link to="/home">Home</Link>
                    <Link to="/TicTacToe">TicTacToe</Link>
                    <Link to="/stacks">Stacks</Link>
                    <Link to="/queue">Queue</Link>
                    <Link to="/BTTraversal">Binary Tree Traversal</Link>
                    <Link to="/BSearchT">Binary Search Tree</Link>
                    <Link to="/towerofhanoi">Tower of Hanoi</Link>
                </div>
            </div>
            <div className="top2">
                <h1 className="title">SORTING</h1>
                <div className="vline"></div>
                <div className="inputsection">
                    <p className="enter">Enter up to 30 integers (comma-separated)</p>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        maxLength={100}
                        className='inputbox'

                    />
                </div>
                <div className="buttons2">
                    <img className='checkbtn' src="src/Assets/check.png" alt="Check" onClick={handleCheck} />
                    <img className='crossbtn' src="src/Assets/cross.png" alt="Cross" onClick={handleClear} />
                    <img className='shufflebtn' src="src/Assets/random.png" alt="Shuffle" onClick={handleShuffle} />
                </div>
            </div>

            <div className="bottom2">
                <div className="sortbtn">
                    <button onClick={() => visualizeSort('bubbleSort')}>Bubble Sort</button>
                    <button onClick={() => visualizeSort('insertionSort')}>Insertion Sort</button>
                    <button onClick={() => visualizeSort('selectionSort')}>Selection Sort</button>
                    <button onClick={() => visualizeSort('mergeSort')}>Merge Sort</button>
                    <button onClick={() => visualizeSort('quickSort')}>Quick Sort</button>
                    <button onClick={() => visualizeSort('shellSort')}>Shell Sort</button>
                    <button onClick={() => visualizeSort('heapSort')}>Heap Sort</button>
                </div>
                <div className="graph">
                    {array.map((value, index) => (
                        <div 
                            key={index} 
                            className='bar-container'
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <div 
                                className='bar' 
                                style={{ height: `${value*2.3}px`, marginBottom: '5px' }}
                            >
                            </div>
                            <span className='bar-value'>{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="speed-buttons">
                    <button className='slow' onClick={() => setAnimationSpeed(400)}>Slow</button>
                    <button className='med' onClick={() => setAnimationSpeed(200)}>Medium</button>
                    <button className='fast' onClick={() => setAnimationSpeed(30)}>Fast</button>
            </div>
        </div>
    );
};