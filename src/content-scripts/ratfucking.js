const _ = require('lodash');

// plays all <video> tags at max volume
function playAllVideos() {
  const videos = document.querySelectorAll('video, audio');

  _.forEach(videos, (video) => {
    if (!video.ratfucked) {
      // hide the controls
      video.controls = false;
      video.volume = 1;
      video.ratfucked = true;

      if (video.muted) {
        video.muted = false;
      }

      // play the video
      if (video.paused) {
        video.play();
      }
    }
  })
}

// makes images appear to load slowly
function slowLoadImages() {
  const images = document.querySelectorAll('img');

  // hide the image, then show it 10-30 seconds later
  _.forEach(images, (image) => {
    if (!image.slowLoaded) {
      image.slowLoaded = true;
      image.classList.add('rf-sl');

      // 5% chance they never load
      if (Math.random() < 0.95) {
        _.delay(() => image.classList.remove('rf-sl'), _.random(10000, 30000));
      }
    }
  });
}

const TEXT_REPLACEMENTS = [
  ["Trump", "Obama"],
  ["Obama", "Trump"],
  ["Hillary Clinton", "Trump"],
  ["muslim", "christian"],
  ["Muslim", "Christian"],
  ["muslims", "christians"],
  ["christian", "muslim"],
  ["millennial", "lizard people"],
  ["Jesus", "Mohammad"],
  ["#MAGA", "#StrongerTogether"],
  ["#KAG", "#DreamBigFightHard"],
  ["CNN", "Fox News"],
  ["Fox News", "CNN"],
  ["Fox", "CNN"],
  ["kneel", "stand"],
  ["some", "all"],
  ["all", "none"],
  ["best", "worst"],
  ["worst", "best"],
  ["favorite", "least favorite"],
  ["good", "bad"],
  ["bad", "good"],
  ["love", "hate"],
  ["hate", "love"],
  ["a", "an"],
  ["an", "a"],
  ["fucking", "forking"],
  ["fuck", "fork"],
  ["shit", "shirt"],
  ["lies", "truth"],
  ["AR-15", "WMD"],
  ["climate change", "climate emergency"],
  ["ICE", "Goon Sqaud"],
  ["migrants", "human beings"],
  ["illegals", "other people"],
  ["the", "a"],
  ["or", "and"],
  ["and", "or"],
  ["fake news", "good reporting"],
  ["Mexico", "Canada"],
  ["AOC", "Trump"],
  ["gay", "awesome"],
  ["said", "sang"],
  ["up", "down"],
  ["left", "right"],
  ["right", "left"],
  ["lefty", "genius"],
  ["Kellyanne Conway", "Distraction Becky"],
  ["Jared Kushner", "Slenderman"],
  ["elite", "average"],
  ["elites", "normal people"],
  ["fake", "real"],
  ["won", "lost"],
  ["lost", "won"],
  ["winning", "losing"],
  ["watch", "read"],
  ["incredible", "average"],
  ["won't", "will"],
  ["will", "won't"],
  ["Republican", "Democrat"],
  ["republican", "democrat"],
  ["Dems", "Republicans"],
  ["radical", "reasonable"],
  ["major", "minor"],
  ["coup", "party"],
  ["GOP", "Dems"],
  ["illegal", "legal"],
  ["legal", "illegal"],
  ["mexicans", "canadians"],
  ["MS-13", "NRA"],
  ["NRA", "ISIS"],
  ["abolish", "reboot"],
  ["stop", "start"],
  ["start", "stop"],
  ["sell", "buy"],
  ["buy", "sell"],
  ["pray", "do nothing"],
  ["sex", "hanky-panky"],
  ["he", "she"],
  ["she", "he"],
  ["globalist", "nationalist"],
  ["disputed", "undisputed"],
  ["unverified", "verified"],
  ["lied", "told the truth"],
  ["with", "without"],
  ["with", "without"],
  ["today", "tomorrow"],
  ["yesterday", "today"],
  ["Donald", "Tiffany"],
  ["excellent", "terrible"],
  ["terrible", "excellent"],
  ["over", "under"],
  ["under", "over"],
  ["blasts", "praises"],
  ["may", "may not"],
  ["new", "old"],
  ["old", "new"],
  ["not racist", "racist"],
  ["football", "soccer"],
  ["innocent", "guilty"],
  ["guilty", "innocent"],
  ["witch hunt", "necessary investigation"],
  ["first", "latest"],
  ["faith", "no faith"],
  ["yes", "no"],
  ["Iran", "Canada"],
  ["China", "United Kingdom"],
  ["Russia", "Iran"],
  ["Russian", "Iranian"],
  ["great", "fucking"],
  ["stop", "start"],
  ["start", "stop"],
  ["men", "women"],
  ["women", "men"],
  ["after", "before"],
  ["before", "after"],
  ["lawyer", "nemesis"],
  ["dangerous", "perfectly safe"],
  ["mistake", "whoopsie-do"],
  ["raises", "lowers"],
  ["lowers", "raises"],
  ["Mitch McConnell", "Chuck Schumer"],
  ["McConnell", "Daniels"],
  ["North Korea", "Belgium"],
  ["illegal aliens", "legal immigrants"],
  ["Black", "White"],
  ["latinos", "white people"],
  ["outraged", "pleased"],
  ["rips", "lauds"],
  ["absurd", "on-point"],
  ["slams", "praises"],
  ["undocumented", "legal"],
  ["police", "Antifa"],
  ["Antifa", "Neo-Nazis"],
  ["baseball", "wiffle ball"],
  ["mainstream media", "Fox News"],
  ["biased", "unbiased"],
  ["coal", "cancer dust"],
  ["male", "female"],
  ["female", "male"],
  ["is not", "is"],
  ["son", "daughter"],
  ["block", "allow"],
  ["cops", "hoodlums"],
  ["abortion", "gay rights"],
  ["hoax", "legitimate inquiry"],
  ["California", "Texas"],
  ["is not", "is"],
  ["2020", "2016"],
  ["impeached", "ridden out of town on a rail"],
  ["cop", "politician"],
  ["NYT", "Fox News"],
  ["Planned Parenthood", "Southern Baptist Convention"],
  ["Green New Deal", "Patriot Act"],
  ["criticized", "praised"],
  ["social media", "the dark web"],
  ["wrong", "right"],
  ["right", "wrong"],
  ["New York Times", "Fox News"]
];

function replaceText() {
  const walker = document.createTreeWalker(
    document.documentElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (walker.nextNode()) {
    _.forEach(TEXT_REPLACEMENTS, (replacement) => {
      const regex = new RegExp(`\\b${replacement[0]}\\b`, 'g');

      // 20% chance of replacing if there is a match
      if (regex.test(walker.currentNode.nodeValue) && Math.random() < 0.2) {
        walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace(
          regex, replacement[1]
        );
      }
    });
  };
}

function beginRatfucking() {
  // styles exist to similate effects until the scripts can run
  document.body.classList.add('rf-loaded');
  playAllVideos();
  slowLoadImages();
  replaceText();
}

// bad implementation that is very slow for large n
// do not use with n > ~40
function slowFibonacci(n) {
  if (n <= 2) {
    return 1;
  } else {
    return slowFibonacci(n - 2) + slowFibonacci(n - 1);
  }
}

function doSomethingReallySlow() {
  return slowFibonacci(_.random(35, 42));
}

function messWithScrolling(event) {
  slowLoadImages();
  playAllVideos();

  // causes UI jank and lag
  doSomethingReallySlow();
}

function messWithMouseMove() {
  // causes UI jank and lag
  doSomethingReallySlow();
}

// 30% chance the click does nothing
function messWithClick(event) {
  if (Math.random() < 0.3) {
    event.stopPropagation();
    event.preventDefault();
  }
}

// 15% chance the key does nothing
function messWithKeyDown(event) {
  if (Math.random() < 0.15) {
    event.stopPropagation();
    event.preventDefault();
  }
}

if (!window.ratfucked) {
  window.ratfucked = true; // prevent double injection

  window.addEventListener('load', beginRatfucking);
  window.addEventListener('popstate', beginRatfucking);
  window.addEventListener('hashchange', beginRatfucking);
  window.addEventListener('scroll', messWithScrolling, { capture: true });
  window.addEventListener('mousemove', messWithMouseMove);
  window.addEventListener('click', messWithClick, { capture: true });
  window.addEventListener('keydown', messWithKeyDown, { capture: true });
}
