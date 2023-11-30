import { type Signal, Slot, component$, createContextId, useSignal, useContextProvider, useComputed$ } from "@builder.io/qwik";
import { useIndexIterator } from "../hooks/useIndexIterator";
import { MpCardData } from "../model/MpCardData";

export const MpCardCarouselCtx = createContextId<Readonly<Signal<MpCardData>>>(
  'mp.card-carousel'
);

export interface MpCardCarouselProps {
  items: MpCardData[];
}

function MpCardCarousel$(props: MpCardCarouselProps) {
  const { items } = props;
  
  const containerRef = useSignal<Element>();
  const itemsRef = useSignal<Array<Element | null>>([]) ;

  const { 
    index, 
    next, 
    goTo, 
    previous 
  } = useIndexIterator( items.length, 0 );

  
  const currentCard = useComputed$(() => {
    return items[index.value];
  })

  useContextProvider(MpCardCarouselCtx, currentCard)

  function getScrollWidth() {
    if (containerRef.value) {
      return +itemsRef.value[0]?.clientWidth! + +getComputedStyle(containerRef.value).gap.split('px')[0];
    } else {
      return 0; 
    }
  }

  return <>
    <div class="mp__container">
      <div  class='mp__bg_wrapper' 
            style={{ backgroundImage: `url(${items[index.value].imgUrl})` }} >

        <div class="mp__card">

          <section  class='mp__card__img' 
                    style={{ backgroundImage: `url(${items[index.value].imgUrl})` }}>

            <div class="mp__card__actions">
              <button onClick$={previous}>&lt;</button>
              <button onClick$={next}>&gt;</button>

              <div class="spacer" />

              <span class='index'>
                {(index.value + 1).toString().padStart(2,'0')}
              </span>
            </div>
          </section>

          <section class='mp__card__body'>
            <div class="my-slot">
              <Slot name="card-details"/>
            </div>
            <div class="my-slot-fallback">
              <h1>{currentCard.value.title}</h1>
              <h5>{currentCard.value.description}</h5>
            </div>

            <div class="mp_carousel_container">
              <div  ref={el => containerRef.value = el}
                    class="mp_carousel" 
                    style={{transform: `translateX(-${getScrollWidth() * index.value}px)`}}>
                {
                  ([...items]).slice(1).map( 
                    (x, i) => 
                    <div  key={`carousel_img_${i}}`} 
                          ref={el => (itemsRef.value)[i] = el}>
                      <img 
                        src={x.imgUrl} 
                        onClick$={() => goTo(i+1)}
                      />
                    </div>
                  )
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </>;
}

export default component$(MpCardCarousel$);