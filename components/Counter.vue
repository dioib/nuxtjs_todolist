<template>
  <button @click="$store.commit('increment')">{{ $store.state.posts }}</button>
  
</template>

<script>
import { mapGetters } from 'vuex'

</script>