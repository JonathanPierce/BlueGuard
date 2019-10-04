const _ = require('lodash');

if (!window.injected) { // prevent double-injection
  window.injected = true;

  function handlePageMessage(event) {
    const message = event.detail;

    if (message.type === 'unlikeComplete') {
      console.log('BlueGuard: Unlike complete!')
    }
  }

  function injectScriptIntoPage() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('content-scripts/facebook-injection.js');

    document.addEventListener('blueGuardMessage', handlePageMessage);
    document.documentElement.appendChild(script);
  }

  window.addEventListener('load', () => {
    injectScriptIntoPage();
  });
}
