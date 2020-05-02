class YoutubeLightPlayer extends HTMLElement {

  //watched attributes
  static get observedAttributes() {
    return ['src'];
  }

}

customElements.define('youtube-light-player', YoutubeLightPlayer);
