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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
                min-h-screen flex items-center justify-center p-6
                bg-gradient-to-br from-[#06060A] via-[#0A0A14] to-[#150005]
                relative overflow-hidden
            "
        >

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage:
                        `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }}
            />

            {/* Red glow from landing */}
            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40">
                <img src="/images/red-bokeh.png" className="w-full h-full object-cover" />
            </div>

            {/* Floating glass card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="
                    relative z-10 max-w-md w-full 
                    bg-white/15 backdrop-blur-2xl
                    rounded-3xl p-10 
                    shadow-[0_0_40px_rgba(120,20,255,0.35)]
                    border border-white/20 
                    ring-1 ring-purple-500/20

                    hover:shadow-[0_0_55px_rgba(150,60,255,0.5)]
                "
            >
                {/* Title */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg mb-3 text-center">
                    Before we begin…
                </h2>

                <p className="text-gray-200/90 mb-8 text-center leading-relaxed">
                    Enter your name to personalize your typing test results.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Input Label */}
                    <label className="block text-sm font-medium text-gray-200 tracking-wide">
                        Full Name
                    </label>

                    {/* Futuristic Input */}
                    <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="
                            rounded-2xl bg-white/10 text-white px-4 py-3 
                            border border-white/20 
                            focus-within:ring-2 focus-within:ring-purple-500/60 
                            focus-within:border-transparent
                            shadow-inner shadow-black/40
                        "
                    >
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none placeholder-gray-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder="e.g., Jane Doe"
                        />
                    </motion.div>

                    {showError && (
                        <p className="text-xs text-red-400 -mt-4">Name is required.</p>
                    )}

                    {/* Glowing Button */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="
                            w-full px-6 py-4
                            bg-gradient-to-r from-blue-600 to-purple-600
                            text-white font-semibold text-lg rounded-2xl
                            shadow-[0_10px_25px_rgba(80,0,220,0.35)]
                            hover:shadow-[0_10px_35px_rgba(110,0,255,0.55)]
                            transition-all
                        "
                    >
                        Start Typing Test
                    </motion.button>

                </form>
            </motion.div>
        </motion.div>
    );
}

export default NamePage;
