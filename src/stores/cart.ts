import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

type Poster = { title: string; poster: string; price: number; quantity: number }
export const useCartStore = defineStore('cart', () => {
  const cartItems: Poster[] = reactive([])

  const cartItemsCount = computed(() => cartItems.length)

  function addToCart(poster: Poster) {
    const existingCartItem = cartItems.find(cartItem => cartItem.title === poster.title)
    if (existingCartItem) {
      existingCartItem.quantity++
    } else {
      cartItems.push({ ...poster, quantity: 1 })
    }
  }
  return { cartItems, cartItemsCount, addToCart }
})
