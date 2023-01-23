import mongoose from "mongoose"; // Mongoose
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  mobile_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
});

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.validatePasssword = function (password) {
  const passwordMatch = bcrypt
    .compare(password, this.password)
    .then((compareSuccess) => {
      return compareSuccess;
    })
    .catch((compareFailure) => {
      return compareFailure;
    });
  return passwordMatch;
};

userSchema.methods.sayHello = async function () {
  console.log("Hello from sayhello");
};

export const User = mongoose.model("users", userSchema);
