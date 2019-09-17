# BlueGuard

BlueGuard is a devious bit of ratfuckery that:

- Automatically unsubscribes logged-in users for right-wing content on various social networking websites
  - Makes API requests to unfollow/unlike/whatever when these social networks are used
  - Keeps working in the background to prevent re-following from persisting
  - Social networks rarely make note of when you un-follow someone, so it is mostly silent
  - "How come I don't see Sean Hannity in my feed anymore? I think Facebook is broken."
- Blocks access to right-wing-extremest content entirely
  - Will show a scary-looking security error
  - Provides no means to view the affected page
  - "Huh, I guess I really shouldn't be visiting 8Chan after all."
- Makes accessing other right-wing content very annoying
  - Makes images appear to load extremely slowly (or not at all)
  - Auto plays all video and audio tags found
  - Makes text small and hard to read
  - Obscures links and makes then hard to find
  - Randomly ignores mouse clicks and key strokes
  - Performs slow computations on scroll and mousemove to cause UI jank and lag
  - Randomly replaces words with other words with opposite meanings, causing confusion
  - Hides iFrames, which kills many video players, comment sections, and ads
  - Shows a ton of fake "pop-up ads" that are just reputable news sites
  - "Wow, Fox News's website has really gone to shit."
- (Optional) Follow mainstream content as an antidote to disinformation
  - More effective at combating disinformation than left-wing content
  - More noticeable, so disabled by default. Can be enabled in the extension setting page.
  - eg: on Facebook, it would follow (but not like, to avoid detection) the Washington Post.
  - "I wish Facebook would stop shoving CNN down my throat!"
- Automatically updates with latest blocklists

Install it for your parents, grandparents, and more racist/isolated/vulnerable friends and extended family! The extension can avoid detection by:

- Your parents would love for you to visit, and also for you to quickly install this extension in their browser when they aren't looking.
- It is recommended to hide the extension in the Chrome menu after installation to help avoid discovery
- If the extension is discovered, it presents itself as security software to avoid removal
- Designed to work silently: eg, right-wing posts no longer appear in feed, but are not flooded with left-wing posts
- Features can be turned on or off via the hard-to-reach extension setting page

# FAQs

## Is this legal?

Sure, why not?

## My parents rarely use the computer, and mostly browse on their phone. Will this help?

In most cases, you only need them to login once with the extension enabled. Once unsubscribed, they are unsubscribed no matter how they access the social network. I'm sure you can con your parents into using a desktop to login at least once.

## How are you making API calls?

Very carefully:

- Scraping CSRF tokens, etc... out of the page
- Making XHR requests from within the page against reverse-engineered APIs in the background

In this way, the target just needs to login to the social network as normal. Once logged-in, the extension will silently spring into action in the background (no need to auth to a suspicious app or anything).

## Can I install this remotely?

No, you will actually need to visit your mom and install it on her computer yourself. Go visit your mom!

# Build and Run

1. `npm install`
2. `sh build.sh`
3. import the `build` folder as an extension into Chrome
