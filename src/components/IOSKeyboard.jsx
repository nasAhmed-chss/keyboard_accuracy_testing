import React from "react";
import { motion } from "framer-motion";

const TOP_ROW = ["q","w","e","r","t","y","u","i","o","p"];
const MID_ROW = ["a","s","d","f","g","h","j","k","l"];
const BOT_ROW = ["z","x","c","v","b","n","m"];

export default function IOSKeyboard({ onKeyPress, mode, keySizes }) {
  return (
    <div
      className="select-none mx-auto"
      style={{
        width: "94vw",             // Scales perfectly across all iPhones
        maxWidth: "500px",         // Prevents giant keys on Pro Max
        paddingBottom: "env(safe-area-inset-bottom)"
      }}
    >
      {/* Row 1 */}
      <Row keys={TOP_ROW} onKeyPress={onKeyPress} mode={mode} keySizes={keySizes} />

      {/* Row 2 (indented like iOS) */}
      <div style={{ marginTop: 8, paddingLeft: "4vw" }}>
        <Row keys={MID_ROW} onKeyPress={onKeyPress} mode={mode} keySizes={keySizes} />
      </div>

      {/* Row 3 */}
      <div className="flex items-center justify-between mt-3">

        <SpecialKey label="⇧" />

        <div className="flex-1 flex justify-center">
          <Row keys={BOT_ROW} onKeyPress={onKeyPress} mode={mode} keySizes={keySizes} />
        </div>

        <SpecialKey label="⌫" />
      </div>

      {/* Bottom row (space bar) */}
      <div className="flex items-center justify-between mt-3">

        <SpecialKey label="🌐" />

        <Spacebar onPress={() => onKeyPress(" ")} />

        <SpecialKey label="return" />
      </div>
    </div>
  );
}

/* -------------------------------------------- */
/* ROW - PROPORTIONAL KEYS */
/* -------------------------------------------- */
function Row({ keys, onKeyPress, mode, keySizes }) {
  return (
    <div className="flex justify-between w-full">
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
/* LETTER KEY */
/* -------------------------------------------- */
function Key({ label, onClick, mode, scaleValue }) {
  const scale = mode === "adaptive" ? scaleValue : 1;

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      animate={{ scale }}
      onClick={onClick}
      className="
        bg-[#3a3a3c]
        rounded-xl
        flex justify-center items-center
        text-white font-semibold
      "
      style={{
        width: "8.5vw",                // Perfect for iPhones
        maxWidth: 44,                  // Matches iOS key width
        height: "clamp(42px, 6vh, 56px)",
        fontSize: "clamp(15px, 2vh, 20px)",
        margin: "0.5vw"
      }}
    >
      {label}
    </motion.div>
  );
}

/* -------------------------------------------- */
/* SPECIAL KEYS */
/* -------------------------------------------- */
function SpecialKey({ label }) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="
        bg-[#3a3a3c]
        rounded-xl
        flex justify-center items-center
        text-white font-semibold
      "
      style={{
        width: "12vw",
        maxWidth: 60,
        height: "clamp(42px, 6vh, 56px)",
        fontSize: "clamp(14px, 2vh, 18px)"
      }}
    >
      {label}
    </motion.div>
  );
}

/* -------------------------------------------- */
/* SPACE BAR */
/* -------------------------------------------- */
function Spacebar({ onPress }) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      onClick={onPress}
      className="
        bg-[#3a3a3c]
        rounded-xl
        flex justify-center items-center
        text-white font-semibold
      "
      style={{
        flex: 1,
        height: "clamp(42px, 6vh, 56px)",
        marginLeft: 10,
        marginRight: 10,
        fontSize: "clamp(15px, 2vh, 20px)"
      }}
    >
      space
    </motion.div>
  );
}
