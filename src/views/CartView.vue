<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();

const { cartItems, totalPrice } = storeToRefs(cartStore)
const { removeItemFromCart, increaseQuantity, decreaseQuantity } = cartStore
</script>

<template>
  <div class="flex items-center flex-col px-[12.5%]">
    <h1 class="text-xl font-semibold text-left">
      Your Cart Items
    </h1>
    <p>View items in your cart.</p>

    <div v-if="!cartItems.length">
      Your cart is empty.
    </div>

    <div v-else class="flex flex-col">
      <div v-for="item in cartItems" :key="item.title"
        class="flex border-b-4 py-8 px-4 border-b-gray-400 justify-between w-full items-end">

        <div class="flex items-end gap-8">
          <div class="flex flex-col w-full max-w-48 gap-4">
            <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" :alt="item.title" class="w-40">
            <div class="flex flex-col gap-2 w-full">
              <strong class="text-xl">{{ item.title }}</strong>
              <strong class="text-sm">${{ item.price }}</strong>
            </div>
          </div>

          <div class="flex flex-col gap-10 w-full">
            <p class="text-base max-w-[60%]">{{ item.overview }}</p>
            <div class="flex items-center gap-2">
              <strong>Qty:</strong>
              <span class="flex items-center gap-1">
                <button @click="increaseQuantity(item)"
                  class="w-6 h-6 flex items-center justify-center bg-green-600 rounded-full">+ </button>
                <p>{{ item.quantity }}</p>
                <button @click="decreaseQuantity(item)"
                  class="w-6 h-6 flex items-center justify-center bg-green-600 rounded-full"> - </button>
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <strong>Price:</strong>
            <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <button @click="removeItemFromCart(item)"
            class="rounded-md bg-red-600 py-2 px-4 whitespace-nowrap text-white w-full">Remove Poster</button>
        </div>
      </div>


      <div class="flex justify-between mt-4">
        <strong class="text-2xl font-bold">Total:</strong>
        <p class="text-lg font-semibold">${{ totalPrice.toFixed(2) }}</p>
      </div>

      <button
        class="bg-green-400 rounded-md w-fit py-2 font-medium flex self-end mt-4 px-20 text-base">Checkout</button>
    </div>

  </div>
</template>
