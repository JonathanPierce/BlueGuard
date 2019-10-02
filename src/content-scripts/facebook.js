const _ = require('lodash');

const BLOCKLIST = require('../blocklists/facebook.json');

if (!window.injected) { // prevent double-injection
  window.injected = true;

  // returns a promise that resolves in between 0 and maxWait milliseconds
  function randomDelayPromise(maxWait = 20000) {
    return new Promise((resolve) => {
      _.delay(resolve, _.random(0, maxWait));
    });
  }

  function parsePagesFromPageletRequest() {

  }

  function parsePagesFromHTMLPagelet() {

  }

  function getAllLikedPages() {
    // - Request https://www.facebook.com/pages/?category=liked&big_pipe=singleflush
    // - If there is a PageBrowserAllLikedPagesPagelet, pull out the IDs
    // - Otherwise, scrape from the HTML pagelet
    return fetch(
      'https://www.facebook.com/pages/?category=liked&big_pipe=singleflush'
    ).then((response) => (
      response.text()
    )).then((html) => console.log(html));
  }

  function getRequestParams(method = 'GET') {
    const command = `window.require('getAsyncParams')('${method}')`;
    return evalCommandInPage(command);
  }

  function unlikeMaliciousPage() {
    // Make API request to fan_status for the page with correct props
  }

  function unlikeMaliciousPages() {
    // first, check if more than six hours since last run
    // return getAllLikedPages().then((likedPageIds) => {
    // - compare to blocklist
    // - fire off deferred requests to unblock
    // - after all requests complete, mark script as ran (six hour delay)
    // });
    return getAllLikedPages();
  }

  function checkForLogin() {
    return getRequestParams().then((params) => {
      return params.__user !== '0';
    });
  }

  function handleCommandInPage(command) {
    document.dispatchEvent(new CustomEvent('runBlueGuardCommand', {
      detail: eval(command)
    }));

    window.alert(`running command: ${command}`);
  }

  function evalCommandInPage(command) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.text = `(${handleCommandInPage.toString()})("${command}")`;

      document.addEventListener('runBlueGuardCommand', (event) => {
        document.documentElement.removeChild(script);
        resolve(event.detail);
      });

      document.documentElement.appendChild(script);
    });
  }

  window.addEventListener('load', () => {
    checkForLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        return unlikeMaliciousPages();
      }
    }).catch((ex) => {
      console.error('BlueGuard', ex);
    });
  });
}
