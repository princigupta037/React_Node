const usersDB = {
    users: require('../../model/user.json'),
    setUsers: function (data) {
        this.users = data
    }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = usersDB
        .users
        .find(person => person.username === user);
    if (!foundUser)
        return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles":roles
                }
            }, '8b6b1998aaddf88cc7b12a96f08469f55984c271309eba8e7896028e1248e4e4e3ca4b674b6290b19c2843d57df50b2cbde6d87824f10ed42d76bdd2f364212c',
            { expiresIn: '30s' }

        );



        const refreshToken = jwt.sign({
            "username": foundUser.username
        }, 'bd93ccf4e52a45656b8bfe01bb7abb3de80e1c412d1d806498d8a6b723c080e8a15d26e50a3b7ba58c25a6ad8ecf6c3db0a28c37644c0be22ae80e616a95912b', { expiresIn: '1d' });
        // Saving refreshToken with current user
        const otherUsers = usersDB
            .users
            .filter(person => person.username !== foundUser.username);
        const currentUser = {
            ...foundUser,
            refreshToken
        };
        usersDB.setUsers([
            ...otherUsers,
            currentUser
        ]);
        await fsPromises.writeFile(path.join(__dirname, '..', '..', 'model', 'user.json'), JSON.stringify(usersDB.users));
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    handleLogin
};