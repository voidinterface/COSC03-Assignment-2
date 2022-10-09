const express = require('express');
var bird_controller = require('../controllers/bird_controller');
const multer = require('multer');
const upload = multer({dest: 'images/'})
const fs = require('fs');
const path = require('path');

/* create a router (to export) */
const router = express.Router();

/* route the default URL: `/birds/ */
router.get('/', async (req, res) => {
    // extract the query params
    const search = req.query.search;
    const status = req.query.status;
    const sort = req.query.sort;

    // render the Pug template 'home.pug' with the filtered data
    res.render('home', {
        birds: await bird_controller.filter_bird_data(search, status, sort),
        home: true
    });
})

//  "Create" route(s)
router.get('/create', (req, res) => {
    res.render('bird_form');
});
router.post('/create', upload.single('photo'), async (req, res) => {
    var body = req.body;
    if (req.file) {
        const target = path.join(__dirname, '../public/images/') + req.file.originalname;
        fs.rename(req.file.path, target, (err) => null);
        body.source = req.file.originalname;
    }
    await bird_controller.create_bird(body);
    res.redirect("/");
});


// get individual bird route(s)
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    var bird = await bird_controller.get_bird_by_id(id);
    if (bird !== null) {
        res.render('bird', {
            bird: bird,
            home: false
        });
    } else {
        res.redirect("/404");
    }
});

//Update bird route(s)
router.get('/:id/update', async (req, res) => {
    const id = req.params.id;
    var bird = await bird_controller.get_bird_by_id(id);
    if (bird !== null) {
        res.render('bird_form', {
            bird: bird,
        });
    } else {
        res.redirect("/404");
    }
});

router.post('/edit', upload.single('photo'), async (req, res) => {
    var body = req.body;
    if (req.file) {
        const target = path.join(__dirname, '../public/images/') + req.file.originalname;
        fs.rename(req.file.path, target, (err) => null);
        body.source = req.file.originalname;
    } else if (body.prev_image) {
        body.source = body.prev_image;
    }
    await bird_controller.update_bird(body);
    res.redirect("/");
});

// Delete bird route(s)
router.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    await bird_controller.remove_bird_by_id(id);
    res.redirect('/');
});

module.exports = router; // export the router