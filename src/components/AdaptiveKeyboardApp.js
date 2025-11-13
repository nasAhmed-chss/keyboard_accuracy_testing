// src/components/AdaptiveKeyboardApp.js
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';
import NamePage from './NamePage';
import TestingPage from './TestingPage';
import ResultsPage from './ResultsPage';

export default function AdaptiveKeyboardApp() {
    const [currentPage, setCurrentPage] = useState('landing');
    const [testResults, setTestResults] = useState(null);
    const [userName, setUserName] = useState('');

    const handleStart = () => {
        setCurrentPage('name');          // go to name step first
    };

    const handleNameSubmit = (name) => {
        setUserName(name);
        setCurrentPage('testing');
    };

    const handleTestComplete = (results) => {
        // attach name to results
        const resultsWithName = { ...results, name: userName };
        setTestResults(resultsWithName);
        setCurrentPage('results');
    };

    const handleRestart = () => {
        setTestResults(null);
        setCurrentPage('testing');       // keep same name, restart test
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">
            <AnimatePresence mode="wait">
                {currentPage === 'landing' && (
                    <LandingPage key="landing" onStartTest={handleStart} />
                )}
                {currentPage === 'name' && (
                    <NamePage key="name" onSubmitName={handleNameSubmit} />
                )}
                {currentPage === 'testing' && (
                    <TestingPage key="testing" onComplete={handleTestComplete} />
                )}
                {currentPage === 'results' && (
                    <ResultsPage
                        key="results"
                        results={testResults}
                        onRestart={handleRestart}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
