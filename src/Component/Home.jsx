import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import image1 from "../Assets/image1.png";
import image2 from "../Assets/image2.png";
import image3 from "../Assets/image3.png";
import image4 from "../Assets/image4.png";
import image5 from "../Assets/image5.png";
import image6 from "../Assets/image6.png";
import image7 from "../Assets/image7.png";

const images = [
  { src: image1, description: "Tic-Tac-Toe", link: "/tictactoe" },
  { src: image2, description: "Stacks", link: "/stacks" },
  { src: image3, description: "Queues", link: "/queue" },
  { src: image4, description: "Binary Tree Traversal", link: "/BTTraversal" },
  { src: image5, description: "Sorting", link: "/sorting" },
  { src: image6, description: "Binary Search Tree", link: "/BSearchT" },
  { src: image7, description: "Tower of Hanoi", link: "/towerofhanoi" },
];

function HomePage() {
  const [stack, setStack] = useState([...images]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [stack]);

  const handleNext = () => {
    setStack((prevStack) => {
      const updatedStack = [...prevStack];
      const firstItem = updatedStack.shift();
      updatedStack.push(firstItem);
      return updatedStack;
    });
  };

  const handlePrev = () => {
    setStack((prevStack) => {
      const updatedStack = [...prevStack];
      const lastItem = updatedStack.pop();
      updatedStack.unshift(lastItem);
      return updatedStack;
    });
  };

  // This ensures only 3 items are shown at a time
  const visibleImages = stack.slice(0, 3);

  return (
    <div className="home-container">
      <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
      <button className='dropbtn'>CASE STUDIES ▼</button>
        <div className='dropdown-content'>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/stacks">Stacks</Link>
          <Link to="/queue">Queue</Link>
          <Link to="/BSearchT">Binary Search Tree</Link>
          <Link to="/BTTraversal">Binary Tree Traversal</Link>
          <Link to="/towerofhanoi">Tower of Hanoi</Link>
          <Link to="/sorting">Sorting</Link>
        </div>
      </div>  
      <h1 className="subtitle">DATA STRUCTURES AND ALGORITHMS</h1>
      <h1 className="main-title">CASE STUDIES</h1>

      <div className="gallery-container">
        <button className="arrow left" onClick={handlePrev}>
          &#9664;
        </button>
        <div className="gallery-wrapper">
          <div className="gallery">
          {visibleImages.map((img, index) => (
              <Link to={img.link} key={index} className="gallery-item">
                <img src={img.src} alt={img.description} className="gallery-image" />
                <p className="image-description">{img.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <button className="arrow right" onClick={handleNext}>
          &#9654;
        </button>
      </div>

      <h3 className="bottom-subtitle">Click the dropdown menu to start browsing case studies</h3>
    </div>
  );
}

export default HomePage;