<script setup lang="ts">
import { MpCard } from "../model/MpCard"
import { useIndexIterator } from "../hooks/useIndexIterator"
import { computed, ref } from "vue";

const itemRefs = ref<HTMLDivElement[]>([])
const containerRef = ref<HTMLDivElement>()

const props = defineProps<{ 
  items: MpCard[]
}>()

const currentItem = computed(() => props.items[index.value]);

const { index, next, previous, goTo } = useIndexIterator(props.items.length, 0);


const scrollWidth = computed(() => {
  const el = itemRefs.value?.[0];

  if (el && containerRef.value) {
      return +el?.clientWidth! + +getComputedStyle(containerRef.value).gap.split('px')[0]
  } else {
    return 0
  }
})
</script>

<template>
<div className="mp__container">
  <div  className='mp__bg_wrapper' 
        :style="`background-image: url(${props.items[index].imgUrl})`" >

    <div className="mp__card">

      <section  className='mp__card__img' 
                :style="`background-image: url(${items[index].imgUrl})`" >

        <div className="mp__card__actions">
          <button @click="previous">&lt;</button>
          <button @click="next">&gt;</button>

          <div className="spacer" />

          <span className='index'>
            {{(index+1).toString().padStart(2,'0')}}
          </span>
        </div>
      </section>

      <section className='mp__card__body'>
        <slot :card="currentItem">
          <h1>{{currentItem.title}}</h1>
          <h5>{{currentItem.description}}</h5>
        </slot>

        <div className="mp_carousel_container">
          <div  className="mp_carousel" 
                ref="containerRef"
                :style="`transform: translateX(-${scrollWidth * index}px)`">

            <div  v-for="(x, i) in props.items.slice(1)" ref="itemRefs">
              <img 
                :src="x.imgUrl"
                @click="() => goTo(i+1)"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>
