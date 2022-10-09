const Bird = require('../models/bird');
const { bird_sort, search_string } = require('./bird_utils.js');

// get all birds (filtered)
async function filter_bird_data(search, status, sort) {
    // var results = birds;
    var results = await Bird.find({});
    
    // filter by conservation status 
    if (status !== undefined && status !== "All") {
        results = results.filter((b) => b.status == status);
    }
    // filter by search string
    if (search !== undefined && search !== "") {
        results = search_string(results, search);
    }
    // sort by
    if (sort !== undefined) {
        results = bird_sort(results, sort);
    }
    return results;
}

async function get_bird_by_id(id) {
    var bird;
    await Bird.findOne({ _id: id}).then((obj) => {
        bird = obj;
    }).catch((e) => {
        bird =  null;
    });
    return bird;
}

module.exports = { filter_bird_data, get_bird_by_id };