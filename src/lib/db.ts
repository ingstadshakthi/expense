import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI)
  throw new Error("Please define MONGODB_URI in your environment variables");

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

globalThis.mongooseCache ||= {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<typeof mongoose> {
  if (globalThis.mongooseCache.conn) return globalThis.mongooseCache.conn;

  if (!globalThis.mongooseCache.promise) {
    globalThis.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "expense",
    });
  }

  globalThis.mongooseCache.conn = await globalThis.mongooseCache.promise;
  return globalThis.mongooseCache.conn;
}
