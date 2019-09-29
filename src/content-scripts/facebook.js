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
  }

  function scrapeRequestData() {
    // find CRSF token in the page, and other info needed for requests
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
  }

  function shouldRunScripts() {
    // TODO: only run script if logged-in and on a page with required info
  }

  window.addEventListener('load', () => {
    unlikeMaliciousPages();
  });
}
