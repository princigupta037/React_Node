const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3500;

app.get('^/$|/home(.html)?',(req,res )=>{
    res.sendFile(path.join(__dirname, 'views','home.html'));
})

app.get('/login-page(.html)?',(req,res )=>{
    res.sendFile(path.join(__dirname, 'views','loginPage.html'));
})

app.get('/old-page(.html)?',(req,res )=>{
    res.redirect(301,'./login-page.html'); //302 by default
})

app.get('/*', (req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// Without path
// app.get('/',(req ,res )=>{
//     res.sendFile('././views/home.html', {root: __dirname});
// })

// Route Handlers
app.get('./home(.html)?',(req,res,next)=> {
    console.log('attempted to load home.html');
    next()
}, (req,res)=>{
     res.send('Hello world!')
}
);
 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));