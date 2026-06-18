import Social from "./socials.model.js";
import { makeCrud } from "../../_shared/crudController.js";

/** Socials controller — pure CRUD from the factory. */
const crud = makeCrud(Social);

export const listSocials = crud.list;
export const getSocial = crud.getOne;
export const createSocial = crud.create;
export const updateSocial = crud.update;
export const deleteSocial = crud.remove;
