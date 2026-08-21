const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/api/notes', (req, res) => res.json({message: 'Hello from notes.'}));

mongoose.connect(process.env.DB_URL).then(()=> {
    console.log('Connected to MongoDB! Starting server.');
    app.listen(process.env.PORT, () => {
        console.log(`Notes server listening on port ${process.env.PORT}`);
    })

}).catch((err) => {
    console.error('Something went wrong!');
    console.error(err);
})

