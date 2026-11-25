# Memory Chambers

A narrative puzzle exploration game built in Unity (WebGL) by team **Spirit** for COMP30019 Graphics and Interaction, University of Melbourne, 2025 S2.

You play a man who is depressed and lost, trying to find a way out of two interconnected spaces, Life and Work, each reflecting his memories and emotions. Interact with objects, shift perspective and change the environment to find the dream buried within him.

**Team:** Joly Lin, Yao Chen, Yue Wang

## Portfolio and play online

- Case study (design, iteration, playtest, playable build): **https://ryanwang688.github.io/memory-chambers/**
- Game only: **https://ryanwang688.github.io/memory-chambers/play/**

## Layout

| Path | What it is |
| --- | --- |
| `index.html`, `portfolio/` | Portfolio case study page, styles, script and in-game screenshots |
| `play/index.html` | WebGL player page (embedded in the portfolio, also works on its own) |
| `Build/` | Unity WebGL build |

## Run locally

Serve the folder through a static web server (opening the file directly will not work), e.g.

```
python -m http.server
```

then visit http://localhost:8000 for the portfolio or http://localhost:8000/play/ for the game.

## Tech

Unity 6000.1.17f1, Universal Render Pipeline 17.1, WebGL build archived from the course showcase.
