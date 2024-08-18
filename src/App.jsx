import React from "react";
import ColorLibrary from "./components/ColorLibrary";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ColorLibrary />
      <Footer />
    </div>
  );
}

export default App;
