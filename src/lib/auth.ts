console.log("🚨🚨🚨 AUTH.TS FILE LOADED - VERSION 2 🚨🚨🚨");

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URL as string);

client
  .connect()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

const db = client.db(process.env.AUTH_DB_NAME as string);

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://focus-agent-client.vercel.app", 
  ],

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      image: { type: "string", required: false },
      role: { type: "string", defaultValue: "user" },
      plan: { type: "string", defaultValue: "user_free" },
      blocked: { type: "boolean", defaultValue: false },
      bio: { type: "string", required: false },
      skills: { type: "string", required: false },
    },
  },
});