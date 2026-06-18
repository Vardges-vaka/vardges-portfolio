import StackGroup from "./stack.model.js";
import { makeCrud } from "../../_shared/crudController.js";

/** Stack controller — pure CRUD from the factory (no special endpoints). */
const crud = makeCrud(StackGroup);

export const listStack = crud.list;
export const getStackGroup = crud.getOne;
export const createStackGroup = crud.create;
export const updateStackGroup = crud.update;
export const deleteStackGroup = crud.remove;
