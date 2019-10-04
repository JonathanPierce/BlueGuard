# BlueGuard

BlueGuard is a browser extension that silently and automatically unsubscribes its users from right-wing content on social media. In addition, it outright blocks certain dangerous websites and renders other not-so-great websites nearly unusable.

![blueguard logo](icons/logo_128.png)

- Automatically unsubscribes logged-in users for right-wing content on various social networking websites
  - Makes API requests in the background to unfollow/unlike/whatever when these social networks are visited
  - Keeps working in the background to prevent re-following from persisting for long
  - Social networks rarely make note of when you un-follow someone, so it is mostly silent.
  - Prevents visiting banned pages within a social network (usually by redirecting to the homepage)
- Blocks access to right-wing extremist content entirely
  - Will show a scary-looking security error
  - Provides no means to view the affected page
  - Also affects many GOP fundraising websites
- Makes accessing other right-wing content very annoying
  - Makes images appear to load extremely slowly (or not at all)
  - Hides all video and audio tags
  - Makes text small and hard to read
  - Obscures links and makes then hard to find
  - Randomly ignores mouse clicks and key strokes
  - Performs slow computations on scroll and mousemove that cause UI jank and lag
  - Randomly replaces words with other words with opposite meanings, causing confusion
  - Hides iFrames, which kills many video players, comment sections, and ads
  - Shows a ton of fake "pop-up ads" that are just reputable news sites
  - "Wow, Fox News's website has really gone to hell."
- (Optional) Follow mainstream content as an antidote to disinformation
  - More effective at combating disinformation than left-wing content
  - More noticeable, so disabled by default. Can be enabled in the extension setting page.
  - eg: on Facebook, it would follow (but not like, to avoid detection) the Washington Post.
- Automatically updates with latest blocklists

Install it for your parents, grandparents, and more racist/isolated/vulnerable friends and extended family!

- Your parents would love for you to visit, and also for you to quickly install this extension in their browser when they aren't looking.
- It is recommended to hide the extension in the Chrome menu after installation to help avoid discovery
- If the extension is discovered, it presents itself as security software to avoid removal
- Designed to work silently: eg, right-wing posts no longer appear in feed, but users are not flooded with left-wing posts
- Features can be turned on or off via the hard-to-reach extension settings page

# FAQs

## Is this legal?

Yes. Your must voluntarily install this software. It does what it says on the tin.

## Okay, it's not illegal. But is it wrong?

No. What's wrong is powerful interests manipulating our loved ones with fear, raw appeals to emotion, and large-scale weaponized disinformation: all to advance themselves at the expense of your loved ones. Isn't it your duty to protect your loved ones from that?

## My parents rarely use the computer, and mostly browse on their phone. Will this help?

In most cases, you only need them to login once with the extension enabled. Once unsubscribed, they are unsubscribed no matter how they access the social network.

I'm sure you can con your parents into using a desktop to login at least once.

## How are you making API calls?

Very carefully:

- Scraping CSRF tokens, etc... out of the page
- Making XHR requests from within the page against reverse-engineered APIs in the background

In this way, the target just needs to login to the social network as normal. Once logged-in, the extension will silently spring into action in the background (no need to auth to a suspicious app or anything).

The social network has no way to tell that the extension is sending the request, instead of the app itself. So, it let's the request run.

## Can I install this remotely?

No, you will actually need to visit your mom/dad/relative/mortal-enemy/whatever and install it on their computer yourself. Go visit your parents!

## What social networks do you plan to support?

In order of implementation priority:

- Facebook
- YouTube
- Twitter
- Reddit
- Instagram

## How complete is this?

- Code to block or mangle right wing websites is complete
- Baby steps for the Facebook integration are complete
  - I have documented most of the `fan_status`, etc... APIs needed
  - Just need to integrate to them
  - Fun fact: Facebook has a rate limit for liking content, but not un-liking it. Good for me!
- Once Facebook is complete, I'll work on the options page
- Will likely hit the Chrome store once Facebook and the options page are live
- Then, work on YouTube, other social networks, maintaing blocklists, etc...

# How to Build and Run

1. `npm install`
2. `sh build.sh`
3. import the `build` folder as an extension into Chrome
