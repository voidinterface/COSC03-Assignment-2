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

async function remove_bird_by_id(id) {
    await Bird.findOneAndRemove({ _id: id}).then(() => null)
        .catch((err) => null);
}

function generate_update(body) {
    var update = {
        primary_name: body.primary_name,
        english_name: body.english_name,
        
        scientific_name: body.scientific_name,
        order: body.order,
        family: body.family,
        status: body.status,
        photo: {
            credit: body.credit,
        },
        size: {
            length: {
                value: body.length
            },
            weight: {
                value: body.weight
            }
        }
    }

    if (body.other_names != "") {
        update.other_names = body.other_names.split(/\r?\n/);
    } 

    if (body.source) {
        update.photo.source = body.source;
    } 
    
    return update;
}

async function update_bird(body) {
    const id = body.id;
    const update = generate_update(body);
    if (id !== undefined) {
        await Bird.findOneAndUpdate(
            {_id: id},
            update
        ).then(() => null).catch((err) => null);
    }
}

async function create_bird(body) {
    const update = generate_update(body);
    var bird = new Bird(update);
    //console.log(bird);
    await Bird.create(update).then(() => null).catch((err) => null);
}


module.exports = { filter_bird_data, get_bird_by_id, remove_bird_by_id,
    update_bird, create_bird };