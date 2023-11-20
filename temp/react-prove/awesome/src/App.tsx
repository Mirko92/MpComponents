import { useEffect, useState } from 'react'
import './App.scss'

function App() {

  /**
   * Available images 
   */
  const [imgs] = useState<string[]>([
    "/matrix.webp",
    "/existence_pain.png",
    "/night.jpg",
    "/prova.png",
    "/img1.jpg",
    "/img2.png",
    "/img3.png",
    "/r_m_dinner.jpg"
  ]);

  /**
   * Current selected image index
   */
  const [index, setIndex] = useState<number>(0);

  useEffect(() => onInit(), []);

  function onInit() {
    console.debug( "onInit" );
  }


  function next() {
    setIndex((i) => (i + 1) % imgs.length );
  }
  
  function previous() {
    setIndex((i) => (i - 1 + imgs.length) % imgs.length);
  }

  return (
    <>
      <div className='aw__wrapper' style={{ backgroundImage: `url(${imgs[index]})` }}>
        <div className="aw__card">
          <section  className='aw__card__img' 
                    style={{ backgroundImage: `url(${imgs[index]})` }}>

            <div className="aw__card__actions">
              {/* <div className="buttons"> */}
                <button onClick={previous}>&lt;</button>
                <button onClick={next}>&gt;</button>
              {/* </div> */}

              <div className="spacer"></div>

              <span className='index'>
                {(index+1).toString().padStart(2,'0')}
              </span>
            </div>
          </section>

          <section className='aw__card__body'>
            <h1>Nome Elemento</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Nam quas facilis obcaecati atque illum, odit voluptate ad maiores debitis dolorem a molestias, 
              quo, soluta ea veniam ratione tenetur non aut!
            </p>


            <div className="aw_carousel_container">
              <div className="aw_carousel" style={{transform: `translateX(-${215 * index}px)`}}>
                {
                  ([...imgs]).slice(1).map( (x, i) => <div key={`carousel_img_${i}}`}>
                    <img src={x} onClick={() => setIndex(i+1)}/>
                  </div>)
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
