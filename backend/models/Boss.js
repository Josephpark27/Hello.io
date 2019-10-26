// MongoDB model that handles user connection and location services

var mongoose = require('../utils/database');
var Schema = mongoose.Schema;

var newSchema = new Schema({
    'name': { type: String, require: true, unique: true },
    'level': { type: Number, require: true, default: 0 },
    'location': {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    'createdAt': { type: Date, default: Date.now },
    'startsAt': { type: Date, default: Date.now },
    'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

newSchema.pre('update', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Boss', newSchema);