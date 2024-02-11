import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS, UserRole } from '@utils/index';

interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  country: string;
  contact: string;
  interestedSports: any;

  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: 'USER',
    },
    interestedSports: {
      type: Array<Schema.Types.ObjectId>,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = model('User', userSchema);

export { User };
