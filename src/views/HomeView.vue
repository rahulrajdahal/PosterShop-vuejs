<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { useQuery } from '@tanstack/vue-query';


const { addToCart } = useCartStore()

const { isLoading, data } = useQuery({
  queryKey: ['movies'], queryFn: async () => {
    const response = await fetch(`${import.meta.env.VITE_MOVIES_URL}/now_playing`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
      }
    })

    return await response.json();
  }
})

</script>


<template>

  <div class="px-[12.5%] mt-20">
    <h2 class="text-xl font-semibold text-gray-800">Now Playing</h2>

    <div class="mt-8 grid grid-cols-4 gap-8">
      <span v-if="isLoading">Loading...</span>


      <div v-else v-for="(movie) in data.results" :key="movie.id"
        class="flex flex-col gap-x-4 gap-y-9 w-full border border-gray-700 rounded-lg">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
          class="rounded-tl-lg rounded-tr-lg w-full">
        <div class="flex flex-col gap-2 px-8 py-2">
          <strong class="text-lg font-semibold">{{ movie.title }}</strong>
          <button type="button" class="bg-green-400 px-8 py-2 rounded-md" @click="addToCart(movie)">Add to
            Cart</button>
        </div>
      </div>
    </div>
  </div>

</template>
