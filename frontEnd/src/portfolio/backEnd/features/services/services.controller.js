import Service from "./services.model.js";
import { makeCrud } from "../../_shared/crudController.js";

/** Services controller — pure CRUD from the factory. */
const crud = makeCrud(Service);

export const listServices = crud.list;
export const getService = crud.getOne;
export const createService = crud.create;
export const updateService = crud.update;
export const deleteService = crud.remove;
