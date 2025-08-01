import React, { useEffect, useState } from 'react';
import { WebMidi } from 'webmidi';
import KeyboardGrid from '@/com/KeyboardGrid.jsx';

export default function App() {
  const [output, setOutput] = useState(null);

  useEffect(() => {
    WebMidi.enable({ sysex: false })
      .then(() => {
        setOutput(WebMidi.outputs[0] || null);
      })
      .catch((err) => console.error('WebMidi could not be enabled', err));
  }, []);

  return <>
    <div>
      <h1>Lull WebMIDI</h1>
      <KeyboardGrid midiOutput={output} />
    </div>

    <p>
      <a href="https://www.tobias-erichsen.de/software/loopmidi.html">
        LoopMIDI (Windows)
      </a>
    </p>
  </>
}