const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt=require('bcrypt');

const userSchema =new Schema({
email:{
type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures no two users have the same email
    lowercase: true, // Always convert to lowercase before saving
    trim: true, // Remove leading/trailing whitespace
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // The "isEmail" equivalent
},
 password: {
    type: String,
    select: false,

    // ✅ required only if NOT google user
    required: function () {
      return !this.googleId;
    }
  },

  googleId: String, // for future OAuth
bio:{
type:String
},
tweets:[
    {
     type: mongoose.Schema.Types.ObjectId,
     ref:'Tweet'
    }
],
username:{
type:String,
unique: true, // Recommended for lookups
required: true
}
},{timestamps:true});

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User=mongoose.model('User',userSchema);

module.exports=User;