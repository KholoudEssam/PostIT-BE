const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const app = express();

mongoose
    .connect('mongodb+srv://admin:12345@cluster0.q8evk.mongodb.net/dokidoki', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(`connection faild ${err}`));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
