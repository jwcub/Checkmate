var express = require('express');
var router = express.Router();
var db = require('../database/database');

/* GET users listing. */

router.get("/:uid", function (req, res, next) {
    if (req.session.username == undefined) { res.redirect('/login'); return; }
    db.getUserInfo(req.params.uid, (err, dat) => {
        if (err) {
            res.send('404');
            return;
        }
        db.getUserPost(req.params.uid, 1, 10, (err2, dat2) => {
            db.getUserInfo(req.session.uid, (err3, dat3) => {
                if (err2 || err3) {
                    res.send('404');
                    return;
                }
                else { res.render('user', { title: dat.username, username: req.session.username, uid: req.session.uid, userInfo: dat3, userInfo2: dat, userPost: dat2, page: 1 }); return; }
            })
        })
    })
});

router.get("/:uid/page/:page", function (req, res, next) {
    if (req.session.username == undefined) { res.redirect('/login'); return; }
    db.getUserInfo(req.params.uid, (err, dat) => {
        if (err) {
            res.send('404');
            return;
        }
        db.getUserPost(req.params.uid, req.params.page, 10, (err2, dat2) => {
            db.getUserInfo(req.session.uid, (err3, dat3) => {
                if (err2 || err3) {
                    res.send('404');
                    return;
                }
                else { res.render('user', { title: dat.username, username: req.session.username, uid: req.session.uid, userInfo: dat3, userInfo2: dat, userPost: dat2, page: req.params.page }); return; }
            })
        })
    })
});


module.exports = router;
