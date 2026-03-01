import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TowerOfHanoi.css";

const TowersOfHanoi = () => {
  const [towers, setTowers] = useState([[], [], []]); // State of the towers
  const [selectedDisk, setSelectedDisk] = useState(null); // Disk selected by the user
  const [sourceTower, setSourceTower] = useState(null); // Source tower selected by the user
  const [moves, setMoves] = useState([]); // List of moves
  const [showWinOverlay, setShowWinOverlay] = useState(false); // State for win overlay
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out animation
  const [disableRandomize, setDisableRandomize] = useState(false); // Disable Randomize after the first move

  const diskOptions = [
    { id: 5, value: 5 },
    { id: 4, value: 4 },
    { id: 3, value: 3 },
    { id: 2, value: 2 },
    { id: 1, value: 1 },
  ];

  const handleRandomize = () => {
    const shuffledDisks = [...diskOptions].sort(() => Math.random() - 0.5);
    setTowers([shuffledDisks, [], []]);
    setMoves([]);
    setSelectedDisk(null);
    setSourceTower(null);
    setShowWinOverlay(false); // Reset win overlay
    setDisableRandomize(false); // Allow randomize after reset
  };

  const handleReset = () => {
    setTowers([[], [], []]);
    setMoves([]);
    setSelectedDisk(null);
    setSourceTower(null);
    setShowWinOverlay(false); // Reset win overlay
    setDisableRandomize(false); // Re-enable randomize button
  };

  const handleSelectDisk = (towerIndex) => {
    const tower = towers[towerIndex];

    if (tower.length === 0) {
      alert("No disks to select on this tower.");
      return;
    }

    const disk = tower[tower.length - 1];

    if (selectedDisk && selectedDisk.id === disk.id) {
      setSelectedDisk(null);
      setSourceTower(null);
      return;
    }

    setSelectedDisk(disk);
    setSourceTower(towerIndex);
    setDisableRandomize(true); // Disable Randomize button after first move
  };

  const handleMoveDisk = (targetTowerIndex) => {
    if (selectedDisk === null || sourceTower === null) {
      alert("Please select a disk first.");
      return;
    }

    if (sourceTower === targetTowerIndex) {
      alert("Cannot move to the same tower.");
      return;
    }

    const targetTower = towers[targetTowerIndex];

    if (
      targetTower.length > 0 &&
      selectedDisk.value > targetTower[targetTower.length - 1].value
    ) {
      alert("Invalid move: Cannot place a larger disk on a smaller disk.");
      return;
    }

    setTowers((prev) => {
      const newTowers = prev.map((tower) => [...tower]);
      newTowers[sourceTower].pop();
      newTowers[targetTowerIndex].push(selectedDisk);
      return newTowers;
    });

    setMoves((prevMoves) => [
      ...prevMoves,
      `Move disk ${selectedDisk.value} from Tower ${sourceTower + 1} to Tower ${
        targetTowerIndex + 1
      }`,
    ]);

    setSelectedDisk(null);
    setSourceTower(null);
  };

  const checkWinCondition = () => {
    return towers.some(
      (tower) =>
        tower.length === 5 &&
        tower.map((disk) => disk.value).join(",") === "5,4,3,2,1"
    );
  };

  React.useEffect(() => {
    if (checkWinCondition()) {
      setShowWinOverlay(true);
    }
  }, [towers]);

  const handleHideOverlay = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowWinOverlay(false);
      setIsFadingOut(false);
    }, 500);
  };

  return (
    <div className="container7">
      <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
      <button className='dropbtn'>CASE STUDIES ▼</button>
        <div className='dropdown-content'>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/stacks">Stacks</Link>
          <Link to="/queue">Queue</Link>
          <Link to="/BTTraversal">Binary Tree Traversal</Link>
          <Link to="/BSearchT">Binary Search Tree</Link>
          <Link to="/sorting">Sorting</Link>
        </div>
      </div>
      <h1 className="title7">TOWERS OF HANOI</h1>
      <div className="line7"></div>
      <div className="buttonrow3">
        <button className="build-tree-button3" onClick={handleRandomize} disabled={disableRandomize}>
          Randomize
        </button>
        <button className="reset-tree-button3"
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </button>
      </div>

      {/* Flex container to align Towers and Moves list */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "50px",
          marginTop: "20px",
        }}
      >
        {/* Main Towers */}
        <div>
          <div className="towers">
            {towers.map((tower, towerIndex) => (
              <div className="tower-container" key={towerIndex}>
                <h3 className="tower-label">Tower {towerIndex + 1}</h3>
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <div className="tower">
                  <div className="tower-pole"></div>
                  <div className="tower-base">
                    <div className="tower-wood"></div>
                    {tower.map((disk, diskIndex) => (
                      <div
                        className={`disk disk-${disk.value} ${
                          selectedDisk?.id === disk.id ? "selected" : ""
                        }`}
                        key={diskIndex}
                        style={{
                          width: `${disk.value * 20}px`,
                          bottom: `${diskIndex * 20 + 20}px`,
                          marginLeft: `calc(50% - ${disk.value * 10}px)`,
                        }}
                        onClick={() => handleSelectDisk(towerIndex)}
                      ></div>
                    ))}
                  </div>
                  <button
                    className="movehere"
                    onClick={() => handleMoveDisk(towerIndex)}
                    disabled={selectedDisk === null || sourceTower === towerIndex}
                  >
                    Move Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moves List */}
        <div className="records">
          <h2 className="moves">Moves:</h2>
          <ul
            style={{
              height: "150px", // Fixed height for moves box
              width: "300px", // Fixed width for alignment
              overflowY: "scroll", // Enable scrolling
              padding: "10px",
              border: "1px solid #ccc",
              textAlign: "left",
              boxSizing: "border-box",
            }}
            className="moves-list"
          >
            {moves.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </div>
      </div>

      {showWinOverlay && (
        <div
          className={`win-overlay ${isFadingOut ? "fade-out" : ""}`}
          onClick={handleHideOverlay}
        >
          <div className="win-message">
            <h1>Congratulations! 🎉</h1>
            <p>You have successfully arranged the disks!</p>
            <p>Click anywhere to go back.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TowersOfHanoi;
