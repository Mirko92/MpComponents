import { component$, useContext } from '@builder.io/qwik'

import './app.scss'
import MpCardCarousel, { MpCardCarouselCtx } from './components/MpCardCarousel'
import { MpCardData } from './model/MpCardData'

const items: MpCardData[] = [
  { imgUrl: "/matrix.webp",         title: 'Matrix',          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { imgUrl: "/existence_pain.png",  title: 'Existence Pain',  description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/night.jpg",           title: 'Night',           description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut.' },
  { imgUrl: "/prova.png",           title: 'Prova',           description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/img1.jpg",            title: 'Img1',            description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' },
  { imgUrl: "/img2.png",            title: 'Img2',            description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/img3.png",            title: 'Img3',            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/r_m_dinner.jpg",      title: 'Rick e Morty',    description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' }
]

export const App = component$(() => {
  return (
    <>
      <div class="two-columns">
        <MpCardCarousel items={items}>
          <Child q:slot='card-details' />
        </MpCardCarousel>
      </div>
      <div class="two-columns">
        <MpCardCarousel items={items}>
          <Child q:slot='card-details' />
        </MpCardCarousel>
        <MpCardCarousel items={items}></MpCardCarousel>
      </div>
      <div class="two-columns">
        <MpCardCarousel items={items}></MpCardCarousel>
        <MpCardCarousel items={items}></MpCardCarousel>
        <MpCardCarousel items={items}></MpCardCarousel>
      </div>
    </>
  )
})


const Child = component$(() => {
  const card = useContext(MpCardCarouselCtx);

  return <>
    {card.value.title}
  </>
})