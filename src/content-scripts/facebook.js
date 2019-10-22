const _ = require('lodash');

if (!window.injected) { // prevent double-injection
  window.injected = true;

  function handlePageMessage(event) {
    const message = event.detail;

    if (message.type === 'unlikeComplete') {
      chrome.storage.sync.set({
        lastFacebookRun: Date.now()
      }, () => {
        console.log('BlueGuard: Unlike complete!');
      });
    }
  }

  function sendMessageToPage(message) {
    document.dispatchEvent(new CustomEvent('blueGuardMessage', {
      detail: message
    }));
  }

  function injectScriptIntoPage() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('content-scripts/facebook-injection.js');

    document.addEventListener('blueGuardMessage', handlePageMessage);
    document.documentElement.appendChild(script);

    script.addEventListener('load', () => {
      chrome.storage.sync.get({
        lastFacebookRun: null,
        followMainstream: false
      }, (options) => {
        sendMessageToPage({
          type: 'start',
          options
        });
      });
    });
  }

  window.addEventListener('load', () => {
    injectScriptIntoPage();
  });
}
