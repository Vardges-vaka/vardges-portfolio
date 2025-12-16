import mongoose from "mongoose";
import {
  multilingualTextSchema,
  imageSchema,
  projectSwitch,
} from "../04_helpers/schemaHelpers/_schemaHelpers.index.js";
import {
  PROJECT_TYPES,
  GLOBAL_PRIORITIES,
} from "../10_constances/_constances.index.js";

const PRIORITIES = GLOBAL_PRIORITIES.map((priority) => priority.value);

const projectSchema = new mongoose.Schema(
  {
    title: multilingualTextSchema(),
    description: {
      brief: multilingualTextSchema(),
      detailed: multilingualTextSchema(),
    },
    images: [imageSchema()],

    type: { type: String, enum: PROJECT_TYPES, required: true },

    projectInfo: projectSwitch("Web App"),

    config: {
      isPublic: { type: Boolean, required: true },
      priority: { type: String, enum: PRIORITIES },
      timing: {
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        deadline: { type: Date },
        isOngoing: { type: Boolean, default: false },
        isDeadline: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
