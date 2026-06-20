'use client'
import React, { useEffect, useState } from "react";

const ClapButton = () => {
const [clapCount, setClapCount] = useState(0);
const [totalClaps, setTotalClaps] = useState(250); // Initial total from backend (example)
const [isClicked, setIsClicked] = useState(false);
const MAX_CLAPS = 50;

const handleClap = () => {
if (clapCount < MAX_CLAPS) {
setClapCount(clapCount + 1);
setTotalClaps(totalClaps + 1);
setIsClicked(true);

  setTimeout(() => setIsClicked(false), 300);
}
};

return (
<div style={styles.container}>
    <div className="flex items-center gap-2">
        <button
        onClick={handleClap}
        disabled={clapCount === MAX_CLAPS}
        style={{
        ...styles.button,
        ...(isClicked ? styles.clicked : {}),
        ...(clapCount === MAX_CLAPS ? styles.disabled : {}),
        }}
        >
            <img src="/icons/HandsClapping.svg" className="scale-[1.15]" alt="" />
            </button>
            <div style={styles.total}>{totalClaps.toLocaleString()}</div>
        </div>
</div>
);
};

export default ClapButton;

const styles: { [key: string]: React.CSSProperties } = {
container: {
textAlign: "left",
marginTop: "20px",
},
button: {
fontSize: "32px",
padding: "11px",
borderRadius: "50%",
border: "none",
cursor: "pointer",
transition: "transform 0.2s ease",
background: "#fff",
boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
},
clicked: {
transform: "scale(1.1)",
},
disabled: {
cursor: "not-allowed",
opacity: 0.5,
},
total: {
fontSize: "15px",
marginTop: "5px",
fontWeight: "semibold",
},
};