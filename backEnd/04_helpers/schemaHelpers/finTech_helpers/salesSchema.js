import mongoose from "mongoose";
import { branches, partnerList, brands } from "./finTech_CONST.js";
import { getSalesSchema } from "./rootSalesSchema.js";

const getPartnerSchema = () => {
  const partnerFields = {};
  for (let i = 0; i < partnerList.length; i++) {
    const partner = partnerList[i];
    partnerFields[partner] = getSalesSchema();
  }
  return new mongoose.Schema(partnerFields, { _id: false });
};

const getBrandsSchema = () => {
  const brandsFields = {};
  for (let i = 0; i < brands.length; i++) {
    const brand = brands[i];
    brandsFields[brand] = getPartnerSchema();
  }
  return new mongoose.Schema(brandsFields, { _id: false });
};

const getBranchesSchema = () => {
  const branchesFields = {};
  for (let i = 0; i < branches.length; i++) {
    const branch = branches[i];
    branchesFields[branch] = getBrandsSchema();
  }
  return new mongoose.Schema(branchesFields, { _id: false });
};

export { getPartnerSchema, getBrandsSchema, getBranchesSchema };
