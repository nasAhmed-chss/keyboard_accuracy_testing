import React from "react";
import { motion } from "framer-motion";

const KEY_ROWS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"]
];


const BOTTOM_ROW = ["z","x","c","v","b","n","m"];


export default function IOSKeyboard({ onKeyPress, mode, keySizes }) {
  return (
    <div className="w-full bg-transparent py-3 pb-6 select-none">

      {/* Top row */}
      <Row keys={KEY_ROWS[0]} mode={mode} keySizes={keySizes} onKeyPress={onKeyPress} />

      {/* Middle row */}
      <div className="flex justify-center mt-2">
        <Row
          keys={KEY_ROWS[1]}
          indent={22}
          mode={mode}
          keySizes={keySizes}
          onKeyPress={onKeyPress}
        />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-center mt-2 space-x-2 px-2">

        {/* Shift */}
        <SpecialKey label="⇧" wide onClick={() => {}} />

        {/* Letters */}
        <Row
          keys={BOTTOM_ROW}
          mode={mode}
          keySizes={keySizes}
          onKeyPress={onKeyPress}
        />

        {/* Backspace */}
        <SpecialKey
          label="⌫"
          wide
          onClick={() => {}}
        />
      </div>

      {/* Last row */}
      <div className="flex items-center justify-between mt-3 px-3">
        <SpecialKey label="🌐" wide onClick={() => {}} />

        <SpecialKey label="😊" wide onClick={() => {}} />

        {/* Spacebar */}
        <motion.div
          whileTap={{ scale: 0.94 }}
          onClick={() => onKeyPress(" ")}
          className="
            flex-1 mx-2 h-[52px]
            bg-[#3a3a3c] rounded-xl
            flex justify-center items-center
            text-[18px] text-white font-medium
          "
        >
          space
        </motion.div>

        <SpecialKey label="return" wide onClick={() => {}} />
      </div>
    </div>
  );
}

/* -------------------------------------------- */
/* ROW */
/* -------------------------------------------- */
function Row({ keys, indent = 0, onKeyPress, mode, keySizes }) {
  return (
    <div
      className="flex justify-center space-x-2 px-2"
      style={{ paddingLeft: indent, paddingRight: indent }}
    >
      {keys.map((key) => (
        <Key
          key={key}
          label={key}
          mode={mode}
          scaleValue={keySizes?.[key] || 1}
          onClick={() => onKeyPress(key)}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------- */
/* LETTER KEYS — ADAPTIVE LOGIC APPLIED HERE */
/* -------------------------------------------- */
function Key({ label, onClick, mode, scaleValue }) {
  const scale = mode === "adaptive" ? scaleValue : 1;

  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      animate={{ scale }}
      onClick={onClick}
      className="
        w-[36px] h-[52px]
        bg-[#3a3a3c]
        rounded-xl
        flex justify-center items-center
        text-[18px] text-white font-semibold
        active:bg-[#505055]
      "
      style={{
        width: 36 * scale,
        height: 52 * scale,
        fontSize: 18 * scale
      }}
    >
      {label}
    </motion.div>
  );
}

/* -------------------------------------------- */
/* SPECIAL KEYS (unchanged) */
/* -------------------------------------------- */
function SpecialKey({ label, wide, onClick }) {
  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`
        ${wide ? "w-[50px]" : "w-[36px]"}
        h-[52px] bg-[#3a3a3c] rounded-xl
        flex justify-center items-center
        text-[18px] text-white font-semibold
        active:bg-[#505055]
      `}
    >
      {label}
    </motion.div>
  );
}
