import React, { useState, useEffect } from "react";
import ColorItem from "./ColorItem";
import Pagination from "./Pagination";

function generateHexColorsChunk(start, end) {
  const colors = [];
  for (let r = start; r < end; r++) {
    for (let g = 0; g < 256; g++) {
      for (let b = 0; b < 256; b++) {
        const color = `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        colors.push(color);
      }
    }
  }
  return colors;
}

function ColorLibrary() {
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const colorsPerPage = 1000;
  const chunkSize = 16;

  useEffect(() => {
    const loadColors = async () => {
      setLoading(true);
      let allColors = [];
      for (let i = 0; i < 256; i += chunkSize) {
        const chunk = generateHexColorsChunk(i, i + chunkSize);
        allColors = allColors.concat(chunk);
        setColors(allColors);
        setLoadingProgress(Math.floor((i / 256) * 100));
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      setLoadingProgress(100);
      setLoading(false);
    };
    loadColors();
  }, []);

  const indexOfLastColor = currentPage * colorsPerPage;
  const indexOfFirstColor = indexOfLastColor - colorsPerPage;
  const currentColors = colors.slice(indexOfFirstColor, indexOfLastColor);

  const nextPage = () => {
    if (currentPage < Math.ceil(colors.length / colorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(colors.length / colorsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full p-4">
      {loading ? (
        <p className="text-center">Loading {loadingProgress}%</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Hex Color Library</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentColors.map((color, index) => (
              <ColorItem key={index} color={color} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(colors.length / colorsPerPage)}
            onPageChange={handlePageChange}
            onNext={nextPage}
            onPrev={prevPage}
          />
        </>
      )}
    </div>
  );
}

export default ColorLibrary;
