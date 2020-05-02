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

  attributeChangedCallback(attrName) {
    if (attrName === 'src') {
      const shadow = this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        /*template*/
        `
          <div class="video">
            <img class="video__thumbnail" src="https://i.ytimg.com/vi/${this.videoId}/sddefault.jpg">
          </div>
          <style>
            .video {
              position: relative; 
              cursor: pointer;
              display:inline-block;
              width: 100%;
              overflow: hidden;
            }  
            .video__thumbnail {
              width: 100%;
              height: 100%;
              display:block;
              margin: -9.5% 0;
            }
          </style>
        `;
    }
  }
}

customElements.define('youtube-light-player', YoutubeLightPlayer);
