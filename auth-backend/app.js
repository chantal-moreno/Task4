const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response, next) => {
  response.json({ message: 'Hey! This is your server response!' });
  next();
});

app.post('/register', async (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    position = 'Other',
    status = 'Active',
  } = request.body;

  // Verify that all required fields are present
  if (!firstName || !lastName || !email || !password) {
    return response.status(400).send({
      message:
        'Missing required fields: firstName, lastName, email, and password are required.',
    });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      position,
      status,
    });

    // Save new user
    const result = await user.save();
    response.status(201).send({
      message: 'User Created Successfully',
      result,
    });
  } catch (error) {
    response.status(500).send({
      message: 'Error creating user',
      error,
    });
  }
});
app.post('/login', async (request, response) => {
  try {
    // Search user by email
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      return response.status(404).send({
        message: 'Email not found',
      });
    }

    const passwordCheck = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!passwordCheck) {
      return response.status(400).send({
        message: 'Password does not match',
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      process.env.JWT_SECRET || 'RANDOM-TOKEN',
      { expiresIn: '24h' }
    );

    return response.status(200).send({
      message: 'Login Successful',
      email: user.email,
      token,
    });
  } catch (error) {
    return response.status(500).send({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

dbConnect();

module.exports = app;

