import mongoose, { Schema } from "mongoose";

const weatherCacheSchema = new Schema(
  {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    units:{
      type: String,
      required: true
    },
    weatherData: {
      type: Object,
      required: true
    },
    expiresAt:{
      type: Date,
      required: true
    }
  },
);

weatherCacheSchema.index({ latitude: 1, longitude: 1 }, { unique: true });
weatherCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const WeatherCache = new mongoose.model(
  "WeatherCache",
  weatherCacheSchema
);
