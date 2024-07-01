<template>
    <div class="grid grid-cols-1 max-w-sm gap-3 md:gap-10 md:grid-cols-3 md:max-w-none xl:grig-cols-4">
        <Card
            v-for="item in fData"
            :key="item.id"
            :id=item.id
            :item=item
            @isLiked="onClickLike"
            @isAdded="onClickAdd"
          />
    </div>
</template>

<script>
import Card from "@/components/Card.vue"
export default {
    components: { Card },
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