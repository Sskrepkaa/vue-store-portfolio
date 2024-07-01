<script>
export default {
  props: {
    item: Object
  },
  methods: {
    onClickDel(i) {
      console.log("key ",i);

      this.$emit("isDel", i)
    }
  }
}
</script>

<template>
  <div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4 my-4">
    <img :src="item.img" class="w-16 h-16" alt="Sneaker" />
    <div class="flex flex-col w-full">
      <p>{{ item.title }}</p>
      <div class="flex justify-between mt-3">
        <span class="font-bold">{{ item.price }} euro</span>
        <img
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
          @click="onClickDel(item)"
        />
      </div>
    </div>
  </div>
</template>
