# Known Bugs

## 1. Chrome Toolbar Mode hover bug
- **Description:** Clicked elements retain focus after mouse release in Chrome's toolbar mode, causing persistent :hover styles.
- **Affected Components:** Buttons, lists, history moves
- **Browsers:** Chrome (not in Opera/Edge)
- **Workarounds Tried:** Blurring on `mouseup` (didn’t fully fix)
- **Next Steps:** Investigate Chrome's focus handling
