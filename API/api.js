const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const alert = require('alert-node') ;

mongoose.connect('mongodb+srv://tungnguyen:21011998@sit209-gzop8.mongodb.net/test'); /*process.env.MONGO_URL, { useNewUrlParser: true }**/
const User = require('./models/user');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(`${__dirname}/public`));


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
app.get('https://treasurehunt-sit-209.now.sh/api/test', (req, res) => {
    res.send('The API is working!');
});
app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    console.log(req.body)
    User.find({ username: user, password: password }, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (result.length < 1) {
                alert('Wrong user name or password');
            } else {
                try {
                    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                    console.log(`The token is ${token}`);
                    return res.json({
                        success: true,
                        token: token
                    });
                } catch (err) {
                    return res.send(err);
                }
            }
        }
    })
});
    
app.post('/api/registration', (req, res) => {
    const { user, password } = req.body;
    User.find({ username: user }, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (result.length > 0) {
                alert('User already existed');
            }
            else {
                const newUser = new User({
                    username: user,
                    password: password
                });
                newUser.save(err => {
                    return err
                        ? res.send(err)
                        : res.json({
                            success: true,
                            message: 'Created new user'
                        });
                });
            }
        }
    })
});

// --------- Authorization Middleware ---------
app.use(function(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, jwt_key, (err, decoded) => {
      if (err) return res.json({error: err})
      req.user_id = decoded._id;
      next();
    });
  });

app.get('/api/testjwt', (req, res) => {
    res.send('The JWT is working!');
});

app.get('/api/quest', (req, res) => {
    Quest.find({}, (err, list) => {
        // const {list} = list;
        return err
        ? res.send(err)
        : res.send(list);
    });
});