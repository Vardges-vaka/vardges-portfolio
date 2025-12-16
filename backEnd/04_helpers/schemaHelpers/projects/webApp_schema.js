import mongoose from "mongoose";
import {
  DATABASES,
  CLOUD_STORAGES,
} from "../../../10_constances/_constances.index.js";

/*




*/
const webApp_schema = () => {
  return new mongoose.Schema(
    {
      techStack: [{ type: String, required: true }],
      hasBackEnd: { type: Boolean, required: true },
      db: { type: String, required: true, enum: DATABASES },

      links: {
        gitHub: { type: String, required: true },
        url: { type: String },
      },
      cloudStorage: {
        type: String,
        enum: CLOUD_STORAGES,
      },
      shouldShowPackages: { type: Boolean, required: true },
      packages: [
        {
          ref: { type: String, enum: ["backEnd", "frontEnd"] },
          name: { type: String },
        },
      ],
    },
    { _id: false }
  );
};

export default webApp_schema;
