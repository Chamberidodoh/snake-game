# Snake Game

A dual-version Snake game project with:

- A **Python** implementation using `tkinter` for a desktop GUI experience
- A **JavaScript** browser version using `HTML`, `CSS`, and native `Canvas`

## Features

- Classic Snake gameplay with food collection and score tracking
- Smooth movement on a 700x700 pixel grid
- Collision detection with walls and self
- Two ways to play:
  - `python/snake_game.py` for desktop
  - `javascript/index.html` for browser

## Python Version

### Files

- `python/snake_game.py`
- `python/requirements.txt`

### Requirements

- Python 3.x
- `tkinter` (usually included with Python)

### Run

1. Open a terminal in the project folder.
2. Run:

```powershell
python .\python\snake_game.py
```

### Controls

- Arrow keys: move the snake

## JavaScript Version

### Files

- `javascript/index.html`
- `javascript/script.js`
- `javascript/styles.css`

### Requirements

- A modern web browser
- No additional dependencies required

### Run

1. Open `javascript/index.html` in your browser.
2. The game starts automatically.

### Controls

- Arrow keys: move the snake
- Restart button: reset the game after game over

## Gameplay

- Start with a small snake
- Eat the food to grow longer and increase your score
- Avoid hitting the wall or your own tail
- The game ends on collision

## Project Structure

```
README.md
python/
  ├── README.md
  ├── requirements.txt
  └── snake_game.py
javascript/
  ├── README.md
  ├── index.html
  ├── script.js
  └── styles.css
```

## Notes

- Both versions share the same game design and visual style
- The JavaScript build includes a game panel and restart button
- The Python version uses a `tkinter` canvas and runs as a desktop window

## Author

Created by `chamberidodoh`.
