import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export type Poster = { overview: string; title: string; poster_path: string; price: number; quantity: number }
export const useCartStore = defineStore('cart', () => {
  const cartItems: Poster[] = reactive([])

  const cartItemsCount = computed(() => cartItems.length)

  const totalPrice = computed(() => cartItems.map(poster => poster.price * poster.quantity).reduce((prev, current) => prev + current, 0))

  function addToCart(poster: Poster) {
    const existingCartItem = cartItems.find(cartItem => cartItem.title === poster.title)
    if (existingCartItem) {
      increaseQuantity(existingCartItem)
    } else {
      cartItems.push({ ...poster, quantity: 1 })
    }
  }

  function increaseQuantity(poster: Poster) {
    poster.quantity++
  }

  function decreaseQuantity(poster: Poster) {
    if (poster.quantity <= 1) {
      removeItemFromCart(poster)
    } else {
      poster.quantity--
    }
  }

  function removeItemFromCart(poster: Poster) {
    cartItems.splice(cartItems.indexOf(poster), 1)
  }

  return { totalPrice, cartItems, cartItemsCount, addToCart, increaseQuantity, decreaseQuantity, removeItemFromCart }
})
