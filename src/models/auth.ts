export interface User {
  username: string;
  password: string;
}

export const userCyril: User = {
  username: "cyril",
  password: "pwd",
};

export enum EMODE {
  SIGNIN = "SIGNIN",
  REGISTER = "REGISTER",
}
