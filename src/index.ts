import { Ref, ref, watch } from 'vue'
import Vue from 'vue'
import { getCurrentInstance } from 'vue' 


const bus = new Vue()

Vue.mixin({
    props : ["value"],
})


Vue.directive('models', {
    update: function(el, binding, vnode){
        bus.$emit('directive-update-' + binding.arg, {el, binding, vnode} )        
    },
    inserted: function (el, binding, vnode) {
        bus.$emit('directive-insert-' + binding.arg, {el, binding, vnode} ) 
    }
})


// by convention, composable function names start with "use"
export function defineModel<T>(modelValue : string = 'input') : Ref<T>{

    const __instance = getCurrentInstance().proxy;
    const __internalValue = ref<T>()

    if(modelValue === 'input'){
        __internalValue.value = __instance.$props.value as T

        setTimeout(() => {
            watch(__instance.$props, () => {
                __internalValue.value = __instance.$props.value as T
            }, { deep : true})

        })
    }
    else {
        bus.$on('directive-insert-' + modelValue, ({el, binding, vnode}) => {
            if(binding.value)
                __internalValue.value = binding.value
           
            setTimeout(() => {
                 bus.$emit(vnode.context!.$vnode.tag! + '-' + binding.arg,  __internalValue.value);
            })

            watch(__internalValue, () => {
                if(__internalValue.value !== binding.value)
                    bus.$emit(vnode.context!.$vnode.tag! + '-' + binding.arg,  __internalValue.value);
            }, { deep : true})
        })

        bus.$on('directive-update-' + modelValue, ({el, binding, vnode}) => { 
            __internalValue.value = binding.value
        })
    }

   
    watch(__internalValue, () => {
         if(modelValue === 'input')
             __instance.$emit(modelValue, __internalValue.value);
    }, { deep : true})
  
    return __internalValue as Ref<T>

}

export const bindModels = function(models){
    const modelsNameList = Object.getOwnPropertyNames(models)
    setTimeout(() => {
        modelsNameList.forEach((emitName) => {
            bus.$on(models[emitName].dep.subs[0].vm.$vnode.tag + '-' + emitName, (newValue) => {
                models[emitName].value = newValue
            })
        })

    })
}