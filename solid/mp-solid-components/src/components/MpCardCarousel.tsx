import { For, ParentProps, children } from "solid-js";
import { useIndexIterator } from "../hooks/useIndexIterator";
import { JSX } from "solid-js/h/jsx-runtime";

export interface MpCardData {
  imgUrl: string;
  title?: string;
  description?: string;
}

interface IMpCardCarouselProps {
  items: MpCardData[];
  children?: ((item?: MpCardData) => JSX.Element) | never[]
}

export function MpCardCarousel( props: IMpCardCarouselProps ) {
  let containerRef: HTMLElement;
  let itemsRef: Array<HTMLElement | null> = [];

  const { items, children } = props;
  const templateFn = typeof children === 'function' ? children
    : (item: MpCardData) => <>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </>;


  const { 
    index, 
    next, 
    goTo, 
    previous 
  } = useIndexIterator(items.length, 0);

  function getScrollWidth() {
    if (containerRef && itemsRef?.length) {
      return +itemsRef[0]?.clientWidth! + +getComputedStyle(containerRef).gap.split('px')[0];
    } else {
      return 0; 
    }
  }
  return (
    <>
      <div class="mp__container">
        <div
          class="mp__bg_wrapper"
          style={{ "background-image": `url(${items[index()].imgUrl})` }}
        >
          <div class="mp__card">
            <section
              class="mp__card__img"
              style={{ "background-image": `url(${items[index()].imgUrl})` }}
            >
              <div class="mp__card__actions">
                <button onClick={previous}>&lt;</button>
                <button onClick={next}>&gt;</button>

                <div class="spacer" />

                <span class="index">
                  {(index() + 1).toString().padStart(2, "0")}
                </span>
              </div>
            </section>

            <section class="mp__card__body">
              { templateFn(items[index()]) as any}

              <div class="mp_carousel_container">
                <div
                  ref={(el) => (containerRef = el)}
                  class="mp_carousel"
                  style={{
                    "transform": `translateX(-${getScrollWidth() * index()}px)`,
                  }}
                >
                  <For each={[...items].slice(1)}>
                    {(x, i) => (
                      <div
                        ref={(el) => (itemsRef[i()] = el)}
                      >
                        <img src={x.imgUrl} onClick={() => goTo(i() + 1)} />
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
