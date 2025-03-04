const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// Get all boards
router.get('/', async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

// Create a board
router.post('/', async (req, res) => {
  const board = new Board(req.body);
  await board.save();
  res.json(board);
});

// Update a board (e.g., tasks)
router.put('/:id', async (req, res) => {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(board);
});

module.exports = router;