<template>
  <div>
    <input placeholder="classic" v-model="classic"></input>
    <input placeholder="multi" v-model="multi"></input>
  </div>
</template>

<script lang="ts" setup>
import { defineModel }   from '../../src/index'

const classic = defineModel()
const multi = defineModel("multi")
const other = defineModel("other")

other.value = 'other'

</script>