<template>
    <span>
      <HelloWorld v-model="classic" v-models:multi="multi" v-models:other="other"  />
        <br>
        <div>Classic Model :   {{ classic  }}</div><br>
        <div>Multiple Model  : {{ multi }}</div><br>
        <div>Other  : {{ other }}</div><br>
    </span>
  </template>
  
  <script lang="ts" setup>
import { ref } from 'vue';
import { bindModels } from '../src/index.ts'
import HelloWorld from './components/HelloWorld.vue';



const classic = ref()
const multi = ref('test')
const other = ref()

bindModels({ multi, other })



  </script>
  
  <style>

  </style>