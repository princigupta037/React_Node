const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3500;
const {logger} = require('../middleware/eventEmitter');
const cors = require('cors');
const errorHandler = require('../middleware/errorHandler')
const corsOptions = require('../config/corsOptions')

// Middleware
app.use(express.urlencoded({extended: false}));

// 1- Built-IN for json
app.use(express.json());

// serve statis files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));
app.use('/employees', require('../../routes/api/employees'));

// 2- Custom Middleware logger
app.use(logger);

// 3rd Party Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.get('^/$|/home(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
})

app.get('/login-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'loginPage.html'));
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, './login-page.html'); //302 by default
})

app.all('*', (req, res) => {
    res.status(404);
    if (res.accepts('html')) {
        res
            .status(404)
            .sendFile(path.join(__dirname, 'views', '404.html'))
    }
    if (res.accepts('json')) {
        res.json({error: "404 Not Found"});
    } else {
        res
            .type('txt')
            .send("404 Not Found");
    }
});

// Without path app.get('/',(req ,res )=>{ res.sendFile('././views/home.html',
// {root: __dirname}); }) Route Handlers
app.get('./home(.html)?', (req, res, next) => {
    console.log('attempted to load home.html');
    next()
}, (req, res) => {
    res.send('Hello world!')
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));