# // blog

A minimal dark-theme blog with a built-in radio player. Pure HTML/CSS/JS — no frameworks, no build step, deploys directly to GitHub Pages.

---

## File structure

```
blog/
├── index.html          ← post list (home page)
├── about.html          ← about page
├── css/
│   └── style.css       ← all styles
├── js/
│   └── radio.js        ← radio player logic + PLAYLIST
├── music/              ← put your .mp3 files here
│   └── (your tracks)
└── posts/
    ├── first-post.html
    └── second-post.html
```

---

## Adding music

1. Drop your `.mp3` (or `.ogg`, `.wav`) files into the `/music/` folder.
2. Open `js/radio.js` and edit the `PLAYLIST` array at the top:

```js
const PLAYLIST = [
  { src: "music/my-song.mp3",       title: "My Song",       artist: "Artist Name" },
  { src: "music/another-track.mp3", title: "Another Track", artist: "Someone Else" },
];
```

3. Save and push. Done.

**Note on autoplay:** Browsers block autoplay until the user interacts with the page. The player will start automatically on the first click or keypress if it can't autoplay immediately.

---

## Writing a new post

1. Duplicate `posts/first-post.html`.
2. Update the `<title>`, `.post-date`, `.post-tag`, `.post-full-title`, and the body content.
3. Add a card for it in `index.html` (copy one of the existing `<article class="post-card">` blocks).

---

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `yourusername.github.io` for a user site, or any name for a project site).
2. Push this folder's contents to the repo's `main` branch.
3. Go to **Settings → Pages → Source** and set it to `main` / `root`.
4. Your site will be live at `https://yourusername.github.io` (or `.../repo-name` for a project site).

---

## Customisation

- **Accent color:** Change `--accent` in `css/style.css` (currently terminal green `#7fff7f`).
- **Site name:** Replace `// your_name` in all HTML files.
- **Font:** Change `--font` in `:root` — it's `Courier New` by default. Any monospace works.
- **Scanline texture:** Remove the `background-image` on `body` in `style.css` if you don't want it.

---

No dependencies. No build step. Just files.
