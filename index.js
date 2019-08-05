const express = require('express');
const users = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: "Error when getting users." })
        })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ errorMessage: "User with that ID could not be found." })
            } else {
                res.status(200).json(user);
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error when getting specific user." })
        })
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name && newUser.bio) {
        users.insert(newUser)
        .then(() => {
            res.status(201).json({ message: "Successfully created user." });
        })
        .catch(error => {
            res.status(500).json({ message: "Error when creating new user." });
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide a name and bio for the user." })
    }
});

server.delete('/api/users/:id', (req, res) => { 
    const id = req.params.id;

    users.remove(id)
        .then(id => {
            if(id) {
                res.status(200).json({ message: "Successfully removed user." })
            } else {
                res.status(404).json({ errorMessage: "User with that ID could not be found." })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "Error when removing user." })
        })
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    if(changes.name && changes.bio) {
        users.update(id, changes)
            .then(updated => {
                if(updated) {
                    res.status(200).json({ message: "Successfully updated the user." });
                } else {
                    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "Error when updating user." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

const port = 8000;
server.listen(port, console.log(`Listening on port ${port}`));