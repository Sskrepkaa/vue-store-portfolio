<template>
    <div class="">
        <BagItem
            v-for="item in fetchBagItemsData"
            :key="item.id"
            :title=item.title
            :price=item.price
            :img=item.img
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
}
</script>

<style scoped>

</style>