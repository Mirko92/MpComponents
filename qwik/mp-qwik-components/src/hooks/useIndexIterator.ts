import { $, useSignal } from "@builder.io/qwik";

export function useIndexIterator( max: number, startIndex: number = 0 ) {
  const index = useSignal<number>(startIndex);
  
  const goTo = $((target: number) => {
    index.value = target;
  })

  const next = $(() => {
    index.value = (index.value + 1) % max;
  })

  const previous = $(() => {
    index.value = (index.value - 1 + max) % max;
  })

  return {
    index, next, goTo, previous
  }
}