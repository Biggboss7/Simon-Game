# Simon Game

A fun mini game to test your memorize skill. Game consists of 4 button. In each stage, computer will randomly picked a button.
As a player, you need to remember each button which have been picked by the computer in all stage in order to win this game.

## What I Learn

What I Learn From Refactoring SIMON GAME:

- {touch-action: manipulation}

  This chunk of CSS code helps prevents Zoom-In effects for every "Double-Tap" in touch screen device.

  Refer to MDN:
  'manipulation' value disable additional non-standard gestures such as double tap to zoom.

- window.innerWidth & window.innerHeight used to detect user's device viewport

- how to removeEventListener
  Long story short, In the journey of developing this "Simon Game", I intended to trigger an event once and soon after that event listener will be removed.

  In order to use removeEventListener, one must ensure that the event handler, callfn are exactly the same as the one which were used before in addEventListener, otherwise it won't work.

- stopImmidiatePropagation
  This event method is pretty helpful in this "Simon Game". It prevents the same event handler attached to the elements with the same callback fn to be propagated multiple times.

- Computed Property Name
  It allows me to put an expression in square brackets ([]), which will be computed and used as the property name.

- Closures in "for" loop

## Screenshot

- Desktop Preview /
  ![desktop-preview](./desktoppreview.png)

- Mobile Preview /
  ![mobile-preview](./mobilepreview.png)

## Links

- Solution URL: [solution](https://github.com/Biggboss7/Simon-Game)
- Live Site URL: [live site](https://willowy-creponne-34c2b8.netlify.app)

## Author

- Github - (https://github.com/Biggboss7/)
