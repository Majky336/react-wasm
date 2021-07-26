import React, { useEffect, useState } from "react";

const CELL_SIZE = 12; // px
const RECT_SIZE = CELL_SIZE + 1; // CELL + border
const GRID_COLOR = "#CCCCCC";

const PathfinderPage = () => {
  const [wPathfinder, setWPathfinder] =
    useState<typeof import("wasm-pathfinder")>();

  useEffect(() => {
    if (!wPathfinder) {
      console.log("Importing wasm module");
      import("wasm-pathfinder").then((module) => setWPathfinder(module));
    }
  }, [wPathfinder]);

  if (!wPathfinder) {
    return <div>Loading module</div>;
  }

  const board = wPathfinder.Board.new(64, 64);
  const boardWidth = board.width();
  const boardHeight = board.height();

  const canvas = document.getElementById("board-canvas") as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");

  const drawGrid = () => {
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= boardWidth; i++) {
      ctx.moveTo(i * RECT_SIZE + 1, 0);
      ctx.lineTo(i * RECT_SIZE + 1, RECT_SIZE * boardHeight + 1);
    }

    for (let j = 0; j <= boardHeight; j++) {
      ctx.moveTo(0, j * RECT_SIZE + 1);
      ctx.lineTo(RECT_SIZE * boardWidth + 1, j * RECT_SIZE + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row: number, column: number) => {
    return row * boardWidth + column;
  };

  const drawCells = () => {
    if (!ctx) {
      return;
    }

    const cellsPtr = board.cells();
    const cells = new Uint8Array(
      wPathfinder.memory.buffer,
      cellsPtr,
      boardWidth * boardHeight
    );
    ctx.beginPath();

    for (let row = 0; row < boardHeight; row++) {
      for (let col = 0; col < boardWidth; col++) {
        const idx = getIndex(row, col);

        ctx.fillStyle =
          cells[idx] === wPathfinder.State.Unvisited ? "#333" : "#123456";

        ctx.fillRect(
          col * RECT_SIZE + 1,
          row * RECT_SIZE + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    ctx.stroke();
  };

  drawGrid();
  drawCells();

  return (
    <div>
      <div className="text-center">
        <h3 className="text-xl">Pathfinder playground</h3>
      </div>
      <div className="flex justify-center items-center mt-10">
        <canvas
          id="board-canvas"
          height={RECT_SIZE * boardHeight + 1}
          width={RECT_SIZE * boardWidth + 1}
        />
      </div>
    </div>
  );
};

export default PathfinderPage;
