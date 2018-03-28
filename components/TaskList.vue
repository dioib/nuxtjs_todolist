<template lang="html">
  <div class="timeline">
      <ul>
        <li v-for="post in posts" :key="post['.key']">
          {{post.text}}
          <button  @click="removeTodo(post)">X</button>
        </li>
      </ul>
      <form @submit.prevent="addToPost">
        <input v-model="newPostText">
        <button>Add #{{ posts.length }}</button>
      </form>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default{
  computed: {
    ...mapGetters(['posts'])
  },
  data: function(){
    return {
      newPostText: '',
    }
  },
  methods:{
    removeTodo (post) {
      this.$store.dispatch('REMOVE_POST', { post })
    },
    async addToPost () {
      await this.$store.dispatch('ADD_POST', { text:this.newPostText })
      this.newPostText = ''
    }
  },
  created () {
      //this.source = postsRef
      this.$store.dispatch('INIT_POSTS', this.source)
  },
}

</script>
<style scoped>
.timeline {
  height: calc(100vh - 76px);
}
.timeline .posts{
  height: calc(100% - 36px);
  overflow-y: auto;
}
.post-enter-active {
  animation: slideIn 0.3s linear;
}
@keyframes slideIn {
  0% {opacity: 0.0}
  100% {opacity: 1.0}
}
</style>