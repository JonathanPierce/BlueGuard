const _ = require('lodash');

const DANGEROUS_URLS = require('./blocklists/dangerous.json');

console.log(DANGEROUS_URLS);

function domainMatchesList(list, url) {
  const urlParser = new URL(url);
  return _.some(list, (testUrl) => _.endsWith(urlParser.hostname, testUrl));
}

function isUrlDangerous(url) {
  return domainMatchesList(DANGEROUS_URLS, url);
}

// main tab handling logic
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    if (isUrlDangerous(changeInfo.url)) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL('static/danger.html')
      });
    } else if (/facebook\.com/.test(changeInfo.url)) {
      chrome.tabs.executeScript(tabId, {
        file: 'content-scripts/facebook.js',
        runAt: 'document_idle'
      });
    }
  }
});
