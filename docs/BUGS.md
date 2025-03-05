# Known Bugs

## 1. Chrome Toolbar Mode hover bug
- **Description:** Clicked elements retain focus after mouse release in Chrome's toolbar mode, causing persistent :hover styles.
- **Affected Components:** Buttons, lists, history moves
- **Browsers:** Chrome (not in Opera/Edge)
- **Workarounds Tried:** Blurring on `mouseup` (didn’t fully fix)
- **Next Steps:** Investigate Chrome's focus handling

## 2. Safari browser not working fullscreen show/close
- **Issue:** iPhone has an issue where the browser prevents opening regular elements in fullscreen mode, only videos can be opened.
- **A partial solution:** Reducing the browser's toolbar can increase the screen height.

## 3. Issue with 100dvh on older iPhones
- **Issue:** On older versions of iPhone (8, 11, possibly others), 100dvh doesn't work correctly, causing the game component not to display in fullscreen.
- **Solution:** Replacing it with 100vh is not a good idea, as in mobile browsers where the browser's toolbar hides, these changes aren't taken into account.