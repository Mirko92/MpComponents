<script lang="ts">
  import type { MpCardData } from "../model/MpCardData";

  export let items: MpCardData[] = [];

  let index = 0; 

  function next() {
    index = (index + 1) % items.length;
  }

  function previous() {
    index = (index - 1 + items.length) % items.length;
  }

  function goTo(target: number) {
    index = target;
  }

  $: currentItem = items[index]

  // function onKeyUpEnter(e: KeyboardEvent, target: number ) {
  //   if (e.key === 'enter') {
  //     goTo(target);
  //   }
  // }
</script>


<div class="mp__container">
  <div
    class="mp__bg_wrapper"
    style={`background-image: url(${currentItem.imgUrl})` }
  >
    <div class="mp__card">
      <section
        class="mp__card__img"
        style={`background-image: url(${currentItem.imgUrl})` }
      >
        <div class="mp__card__actions">
          <button on:click={previous}>&lt;</button>
          <button on:click={next}>&gt;</button>

          <div class="spacer" />

          <span class="index">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>
      </section>

      <section class="mp__card__body">
        <slot prop={currentItem} >
          <h1>{currentItem.title}</h1>
          <h6>{currentItem.description}</h6>
        </slot>

        <div class="mp_carousel_container">
          <div
            class="mp_carousel"
            style={`transform: translateX(-${220 * index}px)`}
          >
            {#each items.slice(1) as x, i}
              <div>
                <img  src={x.imgUrl} 
                      on:click={() => goTo(i + 1)} 
                      alt={x.title}
                />
              </div>
            {/each}
          </div>
        </div>
      </section>
    </div>
  </div>
</div>