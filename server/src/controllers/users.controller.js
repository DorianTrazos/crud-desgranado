const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const { v4 } = require('uuid');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const usersController = {};

usersController.getAllUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });
    return res.json(JSON.parse(data));
  });
};

usersController.getUserById = (req, res) => {
  const { id } = req.params;
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });

    const jsonData = JSON.parse(data);
    const userFound = jsonData.find(user => user.userId === id);

    if (!userFound) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(userFound);
  });
};

usersController.createUser = (req, res) => {
  const newUser = { userId: v4(), ...req.body };

  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });

    const jsonData = [...JSON.parse(data), newUser];

    fs.writeFile(usersFile, JSON.stringify(jsonData), error => {
      if (error) return res.status(500).json({ error: 'Error writing user file' });
      return res.status(200).json(jsonData);
    });
  });
};

usersController.updateUser = (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });

    const jsonData = JSON.parse(data);

    const userFound = jsonData.find(user => user.userId === id);

    const userUpdated = { ...userFound, ...userData };

    const usersUpdated = jsonData.map(user => {
      if (user.userId === userUpdated.userId) {
        user = userUpdated;
      }
      return user;
    });

    fs.writeFile(usersFile, JSON.stringify(usersUpdated), error => {
      if (error) return res.status(500).json({ error: 'Error writing user file' });
      return res.status(200).json(userUpdated);
    });
  });
};

usersController.deleteUser = (req, res) => {
  const { id } = req.params;
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading user file ' });

    const jsonData = JSON.parse(data);

    const usersUpdated = jsonData.filter(user => user.userId !== id);

    fs.writeFile(usersFile, JSON.stringify(usersUpdated), error => {
      if (error) return res.status(500).json({ error: 'Error writing user file' });
      return res.status(200).end();
    });
  });
};

module.exports = usersController;
