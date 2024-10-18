<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { Cart } from 'meistericons-vue-latest';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore()
const { cartItemsCount } = storeToRefs(cartStore);




</script>

<template>
  <nav class="flex py-4 px-[12.5%] items-center justify-between">
    <router-link to="/" class="text-2xl font-bold">Poster Shop</router-link>

    <router-link to="/cart" class="relative">
      <span
        class="absolute bottom-0 right-0 shadow-sm text-gray-900 font-bold bg-red-500 w-6 h-6 flex items-center justify-center text-center text-lg rounded-full">{{
          cartItemsCount }}</span>
      <Cart class="w-12" />
    </router-link>
  </nav>
</template>
