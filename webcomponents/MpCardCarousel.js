function createEl(selector, classes) {
  const el = document.createElement(selector);

  if (classes?.length) {
    el.classList.add([...classes]);
  }

  return el;
}

function getValueOf(path, obj) {
  const keys = path.split(/[.[\]]+/).filter(Boolean);

  return keys.reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      if (Array.isArray(acc) && /^\d+$/.test(key)) {
        return acc[parseInt(key, 10)];
      } else if (key in acc) {
        return acc[key];
      }
    }
    return undefined;
  }, obj);
}


function getStyles() {
  const style = document.createElement( "style" );
  style.textContent = `
    .mp__container {
      container-type: size;
      width: 100%;
    }
    .mp__bg_wrapper {
      position: relative;
      width: 100%;
      min-height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition: background-image 0.5s ease;
      display: grid;
      place-items: center;
      padding: 5rem;
    }
    @container (max-width: 768px) {
      .mp__bg_wrapper {
        padding: 2rem;
      }
    }
    .mp__bg_wrapper::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      backdrop-filter: blur(10px);
    }
    .mp__card {
      z-index: 1;
      position: relative;
      background-color: white;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-flow: row nowrap;
    }
    .mp__card__img, .mp__card__body {
      flex: 1 0 50%;
    }
    .mp__card__img {
      position: relative;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition: background-image 0.5s ease;
    }
    .mp__card__body {
      position: relative;
      padding: 2rem;
    }
    @container (max-width: 768px) {
      .mp__card__img {
        border-radius: 20px;
      }
      .mp__card__body {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75%;
        height: 300px;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(10px);
        border-radius: 20px;
      }
    }
    @container (max-width: 360px) {
      .mp__card__body {
        width: 90%;
        top: 1rem;
        transform: translate(-50%, 0);
      }
    }
    .mp__card__actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    .mp__card__actions button {
      border: 2px solid white;
      border-radius: 100%;
      margin-inline: 0.25rem;
      width: 2.5rem;
      height: 2.5rem;
      background: none;
      color: inherit;
      cursor: pointer;
    }
    .mp__card__actions button:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    .mp__card__actions button:active {
      background-color: rgba(255, 255, 255, 0.55);
      transform: scale(0.9);
    }
    .mp__card__actions .spacer {
      flex: 1;
      border-bottom: 1px solid rgba(255, 255, 255, 0.75);
      margin-inline: 2rem;
    }
    .mp__card__actions .index {
      font-size: 1.5rem;
    }
    
    .mp_carousel_container {
      height: min(310px, 40%);
      width: 120%;
      overflow: hidden;
      position: absolute;
      bottom: 5rem;
      right: 0;
      padding-block: 5px;
    }
    @container (max-width: 768px) {
      .mp_carousel_container {
        height: 150px;
        bottom: -200px;
        width: 100%;
      }
    }
    .mp_carousel_container .mp_carousel {
      display: flex;
      gap: 1rem;
      height: 100%;
      transition: transform 0.5s ease;
    }
    .mp_carousel_container .mp_carousel img {
      height: 100%;
      width: 200px;
      border-radius: 20px;
      object-fit: cover;
      cursor: pointer;
      filter: grayscale(0.6);
    }
    .mp_carousel_container .mp_carousel img:hover {
      filter: grayscale(0%);
      border: 5px solid white;
      outline: 1px solid black;
    }
    .mp_carousel_container .mp_carousel img:active {
      transform: scale(0.97);
    }
  `;

  return style;
}


class MpCardCarousel extends HTMLElement {

  static observedAttributes = [ "items", "use-template"];

  _items      = null;
  _index      = 0;
  _templateId = null; 

  get max() {
    return this._items.length;
  }
  
  get currentItem() {
    return this._items?.[this._index];
  }

  get scrollWidth() {
    const imgWidth = this.imgContainerEls?.[0]?.clientWidth;
    const padding = +getComputedStyle(this.carouselEl).gap.split('px')[0];
    return this._index * (imgWidth + padding);
  }

  cardSectionBodyEl = null;
  cardSectionImgEl  = null;
  carouselEl        = null; 
  nextBtnEl         = null;
  prevBtnEl         = null;
  indexEl           = null;
  bgWrapperEl       = null;
  cardSectionImgEl  = null;

  imgContainerEls = [];

  cardDetailsEl    = null;
  setTitle(title) {
    const el = this.cardDetailsEl.querySelector('h1');
    el.textContent = title;
  }
  setDesc(desc) {
    const el = this.cardDetailsEl.querySelector('h5');
    el.textContent = desc;
  }

  cardDetailsSlotEl = null;

  constructor() {
    super();
  }

  

  _linkCss() {
    const linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("href", "style.css");
    return linkEl;
  }
  
  _attachEventListeners() {
    this.nextBtnEl.addEventListener('click', this._next.bind(this));
    this.prevBtnEl.addEventListener('click', this._prev.bind(this));
  }

  _buildCarousel(items, imgClickFn) {
    const cContainer = createEl("div", ["mp_carousel_container"]); 

    const result = cContainer.appendChild(
      createEl("div", ["mp_carousel"])
    );

    const itemEls = items?.map((item, i) => {
      const container = createEl("div");
      this.imgContainerEls.push(container);

      const img = document.createElement("img");

      img.src = item.imgUrl; 
      img.alt = item.title; 
      img.addEventListener('click', () => {
        imgClickFn(i)
      });

      container.appendChild(img);

      return container;
    });

    result.append(...itemEls);

    return {
      carouselContainerEl: cContainer,
      carouselEl: result
    };
  }

  connectedCallback() {    
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");
    container.classList.add("mp__container");
    container.innerHTML = `
      <div class="mp__bg_wrapper">
        <div class="mp__card">
          <section  class="mp__card__img">
            <div class="mp__card__actions">
              <button prev-btn>&lt;</button>
              <button next-btn>&gt;</button>

              <div class="spacer"></div>

              <span class='index'></span>
            </div>
          </section>

        <section class='mp__card__body'>
          <slot name="item">
            <div class="card-details">
              <h1></h1>
              <h5></h5>
            </div>
          </slot>

          <div class="mp_carousel_container">
            <div class="mp_carousel"></div>
          </div>
        </section>
      </div>
      </div>
    `;

    this.nextBtnEl         = container.querySelector("[next-btn]");
    this.prevBtnEl         = container.querySelector("[prev-btn]");
    this.indexEl           = container.querySelector(".index");
    this.bgWrapperEl       = container.querySelector(".mp__bg_wrapper");
    this.cardSectionImgEl  = container.querySelector(".mp__card__img");
    this.cardSectionBodyEl = container.querySelector(".mp__card__body");
    this.cardDetailsEl     = container.querySelector(".card-details");

    const {
      carouselContainerEl, carouselEl
    } = this._buildCarousel(
      this._items.slice(1),
      (i) => { 
        this._index = i+1;
        this.update();
      }
    );

    this.carouselEl  = carouselEl;

    this.cardSectionBodyEl.append(carouselContainerEl);
    
    this.update();

    this._attachEventListeners();

    shadow.appendChild(this._linkCss());
    shadow.appendChild(container);

    this.shadowRoot
      .addEventListener('slotchange', e => {
        let slot = e.target;
        if (slot.name == 'item') {
          this.cardDetailsSlotEl = slot;
        }
      });
  }

  disconnectedCallback() {
    console.log( "Custom element removed from page." );
  }

  adoptedCallback() {
    console.log( "Custom element moved to new page." );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const propFns = {
        "items"       : this._onChangeItems.bind(this),
        "use-template": this._onChangeTemplate.bind(this)
      }

      propFns[name](newValue);
    }
  }

  
  update() {
    this._updateBackgrounds();
    this._updateIndexEl();
    this._updateCarouselPosition();
    this._updateCardDetails();
  }

  _onChangeItems(newValue) {
    this._items = newValue?.length 
      ? JSON.parse(newValue) 
      : null;

    this._updateBackgrounds();
  }

  _onChangeTemplate(newValue) {
    console.log("Change template id: ", newValue);
    this._templateId = newValue;
  }

  _next() {
    this._index = (this._index + 1) % this.max;
    this.update();
  }

  _prev() {
    this._index = (this._index - 1 + this.max) % this.max;
    this.update();
  }

  _updateIndexEl() {
    console.log("Update index");
    this.indexEl.textContent = (this._index + 1).toString().padStart(2, "0");
  }

  _updateBackgrounds() {
    if (this.bgWrapperEl && this.cardSectionImgEl) {
      const imgUrl = `url('${this._items?.[this._index].imgUrl}')`;
  
      this.bgWrapperEl.style.backgroundImage      = imgUrl;
      this.cardSectionImgEl.style.backgroundImage = imgUrl;
    }
  }

  _updateCarouselPosition() {
    this.carouselEl.style.transform = `translateX(-${this.scrollWidth}px)`;
  }

  _updateTitleAndDesc() {
    const { title, description } = this?.currentItem ?? {};
    this.setTitle(title);
    this.setDesc(description);
  }

  _updateCardDetails() {
    if (this.cardDetailsSlotEl) {
      const elements = this.cardDetailsSlotEl.assignedElements();
      elements.forEach(e => this._updateNode(e, this.currentItem));
    }
    if (this._templateId) {
      const template = document.getElementById(this._templateId);

      const clone = template.content.cloneNode(true);

      this._updateNode(clone, this.currentItem);

      this.cardDetailsEl.replaceChildren(clone);
    } else {
      this._updateTitleAndDesc();
    }
  }

  _updateNode(node, item){
    const toUpdateEls = (node?.parentElement || node).querySelectorAll('[mp-data]');

    toUpdateEls.forEach( el => {
      const mpData = el.getAttribute('mp-data');

      const keys = mpData.split(';');

      keys?.forEach(
        k => {
          if (k.includes(':')) {
            var [ key, attr ] = k.split(":");
            const txt = el.getAttribute(attr)
            el.setAttribute(attr, txt.replace(`{${key}}`, getValueOf(key, item)));
          } else {
            el.innerHTML = el.innerHTML.replace(`{${k}}`, getValueOf(k, item));
          }
        }
      );
    })
  }
}

customElements.define(
  'mp-card-carousel', MpCardCarousel
);