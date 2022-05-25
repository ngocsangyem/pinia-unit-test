<template>
  <div id="app">
    <h1>Hello Pinia 🍍!</h1>

    <h2>Logged in as {{ $user.name }}</h2>

    <form @submit.prevent="addItemToCart">
      <input type="text" v-model="itemName" />
      <button>Add</button>
    </form>

    <form @submit.prevent="buy">
      <ul>
        <li v-for="item in $cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="$cart.removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!$user.name">Buy</button>
      <button :disabled="!$cart.items.length" @click="clearCart" type="button">
        Clear the cart
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "./stores/user";
import { useCartStore } from "./stores/cart";

const $user = useUserStore();
const $cart = useCartStore();

const itemName = ref("");

function addItemToCart() {
  if (!itemName.value) return;
  $cart.addItem(itemName.value);
  itemName.value = "";
}

function clearCart() {
  $cart.rawItems = [];
}

async function buy() {
  const n = await $cart.purchaseItems();

  console.log(`Bought ${n} items`);

  $cart.rawItems = [];
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 1rem 2rem;
}

footer {
  font-size: 0.75rem;
  text-align: right;
  color: darkgray;
}
</style>
