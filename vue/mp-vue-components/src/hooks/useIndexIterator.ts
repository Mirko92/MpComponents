import { ref } from "vue";

export function useIndexIterator( max: number, startIndex: number = 0 ) {
  const index = ref<number>(startIndex);

  function next() {
    index.value = (index.value + 1) % max
  }
  
  function previous() {
    index.value = (index.value - 1 + max) % max 
  }

  function goTo(target: number) {
    index.value = target;
  }

  return {
    index, next, goTo, previous
  }
}