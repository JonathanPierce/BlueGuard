import _ from 'lodash';

const BLOCKLIST = require('../blocklists/facebook.json');

// returns a promise that resolves in between 0 and maxWait milliseconds
function randomDelayPromise(maxWait = 20000) {
  return new Promise((resolve) => {
    _.delay(resolve, _.random(0, maxWait));
  });
}

function parsePagesFromHTMLPagelet(html) {
  const pageDocument = new DOMParser().parseFromString(html, 'text/html');
  const pagesSection = pageDocument.querySelector('#all_liked_pages');
  const likedPageLinks = pagesSection.querySelectorAll('a[aria-hidden=true]');
  const hoverCardRegex = /id=(.*)$/;

  return _.map(likedPageLinks, (likedPageLink) => {
    const hoverCardUrl = likedPageLink.getAttribute('data-hovercard');
    return hoverCardRegex.exec(hoverCardUrl)[1];
  });
}

function getAllLikedPages() {
  // - Request https://www.facebook.com/pages/?category=liked&big_pipe=singleflush
  // - If there is a PageBrowserAllLikedPagesPagelet, pull out the IDs
  // - Otherwise, scrape from the HTML pagelet
  return fetch(
    'https://www.facebook.com/pages/?category=liked&big_pipe=singleflush'
  ).then((response) => (
    response.text()
  )).then((html) => {
    const pageIdRegex = /"page_ids":\[((\d+,?)+)\]/;
    const match = pageIdRegex.exec(html);

    // Page IDs found in pagelet request
    if (match && match[1]) {
      return match[1].split(',');
    } else {
      return parsePagesFromHTMLPagelet(html);
    }
  });
}

function getRequestParams(method = 'GET') {
  return window.require('getAsyncParams')(method);
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
  return getAllLikedPages().then((likedPageIds) => {
    console.log('liked pages', likedPageIds);
  });
}

function isLoggedIn() {
  try {
    return getRequestParams().__user !== '0';
  } catch (ex) {
    return false;
  }
}

function redirectOnBannedPage() {
  // check if page is banned
  // redirect to homepage if so
}

function sendMessageToParent(message) {
  document.dispatchEvent(new CustomEvent('blueGuardMessage', {
    detail: message
  }));
}

if (isLoggedIn()) {
  console.log('BlueGuard: logged-in');

  unlikeMaliciousPages().then(() => {
    sendMessageToParent({ type: 'unlikeComplete' });
  }).catch((ex) => {
    console.error('BlueGuard Error', ex);
  });

  // if on a banned page, redirect to the homepage
  redirectOnBannedPage();
} else {
  console.log('BlueGuard: NOT logged-in');
}
