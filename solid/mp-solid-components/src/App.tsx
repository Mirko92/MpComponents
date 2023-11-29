import { JSX } from 'solid-js'
import './App.scss'
import { MpCardCarousel } from './components/MpCardCarousel'

const twoColumnsStyle: JSX.CSSProperties = {
  "display": 'flex',
  "flex-flow": "row nowrap",
  "min-height": "min(800px, 100vh)"
}

/**
   * Test images 
   */
const imgs = [
  { imgUrl: "/matrix.webp",         title: 'Matrix',          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { imgUrl: "/existence_pain.png",  title: 'Existence Pain',  description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/night.jpg",           title: 'Night',           description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut.' },
  { imgUrl: "/prova.png",           title: 'Prova',           description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/img1.jpg",            title: 'Img1',            description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' },
  { imgUrl: "/img2.png",            title: 'Img2',            description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/img3.png",            title: 'Img3',            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/r_m_dinner.jpg",      title: 'Rick e Morty',    description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' }
];

function App() {
  return (
    <>
      <div style={twoColumnsStyle}>
        <MpCardCarousel items={imgs} >
          {/* { 
            (i) => <>
              <h1>{i?.title}</h1>

              <h3>{i?.description}</h3>
            </>
          } */}
        </MpCardCarousel>
        </div>

        <div style={twoColumnsStyle}>
          <MpCardCarousel items={imgs} ></MpCardCarousel>
          <MpCardCarousel items={imgs} /> 
        </div>
        <div style={twoColumnsStyle}>
          <MpCardCarousel items={imgs} /> 
          <MpCardCarousel items={imgs} /> 
          <MpCardCarousel items={imgs} /> 
        </div>
    </>
  )
}

export default App
