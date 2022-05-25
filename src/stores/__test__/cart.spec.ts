import { describe, beforeEach, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "../cart";
import { useUserStore } from "../user";

describe("User Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  describe("Getter", () => {
    it("should return items", () => {
      const $cart = useCartStore();
      $cart.rawItems = ["banana", "apple"];
      expect($cart.items).toEqual([
        { name: "banana", amount: 1 },
        { name: "apple", amount: 1 },
      ]);
    });
  });

  describe("Actions", () => {
    describe("addItem", () => {
      it("should add string value into rawItems", () => {
        const $cart = useCartStore();
        $cart.addItem("pinia");
        expect($cart.rawItems).toEqual(["pinia"]);
      });
    });
    describe("removeItem", () => {
      it("should remove item from rawItems", () => {
        const $cart = useCartStore();
        $cart.rawItems = ["banana", "apple"];
        $cart.removeItem("banana");
        expect($cart.rawItems).toEqual(["apple"]);
      });
      it("should not remove item from rawItems if has wrong name", () => {
        const $cart = useCartStore();
        $cart.rawItems = ["banana", "apple"];
        $cart.removeItem("pinia");
        expect($cart.rawItems).toEqual($cart.rawItems);
      });
    });

    describe("purchaseItems", async () => {
      it("should return if name empty", async () => {
        const $cart = useCartStore();
        const $user = useUserStore();

        $user.name = "";
        const purchased = await $cart.purchaseItems();
        expect(purchased).toBeFalsy();
      });
      it("should return purchased item", async () => {
        const $cart = useCartStore();
        const $user = useUserStore();

        $user.name = "hello";
        $cart.rawItems = ["banana", "apple"];
        const purchased = await $cart.purchaseItems();
        expect(purchased).toEqual(2);
      });
    });
  });
});
