import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      require: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      require: true,
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

export const User = model("User", userSchema);

export type UserDoc = InferSchemaType<typeof userSchema>;
