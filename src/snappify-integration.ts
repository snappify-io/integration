import { SnappifyConfig } from './types';

const COOKIE_ERROR_MESSAGE =
  'You have to allow third party cookies to use snappify.';
const THIRD_PARTY_COOKIE_CHECK_URL =
  'https://3rdpartycookie.seriouscode.io/start.html';

const DEFAULT_CONFIG: SnappifyConfig = {
  url: 'https://snappify.io',
};

export class SnappifyIntegration {
  data?: {
    config: SnappifyConfig;
    resolve: (blob: Blob) => void;
    reject: (reason: any) => void;
    container?: HTMLDivElement;
    iframe?: HTMLIFrameElement;
  };

  constructor() {
    this.openSnappify = this.openSnappify.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.teardown = this.teardown.bind(this);
  }

  openSnappify(_config?: SnappifyConfig) {
    return new Promise<Blob>((resolve, reject) => {
      if (this.data) {
        return;
      }
      this.data = {
        resolve,
        reject,
        config: Object.assign({}, DEFAULT_CONFIG, _config),
      };

      const container = document.createElement('div');
      container.className = '__snappify-container';

      const wrapper = document.createElement('div');
      wrapper.className = '__snappify-wrapper';

      const loadingSpinner = document.createElement('div');
      loadingSpinner.innerHTML =
        '<div><div></div><div class="double-bounce2"></div></div>';

      const iframe = document.createElement('iframe');
      iframe.src = THIRD_PARTY_COOKIE_CHECK_URL;

      wrapper.appendChild(loadingSpinner);
      wrapper.appendChild(iframe);
      container.appendChild(wrapper);

      window.addEventListener('message', this.onMessage);
      this.data.container = container;
      this.data.iframe = iframe;
      container.onclick = this.teardown;
      document.body.appendChild(container);
    });
  }

  private openSnappifyInIFrame() {
    if (!this.data || !this.data.iframe) {
      return;
    }

    this.data.iframe.src = this.data.config.url + '/i';
  }

  private onMessage(event: MessageEvent) {
    if (!this.data) {
      return;
    }

    if (THIRD_PARTY_COOKIE_CHECK_URL.startsWith(event.origin)) {
      // Msg from 3rd party cookie checker
      if (event.data === 'MM:3PCsupported') {
        this.openSnappifyInIFrame();
      } else if (event.data === 'MM:3PCunsupported') {
        // Add a bit wait for better UX, otherwise the UI changes too fast
        setTimeout(() => {
          console.error(COOKIE_ERROR_MESSAGE);
          this.data?.reject(new Error(COOKIE_ERROR_MESSAGE));
          this.teardown();
        }, 800);
      }
    } else if (event.origin === this.data.config.url) {
      // event from snappify
      if (typeof event.data === 'object') {
        switch (event.data.type) {
          case 'loaded':
            this.data.iframe?.contentWindow?.postMessage(
              {
                type: 'hello',
              },
              '*'
            );
            break;
          case 'cancel':
            this.teardown();
            break;
          case 'image':
            this.data.resolve(event.data.blob);
            this.teardown();
            break;
          case 'error':
            console.error('Snappify reported an error: ', event.data.error);
            this.data.reject(event.data.error);
            this.teardown();
            break;
        }
      }
    }
  }

  private teardown() {
    if (this.data?.container) {
      window.removeEventListener('message', this.onMessage);
      this.data.container.remove();
      delete this.data;
    }
  }
}
