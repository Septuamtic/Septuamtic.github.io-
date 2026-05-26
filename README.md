# // blog

A minimal dark-theme blog with a built-in radio player and browser-based admin.
Pure HTML/CSS/JS — no frameworks, no build step, deploys directly to GitHub Pages.

---

## File structure

```
blog/
├── index.html              ← post list (managed by admin)
├── about.html              ← about page
├── admin/
│   ├── index.html          ← post dashboard (list, delete)
│   └── editor.html         ← markdown editor (create, edit)
├── css/style.css
├── js/radio.js             ← radio player + PLAYLIST config
├── music/                  ← drop .mp3 files here
└── posts/
    ├── index.json          ← post metadata (managed by admin)
    ├── *.html              ← generated post files
    └── *.md                ← markdown source files (for editing)
```

---

## Admin setup (one time)

1. Go to https://github.com/settings/tokens/new
   - Description: `blog-admin`
   - Scope: check **repo**
   - Click Generate, copy the token (you only see it once)

2. Open `https://yourusername.github.io/admin/` in your browser

3. Enter your GitHub username, repo name, and the token — click Connect

Your token is stored only in your browser's localStorage. It never goes anywhere except GitHub's API.

---

## Writing posts

1. Go to `/admin/` → click **+ new post**
2. Write in markdown on the left, see the preview on the right
3. Fill in the title, tag, and date at the top
4. Click **publish →** (or press Cmd/Ctrl+S)

The admin will:
- Convert your markdown to a styled HTML post
- Save a `.md` copy so you can edit it cleanly later
- Update `posts/index.json`
- Rebuild `index.html` automatically

Your post goes live on GitHub Pages within ~60 seconds.

---

## Editing & deleting posts

- **Edit**: `/admin/` → click **edit** next to any post → editor loads with the original markdown
- **Delete**: `/admin/` → click **delete** → removes the file, updates the index, rebuilds homepage

---

## Adding music

1. Drop `.mp3` / `.ogg` / `.wav` files into `/music/`
2. Edit `js/radio.js` — update the `PLAYLIST` array at the top:

```js
const PLAYLIST = [
  { src: "music/my-song.mp3", title: "My Song", artist: "Artist Name" },
];
```

3. Push. Done.

---

## Deploy to GitHub Pages

1. Create a GitHub repo (name it `yourusername.github.io` for a root site)
2. Push this folder's contents to `main`
3. **Settings → Pages → Source: main / root**
4. Live in ~1 minute at `https://yourusername.github.io`

---

## Customise

- **Accent colour**: change `--accent` in `css/style.css` (default: terminal green `#7fff7f`)
- **Site name**: find/replace `your_name` across all HTML files
- **Font**: change `--font` in `:root` — any monospace works
- **Scanline texture**: remove `background-image` on `body` in `style.css`
