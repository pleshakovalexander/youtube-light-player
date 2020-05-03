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
            <button type="button" class="video__button" >
              <svg width="68" height="48" viewBox="0 0 68 48">
                <path class="video__button-shape" fill="#212121" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </button>
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
            .video__button{
              position: absolute;
              padding: 0;
              width: 68px;
              height: 48px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: none;
              border: none;
              cursor: pointer;
            } 
            .video:hover .video__button-shape,
            .video__button:focus .video__button-shape {
              fill-opacity: 0.8;
              fill: #ff0000;
            } 
          </style>
        `;
      const playVideo = () => {
        shadow.innerHTML =
          /*template*/
          `
          <div class="video"> 
            <iframe class="video__embed" type="text/html" frameborder="0"
                    src="http://www.youtube.com/embed/${this.videoId}?autoplay=1"></iframe>
          <div>
          <style>
            .video{
              position: relative; 
              width: 100%;
              height: 0;
              padding-bottom: 56.25%;
              background-color: #000000;
            }
            .video__embed{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          </style>
        
          `
      }
      shadow.querySelector('button').onclick = playVideo;
      shadow.querySelector('.video').onclick = playVideo;
    }
  }
}

customElements.define('youtube-light-player', YoutubeLightPlayer);
