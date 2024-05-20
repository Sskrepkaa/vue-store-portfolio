<template>
  <Bag
    v-if="flagBasket"
    :fetchBagItemsData="fetchBagItemsData"
    :totalPrice="endPriceFunc"
    @backBag="backFromBasket"
    @isDel="isDelFromBag">
  </Bag>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <MyHeader :totalPrice="endPriceFunc" :name="user.name" @viewBag="viewBasket()"/>
    <RouterView :fData="fetchData" @isLiked="isLiked" @isAdded="isAdded"/>
  </div>
</template>


<script>
import MyHeader from '@/components/Header.vue';
import Bag from '@/components/Bag.vue'
//import bagItemsJson from '@/json/bag.json'
//import sneakersJson from '@/json/sneakers.json'
import * as api from '@/api/api.js';
import { RouterView } from 'vue-router';

export default {
  components: { MyHeader, Bag},
  data() {
    return {
      fetchData: Array,
      flagBasket: false,
      user: {name:"Max"},
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
        const {data: favorite} = await api.fetchAuthData("favorite");
        const {data: bagData} = await api.fetchAuthData("bag");

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
        const {data: bagData} = await api.fetchAuthData("bag");

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
        console.log("delete l 1 fd: ", this.fetchFavoriteData);
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
      //item.isAdded != !item.isAdded;
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
    async isDelFromBag(item) {
      try {
        //const added = this.fetchBagItemsData.find(bagItem => bagItem.parentId === item.id);
        const resp = await api.deleteItemById("bag", item.id);
        console.log("delete a: ", resp);
        if (resp) {
          const mainItem = this.fetchData.find(mainItem => item.parentId === mainItem.id);
          mainItem.isAdded = false;
          this.loadBagData();}
      } catch (e) {
        alert("no del: ", e)
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