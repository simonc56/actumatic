import { IUserDto } from "@shared-libs";

// je laisse la possibilité de rajouter des propriétés à IUser
// spécifique à l'application frontend
export type IUser = IUserDto & {}