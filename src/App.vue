<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {reactive} from 'vue'

export default {
  setup(){
    const state = reactive({
      layer_front : null,
      layer_back : null
    })
    return state
  }
};
</script>

<style></style>
