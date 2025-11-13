// src/components/NamePage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function NamePage({ onSubmitName }) {
    const [name, setName] = useState('');
    const [touched, setTouched] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched(true);
        if (!name.trim()) return;
        onSubmitName(name.trim());
    };

    const showError = touched && !name.trim();

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-6"
        >
            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Before we start…
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    Please enter your name so we can record your results for the study.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder="e.g., Jane Doe"
                        />
                        {showError && (
                            <p className="mt-1 text-xs text-red-500">
                                Name is required.
                            </p>
                        )}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                    >
                        Start Typing Test
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

export default NamePage;
