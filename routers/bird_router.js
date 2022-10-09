const express = require('express');
var bird_controller = require('../controllers/bird_controller');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

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

// TODO: finishe the "Create" route(s)
router.get('/create', (req, res) => {
    // currently does nothing except redirect to home page
    res.render('bird_form');
});
router.post('/create', async (req, res) => {
    // currently does nothing except redirect to home page
    res.redirect('/');
});

// TODO: get individual bird route(s)
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

router.post('/edit', upload.none(), async (req, res) => {
    var body = req.body;
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