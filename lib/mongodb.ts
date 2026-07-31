import mongoose, { type Mongoose } from "mongoose";

/**
 * Cached MongoDB connection.
 *
 * Next.js hot-reloads modules in development, which would otherwise open a new
 * connection on every reload until the pool is exhausted. Stashing the
 * connection (and the in-flight promise) on `globalThis` keeps a single
 * connection alive across reloads and across serverless invocations that reuse
 * the same container.
 */

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis._mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis._mongooseCache = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local before submitting enquiries.",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      // Fail fast instead of hanging the request for 30s when the DB is down.
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the failed promise so the next request retries the connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/** True when a database URI is configured, used to fail cleanly in the API. */
export const isDatabaseConfigured = Boolean(MONGODB_URI);
