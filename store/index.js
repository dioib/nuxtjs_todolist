import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()
const postsRef = db.ref('/posts')

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: []
    },
    mutations: {
      ...firebaseMutations
    },
    getters: {
      posts: state => state.posts,
    },
    actions: {
      INIT_POSTS: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('posts', postsRef)
      }),
      ADD_POST: firebaseAction((ctx, { text }) => {
        postsRef.push({
          text
        })
      }),
      REMOVE_POST: firebaseAction((ctx, { post }) => {
        postsRef.child(post['.key']).remove()
      })
    }
  })
}

export default createStore