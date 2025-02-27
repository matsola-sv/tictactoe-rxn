# Known Bugs

## 1. Chrome Toolbar Mode hover bug
- **Description:** Clicked elements retain focus after mouse release in Chrome's toolbar mode, causing persistent :hover styles.
- **Affected Components:** Buttons, lists, history moves
- **Browsers:** Chrome (not in Opera/Edge)
- **Workarounds Tried:** Blurring on `mouseup` (didn’t fully fix)
- **Next Steps:** Investigate Chrome's focus handling

## 2. Safari browser not working fullscreen show/close
- **Issue:** document.documentElement and the "fullscreenchange" event don't work in Safari.
   - It might be necessary to use document.documentElement.webkitExitFullscreen
   - and subscribe to the "webkitfullscreenchange" event.