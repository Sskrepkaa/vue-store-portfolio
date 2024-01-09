<script>

export default {
  data() {
    return {
    }
  },

  props: {
    item: {
            type: Object,
            required: true
        },
  },

  methods: {
    onClickLike(i) {
      console.log(i);
      this.$emit("isLiked", i)
    },
    onClickAdd(i) {
      console.log(i);
      this.$emit("isAdded", i)
    }
  }

}

</script>

<template>
  <div
    class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div @click="onClickLike(item)" class="absolute top-8 left-8">
      <img :src="item.isLiked ? '/like-2.svg' : '/like-1.svg'" alt="Favorite" />
    </div>
    <img :src="item.img" class="w-full" alt="Sneaker" />
    <p>{{ item.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Price:</span>
        <span class="font-bold">{{ item.price }} euro</span>
      </div>
      <img class="" @click="onClickAdd(item)" :src="!item.isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
    </div>
  </div>
</template>
