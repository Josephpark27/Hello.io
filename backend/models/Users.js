// MongoDB model that handles user connection and location services

var mongoose = require('../utils/database');
var Schema = mongoose.Schema;
// if (mongoose.connection.readyState === 0) {
//   mongoose.connect(require('./connection-string'));
// }

var newSchema = new Schema({
  'username': { type: String, require: true },
  'rank': { type: Number, require: true, default: 0 },
  // 'role': { type: String, default: 'basic', enum:['basic', 'admin']},
  'accessToken': { type: String },
  'location': {
    type: {
      type: String,    // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('User', newSchema);
