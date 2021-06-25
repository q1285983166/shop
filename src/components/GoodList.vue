<template>
      <router-link
    tag="li"
    :to="`/detail/${g.id}`"
  >
    <img :src="g.image" alt="" />
    <p>{{ g.store_name }}</p>
    <p>{{ g.price }}</p>
  </router-link>
</template>
<script>
export default {
    props:['g']
}
</script>