<script lang="ts" setup>
import { useHead } from '@ream/app'
import { RouterLink } from 'vue-router'

useHead({
  title: 'About!',
})
</script>

<template>
  <div>
    <h1>About</h1>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
    </ul>
  </div>
</template>
