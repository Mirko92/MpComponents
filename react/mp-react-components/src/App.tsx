import { useState } from 'react';
import './App.scss'
import { MpCardCarousel, MpCardData } from './components/MpCardCarousel';
import { MpFlipCard } from './components/MpHoverCard';

const twoColumnsStyle: React.CSSProperties = {
  display: 'flex',
  flexFlow: 'row nowrap',
  minHeight: "800px"
}

/**
 * Test images 
 */
const imgs: MpCardData[] = [
  { imgUrl: "/matrix.webp",             title: 'Matrix',                  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { imgUrl: "/existence_pain.png",      title: 'Existence Pain',          description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/night.jpg",               title: 'Night',                   description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut.' },
  { imgUrl: "/prova.png",               title: 'Prova',                   description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/img1.jpg",                title: 'Img1',                    description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' },
  { imgUrl: "/img2.png",                title: 'Img2',                    description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
  { imgUrl: "/img3.png",                title: 'Img3',                    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
  { imgUrl: "/r_m_dinner.jpg",          title: 'Rick e Morty',            description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' },
  { imgUrl: "/black-hole-mountains.jpg",title: 'Black Hole Mountains',    description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' }
];

function App() {

  const [flipCardType, setFlipCardType] = useState<'radio'|'checkbox'>("checkbox");
  const [flipCardDir, setDirection] = useState<'vertical'|undefined>();

  return (
    <>
      <header>
        <h1>Test page</h1>
      </header>

      <section>
        <header className='d-flex gap1 mb1'>

          <fieldset>
            <legend>Selection type</legend>
            <label htmlFor="flip-card-type-radio">
              <input 
                id='flip-card-type-radio'
                type="radio" 
                name='flip-card-type'
                onChange={() => setFlipCardType('radio')}
                checked={flipCardType === 'radio'}
              />
              Radio
            </label>
            <label htmlFor="flip-card-type-check">
              <input 
                id='flip-card-type-check'
                type="radio" 
                name='flip-card-type'
                onChange={() => setFlipCardType('checkbox')}
                checked={flipCardType === 'checkbox'}
              />
              Checkbox
            </label>
          </fieldset>

          <fieldset>
            <legend>Direction</legend>
            <label htmlFor="flip-card-dir-horiz">
              <input 
                id='flip-card-dir-horiz'
                type="radio" 
                name='flip-card-dir'
                onChange={() => setDirection(undefined)}
                checked={flipCardDir === undefined}
              />
              Horizontally
            </label>
            <label htmlFor="flip-card-dir-vert">
              <input 
                id='flip-card-dir-vert'
                type="radio" 
                name='flip-card-dir'
                onChange={() => setDirection('vertical')}
                checked={flipCardDir === 'vertical'}
              />
              Vertically
            </label>
          </fieldset>

        </header>

        <div className='grid-sample'>
          {
            imgs.map((x,i) => {
              return (
                <MpFlipCard 
                  key={`MpHoverCard${i}`}
                  type={flipCardType}
                  name='something'
                  direction={flipCardDir}
                >
                  <MpFlipCard.Front>
                    <div style={{background: `url(${x.imgUrl})`, height: "100%", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    </div>
                  </MpFlipCard.Front>

                  <MpFlipCard.Back>
                    <h2>Testo nel retro</h2>
                    <h5>Altro testo un po' più lungo del precedente</h5>
                  </MpFlipCard.Back>
                </MpFlipCard>
              );
            })
          }
        </div>
      </section>

      <section>
        <div style={twoColumnsStyle}>
          <MpCardCarousel items={imgs} >
            { 
              (i) => <>
                <h1>{i?.title}</h1>

                <h3>{i?.description}</h3>
              </>
            }
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
      </section>

    </>
  )
}

export default App




