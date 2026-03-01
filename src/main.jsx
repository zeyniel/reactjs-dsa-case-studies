import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './Component/Home';
import { Stacks } from './Component/Stacks';
import { Sorting } from './Component/Sorting';
import { TicTacToe } from './Component/TicTacToe';
import { Queue } from './Component/Queue';
import BSearchT from './Component/BSearchT';
import TowerofHanoi from './Component/TowerOfHanoi'
import BTTraversal from './Component/BTTraversal'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/stacks" element={<Stacks />} />
                <Route path="/sorting" element={<Sorting />} />
                <Route path="/tictactoe" element={<TicTacToe />} />
                <Route path="/queue" element={<Queue />} />
                <Route path="/bsearcht" element={<BSearchT />} />
                <Route path="/towerofhanoi" element={<TowerofHanoi />} />
                <Route path="/bttraversal" element={<BTTraversal />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    </StrictMode>,
);