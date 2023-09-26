const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ThemesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true}
});

// Themes doesn't have a password so just save with the only verification that the required are filled
ThemesSchema.pre('save', function(next) {
  const themes = this;
  if (!themes.isModified('name')) return next();
  next();
});

UserSchema.pre('save', function(next) {
  const themese = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
