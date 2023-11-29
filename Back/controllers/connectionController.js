const Connection = require('../models/connectionModel');  // Adjust the path as needed
// const bcrypt = require('bcrypt'); // Used for password comparison
// const crypto = require('crypto');
const Word = require('../models/wordModel');  // Adjust the path as needed
const BASE_ERROR = "BACK ERROR"
// const{ decryptField} = require('../controllers/functionNeeded');


exports.listConnections = async (req, res) => {
  try {
    const connections = await Connection.find().populate(['word1', 'word2']);

    res.status(200).send(connections);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.createConnection = async (req, res) => {
  try {
    const connection = new Connection(req.body);
    
    const highestIdConnexion = await Connection.findOne().sort({ id: -1 });

    const newId = highestIdConnexion ? highestIdConnexion.id + 1 : 1;

    connection.id = newId;
    
    await connection.save();
    res.status(201).send(connection);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.makeConnection = async (test) => {
  try {
    const connection = new Connection(test);
    let highestIdConnexion=null;

    if((await Connection.find()).length>1){
      highestIdConnexion = await Connection.findOne().sort({ id: -1 });
      
    } else if((await Connection.find()).length==1) {
      highestIdConnexion={id: 1}
    }

    const newId = highestIdConnexion ? highestIdConnexion.id + 1 : 1;

    connection.id = newId;

    await connection.save();
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.getConnectionById = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(504).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.getConnectionByTheme = async (req, res) => {
  try {
    const connection = await Connection.find({theme: req.params.id, approved: true }).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(504).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};


exports.getConnexionContainWord = async (req, res) => {
  try {
    const listWord = await Word.distinct('_id', { word: { $regex: new RegExp(req.params.word, 'i') } });

    // Requête pour récupérer les connexions avec id_mots1 ou id_mots2 dans la liste d'IDs obtenue précédemment
    const result = await Connection.find({
        $or: [
            { word1: { $in: listWord} },
            { word2: { $in: listWord} }
        ]
    });

    if (!result) {
      return res.status(504).send('Theme not found');
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }

}

exports.getConnectionByApproved = async (req, res) => {
  try {
    const connection = await Connection.find({approved: false}).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(504).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.getConnectionByIdInt = async (req, res) => {
  try {
    const connection = await Connection.findOne({id: req.params.id, approved: true}).populate(['word1', 'word2']);
    if (!connection) {
      return res.status(504).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.updateConnection = async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!connection) {
      return res.status(504).send('Connection not found');
    }
    res.status(200).send(connection);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.deleteConnection = async (req, res) => {
  try {
    const connection = await Connection.findByIdAndDelete(req.params.id);
    if (!connection) {
      return res.status(504).send('Connection not found');
    }
    res.status(200).send({ message: 'Connection deleted successfully!' });
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};

exports.addManyConnections = async (req, res) => {
  try {
    const connections = req.body;  // Assume an array of connections is passed in the request body
    const result = await Connection.insertMany(connections);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(BASE_ERROR);
  }
};
