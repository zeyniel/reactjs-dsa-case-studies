import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Queue.css";

const MAX_CAPACITY = 10;

export const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [plateNumber, setPlateNumber] = useState("");
  const [records, setRecords] = useState({});
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false); // Added to toggle logs visibility

  const handleArrive = () => {
    if (queue.length >= MAX_CAPACITY) {
      console.error("Garage is full! Cannot add more cars.");
      return;
    }
    if (plateNumber.trim() === "") {
      console.error("Please enter a valid plate number.");
      return;
    }
    if (queue.includes(plateNumber)) {
      console.error(`Car with plate number ${plateNumber} is already in the garage.`);
      return;
    }

    setQueue((prevQueue) => [...prevQueue, plateNumber]);
    setRecords((prevRecords) => ({
      ...prevRecords,
      [plateNumber]: {
        arrivals: (prevRecords[plateNumber]?.arrivals || 0) + 1,
        departures: prevRecords[plateNumber]?.departures || 0,
      },
    }));

    // Log the arrival
    const newLog = {
      timestamp: new Date().toLocaleString(),
      action: "Car Arrived",
      plateNumber,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]); // Append to the end

    setPlateNumber("");
  };

  const handleDepart = () => {
    if (queue.length === 0) {
      alert("Garage is empty! No cars to depart.");
      return;
    }
    if (plateNumber !== queue[0]) {
      const position = queue.indexOf(plateNumber) + 1;
      if (position > 0) {
        alert(
          `Car with plate number ${plateNumber} cannot depart. It is at position ${position}, and the first car must leave first.`
        );
      } else {
        alert(`Car with plate number ${plateNumber} is not in the garage.`);
      }
      return;
    }

    const departingCar = queue[0];
    setQueue((prevQueue) => prevQueue.slice(1));
    setRecords((prevRecords) => ({
      ...prevRecords,
      [departingCar]: {
        arrivals: prevRecords[departingCar]?.arrivals || 0,
        departures: (prevRecords[departingCar]?.departures || 0) + 1,
      },
    }));

    // Log the departure
    const newLog = {
      timestamp: new Date().toLocaleString(),
      action: "Car Departed",
      plateNumber: departingCar,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]); // Append to the end

    setPlateNumber("");
  };

  // Toggle logs view
  const toggleLogs = () => {
    setShowLogs(!showLogs);
  };

  return (
    <div className="container4">
      <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
        <button className='dropbtn'>CASE STUDIES ▼</button>
        <div className='dropdown-content'>                   
          <Link to="/home">Home</Link>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/stacks">Stacks</Link>
          <Link to="/BTTraversal">Binary Tree Traversal</Link>
          <Link to="/BSearchT">Binary Search Tree</Link>
          <Link to="/towerofhanoi">Tower of Hanoi</Link>
          <Link to="/sorting">Sorting</Link>
        </div>
      </div>
      <div className="sidebar4">
        <h1 className="title4">PARKING GARAGE</h1>
        <h2 className="subtitle4">Queue</h2>
        <div className="line4"></div>
        <div className="logsinput4">
          <button className="viewlogs4" onClick ={toggleLogs}>▼</button>
          <input
              type="text"
              className="plate-input4"
              placeholder="   Enter Plate Number"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
            />
        </div>

        <div className="infos4">
          <p>Plate Number: <span>{plateNumber}</span></p>
          <p>Arrival Count: {records[plateNumber]?.arrivals || 0}</p>
          <p>Departure Count: {records[plateNumber]?.departures || 0}</p>
        </div>
        <div className="buttons4">
          <button className="arrive4" onClick={handleArrive}>ARRIVE</button>
          <button className="depart4" onClick={handleDepart}>DEPART</button>
        </div>
      </div>

      <div className="garage4">
        {Array.from({ length: MAX_CAPACITY }).map((_, index) => (
          <div
            className={`parking-space4 ${queue[index] ? "occupied4" : "empty4"}`}
            key={index}
          >
            {queue[index] || "Available"}
          </div>
        ))}
      </div>
      {showLogs && (
        <div className="logs-section4">
          <h3>PARKING HISTORY</h3>
          <table className="logs-table4">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Plate Number</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0).reverse().map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.action}</td>
                  <td>{log.plateNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="close-logs4" onClick={toggleLogs}>Close Logs</button>
        </div>
      )}
    </div>
  );
}

