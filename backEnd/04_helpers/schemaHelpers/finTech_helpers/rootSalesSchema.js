import mongoose from "mongoose";
import { contributionTypes, varTypes } from "./finTech_CONST.js";

const getVarSchema = () => {
  return new mongoose.Schema(
    {
      amount: {
        qnt: { type: Number },
        percentage: { type: Number },
      },
      orders: {
        qnt: { type: Number },
        percentage: { type: Number },
      },
      aov: {
        qnt: { type: Number },
        percentage: { type: Number },
      },
    },
    { _id: false },
  );
};

const getRevenueContributionSchema = () => {
  return new mongoose.Schema(
    {
      amount: { type: Number },
      orders: { type: Number },
    },
    { _id: false },
  );
};

const getVarTypesSchema = () => {
  const varTypesFields = {};
  for (let i = 0; i < varTypes.length; i++) {
    const varType = varTypes[i];
    varTypesFields[varType] = getVarSchema();
  }
  return new mongoose.Schema(varTypesFields, { _id: false });
};

const getContributionTypesSchema = () => {
  const contributionTypesFields = {};
  for (let i = 0; i < contributionTypes.length; i++) {
    const contributionType = contributionTypes[i];
    salesFields.contribution[contributionType] = getRevenueContributionSchema();
  }
  return new mongoose.Schema(contributionTypesFields, { _id: false });
};

const getSalesSchema = () => {
  return new mongoose.Schema(
    {
      sales: {
        amount: { type: Number },
        orders: { type: Number },
        aov: { type: Number },
        var: getVarTypesSchema(),
      },
      contribution: getContributionTypesSchema(),
    },
    { _id: false },
  );
};

export {
  getVarSchema,
  getRevenueContributionSchema,
  getVarTypesSchema,
  getContributionTypesSchema,
  getSalesSchema,
};
