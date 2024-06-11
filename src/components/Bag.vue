<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" @click="this.$emit('backBag')">

    </div>

    <!-- bag -->
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <h2 class="text-2xl font-bold"><span @click="this.$emit('backBag')" aria-hidden="true">&larr;</span> Basket</h2>

        <div class="flex flex-col flex-1 justify-between">
        <div v-if="!isEmpty">
            <div class=" my-4">
                <BagList :fetchBagItemsData="fetchBagItemsData" @isDel="onClickDel"/>
            </div>

                <div class="">
                    <div class="flex flex-col gap-5">
                        <div class="flex items-end gap-2">
                            <span>Price:</span>
                            <div class="flex-1 border-b border-dashed" />
                            <span class="font-bold">{{ totalPrice }} euro</span>
                        </div>

                        <div class="flex items-end gap-2">
                            <span>Taxes 10%:</span>
                            <div class="flex-1 border-b border-dashed" />
                            <span class="font-bold">{{ Math.round(totalPrice/10) }} euro</span>
                        </div>
                    </div>

                    <button
                    class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
                    >
                    Order
                    <img src="/arrow-next.svg" alt="Arrow" />
                    </button>
                </div>
        </div>
        <div v-else class="flex flex-col gap-5 justify-center">Empty</div>
    </div>

    </div>

</template>

<script>
    import BagList from "@/components/BagList.vue"
    export default {
        components: {
            BagList,
        },
        data() {
            return {
                endPrice: Number,
            }
        },
        props: {
            fetchBagItemsData: Array,
            totalPrice: Number,
        },
        methods: {
            onClickDel(i) {
            console.log("key ",i);
            this.$emit("isDel", i)
            }
        },
        computed: {
            isEmpty() {
                if (this.fetchBagItemsData && this.fetchBagItemsData.length > 0) {
                    return false;
                }
                return true // default
            }
        },
    }
</script>

<style scoped>

</style>