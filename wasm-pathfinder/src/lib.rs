mod utils;

use wasm_bindgen::prelude::*;
use std::fmt;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum State {
    Start,
    Finish,
    Unvisited,
    Visited,
    Blocked,
    FinalPath,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    state: State,
    distance: i64,
}

#[wasm_bindgen]
pub struct Board {
    width: u32,
    height: u32,
    cells: Vec<Cell>
}

impl fmt::Display for Board {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell.state == State::Unvisited { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}

#[wasm_bindgen]
impl Board {
    pub fn new(width: u32, height: u32) -> Board {
        let cells = (0.. width * height).map(|_| Cell { state: State::Unvisited, distance: i64::MIN }).collect();
        
        Board {
            width,
            height,
            cells
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    pub fn toggle_start(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);

        self.cells[idx].state = match &self.cells[idx].state {
            State::Start => State::Unvisited,
            _ => State::Start,
        }
    }

    pub fn toggle_finish(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);

        self.cells[idx].state = match &self.cells[idx].state {
            State::Finish => State::Unvisited,
            _ => State::Finish,
        }
    }
}