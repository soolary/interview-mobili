<template>
  <div>
    <MMNavBar></MMNavBar>
    <div>{{ $store.state.xxx }}</div>
    <button @click="change">gai</button>
  </div>
</template>

<script>
export default {
  methods: {
    change () {
      this.$store.commit('xxx', 777)
    }
  }
}
</script>

<style></style>
