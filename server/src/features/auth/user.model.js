import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

/**
 * User Schema
 *
 * Security decisions:
 * - password field has select:false → never returned in queries by default
 * - refreshToken stored hashed in DB → if DB leaked, tokens useless
 * - email lowercased + trimmed on save → prevents duplicate variants
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned in queries unless explicitly asked
    },
    refreshToken: {
      type: String,
      select: false, // same — never leak this
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt automatically
  }
)

// Hash password before saving (only if modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method: compare plaintext password against hash
userSchema.methods.comparePassword = async function (plaintext) {
  return bcrypt.compare(plaintext, this.password)
}

// Instance method: return safe user object (no password, no token)
userSchema.methods.toSafeObject = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    avatarUrl: this.avatarUrl,
    plan: this.plan,
    createdAt: this.createdAt,
  }
}

const User = mongoose.model('User', userSchema)
export default User
