const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    credit: {type: String, required: true}, 
    source: {type: String, required: true, unique: true},
});

const LengthSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    units: {type: String, default: "cm"},
});

const WeightSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    units: {type: String, default: "g"},
});

const SizeSchema = new mongoose.Schema({
    length: {type: LengthSchema, required: true},
    weight: {type: WeightSchema, required: true},
});

const BirdSchema = new mongoose.Schema({
    primary_name: {type: String, required: true, unique: true},
    english_name: {type: String, required: true, unique: true},
    scientific_name: {type: String, required: true, unique: true},
    order: {type: String, required: true},
    family: {type: String, required: true},
    other_names: [String],
    status: {type: String, required: true},
    photo: {type: PhotoSchema, required: true},
    size: {type: SizeSchema, required: true},
});

const Bird = mongoose.model('Bird', BirdSchema);

module.exports = Bird;