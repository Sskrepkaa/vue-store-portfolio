<template>
  <Bag
    v-if="flagBasket"
    :fetchBagItemsData="fetchBagItemsData"
    :totalPrice="endPriceFunc"
    @backBag="backFromBasket"
    @isDel="isDelFromBag">
  </Bag>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <MyHeader :totalPrice="endPriceFunc" :name="user" @viewBag="viewBasket()"/>
    <RouterView :fData="fetchData" @newQuery="newQueryF" @isLiked="isLiked" @isAdded="isAdded"/>
  </div>
</template>


<script>
import MyHeader from '@/components/Header.vue';
import Bag from '@/components/Bag.vue'
import * as api from '@/api/api.js';
import { RouterView} from 'vue-router';
import { useAuthStore } from '@/store/auth.js';

export default {
  components: { MyHeader, Bag},
  data() {
    return {
      fetchData: [],
      flagBasket: false,
      user: this.userEmail,
      fetchBagItemsData: [],
      fetchFavoriteData: [],
    }
  },
  computed: {
    endPriceFunc() {
        if (!Array.isArray(this.fetchBagItemsData)) {
            return 0; // default
        }
        return this.fetchBagItemsData.reduce((accu, item) => accu + item.price, 0)
    },
    userEmail() {
      const authStore = useAuthStore();
      return authStore.isLoggedIn ? authStore.user : null;
    }
  },
  methods: {
    newQueryF(newQ) {
      this.loadData(newQ);
    },

    async loadData(options) {
      try {
        let data = [];
        if (options) {
          console.log("search", options);
          data = await api.fetchData(`sneakers?${options}`);
        }
        else {
          data = await api.fetchData("sneakers");
        }
        //const {data: favorite} = await api.fetchAuthData("favorite");
        //const {data: bagData} = await api.fetchAuthData("bag");
        if (data.status == 200) {
          this.fetchData = data.data.map((item) =>
            ({
              ...item,
              isLiked: false,
              isAdded: false
            })
          );

          // if (bagData.length>0) {
          //   this.fetchBagItemsData = bagData;
          // }
          // else console.log("bag == 0: ", bagData);

          // if (favorite.length>0) {
          //   this.fetchFavoriteData = favorite;
          // }
          // else console.log("favor == 0: ", bagData)

          // if (favorite.length>0 || bagData.length>0) {
          //   this.fetchData.map((item) => {
          //     const liked = favorite.find(favoriteItem => favoriteItem.parentId === item.id);
          //       if (liked) item.isLiked = true;
          //     const added = bagData.find(bagItem => bagItem.parentId === item.id);
          //       if (added) item.isAdded = true;
          //   })
          // }


        }
        else console.log("no data: ", data)
      }
      catch (e) {console.log("no get data: ", e)}
    },
    async loadFavoriteData() {
      try {
        const {data: favorite} = await api.fetchAuthData("favorite");
        if (favorite.length>0) {
          this.fetchFavoriteData = favorite;
          if (this.fetchData.length>0) {
            this.fetchData.map((item) => {
              const liked = favorite.find(favoriteItem => favoriteItem.parentId === item.id);
                if (liked) item.isLiked = true;
            })
          }
        }
        else console.log("no favorite data: ", favorite)
      } catch (error) {
        alert("no favorite data catch: ", error)
      }
    },
    async loadBagData() {
      try {
        const {data: bagData} = await api.fetchAuthData("bag");
        this.fetchBagItemsData = bagData;
        if (bagData.length>0) {
          if (this.fetchData.length>0) {
            this.fetchData.map((item) => {
              const added = bagData.find(bagItem => bagItem.parentId === item.id);
                if (added) item.isAdded = true;
            })
          }
        }
        else console.log("no bag data: ", bagData)
      } catch (error) {
        alert("no bag data catch: ", error)
      }
    },
    async isLiked(item) {
      // post to server {parentId=item.id}, if 200 then:
      console.log("BBBAAAAANNNNG: ", item)
      const authStore = useAuthStore();
      if (!item.isLiked) {
        const resp = await api.addItem("favorite", {
          parentId: item.id,
          user_id: authStore.user.id
        });
        console.log("post l: ", resp);
        if (resp) {item.isLiked = true;
        }
      }
      else {
        console.log("delete l 1 fd: ", this.fetchFavoriteData);
        const liked = this.fetchFavoriteData.find(favItem => favItem.parentId === item.id);
        const resp = await api.deleteItemById("favorite", liked.id);
        console.log("delete l: ", resp);
        if (resp) {item.isLiked = false;
        }
      }
    },
    async isAdded(item) {
      // post to server {parentId=item.id}, if 200 then:
      console.log("BBBAAAAANNNNG add: ", item)
      const authStore = useAuthStore();
      if (!item.isAdded) {
        const resp = await api.addItem("bag", {
          parentId: item.id,
          user_id: authStore.user.id,
          title: item.title,
          price: item.price,
          img: item.img
        });
        console.log("post a: ", resp);
        if (resp) {item.isAdded = true;
        await this.loadBagData();}
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
  async mounted() {
    const authStore = useAuthStore();
    await authStore.checkToken()
    if (authStore.token && authStore.user) {
      console.log("hallo dude", authStore.token)
      await Promise.all([
          this.loadData(),
          this.loadBagData(),
          this.loadFavoriteData()
        ]);
    }
    else {
        await this.loadData();
      }
    document.addEventListener('login', async () => {
      console.log('LOGIN loaded');
      await Promise.all([
          this.loadBagData(),
          this.loadFavoriteData()
        ]);
    });
    document.addEventListener('logout', () => {
      console.log('LOGOUT loaded');
      this.fetchBagItemsData=[];
      this.fetchFavoriteData=[];
      window.location.reload();
    });
  }
}
</script>