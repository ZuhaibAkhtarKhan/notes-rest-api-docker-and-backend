const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { noteRouter } = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use('/api/notes', noteRouter);

mongoose.connect(process.env.DB_URL).then(()=> {
    console.log('Connected to MongoDB! Starting server.');
    app.listen(process.env.PORT, () => {
        console.log(`Notes server listening on port ${process.env.PORT}`);
    })

}).catch((err) => {
    console.error('Something went wrong!');
    console.error(err);
})

