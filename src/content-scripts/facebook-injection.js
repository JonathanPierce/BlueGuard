import _ from 'lodash';

const PAGES_BLOCKLIST = require('../blocklists/facebook-pages.js');
const PAGES_BLOCKLIST_KEYED = _.keyBy(PAGES_BLOCKLIST, 'id');
const FOUR_HOURS = 1000 * 60 * 60 * 4;

// returns a promise that resolves in between 0 and maxWait milliseconds
function randomDelayPromise(maxWait = 20000) {
  return new Promise((resolve) => {
    _.delay(resolve, _.random(0, maxWait));
  });
}

function getRequestParams(method = 'GET') {
  return window.require('getAsyncParams')(method);
}

function getAllGroups() {
  const baseParams = getRequestParams('POST');
  const params = _.assign(baseParams, {
    fb_api_caller_class: 'RelayModern',
    fb_api_req_friendly_name: 'GroupsLandingYourGroupsQuery',
    variables: JSON.stringify({count :5000, isAdminGroups:false}),
    doc_id: 1309056129218188 // hardcoded?
  });

  const urlEncoded =  _.map(params, (value, key) => (
    encodeURIComponent(key) + '=' + encodeURIComponent(value)
  )).join('&');

  return fetch('https://www.facebook.com/api/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlEncoded
  }).then((response) => (
    response.json()
  )).then((json) => {
    return _.map(_.get(json, 'data.viewer.account_user.groups.edges'), (edge) => {
      return _.get(edge, 'node.id');
    });
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

function unlikeMaliciousPage(id) {
  return randomDelayPromise().then(() => {
    return window.require('AsyncRequest').post(
      'https://www.facebook.com/ajax/pages/fan_status.php',
      { fbpage_id: id, add: false }
    );
  });
}

function unlikeMaliciousPages() {
  return getAllLikedPages().then((likedPageIds) => {
    const matchedLikedPages = _.filter(
      likedPageIds,
      (id) => PAGES_BLOCKLIST_KEYED[id]
    );

    return Promise.all(
      _.map(matchedLikedPages, (id) => unlikeMaliciousPage(id))
    );
  });
}

function unlikeMaliciousGroups() {
  return getAllGroups().then((ids) => console.log('GROUP IDS', ids));
}

function isLoggedIn() {
  try {
    return getRequestParams().__user !== '0';
  } catch (ex) {
    return false;
  }
}

// need to wrap it to hook into push state events
function setupPushStateHandler() {
  const originalPush = window.history.pushState.bind(window.history);
  const originalReplace = window.history.replaceState.bind(window.history);

  window.history.pushState = function(...args) {
    const result = originalPush(...args);
    redirectOnBannedPage();
    return result;
  };

  window.history.replaceState = function(...args) {
    const result = originalReplace(...args);
    redirectOnBannedPage();
    return result;
  };
}

function redirectOnBannedPage() {
  _.forEach(PAGES_BLOCKLIST, (blockedPage) => {
    if (window.location.pathname === blockedPage.url) {
      window.location.href = window.location.origin;
    }
  });
}

function sendMessageToParent(message) {
  document.dispatchEvent(new CustomEvent('blueGuardMessage', {
    detail: message
  }));
}

function handlePageMessage(event) {
  const message = event.detail;

  if (message.type === 'start') {
    console.log('BlueGuard: starting injection!');

    if (
      !message.options.lastFacebookRun ||
      (Date.now() - FOUR_HOURS) > message.options.lastFacebookRun
    ) {
      Promise.all([
        unlikeMaliciousPages(),
        unlikeMaliciousGroups()
      ]).then(() => {
        sendMessageToParent({ type: 'unlikeComplete' });
      }).catch((ex) => {
        console.error('BlueGuard Error', ex);
      });
    } else {
      console.log('BlueGuard: already ran!')
    }
  }
}

if (isLoggedIn()) {
  console.log('BlueGuard: logged-in');

  // start listening for events
  document.addEventListener('blueGuardMessage', handlePageMessage);

  // if on a banned page, redirect to the homepage
  setupPushStateHandler();
  redirectOnBannedPage();
} else {
  console.log('BlueGuard: NOT logged-in');
}
