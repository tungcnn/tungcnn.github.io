const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const alert = require('alert-node') ;

mongoose.connect('mongodb+srv://tungnguyen:21011998@sit209-gzop8.mongodb.net/test', { useNewUrlParser: true });; /*process.env.MONGO_URL, { useNewUrlParser: true }**/
const User = require('./models/user');
const Store = require('./models/store');

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
const port = process.env.PORT || 5000;





app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.post('/api/authenticate', (req, res) => {
    const { user, password } = req.body;
    User.find({username:user}, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (result.length <1) {
                return res.send('No user found');
            } else {
                if (password !== password) {
                    return res.send('Password does not match');
                } else {
                    return res.json({
                        success: true,
                        message: 'Authenticated successfully',
                        // isAdmin: found.isAdmin
                    });
                }
            }
        }
    })
});

app.post('/api/storeauthenticate', (req, res) => {
    const { user, password } = req.body;
    Store.find({name:user}, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (result.length <1) {
                return res.send('No user found');
            } else {
                if (password !== password) {
                    return res.send('Password does not match');
                } else {
                    return res.json({
                        success: true,
                        message: 'Authenticated successfully',
                        // isAdmin: found.isAdmin
                    });
                }
            }
        }
    })
});

// app.post('/api/storeauthenticate', (req, res) => {   
//     const { name, password } = req.body;

//     Store.findOne({name, password}, (err, stores) => {     
//         if (err == true) return res.send(err);
//         else if (stores == undefined) return res.send('store does not exist');
//         else return res.json({
//             success: true,
//             message: 'authenicated successfully'
//         });
//     }); 
// });
    
app.post('/api/registration', (req, res) => {
    const { user, password
        // isAdmin 
    } = req.body;
    User.find({ username: user }, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (result.length > 0) {
                return res.json('User already existed');
            }
            else {
                const newUser = new User({
                    username: user,
                    password,
                    // isAdmin
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

app.post('/api/storeregistration', (req, res) => {  
    const { name, password, lat, lon, instr} = req.body;
    Store.findOne({name, password, lat, lon, instr}, (err, stores) => {
        if (err == true) return res.send(err);
        else if (stores == undefined) 
        {
        const newStore = new Store({
            name,
            password,
            lat,
            lon,
            instr
           });
    
        newStore.save(err => {
            return err
                ? res.send(err)
                : res.json({
                success: true,
                message: 'Created new store'
                });
        });  
    }
        else return res.send('Store already existed')
    }); 
});

app.get('/api/listStores', (req, res) => {
    Store.find({}, (err, stores) => {
        return err
        ? res.send(err)
        : res.send(stores);
    });
});

// // --------- Authorization Middleware ---------
// app.use(function(req, res, next) {
//     if (!req.headers.authorization) {
//       return res.status(403).json({ error: 'No credentials sent!' });
//     }
//     const token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, jwt_key, (err, decoded) => {
//       if (err) return res.json({error: err})
//       req.user_id = decoded._id;
//       next();
//     });
//   });

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