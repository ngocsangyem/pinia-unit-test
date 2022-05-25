import { describe, beforeEach, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../user";

describe("User Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  describe("State", () => {
    it("name should not empty", () => {
      const $user = useUserStore();
      expect($user.name).toBeTruthy();
      expect($user.name).not.toEqual("");
    });
    it("Admin should be true", () => {
      const $user = useUserStore();
      expect($user.isAdmin).toBeTruthy();
    });
  });
});
