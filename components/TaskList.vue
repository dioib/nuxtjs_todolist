<template lang="html">
  <div class="timeline">
      <ul>
        <li v-for="(post, index) in posts" :key="post['.key']">
          <div class="hoge" v-if="!post.edit" v-text="post.text"></div>
          <input v-bind:class="['hoge-' + index]" v-if="post.edit" @focus="focustest()" v-model="post.text">
          <button @click="editPost(post,index)">{{post.btnEdit ? post.btnEdit : '編集'}}</button>
          <button @click="removeTodo(post)">削除</button>
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
      edit: false,
      btnEdit: "編集"
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
    editPost(post,index){
      if(post.edit){
        this.$set(post,"edit", false)
        this.$store.dispatch('UPDATE_POST', { post })
        this.$set(post,"btnEdit","編集")
      }else{
        this.$set(post,"edit",true)
        this.$set(post,"btnEdit","更新")
      }
    },
    updatePost(post){
      this.$set(post,"edit", false)
      this.$store.dispatch('UPDATE_POST', { post })
      this.$set(post,"btnEdit","編集")
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
.hoge{
  display:inline
}
@keyframes slideIn {
  0% {opacity: 0.0}
  100% {opacity: 1.0}
}
</style>