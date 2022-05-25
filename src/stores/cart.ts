// @ts-check
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export interface Cart {
  name: string;
  amount: number;
}

export interface CartRootState {
  rawItems: string[];
}

export const useCartStore = defineStore({
  id: "cart",
  state: (): CartRootState => ({
    rawItems: [],
  }),
  getters: {
    items: (state) =>
      state.rawItems.reduce((acc: Cart[], curr: string) => {
        const existingItem = acc.find((it) => it.name === curr);

        if (!existingItem) {
          acc.push({ name: curr, amount: 1 });
        } else {
          existingItem.amount++;
        }

        return acc;
      }, []),
  },
  actions: {
    addItem(name: string) {
      this.rawItems.push(name);
    },

    removeItem(name: string) {
      const i = this.rawItems.lastIndexOf(name);
      if (i > -1) this.rawItems.splice(i, 1);
    },

    async purchaseItems() {
      const user = useUserStore();
      if (!user.name) return;

      console.log("Purchasing", this.items);
      const n = this.items.length;
      this.rawItems = [];

      return n;
    },
  },
});
