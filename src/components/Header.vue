<script>
  export default {
    props: {
      totalPrice: Number,
    }
  }
</script>
<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-11" />
      <div>
        <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Shop of the best sneakers</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 cursor-pointer min-w-fit" @click="this.$emit('viewB')">
        <img src="/cart.svg" alt="Cart" />
        <b class="hidden md:block">{{totalPrice}} euro</b>
      </li>
      <li class="flex items-center gap-3 cursor-pointer min-w-fit">
        <img src="/heart.svg" alt="Favorite"/>
        <span class="hidden md:block">Favorite</span>
      </li>
      <li class="flex items-center gap-3 cursor-pointer min-w-fit">
        <img src="/profile.svg" alt="Favorite"/>
        <span class="hidden md:block">Profile</span>
      </li>
    </ul>
  </header>
</template>
