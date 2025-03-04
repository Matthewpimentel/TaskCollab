const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const boardRoutes = require('./routes/boards');
app.use('/api/boards', boardRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('updateTask', async (data) => {
    const { boardId, tasks } = data;
    const board = await Board.findByIdAndUpdate(boardId, { tasks }, { new: true });
    io.emit('taskUpdated', board); // Broadcast to all clients
  });

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});