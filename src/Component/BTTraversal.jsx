import React, { useState } from "react";
import "./BTTraversal.css";
import { Link } from "react-router-dom";


class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const buildTree = (nodes, index = 0) => {
  if (index >= nodes.length) return null;
  const root = new TreeNode(nodes[index]);
  root.left = buildTree(nodes, 2 * index + 1);
  root.right = buildTree(nodes, 2 * index + 2);
  return root;
};

const calculateOffset = (depth) => Math.pow(2, 6 - depth) * 10;

const TreeVisualization = ({ root, treeWidth = 1500, treeHeight = 600, highlighted }) => {
  if (!root) return null;

  const renderNode = (node, x, y, depth) => {
    if (!node) return null;

    const offsetX = calculateOffset(depth);
    const leftChildX = x - offsetX;
    const rightChildX = x + offsetX;
    const nextY = y + 100;
    const isHighlighted = highlighted === node.value;

    return (
      <g key={node.value}>
        {node.left && (
          <line x1={x} y1={y} x2={leftChildX} y2={nextY} stroke="white" strokeWidth="3" />
        )}
        {node.right && (
          <line x1={x} y1={y} x2={rightChildX} y2={nextY} stroke="white" strokeWidth="3" />
        )}
        <circle cx={x} cy={y} r="15" fill={isHighlighted ? "#fbbc05" : "#0cf9c2"} />
        <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill="black">
          {node.value}
        </text>
        {renderNode(node.left, leftChildX, nextY, depth + 1)}
        {renderNode(node.right, rightChildX, nextY, depth + 1)}
      </g>
    );
  };

  return (
    <svg width="100%" height={treeHeight} viewBox={`0 0 ${treeWidth} ${treeHeight}`} style={{ margin: "auto", display: "block", overflow: "visible" }}>
      {renderNode(root, treeWidth / 2, 50, 1)}
    </svg>
  );
};

const BTTraversal = () => {
  const [levels, setLevels] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [treeRoot, setTreeRoot] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const createTree = (level) => {
    if (level < 1 || level > 5) return;
    setLevels(level);
    const totalNodes = Math.pow(2, level + 1) - 1;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890#!@$%^&*()";
    const treeNodes = Array.from({ length: totalNodes }, (_, i) => characters[i % characters.length]);

    setNodes(treeNodes);
    setTreeRoot(buildTree(treeNodes));
    setTraversalResult([]);
    setHighlighted(null);
  };

  const resetTree = () => {
    setIsCancelled(true); // Stop any ongoing traversal
    setIsTraversing(false);
    setTraversalResult([]);
    setHighlighted(null);
    setTreeRoot(null);
  };

  const traverseTree = (root, orderType) => {
    const result = [];
    const inorder = (node) => {
      if (!node) return;
      inorder(node.left);
      result.push(node.value);
      inorder(node.right);
    };
    const preorder = (node) => {
      if (!node) return;
      result.push(node.value);
      preorder(node.left);
      preorder(node.right);
    };
    const postorder = (node) => {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      result.push(node.value);
    };

    if (orderType === "LTR") inorder(root);
    else if (orderType === "TLR") preorder(root);
    else if (orderType === "LRT") postorder(root);

    return result;
  };

  const animateTraversal = async (orderType) => {
    if (!treeRoot || isTraversing) return;

    setIsTraversing(true);
    setIsCancelled(false); // Reset the cancellation flag
    const nodesToHighlight = traverseTree(treeRoot, orderType);
    setTraversalResult([]);
    setHighlighted(null);

    for (let index = 0; index < nodesToHighlight.length; index++) {
      if (isCancelled) break; // Stop if traversal is cancelled
      setHighlighted(nodesToHighlight[index]);
      setTraversalResult((prev) => [...prev, nodesToHighlight[index]]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsTraversing(false);
    setHighlighted(null);
  };

  return (
    <div className="container6">
        <div className='dropdown' style={{ position: 'absolute', top: '100px', right: '200px' }}>
        <button className='dropbtn'>CASE STUDIES ▼</button>
            <div className='dropdown-content'>
            <Link to="/home">Home</Link>
            <Link to="/tictactoe">TicTacToe</Link>
            <Link to="/stacks">Stacks</Link>
            <Link to="/queue">Queue</Link>
            <Link to="/BSearchT">Binary Search Tree</Link>
            <Link to="/towerofhanoi">Tower of Hanoi</Link>
            <Link to="/sorting">Sorting</Link>
            </div>
        </div>  

        <h1 className="title6">Binary Tree Traversal</h1>
        <div className="line6"></div>
        <div className="controls">
            <div className="buttons-row2">
            {[1, 2, 3, 4, 5].map((level) => (
                <button key={level} onClick={() => createTree(level)} disabled={isTraversing}>
                {level}
                </button>
            ))}
            </div>
            <button className="reset-tree-button2" onClick={resetTree}>Reset</button>
        </div>

      {treeRoot && (
        <div className="traversal-buttons">
          <button onClick={() => animateTraversal("LTR")} disabled={isTraversing}>
            LTR (Inorder)
          </button>
          <button onClick={() => animateTraversal("TLR")} disabled={isTraversing}>
            TLR (Preorder)
          </button>
          <button onClick={() => animateTraversal("LRT")} disabled={isTraversing}>
            LRT (Postorder)
          </button>
        </div>
      )}
      {treeRoot && <TreeVisualization root={treeRoot} highlighted={highlighted} />}
      {treeRoot && (
        <div className="traversal-result2">
          <h3>Traversal Result:</h3>
          <p>{traversalResult.join(" ")}</p>
        </div>
      )}
    </div>
  );
};

export default BTTraversal;