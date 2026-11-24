# Custom Krillion

### A personal, offline-first daily trivia dive with friend-face reactions.

Custom Krillion is a no-build browser trivia game inspired by rare-answer daily dive games. It includes daily and unlimited play, themed prompt packs, local progress, and a Settings flow for replacing the built-in result icons with your friends' faces.

[Play Custom Krillion](https://gg-flipper.github.io/custom-krillion/) · [Latest release](https://github.com/GG-FLIPPER/custom-krillion/releases/latest)

## Install and play

This project has no package dependencies or compilation step.

```sh
git clone https://github.com/GG-FLIPPER/custom-krillion.git
cd custom-krillion
python3 -m http.server 4173
```

Open <http://localhost:4173> in a browser. A local server is recommended because it provides consistent browser behavior for local storage and file uploads. The game can also be opened directly from `index.html`.

For a hosted release, download the source archive from the repository's **Releases** page, extract it, and serve the folder with any static web server.

## Customize friend-face reactions

1. Start the game and open **Settings** using the gear button.
2. Under **Friend-face reactions**, choose an image for each state.
3. Use a PNG, JPEG, GIF, or WebP no larger than **2 MB**.
4. The selected images are stored only in that browser's local storage and appear in the result banner.
5. Choose **Use default pixel icons** to remove all custom images.

Supported reaction states:

| State | Suggested expression |
| --- | --- |
| Deep Cut | Impressed |
| Too Clever | Disappointed |
| Schooler | Happy |
| Skipped / Missed | Angry |
| Plankton, Rare, One in a Shrimpion | Optional custom reactions |

Missing, invalid, or oversized files are rejected and keep the built-in pixel icon. Existing saved settings and game progress remain compatible with the original storage format.

## Play modes

- **Daily Dive** — seven fresh prompts.
- **Unlimited** — continue diving through the prompt pool.
- **Themed Packs** — explore specialized prompt sets and visual worlds.
- **Shrimp Relay** — pass the device between players.
- **Archive** — replay recent daily dives.

The game stores scores, settings, reaction images, and progress locally. Optional Live Archive Search can query public Wikipedia and Wikidata APIs for niche answers; disable it in Settings to keep play local.

## Development

The project is intentionally simple:

```text
index.html   App shell and modal dialogs
app.js       Game state, prompts, rendering, audio, and interactions
styles.css   Responsive pixel-inspired visual system
.github/     GitHub Pages deployment workflow
```

Run the same local server command while editing. Validate JavaScript syntax and patch hygiene with:

```sh
node --check app.js
git diff --check
```

GitHub Pages can deploy the repository directly because it is a static site with no build step.

## Privacy and attribution

No account or backend is required. Custom images never leave the browser unless the user separately uploads or shares them elsewhere. If Live Archive Search is enabled, the current prompt and submitted answer may be sent to public Wikipedia/Wikidata APIs.

Custom Krillion is an independent project inspired by the broad idea of rare-answer daily trivia. It is not affiliated with or endorsed by Krillion.
