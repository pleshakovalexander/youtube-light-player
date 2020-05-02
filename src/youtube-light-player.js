class YoutubeLightPlayer extends HTMLElement {

  //watched attributes
  static get observedAttributes() {
    return ['src'];
  }

  get videoId() {
    const url = this.getAttribute('src');
    if (url) {
      const location = document.createElement('a');
      location.href = url;
      const params = new URLSearchParams(location.search);
      const id = params.get('v');
      return id;
    }
    return ''
  }
}

customElements.define('youtube-light-player', YoutubeLightPlayer);
