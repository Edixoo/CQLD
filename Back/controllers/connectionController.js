const Connection = require('../models/connectionModel');  // Adjust the path as needed
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const{ decryptField} = require('../controllers/functionNeeded');


exports.listConnections = async (req, res) => {
  try {
    const connections = await Connection.find().populate(['word1', 'word2']);

    res.status(200).send(connections);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createConnection = async (req, res) => {
  try {
    const connection = new Connection(req.body);
    await connection.save();
    res.status(201).send(connection);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.makeConnection = async (test) => {
  try {
    const connection = new Connection(test);
    await connection.save();
  } catch (error) {
  }
};

exports.getConnectionById = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(404).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getConnectionByTheme = async (req, res) => {
  try {
    const connection = await Connection.find({theme: req.params.id}).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(404).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getConnectionByIdInt = async (req, res) => {
  try {
    const connection = await Connection.find({id: req.params.id}).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(404).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateConnection = async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!connection) {
      return res.status(404).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteConnection = async (req, res) => {
  try {
    const connection = await Connection.findByIdAndDelete(req.params.id);
    if (!connection) {
      return res.status(404).send('Connection not found');
    }
    res.status(200).send({ message: 'Connection deleted successfully!' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addManyConnections = async (req, res) => {
  try {
    const connections = req.body;  // Assume an array of connections is passed in the request body
    const result = await Connection.insertMany(connections);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
