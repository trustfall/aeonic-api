/**
 * Aeonic Account Controller
 * Created by: Kyle Erickson
 * Jan 20, 2017
 */

// LIBRARY IMPORTS
//import mongoose from 'mongoose';
import { Router } from 'express';
//import Account from '../model/account';
import { User } from '../model/account';
import bodyParser from 'body-parser';
//import passport from 'passport';
import config from '../config';
import { authorize, hashPassword, authenticate } from '../lib/auth';
import thinky from '../config/db';
const r = thinky.r;


export default ( { config, db } ) => {
    let api = Router();

    //  v1/account/register
    api.post('/register', (req,res) => {
        hashPassword(req.body.password)
        .then( (hash) => {
            let user = new User({
                email: req.body.email,
                password: hash
            });

            user.save().then((result) => {
                res.send(JSON.stringify(result));
            });
        });
    });

    //  v1/account/login
    api.post('/login', (req, res) => {
        User.filter({ email: req.body.email}).run().then((user) => {
            res.json(JSON.stringify(user)); 
        }).error((err) => {
            res.json({message: err});
        });
    });
    
    // //  v1/account/logout
    // api.get('/logout', authorize, (req,res) => {
    //     res.logout();
    //     res.status(200).send('Successfully logged out.');
    // });

    // // v1/account/me
    // api.get('/me', authorize, (req, res) => {
    //     res.status(200).json(req.user);
    // });

    return api;
};
