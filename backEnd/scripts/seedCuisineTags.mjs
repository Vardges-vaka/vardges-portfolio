/**
 * Seed CuisineTag documents from cuisineTags_seed_data.js
 *
 * Run from backEnd/ (needs MONGODB_URL in .env):
 *   npm run seed:cuisineTags
 */

import "dotenv/config";
import mongoose from "mongoose";
import CuisineTag from "../06_models/cloudKitchen/cloudKitchen_general/CuisineTag.js";
import {
  CUISINE_TAGS_SEED,
  CUISINE_TAGS_SEED_META,
} from "./cuisineTags_seed_data.js";

const isDebug = true;

const seedCuisineTags = async () => {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    console.error("❌ MONGODB_URL is missing from .env");
    process.exit(1);
  }

  console.log("[STARTED] seedCuisineTags");
  console.log(`Expected documents: ${CUISINE_TAGS_SEED_META.total}`);

  try {
    await mongoose.connect(mongoUrl);
    console.log("✅ [MONGO_DB] Connected");

    const existingCount = await CuisineTag.countDocuments();
    if (existingCount > 0) {
      console.error(
        `❌ cuisinetags collection is not empty (${existingCount} docs). Aborting to avoid duplicates.`,
      );
      process.exit(1);
    }

    const docs = CUISINE_TAGS_SEED.map((tag) => ({
      ...tag,
      createdBy: new mongoose.Types.ObjectId(tag.createdBy),
    }));

    const inserted = await CuisineTag.insertMany(docs, { ordered: true });
    console.log(`✅ Inserted ${inserted.length} CuisineTag documents`);
    console.log("Counts by kind:", CUISINE_TAGS_SEED_META.counts);

    if (isDebug) {
      const sample = await CuisineTag.findOne({ value: "italian" })
        .select("value label kind source createdBy isActive isDeleted")
        .lean();
      console.log("Sample document (italian):", sample);
    }

    console.log("[COMPLETED] seedCuisineTags");
    process.exit(0);
  } catch (err) {
    console.error("❌ seedCuisineTags failed:", err.message);
    if (err?.writeErrors?.length) {
      console.error("Write errors:", err.writeErrors.slice(0, 3));
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
};

seedCuisineTags();
