const express = require('express');
var bird_controller = require('../controllers/bird_controller');

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
    res.redirect('/');
});
router.post('/create', async (req, res) => {
    // currently does nothing except redirect to home page
    res.redirect('/');
});

// TODO: get individual bird route(s)
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    var bird = await bird_controller.get_bird_by_id(id);
    console.log(bird);
    if (bird !== null) {
        res.render('bird', {
            bird: bird,
            home: false
        });
    } else {
        res.redirect("/404");
    }
});

// TODO: Update bird route(s)

// TODO: Delete bird route(s)

module.exports = router; // export the router