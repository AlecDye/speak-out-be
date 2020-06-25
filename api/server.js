require('dotenv').config();

// ------- Imports --------
const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errors.controller');

const staffRoutes = require('./routes/staff.routes');
const studentRoutes = require('./routes/student.routes');
const placementExamRoutes = require('./routes/placement.exam.routes');
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const courseEnrollmentRoutes = require('./routes/course_enrollment.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const userRoutes = require('./routes/user.routes');
const restricted = require('./middlewares/restricted.middleware.js');

// ------- Set up server -------
const server = express();

// ------- Middleware --------
server.use(
  cors({
    origin: [
      'https://thegardenedu.com',
      'http://localhost:3000',
      'https://speakout-now.com',
      'https://speak-out-bh.com',
      'https://www.speak-out-bh.com'
    ],
    credentials: true
  })
);
server.use(express.json());

server.use(authRoutes);
server.use(restricted, staffRoutes);
server.use(restricted, studentRoutes);
server.use(restricted, placementExamRoutes);
server.use(restricted, courseRoutes);
server.use(restricted, courseEnrollmentRoutes);
server.use(restricted, attendanceRoutes);
server.use(restricted, userRoutes);

server.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'Find API documentation here: https://documenter.getpostman.com/view/8230639/SWTD8wyQ?version=latest#ab443920-3ba6-46b2-bff9-0de953af9172'
    );
});

server.use(globalErrorHandler);
module.exports = server;
