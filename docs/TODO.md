### TODO

### Task1: Split the game state (Tic-Tac-Toe) into components for game logic, display settings, and user settings.

- **t3-game**: Store the game state (e.g., current board, player's turn, winner).
- **t3-game-settings**: Store global game settings (e.g., board size, win conditions, time per turn, automatic pause, rematch option).
- **t3-user-settings**: Store user settings (e.g., sorting and visibility of move history).

**History settings (sorting and visibility) should be stored in `t3-user-settings` because:**
- These are personal UI settings affecting only the display.
- They don't affect the game logic, only how the user sees the move history.
- If multiple users are on the same device, each user can have their own sorting and visibility preferences.

**Global game settings (for all players) should:**
- Define game rules (e.g., board size, win conditions).
- Influence game logic (e.g., time per turn, whether rematch is allowed, if players can change their move during the game).
- Be stored separately in the database as part of the game configuration.