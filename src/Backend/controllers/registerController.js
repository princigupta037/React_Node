// const userDB = {
//     users: require('../../model/user.json'),
//     setUsers: function (data) { this.users = data }
// }
const User = require('../../model/User');

const fsPromise = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');




const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    // check user and passsword is present
    if (!user || !pwd) return res.status(404).json({ 'message': "User and Password are required." })

    // check for duplicates usenames in db
    // const duplicate = userDB.users.find(person => person.username === user);
    const duplicate = await User.findOne({ username: user }).exec();


    if (duplicate) return res.sendStatus(409);   // conflict



    try {
        // encrypt an decrypt

        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        }
        )
        console.log(result);
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser }