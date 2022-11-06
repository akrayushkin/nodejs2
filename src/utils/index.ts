import { User } from "../models/user.model";

export const getAutoSuggestUsers = (storage: Map<string, User>, loginSubstring: string, limit: number): User[] => {
  return Array.from(storage.values())
    .filter((user: User) => user.login.includes(loginSubstring))
    .sort(compareFn)
    .slice(0, limit);
}

const compareFn = (a: User, b: User) => {
  if (a.login < b.login) {
    return -1;
  }
  if (b.login < a.login) {
    return 1;
  }
  return 0;
};
