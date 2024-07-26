# defineModel

defineModel implementation for vue 2.7 according to 3.4 usage

### Installation 

```
yarn add @hublot-io/define-model
```

### Usage

#### Component with single v-model 

When your component only needs to expose a single v-model, you can use it as in Vue 3.4.

`parent.vue`

```vue

<template>
    <span>
      <HelloWorld v-model="classic" />
        <br>
        <div>Classic Model : {{ classic  }}</div><br>
    </span>
  </template>
  
  <script lang="ts" setup>

      import { ref } from 'vue';
      import HelloWorld from './components/HelloWorld.vue';

      const classic = ref()

  </script>
```


You only need to add the import of defineModel in the child for it to be found. When you migrate to Vue 3.4, you will simply need to remove the import.


`children.vue `

```vue

<template>
  <div>
    <input placeholder="classic" v-model="classic"></input>
  </div>
</template>

<script lang="ts" setup>
import { defineModel } from '@hublot-io/define-model'

const classic = defineModel<string>()

</script>

```




#### Component with multiple v-model 

As in Vue 3.4, you have the possibility to add multiple v-models on a component. However, since Vue 2 does not allow arguments on the model directive, you will need to use a custom directive: v-models.
Additionally, you will need to bind the refs of your v-models so that the library can access and modify them.

`parent.vue`

```vue

<template>
    <span>
      <HelloWorld v-models:multi="multi" v-models:other="other"  />
        <br>
        <div>Multiple Model  : {{ multi }}</div><br>
        <div>Other  : {{ other }}</div><br>
    </span>
  </template>
  
  <script lang="ts" setup>
      import { ref } from 'vue';
      import { bindModels } from '@hublot-io/define-model'
      import HelloWorld from './components/HelloWorld.vue';

      const classic = ref()
      const multi = ref('test')
      const other = ref()

      bindModels({ multi, other })
  </script>
  
```

In the child component, you can use defineModel in the same way as in Vue 3.4.

`children.vue`

```vue

<template>
  <div>
    <input placeholder="multi" v-model="multi"></input>
    <input placeholder="other" v-model="other"></input>
  </div>
</template>

<script lang="ts" setup>
import { defineModel } from '@hublot-io/define-model'

const multi = defineModel("multi")
const other = defineModel("other")

</script>

```
