const usersDB = {
    users: require('../../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout =  async (req, res) => {
        // On client, also delete the accessToken
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        // IS refreshToken in DB
        const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
        if(!foundUser){
            res.clearCookie('jwt', { httpOnly: true ,sameSite: 'None', secure: true, })
            return res.sendStatus(204);

        }
        //   Delet rt in db
        const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
        const currentUser = { ...foundUser, refreshToken: ''};
        usersDB.setUsers([ ...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..','..','model','user.json'),
            JSON.stringify(usersDB.users)
        );
        res.clearCookie('jwt', { httpOnly : true, sameSite: 'None', secure: true, }); //secure:true - only serves on https
        res.sendStatus(204);
}

module.exports = { handleLogout };