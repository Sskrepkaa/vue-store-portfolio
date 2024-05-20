<template>
    <div>
        <div class="p-10">
      <!-- sort -->
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">All sneakers</h1>
        <div class="flex items-center gap-4">
          <select
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
          >
            <option value="name">Name</option>
            <option value="price">Price up</option>
            <option value="price">Price down</option>
          </select>
          <div class="relative">
            <input
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Search..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>
      <CardList :fData="fData" @isLiked="onClickLike" @isAdded="onClickAdd"/>
    </div>
    </div>
</template>

<script>
    import CardList from '@/components/CardList.vue';
    export default {
        components: { CardList },
    props: {
        fData: {
            type: Array,
            required: true
        }
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

<style scoped>

</style>