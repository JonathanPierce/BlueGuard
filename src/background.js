const _ = require('lodash');

const DANGEROUS_URLS = require('./blocklists/dangerous.json');
const SUB_OPTIMAL_URLS = require('./blocklists/suboptimal.json');

function domainMatchesList(list, url) {
  const parsedUrl = new URL(url);
  return _.some(list, (domain) => _.endsWith(parsedUrl.hostname, domain));
}

// dangerous URLs will be fully blocked and display a warning screen
function isUrlDangerous(url) {
  return domainMatchesList(DANGEROUS_URLS, url);
}

// sub-optimal URLS will be fucked with, but still load/display
function isUrlSuboptimal(url) {
  return domainMatchesList(SUB_OPTIMAL_URLS, url);
}

// main tab handling logic
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || (changeInfo.status === 'loading' && !changeInfo.url)) {
    if (isUrlDangerous(tab.url)) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL('static/danger.html')
      });
    } else if (isUrlSuboptimal(tab.url)) {
      chrome.tabs.executeScript(tabId, {
        file: 'content-scripts/kneecap.js',
        runAt: 'document_start',
        allFrames: true
      });

      chrome.tabs.insertCSS(tabId, {
        file: 'static/kneecap.css',
        runAt: 'document_start',
        allFrames: true
      });
    } else if (/facebook\.com/.test(tab.url)) {
      chrome.tabs.executeScript(tabId, {
        file: 'content-scripts/facebook.js',
        runAt: 'document_idle'
      });
    }
  }
});
