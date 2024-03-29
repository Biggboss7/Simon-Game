# Simon Game

A fun mini game to test your memorize skill. Game consists of 4 buttons. In each stage, computer will randomly picked a button.
As a player, you need to remember each button which have been picked by the computer in all stage in order to win this game.

## Overview

This game is the re-creation from the course which I took "The Complete 2024 Web Development Bootcamp by Angela Yu".
It was originally created using jQuery Library. Since jQuery is not really used anymore for nowadays, I decided to recreate this game using vanilla Javascript.

### What I Learn

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

- replay object Audio using "audio.currentTime = 0", it helps to prevent Audio from being paused for multiple press at once.

- dvw unit, for dynamic viewport including menubar and toolbar

### What to Improve

This game is still far from perfection. There are some aspects that still need to be improve, such as:

- Audio played by clicking the buttons will delay if we pressed it many times at once
- Tapping Event on window cannot trigger event on Safari
- Features to introduce the game
- improvement on UI/UX

### Screenshot

- Desktop Preview /
  ![desktop-preview](./desktop--preview.png)

- Mobile Preview /
  ![mobile-preview](./mobile--preview.png)

### Links

- Solution URL: [solution](https://github.com/Biggboss7/Simon-Game)
- Live Site URL: [live site](https://simon-game-bigboss.netlify.app/)

### Author

- Github - (https://github.com/Biggboss7/)
