# EmojiCSS 🔄🌈🫨

> The utility-first CSS framework where every class is an emoji. Because readable code was overrated anyway.

```html
<!-- Before -->
<div class="animate-spin hover:scale-110 motion-safe:animate-bounce">

<!-- Now -->
<div class="🔄 🏀 💓">
```

**92 classes · 0 dependencies · 100% unnecessary.**

👉 **Website, catalog and live examples:** https://oleojake.github.io/emojiCSS/

## Installation

### CDN (jsDelivr)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/oleojake/emojiCSS@main/dist/emoji.min.css">
```

### Download

Copy [`dist/emoji.min.css`](dist/emoji.min.css) (or the readable [`dist/emoji.css`](dist/emoji.css)) into your project.

## Usage

Put emojis in `class`. Stack them like Tailwind utilities.

```html
<h1 class="🦄 🪄">AI-powered</h1>
<button class="🫨 👆">Drop production</button>
<div class="p-4 rounded-xl 💓">Works alongside Tailwind</div>
```

In JSX: `className="🔄"`.

## How stacking works

Normally, two classes that set `animation` override each other. EmojiCSS assigns each family to a different CSS property and composes them into a single eight-layer `animation`:

| Family | Animated property | Classes |
| --- | --- | --- |
| Rotation | `rotate` | 🔄 🎡 🙃 🕺 🔔 🥴 🧭 🌀 🪃 ⏰ |
| Movement | `translate` | 🏀 🎈 🫨 🦘 🥶 🛸 🐍 🚀 📈 📉 🪂 🏓 🧲 🪀 |
| Scale | `scale` | 💓 🫁 🍮 💥 🐡 🤏 🔍 🫠 |
| Filters | `filter` | 🌈 💡 😵‍💫 🔦 🌚 ☢️ 🌫️ 🧪 📸 🥵 |
| Opacity | `opacity` | 🪦 👻 🫥 🕯️ |
| Warp | `transform` | 👾 🌊 🍝 🪙 🥞 |
| Glow & shadows | `text-shadow` / `box-shadow` | 🔥 🚨 🪩 📟 ⚡ |
| Paint | `background` | ✏️ 🖍️ 🦄 ✨ 🦓 |
| Special effects | `::before` / `::after` | 🪄 🎉 ❤️ 💸 ❄️ ☕ 🤖 🕶️ 💯 💤 🫧 |
| Utilities | (static) | 🤡 📢 🙈 🧊 🐛 🗿 🧼 |

`class="🔄 🏀 💓 🌈"` spins, bounces, beats and shifts color at the same time. Two classes from the same family: the one later in the stylesheet wins. Special effects: one per element.

Each slot is a custom property registered with `@property { inherits: false }`, so children don't inherit their parent's dizziness.

## Modifiers

| Class | Effect |
| --- | --- |
| 🐌 / 🐢 | 4× / 2× slower |
| 🐇 / 🏎️ | 2× / 4× faster |
| 1️⃣ / 3️⃣ / ♾️ | Once / three times / forever |
| ⏪ / 🔁 | Reverse / alternate |
| ⏳ / ⌛ | 0.5 s / 1.5 s delay |
| ⏸️ | Pause |
| 👆 | Animate only on hover or focus |

Speed, repeat and delay modifiers are inherited variables: put them on a container and they affect everything inside.

## Details

- Every emoji works with and without the U+FE0F variation selector (`✏️` and `✏`).
- Movement classes set `display: inline-block` on `span`, `a`, `em`… so transforms actually apply.
- Respects `prefers-reduced-motion`: if the system asks for less motion, everything stops.
- Browsers: current versions of Chrome, Edge, Safari and Firefox.

## Development

Everything comes from [`src/emojis.mjs`](src/emojis.mjs). To regenerate `dist/` and the website data:

```bash
npm run build   # or: node scripts/build.mjs
```

To add an emoji: one entry in `src/emojis.mjs`, an `npm run build`, and a PR. Mandatory requirement: a sarcastic description.

The website (`index.html` + `site/`) is served as-is from GitHub Pages, no build needed.

## License

MIT © oleojake
