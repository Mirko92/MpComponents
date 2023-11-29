import { useState } from "react";

export function useIndexIterator( max: number, startIndex: number = 0 ) {
  const [index, goTo] = useState<number>(startIndex);

  function next() {
    goTo((i) => (i + 1) % max );
  }
  
  function previous() {
    goTo((i) => (i - 1 + max) % max);
  }


  return {
    index, next, goTo, previous
  }
}