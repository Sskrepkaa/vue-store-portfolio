<template>
    <div>
        <div class="p-10">
      <!-- sort -->
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">All sneakers</h1>
        <div class="flex items-center gap-4">
          <select
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
            v-model="sortOption"
            @change="fetchItems"
          >
            <option value="name">Name</option>
            <option value="price">Price up</option>
            <option value="-price">Price down</option>
          </select>
          <div class="relative">
            <input
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              @input="fetchItems"
              v-model="searchItem"
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
    import _ from 'lodash';
    export default {
        components: { CardList },
    data() {
        return {
            searchItem: "",
            sortOption: "name",
        }
    },
    props: {
        fData: {
            type: Array,
            required: true
        }
    },
    watch: {
        // fetchItems(newQuery) {
        //     this.$emit('search', newQuery);
        // },
        searchItemWatch() {
            this.fetchItems();
        }
    },
    methods: {
        //debounse use to set timeout for search&sort
        fetchItems: _.debounce(function() {
            let url = "";
            if (this.sortOption) {
                url += `sortBy=${this.sortOption}`;
            }
            if (this.searchItem) {
                url += `&title=*${encodeURIComponent(this.searchItem)}`;
            }
            this.$emit("newQuery", url);
        }, 300), //timeout in ms


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