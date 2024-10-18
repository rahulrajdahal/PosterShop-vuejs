<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();

const { cartItems } = storeToRefs(cartStore)

</script>

<template>

  <div>
    <h1 class="text-xl font-semibold"> Cart</h1>

    <div v-if="!cartItems.length">
      Your cart is empty.
    </div>
    <div v-else v-for="item in cartItems" :key="item.title" class="flex items-center justify-between">
      <strong>{{ item.title }}</strong>
      <p>{{ item.quantity }}</p>
    </div>


  </div>
</template>
