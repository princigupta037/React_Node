const usersDB = {
    users: require('../../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    //   evaluate jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                '8b6b1998aaddf88cc7b12a96f08469f55984c271309eba8e7896028e1248e4e4e3ca4b674b6290b19c2843d57df50b2cbde6d87824f10ed42d76bdd2f364212c',
                { expiresIn: ' 30s' }

            );
            res.json({ accessToken })
        }
    );

}

module.exports = { handleRefreshToken };