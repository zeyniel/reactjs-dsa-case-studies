import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Stacks.css";

const MAX_CARS = 10;

export const Stacks = () => {
    const [stack, setStack] = useState([]);
    const [carPlate, setCarPlate] = useState("");
    const [logs, setLogs] = useState([]);
    const [records, setRecords] = useState({});

    const handleInputChange = (event) => {
        setCarPlate(event.target.value.toUpperCase());
    }

    const handleArrive = () => {
        if (stack.length >= MAX_CARS) {
            alert("Parking garaeg is full! Maximum of 10 cars allowed")
            return;
        }
        if (!carPlate) {
            alert("Please enter a car plate number.");
            return;
        }
        if (stack.some((car) => car.plate === carPlate)) {
            alert(`Car ${carPlate}is already in the parking garage.`);
            return;
        }
        const updatedStack = [...stack, {plate: carPlate, arrivals: 1, departures: 0}];
        setStack(updatedStack);
        
        setRecords({
            ...records,
            [carPlate]: {
              arrivals: (records[carPlate]?.arrivals || 0) + 1,
              departures: records[carPlate]?.departures || 0,
            },
        });

        setLogs([...logs, {action: "Arrive", plate: carPlate, time: new Date().toLocaleString()}]);
        setCarPlate("")
    };

    const handleDepart = () => {
        if (!stack.length) {
            alert("The parking garage is empty!");
            return;
        }
        const carIndex = stack.findIndex((car) => car.plate === carPlate);

        if (carIndex === -1) {
            alert(`Car ${carPlate} not found in the parking garage.`);
            return;
        }

        const departingCar = stack[carIndex];
        const tempStack = [...stack]

        tempStack.splice(carIndex, 1);

        const updatedStack = tempStack.map((car, index) => {
            if (index >= carIndex) {
                const updatedRecord = {
                ...car,
                departures: (records[car.plate]?.departures || 0) + 1, 
                arrivals: (records[car.plate]?.arrivals || 0) + 1, 
                };
                return updatedRecord;
            }
            return car;
        });
      
        const newLogs = [
            { action: "Depart", plate: departingCar.plate, time: new Date().toLocaleString() },
            ...tempStack
                .slice(carIndex) 
                .map((car) => ({
                    action: "Re-Arrive",
                    plate: car.plate,
                    time: new Date().toLocaleString(),
                })),
          ];
        setStack(updatedStack);
        setLogs ([...logs, ...newLogs]);
        setRecords({
            ...records,
            [departingCar.plate]: {
              arrivals: records[departingCar.plate]?.arrivals || 0,
              departures: (records[departingCar.plate]?.departures || 0) + 1,
            },
            ...tempStack
                .slice(carIndex) 
                .reduce((acc, car) => {
                    acc[car.plate] = {
                    arrivals: (records[car.plate]?.arrivals || 0) + 1,
                    departures: (records[car.plate]?.departures || 0) + 1,
                };
                return acc;
              }, {}),
          });
        setCarPlate("");
    };

    const viewLogs = () => {
        alert(
            logs
                .map((log) => `${log.time} - ${log.action}: ${log.plate}`)
                .join("\n") || "No logs yet"
        )
    }

    return (
        <div className = "container3">
            <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
                <button className='dropbtn'>CASE STUDIES ▼</button>
                <div className='dropdown-content'>
                    <Link to="/home">Home</Link>
                    <Link to="/tictactoe">TicTacToe</Link>
                    <Link to="/queue">Queue</Link>
                    <Link to="/BTTraversal">Binary Tree Traversal</Link>
                    <Link to="/BSearchT">Binary Search Tree</Link>
                    <Link to="/towerofhanoi">Tower of Hanoi</Link>
                    <Link to="/sorting">Sorting</Link>
                </div>
            </div>
            <div className="sidebar3">
                <h1 className='title3'>PARKING GARAGE</h1>
                <h2 className="subtitle3">Stacks</h2>
                <div className="line3"></div>
                <div className="logsinput3">
                    <button className="viewlogs3" onClick ={viewLogs}>▼</button>
                    <input
                    type="text"
                    className='plate-input3'
                    value={carPlate}
                    onChange={handleInputChange}
                    placeholder='   Enter Plate Number'
                    />
                </div>
                <div className="infos3">
                    <p className='plateno'>Plate Number: <span>{carPlate}</span></p>
                    <p className='arrivalc'>Arrival Count: {records[carPlate]?.arrivals || 0}</p>
                    <p className='departc'>Departure Count: {records[carPlate]?.departures || 0}</p>
                </div>
                <div className="buttons3">
                    <button className="arrive3" onClick ={handleArrive}>ARRIVE</button>
                    <button className="depart3" onClick ={handleDepart}>DEPART</button>
                </div>
            </div>
            <div className="garage3">
                {[...Array(MAX_CARS)].map((_, index) => {
                const reversedIndex = MAX_CARS - index - 1;
                const car = stack[reversedIndex];
                return (
                    <div key={index} className={`parking-space3 ${car ? "occupied3" : "empty3"}`}>
                    {car ? `${car.plate}` : "Empty"}
                    </div>
                );
                })}
            </div>
        </div>
    );
};
