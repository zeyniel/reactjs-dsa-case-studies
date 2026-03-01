import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import './TicTacToe.css'
import circle_icon from '../Assets/ttt_circle.png' 
import cross_icon from '../Assets/ttt_cross.png'
import boldcircle from '../Assets/boldcircle.png'
import boldcross from '../Assets/boldcross.png'


let data = ["","","","","","","","",""]

export const TicTacToe = () => {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [currentPlayer, setCurrentPlayer] = useState('X');
    let [xWins, setXWins] = useState(0);
    let [oWins, setOWins] = useState(0);
    let playerRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9]

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (currentPlayer === 'X') {
            e.target.innerHTML = `<img src='${cross_icon}' style="width: 60%; height: 60%;">`;
            data[num] = "x";
            setCurrentPlayer('O');
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' style="width: 60%; height: 60%;">`;
            data[num] = "o";
            setCurrentPlayer('X');
        }
        
        setCount(count + 1);
        playerRef.current.innerHTML = `Player ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`;
        checkWin();
    };

    const checkWin = () => {
        if(data[0] === data[1] && data[1] === data[2] && data[2]!=="")
        {
            won(data[2]);
        }
        else if(data[3] === data[4] && data[4] === data[5] && data[5]!=="")
        {
            won(data[5]);
        }
        else if(data[6] === data[7] && data[7] === data[8] && data[8]!=="")
        {
            won(data[8]);
        }
        else if(data[0] === data[3] && data[3] === data[6] && data[6]!=="")
        {
            won(data[6]);
        }
        else if(data[1] === data[4] && data[4] === data[7] && data[7]!=="")
        {
            won(data[7]);
        }
        else if(data[2] === data[5] && data[5] === data[8] && data[8]!=="")
        {
            won(data[8]);
        }
        else if(data[0] === data[4] && data[4] === data[8] && data[8]!=="")
        {
            won(data[8]);
        }
        else if(data[2] === data[4] && data[4] === data[6] && data[6]!=="")
        {
            won(data[6]);
        }
        else if (data.every(cell => cell !== ""))
        {
            tie();
        }
    }

    const tie = () => {
        setLock(true);
        playerRef.current.innerHTML = `It's a tie!`;
    }

    const reset = () => {
        setLock(false);
        setCurrentPlayer('X');
        data = ["","","","","","","","",""];

        box_array.forEach(e=>{
            e.current.innerHTML = "";
        });
        playerRef.current.style.color = "#fbbc05";
        updatePlayerTurn();
    }


    const won = (winner) => {
        setLock(true);
        playerRef.current.style.color = "#09fcc5";
        const winnerImage = winner === "x" 
            ? `<img src='${boldcross}' style="width:18px; height:15px; vertical-align:middle;">` 
            : `<img src='${boldcircle}' style="width:18px; height:15px; vertical-align:middle;">`;
        playerRef.current.innerHTML = `Player&nbsp;&nbsp;${winnerImage}&nbsp;&nbsp;wins!`;

        if (winner === "x") {
            setXWins (xWins + 1);
        } else {
            setOWins (oWins + 1);
        }
    };

    return (
        <div className='container1'>
            <div className='sidebar1'>
                <h1 className='title1'>TIC TAC TOE</h1>
                <div className="line"></div>
                <h2 className="player" ref={playerRef}>Player {currentPlayer}'s turn</h2>
                <div className="scoreboard">
                    <p>Player X wins: {xWins}</p>
                    <p>Player O wins: {oWins}</p>
                </div>
                <button className="reset" onClick={reset}>PLAY AGAIN</button>
            </div>
            <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
                <button className='dropbtn'>CASE STUDIES ▼</button>
                <div className='dropdown-content'>
                    <Link to="/home">Home</Link>
                    <Link to="/stacks">Stacks</Link>
                    <Link to="/queue">Queue</Link>
                    <Link to="/BTTraversal">Binary Tree Traversal</Link>
                    <Link to="/BSearchT">Binary Search Tree</Link>
                    <Link to="/towerofhanoi">Tower of Hanoi</Link>
                    <Link to="/sorting">Sorting</Link>
                </div>
            </div>

            <div className='board' style={{ marginLeft: 'auto' }}>
                <div className="row1">
                    <div className="cell" ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
                    <div className="cell" ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
                    <div className="cell" ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
                </div>
                <div className="row2">
                    <div className="cell" ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
                    <div className="cell" ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
                    <div className="cell" ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
                </div>
                <div className="row3">
                    <div className="cell" ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
                    <div className="cell" ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
                    <div className="cell" ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
                </div>
            </div>
        </div>
    )
}
