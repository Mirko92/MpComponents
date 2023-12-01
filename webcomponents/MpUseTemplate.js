class MpUseTemplate extends HTMLElement {
  
  static observedAttributes = [ "template-id" ];

  _templateId = null;

  get templateId() {
    return this._templateId;
  }

  set templateId(tId) {
    this._templateId = tId;
    this.render();
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'template-id') {
        this.templateId = newValue;
      }
    }
  }

  _getTemplate(tId) {
    return document.getElementById(tId);
  }

  render() {
    const template = this._getTemplate(this.templateId);

    this.attachShadow({ mode: "open" })
        .appendChild(template.content.cloneNode(true));
  }
}

customElements.define(
  'mp-use-template', MpUseTemplate
);