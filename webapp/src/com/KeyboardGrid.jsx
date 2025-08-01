import React, { useEffect, useState } from 'react';
import '@/style/KeyboardGrid.css';

const KEY_LAYOUT = [
  ['1','2','3','4','5','6','7','8','9','0','-','='],
  ['Q','W','E','R','T','Y','U','I','O','P','[',']'],
  ['A','S','D','F','G','H','J','K','L',';','\''],
  ['Z','X','C','V','B','N','M',',','.','/'],
];

const KEY_TO_NOTE = {};
let note = 60; // start at middle C
KEY_LAYOUT.flat().forEach(key => {
  KEY_TO_NOTE[key] = note++;
});

export default function KeyboardGrid({ midiOutput }) {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleDown = (e) => {
      const key = e.key.toUpperCase();
      if (KEY_TO_NOTE[key]) {
        setActiveKey(key);
        if (midiOutput) {
          midiOutput.playNote(KEY_TO_NOTE[key], { duration: 100 });
        }
      }
    };
    const handleUp = (e) => {
      setActiveKey(null);
    };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [midiOutput]);

  return (
    <div className="keyboard-grid">
      {KEY_LAYOUT.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((key) => (
            <div
              key={key}
              className={`cell ${activeKey === key ? 'active' : ''}`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}