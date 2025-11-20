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
    const [baselineResults, setBaselineResults] = useState(null);
    const [adaptiveResults, setAdaptiveResults] = useState(null);
    const [testPhase, setTestPhase] = useState('baseline'); 
    // "baseline" → "adaptive"


    const handleStart = () => {
        setCurrentPage('name');          // go to name step first
    };

    const handleNameSubmit = (name) => {
    setUserName(name);
    setTestPhase('baseline');
    setCurrentPage('testing');
};


    const handleTestComplete = (results) => {
    const fullResults = { ...results, name: userName };

    if (testPhase === 'baseline') {
        setBaselineResults(fullResults);
        setTestPhase('adaptive');       // now run adaptive test
        setCurrentPage('testing');      // go again
    } else {
        setAdaptiveResults(fullResults);
        setCurrentPage('results');
    }
};


        const handleRestart = () => {
        setBaselineResults(null);
        setAdaptiveResults(null);
        setTestPhase('baseline');
        setCurrentPage('testing');
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
                    <TestingPage 
                        key={testPhase}
                        mode={testPhase === 'baseline' ? 'baseline' : 'adaptive'}
                        onComplete={handleTestComplete}
                    />

                )}
                {currentPage === 'results' && (
                    <ResultsPage
                        results={{ baseline: baselineResults, adaptive: adaptiveResults }}
                        onRestart={handleRestart}
                    />

                )}
            </AnimatePresence>
        </div>
    );
}
