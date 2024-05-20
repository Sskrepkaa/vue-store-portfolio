<template>
    <div class="" v-auto-animate>
        <BagItem
            v-for="item in fetchBagItemsData"
            :key="item.id"
            :item="item"
            @isDel="onClickDel"
        />

    </div>
</template>

<script>
import BagItem from "@/components/BagItem.vue"
export default {
    components: { BagItem },
    props: {
        fetchBagItemsData: {
            type: Array,
            required: true
        }
    },
  methods: {
    onClickDel(i) {
      console.log("key ",i);
      this.$emit("isDel", i)
    }
  }
}
</script>

<style scoped>

</style>