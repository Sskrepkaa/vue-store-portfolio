<template>
  <Bag
    v-if="flagBasket"
    :fetchBagItemsData="fetchBagItemsData"
    :totalPrice="endPriceFunc"
    @backBag="backFromBasket">
  </Bag>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <MyHeader :totalPrice="endPriceFunc" @viewB="viewBasket()"/>
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
      <CardList :fData="fetchData" @isLiked="isLiked" @isAdded="isAdded"/>
    </div>
  </div>
</template>


<script>
import CardList from '@/components/CardList.vue';
import MyHeader from '@/components/Header.vue';
import Bag from '@/components/Bag.vue'
//import bagItemsJson from '@/json/bag.json'
//import sneakersJson from '@/json/sneakers.json'
import * as api from '@/api/api.js';

export default {
  components: {CardList, MyHeader, Bag},
  data() {
    return {
      fetchData: Array,
      flagBasket: false,
      fetchBagItemsData: Array,
      fetchFavoriteData: Array,
    }
  },
  computed: {
    endPriceFunc() {
        if (!Array.isArray(this.fetchBagItemsData)) {
            return 0; // default
        }
        return this.fetchBagItemsData.reduce((accu, item) => accu + item.price, 0)
    }
  },
  methods: {
    async loadData() {
      try {

        const data = await api.fetchData("sneakers");
        const {data: favorite} = await api.fetchData("favorite");
        const {data: bagData} = await api.fetchData("bag");

        if (data.status == 200) {
          this.fetchData = data.data.map((item) =>
            ({
              ...item,
              isLiked: false,
              isAdded: false
            })
          );

          if (bagData.length>0) {
            this.fetchBagItemsData = bagData;
          }
          else console.log("bag == 0: ", bagData);

          if (favorite.length>0) {
            this.fetchFavoriteData = favorite;
          }
          else console.log("favor == 0: ", bagData)

          if (favorite.length>0 || bagData.length>0) {
            this.fetchData.map((item) => {
              const liked = favorite.find(favoriteItem => favoriteItem.parentId === item.id);
                if (liked) item.isLiked = true;
              const added = bagData.find(bagItem => bagItem.parentId === item.id);
                if (added) item.isAdded = true;
            })
          }


        }
        else console.log("no data: ", data)
      }
      catch (e) {alert("no get data: ", e)}
    },
    async loadBagData() {
      try {
        const {data: bagData} = await api.fetchData("bag");

        if (bagData.length>0) {
          this.fetchBagItemsData = bagData;
        }
        else console.log("no data: ", bagData)
      } catch (error) {
        alert("no get data2: ", error)
      }
    },
    async isLiked(item) {
      // post to server {parentId=item.id}, if 200 then:
      console.log("BBBAAAAANNNNG: ", item)
      //item.isLiked = !item.isLiked;
      if (!item.isLiked) {
        const resp = await api.addItem("favorite", {
          parentId: item.id
        });
        console.log("post l: ", resp);
        if (resp) {item.isLiked = true;
        this.loadBagData();}
      }
      else {
        const liked = this.fetchFavoriteData.find(favItem => favItem.parentId === item.id);
        const resp = await api.deleteItemById("favorite", liked.id);
        console.log("delete l: ", resp);
        if (resp) {item.isLiked = false;
        this.loadBagData();}
      }
    },
    async isAdded(item) {
      // post to server {parentId=item.id}, if 200 then:
      console.log("BBBAAAAANNNNG add: ", item)
      //item.isAdded = !item.isAdded;
      if (!item.isAdded) {
        const resp = await api.addItem("bag", {
          parentId: item.id,
          title: item.title,
          price: item.price,
          img: item.img
        });
        console.log("post a: ", resp);
        if (resp) {item.isAdded = true;
        this.loadBagData();}
      }
      else {
        const added = this.fetchBagItemsData.find(bagItem => bagItem.parentId === item.id);
        const resp = await api.deleteItemById("bag", added.id);
        console.log("delete a: ", resp);
        if (resp) {item.isAdded = false;
        this.loadBagData();}
      }
    },
    backFromBasket() {
      this.flagBasket=false;
    },
    viewBasket() {
      this.flagBasket=true;
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>