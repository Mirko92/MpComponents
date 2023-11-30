import { useRef } from "react";
import { useIndexIterator } from "../hooks/useIndexIterator";

export interface MpCardData {
  imgUrl: string; 
  title?: string; 
  description?: string;
}

interface IMpCardCarouselProps {
  items: MpCardData[];
  children?: ((item?: MpCardData) => React.ReactNode) | never[]
}

export function MpCardCarousel( props : IMpCardCarouselProps ) {
  const { items, children } = props;

  var templateFn = typeof children === 'function'
    ? children
    : null;

  const containerRef = useRef<HTMLElement | null>();
  const itemsRef = useRef<Array<HTMLElement | null>>([]) ;

  function getScrollWidth() {
    if (containerRef.current) {
      return +itemsRef.current[0]?.clientWidth! + +getComputedStyle(containerRef.current).gap.split('px')[0];
    } else {
      return 0; 
    }
  }

  const { 
    index, 
    next, 
    goTo, 
    previous 
  } = useIndexIterator( items.length, 0 );

  return (
    <>
      <div className="mp__container">
        <div  className='mp__bg_wrapper' 
              style={{ backgroundImage: `url(${items[index].imgUrl})` }} >

          <div className="mp__card">

            <section  className='mp__card__img' 
                      style={{ backgroundImage: `url(${items[index].imgUrl})` }}>

              <div className="mp__card__actions">
                <button onClick={previous}>&lt;</button>
                <button onClick={next}>&gt;</button>

                <div className="spacer" />

                <span className='index'>
                  {(index+1).toString().padStart(2,'0')}
                </span>
              </div>
            </section>

            <section className='mp__card__body'>

              {
                templateFn 
                  ? templateFn(items[index])
                  : 
                  <>
                    <h1>
                      {items[index].title}
                    </h1>

                    <p>
                      {items[index].description}
                    </p>
                  </>
              }

              <div className="mp_carousel_container">
                <div  ref={el => containerRef.current = el}
                      className="mp_carousel" 
                      style={{transform: `translateX(-${getScrollWidth() * index}px)`}}>
                  {
                    ([...items]).slice(1).map( 
                      (x, i) => 
                      <div  key={`carousel_img_${i}}`} 
                            ref={el => (itemsRef.current)[i] = el}>
                        <img 
                          src={x.imgUrl} 
                          onClick={() => goTo(i+1)}
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
    </>
  );
}

export interface IMpCardContentProps<T> {
  children?: (item: T) => JSX.Element;

  title: string; 
}

export function MpCardContent<T>( _ : IMpCardContentProps<T>) { 
  return null; 
}