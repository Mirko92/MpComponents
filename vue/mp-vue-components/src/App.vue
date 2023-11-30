<script setup lang="ts">
import MpCardCarousel from './components/MpCardCarousel.vue';
import { MpCard } from './model/MpCard';

const items: MpCard[] = [
  { imgUrl: "/matrix.webp",         title: 'Matrix',          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { imgUrl: "/existence_pain.png",  title: 'Existence Pain',  description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/night.jpg",           title: 'Night',           description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut.' },
  { imgUrl: "/prova.png",           title: 'Prova',           description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/img1.jpg",            title: 'Img1',            description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' },
  { imgUrl: "/img2.png",            title: 'Img2',            description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/img3.png",            title: 'Img3',            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/r_m_dinner.jpg",      title: 'Rick e Morty',    description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' }
]
</script>

<template>
  <div class="two-columns">
    <MpCardCarousel :items="items" v-slot="{card}" >
      <div class="card-details">
        <h1><i>{{ card.title }}</i></h1>
        <h6><i>{{ card.description }}</i></h6>
      </div>
    </MpCardCarousel>
  </div>

  <div class="two-columns">
    <MpCardCarousel :items="items" ></MpCardCarousel>
    <MpCardCarousel :items="items" /> 
  </div>
  
  <div class="two-columns">
    <MpCardCarousel :items="items" /> 
    <MpCardCarousel :items="items" /> 
    <MpCardCarousel :items="items" /> 
  </div>
</template>
