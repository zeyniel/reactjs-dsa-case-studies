import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BSearchT.css";
import headicon from '../Assets/headicon.png'

function BinarySearchTree() {
  const [input, setInput] = useState("");
  const [tree, setTree] = useState(null);
  const [highlightNode, setHighlightNode] = useState(null);
  const [results, setResults] = useState({
    inorder: [],
    preorder: [],
    postorder: [],
  });

  const buildTree = () => {
    const values = input
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v));

    if (values.length > 30) {
      alert("Please enter up to 30 integers only.");
      return;
    }

    const build = (values) => {
      if (!values.length) return null;
      const root = { value: values[0], left: null, right: null };
      for (let i = 1; i < values.length; i++) {
        insertNode(root, values[i]);
      }
      return root;
    };

    const insertNode = (node, value) => {
      if (value < node.value) {
        if (node.left) {
          insertNode(node.left, value);
        } else {
          node.left = { value, left: null, right: null };
        }
      } else {
        if (node.right) {
          insertNode(node.right, value);
        } else {
          node.right = { value, left: null, right: null };
        }
      }
    };

    const newTree = build(values);
    setTree(newTree);
  };

  const resetTree = () => {
    setTree(null);
    setInput("");
    setResults({ inorder: [], preorder: [], postorder: [] });
    setHighlightNode(null);
  };

  const traverse = (type) => {
    const highlightTraversal = async (order) => {
      // Reset results for the selected traversal type before starting
      setResults((r) => ({ ...r, [type]: [] }));

      for (let node of order) {
        setHighlightNode(node);
        setResults((r) => ({
          ...r,
          [type]: [...r[type], node.value],
        }));
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      setHighlightNode(null);
    };

    const inorder = (node) =>
      node ? [...inorder(node.left), node, ...inorder(node.right)] : [];
    const preorder = (node) =>
      node ? [node, ...preorder(node.left), ...preorder(node.right)] : [];
    const postorder = (node) =>
      node ? [...postorder(node.left), ...postorder(node.right), node] : [];

    let order;
    if (type === "inorder") {
      order = inorder(tree);
    } else if (type === "preorder") {
      order = preorder(tree);
    } else if (type === "postorder") {
      order = postorder(tree);
    }

    highlightTraversal(order);
  };

  const calculateTreeSize = (node, level = 0) => {
    if (!node) return { width: 0, height: 0 };

    const left = calculateTreeSize(node.left, level + 1);
    const right = calculateTreeSize(node.right, level + 1);

    return {
      width: Math.max(left.width + right.width + 50, 100), // Reduced width for compactness
      height: Math.max(left.height, right.height) + 100,  // Reduced height for compactness
    };
  };

  const treeSize = tree ? calculateTreeSize(tree) : { width: 600, height: 500 };

  return (
    <div className="container5">
      <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
      <button className='dropbtn'>CASE STUDIES ▼</button>
        <div className='dropdown-content'>
          <Link to="/home">Home</Link>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/stacks">Stacks</Link>
          <Link to="/queue">Queue</Link>
          <Link to="/BTTraversal">Binary Tree Traversal</Link>
          <Link to="/towerofhanoi">Tower of Hanoi</Link>
          <Link to="/sorting">Sorting</Link>
        </div>
      </div>      
        <h1 className="title5">BINARY SEARCH TREE</h1>
        <div className="line5"></div>
      <div className="input-container">
        <div className="input-wrapper">
          <img src={headicon} alt="" className="bsticon" />
          <input
            type="text"
            className="inputbst"
            placeholder=" Enter up to 30 integers (comma-separated)"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResults({ inorder: [], preorder: [], postorder: [] }); // Reset traversal results
            }}
          />
        </div>
        <div className="button-row">
          <button className="build-tree-button" onClick={buildTree}>
            BUILD TREE
          </button>
          <button className="reset-tree-button" onClick={resetTree}>
            RESET TREE
          </button>
        </div>
      </div>

      {tree && (
        <>
          <div
            className="traversal-buttons-container"
            style={{ marginTop: "20px" }}
          >
            <button onClick={() => traverse("inorder")}>LTR (Inorder)</button>
            <button onClick={() => traverse("preorder")}>TLR (Preorder)</button>
            <button onClick={() => traverse("postorder")}>LRT (Postorder)</button>
          </div>
          <div className="traversal-result">
            <p style={{ color: "#FBBC05" }}>
              LTR (Inorder):{" "}
              <span style={{ color: "#fff" }}>{results.inorder.join(", ")}</span>
            </p>
            <p style={{ color: "#FBBC05" }}>
              TLR (Preorder):{" "}
              <span style={{ color: "#fff" }}>{results.preorder.join(", ")}</span>
            </p>
            <p style={{ color: "#FBBC05" }}>
              LRT (Postorder):{" "}
              <span style={{ color: "#fff" }}>{results.postorder.join(", ")}</span>
            </p>
          </div>
        </>
      )}

      {tree && (
        <div className="tree-container">
          <svg
            width="100%"
            height={treeSize.height}
            viewBox={`0 0 ${treeSize.width} ${treeSize.height}`}
            style={{ margin: "auto", display: "block" }}
          >
            <TreeNode
              node={tree}
              x={treeSize.width / 2}
              y={50}
              offsetX={treeSize.width / 6}
              levelGap={80}  // Reduced gap to make it more compact
              highlightNode={highlightNode}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default BinarySearchTree;

function TreeNode({
  node,
  x,
  y,
  offsetX,
  highlightNode,
  levelGap,
}) {
  if (!node) return null;

  const leftX = x - offsetX;
  const rightX = x + offsetX;
  const nextY = y + levelGap;

  const isRoot = !node.left && !node.right; // Identify the root

  return (
    <g>
      {node.left && (
        <line
          x1={x}
          y1={y + 20}
          x2={leftX}
          y2={nextY - 20}
          stroke="#555"
          strokeWidth="2"
        />
      )}
      {node.right && (
        <line
          x1={x}
          y1={y + 20}
          x2={rightX}
          y2={nextY - 20}
          stroke="#555"
          strokeWidth="2"
        />
      )}

      {/* Root stays at fixed position, child nodes move dynamically */}
      <circle
        cx={x} // Keep root at fixed position
        cy={y} // Keep root at fixed position
        r="25"
        fill={highlightNode === node ? "#fbbc05" : "#09fcc5"}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="18"
        fontFamily="'Euclid Bold'"
        fill="black"
      >
        {node.value}
      </text>

      {/* Recursively render the left and right child nodes */}
      {node.left && (
        <TreeNode
          node={node.left}
          x={leftX}
          y={nextY}
          offsetX={offsetX / 2}
          highlightNode={highlightNode}
          levelGap={levelGap}
        />
      )}
      {node.right && (
        <TreeNode
          node={node.right}
          x={rightX}
          y={nextY}
          offsetX={offsetX / 2}
          highlightNode={highlightNode}
          levelGap={levelGap}
        />
      )}
    </g>
  );
}
