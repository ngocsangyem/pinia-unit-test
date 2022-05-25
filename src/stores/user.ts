// @ts-check
import { defineStore } from "pinia";

export interface UserRootState {
  name: string;
  isAdmin: boolean;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserRootState => ({
    name: "John Doe",
    isAdmin: true,
  }),
  actions: {},
});
