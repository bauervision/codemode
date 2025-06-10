/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

const demoCode = [
  { code: "import React from 'react';", comment: "// Import React (required for JSX in older versions)" },
  { code: "", comment: "" },
  { code: "export default function App() {", comment: "// App component: main entry point" },
  { code: "  return (", comment: "// Render UI" },
  { code: "    <div>", comment: "// Root div" },
  { code: "      <h1>Hello, CodeMode!</h1>", comment: "// Heading element" },
  { code: "    </div>", comment: "// Close root div" },
  { code: "  );", comment: "// End return" },
  { code: "}", comment: "// End App component" }
];

export default function CodeEditor() {
  const [learningMode, setLearningMode] = useState(false);

  return (
    <div className="bg-zinc-900 rounded-xl shadow-lg p-6 w-full h-full overflow-auto">
      <div className="flex flex-col space-y-1 font-mono text-sm">
        {demoCode.map((line, idx) => (
          <div key={idx} className="flex">
            <pre className="flex-1">{line.code}</pre>
            {learningMode && (
              <pre className="ml-6 text-cyan-300">{line.comment}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
