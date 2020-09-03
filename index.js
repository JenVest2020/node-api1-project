const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [
    {
        id: shortid.generate(),
        name: 'Jane Doe',
        bio: "Not Tarzan's wife "
    },
    {
        id: shortid.generate(),
        name: 'Jenni Vest',
        bio: 'Not Jenni Espy'
    },
];

server.listen(5000, () => {
    console.log('server is listening on port 5000...');
});

// server.get('/', (req, res) => {
//     res.send('hello world...');
// });

// server.get('/users', (req, res) => {

// })

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (userInfo) {
        userInfo.id = shortid.generate();
        // console.log('from post:if/else', shortid.generate());
        users.push(userInfo);

        res.status(201).json(userInfo);
    } else {
        res.status(400).json({ message: "Please provide name and bio for the user." });
    }
});

server.get('/api/users', (req, res) => {
    if (users === []) {
        res.status(500).json({ message: 'The users information could not be retrieved.' })
    } else {
        res.status(200).json(users);
    }
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const found = users.find(user => users.id === id);

    if (found) {
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    }
});


server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const deleted = users.find(user => users.id === id);

    if (deleted) {
        users = users.filter(user => user.id !== id);
        res.status(200).json(deleted)
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    }
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    let index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = changes;
        res.status(200).json(users[index]);
    } else {
        res.status(500).json({ message: 'The user information could not be modified.' })
    }
})