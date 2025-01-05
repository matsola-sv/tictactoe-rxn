/**
 * Logic for status transitions
 * 1) Game initialization:
 * loading → waiting
 *
 * 2) First move:
 * waiting → running
 *
 * 3) Game pause:
 * running → paused
 *
 * 4) Resuming after pause:
 * paused → running
 *
 * 5) Stopping the game (victory or other scenario):
 * running → stopped
 * or
 * paused → stopped
 *
 * 6) Saving the game:
 * paused → saving → waiting (if the game is expected to continue)
 * or
 * paused → saving → stopped (if the game ends after saving).
 */
export enum GameStatus {
    // The game is ready to start, but it hasn't begun yet (the first player hasn't made a move).
    // The timer is paused, the game field is visible, but actions are blocked for now.
    Waiting = "waiting",

    // The game is actively running.
    // The game field is displayed, players can make moves, and the timer is running.
    // This is the status when the game is actually in progress.
    Running = "running",

    // The game is paused.
    // The timer is stopped, and the game field and history moves is hidden or blocked.
    Paused = "paused",

    // The game is in the process of viewing the history of moves.
    // The user can navigate through previous moves, but no actions can be performed on the game field.
    // The game is effectively in a read-only mode, allowing users to explore the game's past state.
    ViewingHistory = "viewingHistory",

    // The game is finished.
    // You can view the results (e.g., who won).
    // The timer stops, and the game cannot be resumed or continued.
    Stopped = "stopped",

    // The game is in the process of being saved.
    // The timer is stopped, and player actions are blocked until the save is complete.
    Saving = "saving",
}