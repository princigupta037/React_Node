const whiteList = [
    'https://www.dummy.com',
    'http://127.0.0.1:5500'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed By CORS'));
        }
    },
    optionsSuccessStatus: 200
}


module.exports = corsOptions;