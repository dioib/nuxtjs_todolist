<template lang="html">
  <div class="timeline">
      <ul>
        <li v-for="(post, index) in posts" :key="post['.key']">
          <div v-bind:class="['hoge-' + index]" v-if="!post.edit" v-text="post.text" @click="editPost(post, index)"></div>
          <input v-bind:class="['hoge-' + index]" v-if="post.edit" type="text" v-model="post.text" @blur="updatePost(post, index)">
          <button  @click="removeTodo(post)">削除</button>
        </li>
      </ul>
      <form @submit.prevent="addToPost">
        <input v-model="newPostText">
        <button>追加 #{{ posts.length }}</button>
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
      edit: false
    }
  },
  methods:{
    removeTodo (post) {
      this.$store.dispatch('REMOVE_POST', { post })
    },
    async addToPost () {
      await this.$store.dispatch('ADD_POST', { text:this.newPostText })
      this.newPostText = ''
    },
    editPost(post){
      this.$set(post,"edit",true)
    },
    updatePost(post){
      this.$set(post,"edit", false)
      this.$store.dispatch('UPDATE_POST', { post })
    }
  },
  created () {
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