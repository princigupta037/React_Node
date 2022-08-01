const userDB = {
    users: require('../../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    // check user and passsword is present
    if (!user || !pwd) return res.status(404).json({ 'message': "User and Password are required." })

    // check for duplicates
    const duplicate = userDB.users.find(person => person.username === user);

    if (duplicate) return res.sendStatus(409);   // conflict
    try {
        // encrypt an decrypt

        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPwd
        }
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromise.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user.json'),
            JSON.stringify(userDB.users)
        )
        console.log(userDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}


module.exports = { handleNewUser }