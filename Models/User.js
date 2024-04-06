import mongoose from 'mongoose';
import ROLES from '../Enums/Roles.js'

const UserSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role : {
      type: String,
      enum: ROLES,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    resetToken: {
      type: String,
      required: false
    },
    resetTokenExpiry: {
      type: Date
    },
    
  }, { timestamps: true })

  const User = mongoose.model('user', UserSchema);

export default User;
