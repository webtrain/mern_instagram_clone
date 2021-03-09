const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxLength: 70,
    },
    password: {
      type: String,
      required: true,
      maxLength: 250,
      minLength: 6,
    },
    avatar: {
      type: String,
      default:
        'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light',
    },
    role: { type: String, default: 'user' },
    gender: { type: String, default: 'male' },
    mobile: { type: Number, default: '' },
    address: { type: String, default: '' },
    story: { type: String, default: '' },
    website: { type: String, default: '' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model('user', userSchema);

module.exports = User;
