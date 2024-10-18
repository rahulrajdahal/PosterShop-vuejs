<script setup lang="ts">
import { useCartStore, type Poster } from '@/stores/cart';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';


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

const posters = computed(() =>
  data.value?.results.map((poster: Poster) => ({ ...poster, price: (Math.random() * 20).toFixed(2) }))
)

</script>


<template>

  <div class="px-[12.5%] mt-8">
    <h2 class="text-xl font-semibold text-gray-800">Now Playing</h2>

    <div class="mt-4 grid grid-cols-4 gap-y-8 gap-x-4">
      <span v-if="isLoading">Loading...</span>


      <div v-else v-for="(poster) in posters" :key="poster.id"
        class="flex flex-col gap-4 w-full border border-gray-700 rounded-lg">
        <img :src="`https://image.tmdb.org/t/p/w500${poster.poster_path}`" :alt="poster.title"
          class="rounded-tl-lg rounded-tr-lg w-full">
        <div class="flex flex-col gap-2 px-8 py-2">
          <strong class="text-lg font-semibold">{{ poster.title }}</strong>
          <p class="text-base font-medium">${{ poster.price }}</p>
          <button type="button" class="bg-green-400 px-8 py-2 rounded-md" @click="addToCart(poster)">Add to
            Cart</button>
        </div>
      </div>
    </div>
  </div>

</template>
