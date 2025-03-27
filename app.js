const express = require('express');
const path = require('path'); // Added missing import
const app = express();
const userModel = require('./models/user')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Fixed `Path` to `path`

app.get('/', (req, res) => {
    res.render('index'); // Fixed typo
});

app.get('/read', async (req, res) => {
    let users = await userModel.find()

    res.render('read',{users}); // Fixed typo
});
app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});

    res.redirect('/read'); // Fixed typo
});

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;
    let createduser = await userModel.create({
        name:name,
        email:email,
        image:image
    })
    res.redirect('/read')
});

app.listen(3000, () => console.log("Running on port 3000"));