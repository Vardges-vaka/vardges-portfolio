import mongoose from "mongoose";

// ─── Shared sub-schemas ───────────────────────────────────────────────────────

const coordinateSchema = () => {
  return new mongoose.Schema(
    { lat: { type: Number }, lng: { type: Number } },
    { _id: false },
  );
};

export { coordinateSchema };
