import React, { useState } from "react";
import "./App.css";

// Example modules & labs
const modules = {
  "IT Support Fundamentals": {
    Beginner: ["Hardware Basics", "OS Installation", "Basic Troubleshooting"]
  },
  "Linux & Security": {
    Beginner: ["Linux File Management", "User & Group Management"]
  }
};

// Example tutorials
const tutorials: Record<string, string[]> = {
  "Linux File Management": [
    "Use ls to list files",
    "Use cd to navigate directories",
    "Use mkdir to create a folder"
  ],
  "User & Group Management": [
    "Add users with useradd",
    "Set passwords with passwd",
    "Assign users to groups with usermod"
  ]
};

export default function App() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const runCommand = (cmd: string) => {
    setConsoleOutput((prev) => [...prev, `$ ${cmd}`, `Output for: ${cmd}`]);
  };

  return (
    <div className="App">
      <h1>Cybersecurity Training Platform</h1>
      <p className="subtitle">Training created by Malcolm Walker</p>

      {/* Module Selector */}
      {!selectedModule && (
        <div className="grid">
          {Object.keys(modules).map((mod) => (
            <button key={mod} onClick={() => setSelectedModule(mod)}>
              {mod}
            </button>
          ))}
        </div>
      )}

      {/* Level Selector */}
      {selectedModule && !selectedLevel && (
        <div className="grid">
          {Object.keys(modules[selectedModule]).map((lvl) => (
            <button key={lvl} onClick={() => setSelectedLevel(lvl)}>
              {lvl}
            </button>
          ))}
        </div>
      )}

      {/* Lab Selector */}
      {selectedLevel && !selectedLab && (
        <div className="grid">
          {modules[selectedModule!][selectedLevel].map((lab) => (
            <button key={lab} onClick={() => setSelectedLab(lab)}>
              {lab}
            </button>
          ))}
        </div>
      )}

      {/* Lab Tutorial + Console */}
      {selectedLab && (
        <div>
          <h2>{selectedLab}</h2>
          <ul>
            {tutorials[selectedLab]?.map((step, idx) => (
              <li key={idx}>{step}</li>
            )) || <li>No tutorial yet.</li>}
          </ul>

          {/* Simulated Console */}
          <div className="console">
            {consoleOutput.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
          <div className="console-buttons">
            <button onClick={() => runCommand("ls")}>Run ls</button>
            <button onClick={() => runCommand("pwd")}>Run pwd</button>
            <button onClick={() => runCommand("echo hello")}>Run echo</button>
          </div>

          <button onClick={() => setSelectedLab(null)}>Back</button>
        </div>
      )}
    </div>
  );
}