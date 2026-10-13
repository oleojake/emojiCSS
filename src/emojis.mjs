// The single source of truth for EmojiCSS.
// Every emoji declares which "slot" it animates. Each slot drives a different CSS
// property (rotate, translate, scale, filter...), so you can stack several emojis
// on one element and the animations add up instead of overriding each other.
//
//   slot r → rotate      slot t → translate    slot s → scale
//   slot f → filter      slot o → opacity      slot k → transform (skew, 3D)
//   slot x → shadows     slot b → background   fx     → ::before / ::after
//   static → no animation      mod → modifiers (speed, repeat...)

const D = (s) => `calc(${s}s * var(--ec-speed, 1))`;
const DELAY = 'var(--ec-delay, 0s)';
const LOOP = 'var(--ec-iter, infinite)';
const ONCE = 'var(--ec-iter, 1)';
const DIR = 'var(--ec-dir, normal)';
const ALT = 'var(--ec-dir, alternate)';

// Returns an animation value already wired to the modifier variables.
export const anim = (name, s, ease = 'ease-in-out', { iter = LOOP, dir = DIR } = {}) =>
  `${name} ${D(s)} ${ease} ${DELAY} ${iter} ${dir} both`;

export const categories = [
  { id: 'rotate', label: 'Rotation', blurb: 'Animates <code>rotate</code>. For when the roadmap goes in circles.' },
  { id: 'move', label: 'Movement', blurb: 'Animates <code>translate</code>. Moves things around, like your boss moves deadlines.' },
  { id: 'scale', label: 'Scale', blurb: 'Animates <code>scale</code>. Grows like tech debt.' },
  { id: 'filter', label: 'Filters', blurb: 'Animates <code>filter</code>. Colors your designer never approved.' },
  { id: 'fade', label: 'Opacity', blurb: 'Animates <code>opacity</code>. Appears and disappears like the PM at retros.' },
  { id: 'warp', label: 'Warp', blurb: 'Animates <code>transform</code> (skew and 3D). Startup physics.' },
  { id: 'glow', label: 'Glow & shadows', blurb: 'Animates <code>text-shadow</code> and <code>box-shadow</code>. Illuminate your mediocrity.' },
  { id: 'paint', label: 'Paint', blurb: 'Animates <code>background</code>. Markers, underlines and rainbows.' },
  { id: 'fx', label: 'Special effects', blurb: 'Use <code>::before</code> and <code>::after</code>. One per element; this isn\'t Hollywood.' },
  { id: 'static', label: 'Utilities', blurb: 'No animation. Classes that do weird things, but stand still.' },
  { id: 'mod', label: 'Modifiers', blurb: 'Change how the other classes animate. Like Tailwind\'s <code>hover:</code>, but in hieroglyphics.' },
];

export const emojis = [
  // ───────────────────────── ROTATION (rotate) ─────────────────────────
  {
    e: '🔄', name: 'spin', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Spins forever. Like your on-call rotation on a Saturday.',
    anim: anim('ec-spin', 1, 'linear'),
    kf: '@keyframes ec-spin{to{rotate:360deg}}',
  },
  {
    e: '🎡', name: 'ferris', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Slow, contemplative rotation. Perfect for 40-second loading screens.',
    anim: anim('ec-spin', 6, 'linear'),
  },
  {
    e: '🙃', name: 'flip', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Turns upside down, has second thoughts, comes back. Just like the last refactor.',
    anim: anim('ec-flip', 2.4),
    kf: '@keyframes ec-flip{0%,15%{rotate:0deg}40%,65%{rotate:180deg}90%,100%{rotate:360deg}}',
  },
  {
    e: '🕺', name: 'dance', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Dances side to side. No rhythm, plenty of attitude.',
    anim: anim('ec-dance', 0.5, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-dance{from{rotate:-14deg}to{rotate:14deg}}',
  },
  {
    e: '🔔', name: 'ring', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Rings like a Slack notification at 11:58 PM.',
    css: 'transform-origin:50% 0',
    anim: anim('ec-ring', 1.6),
    kf: '@keyframes ec-ring{0%,60%,100%{rotate:0deg}6%{rotate:22deg}12%{rotate:-20deg}18%{rotate:16deg}24%{rotate:-12deg}30%{rotate:8deg}36%{rotate:-5deg}42%{rotate:2deg}}',
  },
  {
    e: '🥴', name: 'wobble', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Friday after-work wobble. Not suitable for client demos.',
    anim: anim('ec-wobble', 1.8),
    kf: '@keyframes ec-wobble{0%,100%{rotate:0deg}20%{rotate:-9deg}35%{rotate:6deg}55%{rotate:-4deg}70%{rotate:8deg}85%{rotate:-2deg}}',
  },
  {
    e: '🧭', name: 'compass', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Searches for north, like your product strategy. Doesn\'t find it either.',
    anim: anim('ec-compass', 2.2, 'cubic-bezier(.5,1.8,.5,.8)'),
    kf: '@keyframes ec-compass{0%,100%{rotate:-40deg}50%{rotate:35deg}}',
  },
  {
    e: '🌀', name: 'vortex', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Gets sucked into a whirlpool and comes back. Like your time in meetings.',
    anim: anim('ec-vortex', 2.4),
    kf: '@keyframes ec-vortex{0%,100%{rotate:0deg;scale:1}50%{rotate:720deg;scale:.2}}',
  },
  {
    e: '🪃', name: 'boomerang', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Flies off spinning and comes right back. Like that bug you closed as "won\'t fix".',
    anim: anim('ec-boomerang', 2),
    kf: '@keyframes ec-boomerang{0%,100%{rotate:0deg;translate:0 0}50%{rotate:1080deg;translate:2.5em -.6em}}',
  },
  {
    e: '⏰', name: 'alarm', cat: 'rotate', slot: 'r', demo: 'box',
    desc: 'Rattles in bursts. The sprint ends tomorrow.',
    anim: anim('ec-alarm', 1.2, 'linear'),
    kf: '@keyframes ec-alarm{0%,50%,100%{rotate:0deg}5%,15%,25%,35%,45%{rotate:-8deg}10%,20%,30%,40%{rotate:8deg}}',
  },

  // ───────────────────────── MOVEMENT (translate) ─────────────────────────
  {
    e: '🏀', name: 'bounce', cat: 'move', slot: 't', demo: 'box',
    desc: 'Bounces. The classic every framework ships and nobody needs.',
    anim: anim('ec-bounce', 0.9, 'ease-in-out'),
    kf: '@keyframes ec-bounce{0%,100%{translate:0 0;animation-timing-function:cubic-bezier(.3,0,.6,1)}50%{translate:0 -.9em;animation-timing-function:cubic-bezier(.3,0,.6,1)}}',
  },
  {
    e: '🎈', name: 'float', cat: 'move', slot: 't', demo: 'box',
    desc: 'Floats gently. Like your Monday motivation, but upwards.',
    anim: anim('ec-float', 3),
    kf: '@keyframes ec-float{0%,100%{translate:0 0}50%{translate:0 -.5em}}',
  },
  {
    e: '🫨', name: 'shake', cat: 'move', slot: 't', demo: 'box',
    desc: 'Trembles. Perfect for the "Drop production database" button.',
    anim: anim('ec-shake', 0.45, 'linear'),
    kf: '@keyframes ec-shake{0%,100%{translate:0 0}20%{translate:-.12em .06em}40%{translate:.12em -.06em}60%{translate:-.08em -.06em}80%{translate:.08em .06em}}',
  },
  {
    e: '🦘', name: 'jump', cat: 'move', slot: 't', demo: 'box',
    desc: 'Jumps, rests, jumps. Like someone who switches jobs every 11 months.',
    anim: anim('ec-jump', 1.4),
    kf: '@keyframes ec-jump{0%,40%,100%{translate:0 0}20%{translate:0 -1.4em}30%{translate:0 0}35%{translate:0 -.25em}}',
  },
  {
    e: '🥶', name: 'shiver', cat: 'move', slot: 't', demo: 'box',
    desc: 'Shivers. Someone set the office AC to 62 °F.',
    anim: anim('ec-shiver', 0.12, 'linear'),
    kf: '@keyframes ec-shiver{0%,100%{translate:0 0}50%{translate:.05em 0}}',
  },
  {
    e: '🛸', name: 'ufo', cat: 'move', slot: 't', demo: 'box',
    desc: 'Flies in a figure eight. Undocumented behavior, just like your API.',
    anim: anim('ec-ufo', 3.2, 'linear'),
    kf: '@keyframes ec-ufo{0%,100%{translate:0 0}25%{translate:.6em -.35em}50%{translate:0 0}75%{translate:-.6em -.35em}}',
  },
  {
    e: '🐍', name: 'slither', cat: 'move', slot: 't', demo: 'box',
    desc: 'Slips from side to side. Like accountability in a post-mortem.',
    anim: anim('ec-slither', 1.6, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-slither{0%{translate:-.6em 0}25%{translate:-.3em -.15em}50%{translate:0 0}75%{translate:.3em .15em}100%{translate:.6em 0}}',
  },
  {
    e: '🚀', name: 'launch', cat: 'move', slot: 't', demo: 'box',
    desc: 'Takes off and comes back. Blazingly fast™, written in Rust (not really).',
    anim: anim('ec-launch', 2.2, 'ease-in'),
    kf: '@keyframes ec-launch{0%{translate:0 0;opacity:1}15%,25%{translate:.04em .04em}20%{translate:-.04em 0}60%{translate:0 -3em;opacity:0}61%{translate:0 2em;opacity:0}100%{translate:0 0;opacity:1}}',
  },
  {
    e: '📈', name: 'stonks', cat: 'move', slot: 't', demo: 'word', text: '+340% ARR',
    desc: 'Only goes up. Use it on the investor slide and nowhere else.',
    anim: anim('ec-stonks', 2.4, 'ease-out'),
    kf: '@keyframes ec-stonks{0%{translate:-.3em .5em;opacity:.4}70%,100%{translate:.3em -.5em;opacity:1}}',
  },
  {
    e: '📉', name: 'crash', cat: 'move', slot: 't', demo: 'word', text: 'my portfolio',
    desc: 'Plummets while spinning. Your crypto portfolio, now in CSS.',
    anim: anim('ec-crash', 2.4, 'ease-in'),
    kf: '@keyframes ec-crash{0%,20%{translate:0 0;rotate:0deg;opacity:1}90%{translate:.4em 1.2em;rotate:25deg;opacity:0}100%{translate:0 0;rotate:0deg;opacity:0}}',
  },
  {
    e: '🪂', name: 'parachute', cat: 'move', slot: 't', demo: 'box',
    desc: 'Drops in from above, swaying. Like the new VP fresh out of consulting.',
    anim: anim('ec-parachute', 2.2, 'ease-out', { iter: ONCE }),
    kf: '@keyframes ec-parachute{0%{translate:0 -3em;rotate:-12deg;opacity:0}30%{opacity:1}45%{rotate:10deg}70%{rotate:-5deg}100%{translate:0 0;rotate:0deg;opacity:1}}',
  },
  {
    e: '🏓', name: 'pingpong', cat: 'move', slot: 't', demo: 'box',
    desc: 'Back and forth. Like a ticket between backend and frontend.',
    anim: anim('ec-pingpong', 0.8, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-pingpong{from{translate:-1em 0}to{translate:1em 0}}',
  },
  {
    e: '🧲', name: 'magnet', cat: 'move', slot: 't', demo: 'box',
    desc: 'Gets pulled to the right and snaps back. Like you when there\'s pizza in the kitchen.',
    anim: anim('ec-magnet', 1.6, 'ease-in'),
    kf: '@keyframes ec-magnet{0%{translate:0 0}70%{translate:1em 0}72%{translate:1.1em 0}100%{translate:0 0;animation-timing-function:ease-out}}',
  },
  {
    e: '🪀', name: 'yoyo', cat: 'move', slot: 't', demo: 'box',
    desc: 'Drops fast, climbs slowly. A junior\'s self-esteem during code review.',
    anim: anim('ec-yoyo', 1.2),
    kf: '@keyframes ec-yoyo{0%,100%{translate:0 0;animation-timing-function:ease-in}35%{translate:0 1em;animation-timing-function:ease-out}}',
  },

  // ───────────────────────── SCALE (scale) ─────────────────────────
  {
    e: '💓', name: 'heartbeat', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Beats. Makes your CTA convert 300% better (source: I made it up).',
    anim: anim('ec-heartbeat', 1.2),
    kf: '@keyframes ec-heartbeat{0%,40%,100%{scale:1}10%,30%{scale:1.2}20%{scale:1.05}}',
  },
  {
    e: '🫁', name: 'breathe', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Takes a deep breath. Use it on the "Deploy to production" button.',
    anim: anim('ec-breathe', 4),
    kf: '@keyframes ec-breathe{0%,100%{scale:1}50%{scale:1.1}}',
  },
  {
    e: '🍮', name: 'jelly', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Wobbles like jelly. Just like the microservices architecture you built in 2019.',
    anim: anim('ec-jelly', 1),
    kf: '@keyframes ec-jelly{0%,100%{scale:1 1}30%{scale:1.25 .75}40%{scale:.75 1.25}50%{scale:1.15 .85}65%{scale:.95 1.05}75%{scale:1.05 .95}}',
  },
  {
    e: '💥', name: 'pop', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Pops in with a bounce. Only once, because it gets old.',
    anim: anim('ec-pop', 0.6, 'cubic-bezier(.3,1.6,.5,1)', { iter: ONCE }),
    kf: '@keyframes ec-pop{from{scale:0}to{scale:1}}',
  },
  {
    e: '🐡', name: 'puff', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Puffs up and deflates. Like your ego after a founder likes your LinkedIn post.',
    anim: anim('ec-puff', 2),
    kf: '@keyframes ec-puff{0%,100%{scale:1}40%,60%{scale:1.6}}',
  },
  {
    e: '🤏', name: 'shrink', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Shrinks. Like your training budget.',
    anim: anim('ec-shrink', 1.2, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-shrink{from{scale:1}to{scale:.6}}',
  },
  {
    e: '🔍', name: 'zoom', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Zooms in. For reviewing that 4,000-line PR "carefully".',
    anim: anim('ec-zoom', 1.5, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-zoom{from{scale:1}to{scale:1.45}}',
  },
  {
    e: '🫠', name: 'melt', cat: 'scale', slot: 's', demo: 'box',
    desc: 'Melts. You at the 9 AM standup after a late-night hotfix.',
    css: 'transform-origin:50% 100%',
    anim: anim('ec-melt', 3),
    kf: '@keyframes ec-melt{0%,15%,100%{scale:1 1}50%,65%{scale:1.3 .45}}',
  },

  // ───────────────────────── FILTERS (filter) ─────────────────────────
  {
    e: '🌈', name: 'rainbow', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Cycles through every color. For when the brand guidelines are a "suggestion".',
    anim: anim('ec-hue', 3, 'linear'),
    kf: '@keyframes ec-hue{to{filter:hue-rotate(360deg)}}',
  },
  {
    e: '💡', name: 'glow', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Glows with its own light. Unlike your idea in the brainstorm.',
    anim: anim('ec-glow', 1.6),
    kf: '@keyframes ec-glow{0%,100%{filter:drop-shadow(0 0 0 #ffd23f)}50%{filter:drop-shadow(0 0 .5em #ffd23f) brightness(1.2)}}',
  },
  {
    e: '😵‍💫', name: 'dizzy', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Blurs and refocuses. A 3-code-point ZWJ sequence as a CSS class, because we can.',
    anim: anim('ec-dizzy', 2),
    kf: '@keyframes ec-dizzy{0%,100%{filter:blur(0)}50%{filter:blur(.12em)}}',
  },
  {
    e: '🔦', name: 'flicker', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Flickers like the fluorescent tube in the server room.',
    anim: anim('ec-flicker', 2.5, 'steps(1)'),
    kf: '@keyframes ec-flicker{0%,18%,22%,25%,53%,57%,100%{filter:brightness(1)}20%,24%,55%{filter:brightness(.3)}}',
  },
  {
    e: '🌚', name: 'invert', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Dark mode, implemented by an intern in 5 minutes.',
    anim: anim('ec-invert', 2, 'steps(1)'),
    kf: '@keyframes ec-invert{0%{filter:invert(0)}50%{filter:invert(1)}}',
  },
  {
    e: '☢️', name: 'radioactive', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Toxic green glow. Mark the module nobody dares to touch.',
    anim: anim('ec-radio', 1.4),
    kf: '@keyframes ec-radio{0%,100%{filter:drop-shadow(0 0 .1em #7dff3c)}50%{filter:drop-shadow(0 0 .6em #7dff3c) saturate(2)}}',
  },
  {
    e: '🌫️', name: 'fog', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Fades in and out of the fog. Like the project requirements.',
    anim: anim('ec-fog', 4),
    kf: '@keyframes ec-fog{0%,100%{filter:blur(0);opacity:1}50%{filter:blur(.25em);opacity:.35}}',
  },
  {
    e: '🧪', name: 'trip', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Experimental saturation. A feature flag enabled in production "just to test".',
    anim: anim('ec-trip', 2.4, 'linear'),
    kf: '@keyframes ec-trip{0%,100%{filter:saturate(1) contrast(1) hue-rotate(0)}50%{filter:saturate(4) contrast(1.4) hue-rotate(160deg)}}',
  },
  {
    e: '📸', name: 'flash', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Camera flash. For the dashboard screenshot right when everything is green.',
    anim: anim('ec-flash', 2.5, 'ease-out'),
    kf: '@keyframes ec-flash{0%,8%,100%{filter:brightness(1)}3%{filter:brightness(3)}}',
  },
  {
    e: '🥵', name: 'heat', cat: 'filter', slot: 'f', demo: 'box',
    desc: 'Overheats. Like your laptop running Slack, Teams, Chrome and Docker at once.',
    anim: anim('ec-heat', 1.6),
    kf: '@keyframes ec-heat{0%,100%{filter:saturate(1)}50%{filter:saturate(2.5) sepia(.5) hue-rotate(-20deg) drop-shadow(0 0 .3em #ff5a1f)}}',
  },

  // ───────────────────────── OPACITY (opacity) ─────────────────────────
  {
    e: '🪦', name: 'blink', cat: 'fade', slot: 'o', demo: 'word', text: 'SALE!',
    desc: 'Brings back the <code>&lt;blink&gt;</code> tag. Rest in peace (1995–2013).',
    anim: anim('ec-blink', 1, 'steps(1)'),
    kf: '@keyframes ec-blink{50%{opacity:0}}',
  },
  {
    e: '👻', name: 'ghost', cat: 'fade', slot: 'o', demo: 'box',
    desc: 'Floats and turns see-through. Like the client after signing.',
    anim: anim('ec-ghost', 3),
    kf: '@keyframes ec-ghost{0%,100%{opacity:1;translate:0 0}50%{opacity:.15;translate:0 -.4em}}',
  },
  {
    e: '🫥', name: 'vanish', cat: 'fade', slot: 'o', demo: 'box',
    desc: 'Slowly disappears. Your camera during a two-hour meeting.',
    anim: anim('ec-vanish', 3, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-vanish{from{opacity:1}to{opacity:0}}',
  },
  {
    e: '🕯️', name: 'candle', cat: 'fade', slot: 'o', demo: 'box',
    desc: 'Flickers like a candle. Romantic ambience for your login screen.',
    anim: anim('ec-candle', 1.8, 'linear'),
    kf: '@keyframes ec-candle{0%,100%{opacity:1}15%{opacity:.75}30%{opacity:.95}45%{opacity:.6}60%{opacity:.9}80%{opacity:.7}}',
  },

  // ───────────────────────── WARP (transform) ─────────────────────────
  {
    e: '👾', name: 'glitch', cat: 'warp', slot: 'k', demo: 'word', text: 'ERROR 418',
    desc: 'Glitch with chromatic aberration. Cyberpunk aesthetics, intern budget.',
    anim: anim('ec-glitch', 1.8, 'steps(1)'),
    kf: '@keyframes ec-glitch{0%,12%,40%,100%{transform:none;text-shadow:none}2%{transform:translate(.06em,-.04em) skewX(-12deg);text-shadow:-.06em 0 #ff2bd6,.06em 0 #00e5ff}5%{transform:translate(-.08em,.03em) skewX(8deg);text-shadow:.07em 0 #ff2bd6,-.07em 0 #00e5ff}9%{transform:translate(.03em,.02em);text-shadow:-.04em 0 #00e5ff}36%{transform:skewX(20deg);text-shadow:.05em 0 #ff2bd6}}',
  },
  {
    e: '🌊', name: 'wave', cat: 'warp', slot: 'k', demo: 'box',
    desc: 'Waves like a flag. Or like your tolerance for scope changes.',
    anim: anim('ec-wave', 1.6),
    kf: '@keyframes ec-wave{0%,100%{transform:skew(0deg,0deg)}25%{transform:skew(-10deg,3deg)}75%{transform:skew(10deg,-3deg)}}',
  },
  {
    e: '🍝', name: 'spaghetti', cat: 'warp', slot: 'k', demo: 'box',
    desc: 'Twists with no apparent logic. A faithful portrait of your legacy code.',
    anim: anim('ec-spaghetti', 1.2),
    kf: '@keyframes ec-spaghetti{0%,100%{transform:skew(0,0)}20%{transform:skew(18deg,-6deg)}40%{transform:skew(-14deg,10deg)}60%{transform:skew(8deg,-12deg)}80%{transform:skew(-6deg,4deg)}}',
  },
  {
    e: '🪙', name: 'coin', cat: 'warp', slot: 'k', demo: 'box',
    desc: 'Spins in 3D like a coin. Heads: Kubernetes. Tails: also Kubernetes.',
    anim: anim('ec-coin', 1.6, 'linear'),
    kf: '@keyframes ec-coin{from{transform:perspective(20em) rotateY(0)}to{transform:perspective(20em) rotateY(360deg)}}',
  },
  {
    e: '🥞', name: 'pancake', cat: 'warp', slot: 'k', demo: 'box',
    desc: 'Flips backwards like a pancake. Sunday brunch and deploys.',
    anim: anim('ec-pancake', 2, 'cubic-bezier(.6,0,.4,1)'),
    kf: '@keyframes ec-pancake{0%,20%{transform:perspective(20em) rotateX(0)}80%,100%{transform:perspective(20em) rotateX(360deg)}}',
  },

  // ───────────────────────── GLOW & SHADOWS ─────────────────────────
  {
    e: '🔥', name: 'fire', cat: 'glow', slot: 'x', demo: 'word', text: 'in production',
    desc: 'The text is on fire. Recommended for production error messages.',
    anim: anim('ec-fire', 0.9, 'ease-in-out', { dir: ALT }),
    kf: '@keyframes ec-fire{0%{text-shadow:0 0 .1em #fff3b0,0 -.1em .2em #ffb000,.05em -.25em .35em #ff5a00,-.05em -.4em .5em #e01b00}100%{text-shadow:0 0 .12em #fff3b0,.04em -.15em .25em #ffc400,-.06em -.3em .4em #ff6a00,.06em -.55em .6em #c41500}}',
  },
  {
    e: '🚨', name: 'siren', cat: 'glow', slot: 'x', demo: 'box',
    desc: 'Police lights. For your favorite "P0 incident" badge.',
    anim: anim('ec-siren', 0.8, 'steps(1)'),
    kf: '@keyframes ec-siren{0%{box-shadow:-.4em 0 1em #ff1f3d,.4em 0 1em transparent}50%{box-shadow:-.4em 0 1em transparent,.4em 0 1em #1f6bff}}',
  },
  {
    e: '🪩', name: 'disco', cat: 'glow', slot: 'x', demo: 'box',
    desc: 'Full-color disco glow. Your MVP launch party.',
    anim: anim('ec-disco', 1.6, 'linear'),
    kf: '@keyframes ec-disco{0%,100%{box-shadow:0 0 .8em .1em #ff2bd6}25%{box-shadow:0 0 .8em .1em #ffd23f}50%{box-shadow:0 0 .8em .1em #00e5ff}75%{box-shadow:0 0 .8em .1em #7dff3c}}',
  },
  {
    e: '📟', name: 'terminal', cat: 'glow', slot: 'x', demo: 'word', text: 'root@prod:~#',
    desc: 'Phosphor green with CRT glow. Either you\'re hacking the Pentagon or tweaking some CSS.',
    css: 'color:#39ff7a;font-family:ui-monospace,"SFMono-Regular",Menlo,Consolas,monospace',
    anim: anim('ec-crt', 0.15, 'linear', { dir: ALT }),
    kf: '@keyframes ec-crt{from{text-shadow:0 0 .2em #39ff7a99}to{text-shadow:0 0 .35em #39ff7acc}}',
  },
  {
    e: '⚡', name: 'electric', cat: 'glow', slot: 'x', demo: 'word', text: 'high voltage',
    desc: 'Electric discharges. "Deployed it without tests" vibes.',
    anim: anim('ec-electric', 1.4, 'steps(1)'),
    kf: '@keyframes ec-electric{0%,30%,36%,70%,100%{text-shadow:none}31%,35%,71%{text-shadow:0 0 .15em #fff,0 0 .4em #00e5ff,0 0 .8em #00e5ff}33%,73%{text-shadow:0 0 .2em #fff,0 0 .6em #b388ff}}',
  },

  // ───────────────────────── PAINT (background) ─────────────────────────
  {
    e: '✏️', name: 'underline', cat: 'paint', slot: 'b', demo: 'word', text: 'important',
    desc: 'Draws a pencil underline. Like the college notes you never reread.',
    css: 'background-image:linear-gradient(currentColor,currentColor);background-repeat:no-repeat;background-position:0 100%;background-size:0 .1em;padding-bottom:.08em',
    anim: anim('ec-underline', 1.6, 'cubic-bezier(.7,0,.3,1)'),
    kf: '@keyframes ec-underline{0%{background-size:0 .1em;background-position:0 100%}45%,55%{background-size:100% .1em;background-position:0 100%}56%{background-position:100% 100%}100%{background-size:0 .1em;background-position:100% 100%}}',
  },
  {
    e: '🖍️', name: 'highlight', cat: 'paint', slot: 'b', demo: 'word', text: 'tech debt',
    desc: 'Sweeps a highlighter. Ideal for the parts of the docs nobody will read.',
    css: 'background-image:linear-gradient(104deg,transparent .2em,#ffd23fcc .3em,#ffd23f 95%,transparent);background-repeat:no-repeat;background-size:0 70%;background-position:0 70%;-webkit-box-decoration-break:clone;box-decoration-break:clone',
    anim: anim('ec-highlight', 1.2, 'cubic-bezier(.6,0,.4,1)', { iter: ONCE }),
    kf: '@keyframes ec-highlight{to{background-size:100% 70%}}',
  },
  {
    e: '🦄', name: 'unicorn', cat: 'paint', slot: 'b', demo: 'word', text: 'Unicorn',
    desc: 'Moving rainbow gradient text. Valuation: $1B. Revenue: $0.',
    css: 'background-image:linear-gradient(90deg,#ff2bd6,#ffd23f,#39ff7a,#00e5ff,#7a5cff,#ff2bd6);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent',
    anim: anim('ec-unicorn', 3, 'linear'),
    kf: '@keyframes ec-unicorn{to{background-position:-200% 0}}',
  },
  {
    e: '✨', name: 'shimmer', cat: 'paint', slot: 'b', demo: 'word', text: 'Premium',
    desc: 'A shine sweeps across the text. Makes anything look like a paid plan.',
    css: 'background-image:linear-gradient(110deg,currentColor 40%,#fff 50%,currentColor 60%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent',
    anim: anim('ec-shimmer', 2.2, 'linear'),
    kf: '@keyframes ec-shimmer{from{background-position:100% 0}to{background-position:-50% 0}}',
  },
  {
    e: '🦓', name: 'stripes', cat: 'paint', slot: 'b', demo: 'box',
    desc: 'Moving stripes. The 2004 progress bar that never reached 100%.',
    css: 'background-image:repeating-linear-gradient(-45deg,#0000 0 .5em,#ffffff55 .5em 1em);background-size:1.414em 1.414em',
    anim: anim('ec-stripes', 0.8, 'linear'),
    kf: '@keyframes ec-stripes{to{background-position:1.414em 0}}',
  },

  // ───────────────────────── SPECIAL EFFECTS (::before / ::after) ─────────────────────────
  {
    e: '🪄', name: 'sparkles', cat: 'fx', demo: 'word', text: 'magic',
    desc: 'Sheds sparkles all around. For "AI-powered" features that are just an <code>if</code>.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"✦";position:absolute;pointer-events:none;font-size:.6em;line-height:1;color:#ffc400;-webkit-text-fill-color:#ffc400;text-shadow:2.2em 1.6em 0 #ff2bd6,-1em 2.4em 0 #00e5ff;animation:${anim('ec-twinkle', 1.4)}}
${s}::before{top:-.6em;left:-.4em}
${s}::after{content:"✧";top:-.2em;right:-.6em;color:#7a5cff;-webkit-text-fill-color:#7a5cff;text-shadow:-2.4em 2em 0 #ffc400,-.6em 2.6em 0 #ff2bd6;animation-delay:calc(var(--ec-delay, 0s) + .7s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-twinkle{0%,100%{opacity:0;scale:.3;rotate:0deg}50%{opacity:1;scale:1.15;rotate:90deg}}',
  },
  {
    e: '🎉', name: 'confetti', cat: 'fx', demo: 'button', text: 'Deploy OK!',
    desc: 'A burst of confetti. Celebrate the pipeline passing on the third try.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"▪";position:absolute;top:30%;left:50%;pointer-events:none;font-size:.7em;line-height:1;color:#ff2bd6;-webkit-text-fill-color:#ff2bd6;text-shadow:.6em -.4em 0 #ffd23f,-.7em -.3em 0 #00e5ff,.3em -.9em 0 #7dff3c,-.4em -1em 0 #7a5cff,1em .1em 0 #ff5a1f,-1em .2em 0 #ffd23f;animation:${anim('ec-confetti-l', 1.6, 'cubic-bezier(.2,.7,.4,1)')}}
${s}::after{content:"●";font-size:.45em;color:#00e5ff;-webkit-text-fill-color:#00e5ff;text-shadow:-1em -.6em 0 #ff2bd6,1.2em -.5em 0 #ffd23f,-.5em -1.5em 0 #7dff3c,.6em -1.6em 0 #7a5cff,1.8em .2em 0 #ff2bd6,-1.8em .1em 0 #ffd23f;animation-name:ec-confetti-r}`,
    kf: '@keyframes ec-confetti-l{0%{translate:0 0;scale:.2;opacity:0;rotate:0deg}15%{opacity:1}100%{translate:-1.8em -2.4em;scale:1.6;opacity:0;rotate:-120deg}}\n@keyframes ec-confetti-r{0%{translate:0 0;scale:.2;opacity:0;rotate:0deg}15%{opacity:1}100%{translate:1.6em -2.6em;scale:1.8;opacity:0;rotate:140deg}}',
  },
  {
    e: '❤️', name: 'hearts', cat: 'fx', demo: 'word', text: 'liked',
    desc: 'Releases floating hearts. Artificial engagement, Instagram Live style.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"❤";position:absolute;bottom:60%;right:-.2em;pointer-events:none;font-size:.7em;line-height:1;color:#ff3d7f;-webkit-text-fill-color:#ff3d7f;animation:${anim('ec-heart', 2, 'ease-out')}}
${s}::after{right:auto;left:10%;color:#ff7ab0;-webkit-text-fill-color:#ff7ab0;animation-delay:calc(var(--ec-delay, 0s) + 1s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-heart{0%{translate:0 .6em;scale:.4;opacity:0}20%{opacity:1}50%{translate:.3em -.6em}100%{translate:-.2em -2em;scale:1.3;opacity:0}}',
  },
  {
    e: '💸', name: 'money', cat: 'fx', demo: 'word', text: 'Series A',
    desc: 'It\'s raining money. Exactly like the funding round of your dreams.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"💸";position:absolute;top:-1.2em;left:10%;pointer-events:none;font-size:.75em;line-height:1;-webkit-text-fill-color:initial;animation:${anim('ec-money', 2.2, 'ease-in')}}
${s}::after{left:auto;right:5%;animation-delay:calc(var(--ec-delay, 0s) + 1.1s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-money{0%{translate:0 0;rotate:-20deg;opacity:0}15%{opacity:1}50%{rotate:15deg}100%{translate:.5em 3em;rotate:-10deg;opacity:0}}',
  },
  {
    e: '❄️', name: 'snow', cat: 'fx', demo: 'box',
    desc: 'Snows inside the element. The holiday code freeze, visualized.',
    raw: (s) => `${s}{position:relative;overflow:hidden}
${s}::before,${s}::after{content:"❄ ❅ ❆ ❄ ❅ ❆ ❄";position:absolute;top:0;left:-.5em;right:-.5em;pointer-events:none;white-space:nowrap;overflow:hidden;letter-spacing:.6em;font-size:.6em;line-height:1;color:#ffffffd0;-webkit-text-fill-color:#ffffffd0;animation:${anim('ec-snow', 3, 'linear')}}
${s}::after{content:"❅ ❆ ❄ ❅ ❆ ❄ ❅";left:.4em;animation-delay:calc(var(--ec-delay, 0s) - 1.5s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-snow{0%{translate:0 -1.5em;opacity:0}20%{opacity:1}100%{translate:.6em 6em;opacity:.2}}',
  },
  {
    e: '☕', name: 'steam', cat: 'fx', demo: 'word', text: 'fresh out',
    desc: 'Lets off steam. Freshly baked code: no tests, but nice and warm.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"~";position:absolute;bottom:90%;left:40%;pointer-events:none;font-size:1.1em;line-height:1;rotate:90deg;color:currentColor;-webkit-text-fill-color:currentColor;opacity:0;animation:${anim('ec-steam', 2.2, 'ease-out')}}
${s}::after{left:58%;animation-delay:calc(var(--ec-delay, 0s) + .9s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-steam{0%{translate:0 0;opacity:0}30%{opacity:.6}100%{translate:0 -.9em;opacity:0;scale:1.4}}',
  },
  {
    e: '🤖', name: 'typing', cat: 'fx', demo: 'word', text: 'Generating answer',
    desc: 'Adds a blinking cursor. Makes it look like an AI wrote it (and maybe one did).',
    raw: (s) => `${s}::after{content:"▋";display:inline-block;margin-left:.08em;color:currentColor;-webkit-text-fill-color:currentColor;animation:${anim('ec-caret', 1, 'steps(1)')}}`,
    kf: '@keyframes ec-caret{50%{opacity:0}}',
  },
  {
    e: '🕶️', name: 'dealwithit', cat: 'fx', demo: 'word', text: 'Yes, they\'re emojis',
    desc: 'Sunglasses drop on top. Deal with it. Only once, out of respect.',
    raw: (s) => `${s}{position:relative}
${s}::after{content:"🕶️";position:absolute;left:50%;top:-1.05em;pointer-events:none;font-size:1em;line-height:1;-webkit-text-fill-color:initial;translate:-50% 0;animation:${anim('ec-shades', 1.6, 'cubic-bezier(.5,0,.5,1)', { iter: ONCE })}}`,
    kf: '@keyframes ec-shades{0%{translate:-50% -3em;opacity:0}70%{translate:-50% 0;opacity:1}80%{translate:-50% -.15em}100%{translate:-50% 0;opacity:1}}',
  },
  {
    e: '💯', name: 'stamp', cat: 'fx', demo: 'word', text: 'Code review',
    desc: 'Stamps a 💯 in the corner. Approved without reading, as tradition demands.',
    raw: (s) => `${s}{position:relative}
${s}::after{content:"💯";position:absolute;top:-.7em;right:-.9em;pointer-events:none;font-size:.9em;line-height:1;-webkit-text-fill-color:initial;rotate:-15deg;animation:${anim('ec-stamp', 0.5, 'cubic-bezier(.3,1.5,.6,1)', { iter: ONCE })}}`,
    kf: '@keyframes ec-stamp{from{scale:4;opacity:0}to{scale:1;opacity:1}}',
  },
  {
    e: '💤', name: 'sleep', cat: 'fx', demo: 'word', text: '2-hour meeting',
    desc: 'Floats out Z\'s. For any meeting that could have been an email.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"z";position:absolute;bottom:70%;right:-.4em;pointer-events:none;font-weight:700;font-size:.6em;line-height:1;color:#7a5cff;-webkit-text-fill-color:#7a5cff;opacity:0;animation:${anim('ec-zzz', 2.4, 'ease-out')}}
${s}::after{content:"Z";font-size:.8em;animation-delay:calc(var(--ec-delay, 0s) + 1.2s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-zzz{0%{translate:0 0;opacity:0}20%{opacity:1}100%{translate:1em -1.6em;opacity:0;rotate:20deg}}',
  },
  {
    e: '🫧', name: 'bubbles', cat: 'fx', demo: 'box',
    desc: 'Bubbles rising. Just like AI startup valuations.',
    raw: (s) => `${s}{position:relative}
${s}::before,${s}::after{content:"○";position:absolute;bottom:0;left:20%;pointer-events:none;font-size:.5em;line-height:1;color:#bfeaff;-webkit-text-fill-color:#bfeaff;text-shadow:1.6em .8em 0 #bfeaff,3.4em .3em 0 #bfeaff;opacity:0;animation:${anim('ec-bubble', 2.6, 'ease-in')}}
${s}::after{left:35%;font-size:.35em;animation-delay:calc(var(--ec-delay, 0s) + 1.3s * var(--ec-speed, 1))}`,
    kf: '@keyframes ec-bubble{0%{translate:0 0;opacity:0}20%{opacity:1}100%{translate:.3em -4em;opacity:0}}',
  },

  // ───────────────────────── UTILITIES (static) ─────────────────────────
  {
    e: '🤡', name: 'comic', cat: 'static', demo: 'word', text: 'Corporate design',
    desc: 'Comic Sans. The only typeface that takes this library as seriously as you do.',
    css: 'font-family:"Comic Sans MS","Comic Sans","Chalkboard SE","Comic Neue",cursive',
  },
  {
    e: '📢', name: 'shout', cat: 'static', demo: 'word', text: 'urgent',
    desc: 'UPPERCASE AND BOLD. FOR COMMUNICATING LIKE IN #GENERAL.',
    css: 'text-transform:uppercase;font-weight:900;letter-spacing:.06em',
  },
  {
    e: '🙈', name: 'spoiler', cat: 'static', demo: 'word', text: 'the CEO\'s salary',
    desc: 'Blurred until you hover. Sensitive information, Post-it-level security.',
    css: 'filter:blur(.3em);transition:filter .3s;cursor:help',
    rawExtra: (s) => `${s}:hover,${s}:focus-visible{filter:none}`,
  },
  {
    e: '🧊', name: 'frozen', cat: 'static', demo: 'box',
    desc: 'Freezes every animation and gives it an icy tint. Official code freeze.',
    css: 'filter:saturate(.4) brightness(1.15) hue-rotate(170deg)',
    rawExtra: (s) => `${s},${s}::before,${s}::after{animation-play-state:paused}`,
  },
  {
    e: '🐛', name: 'bug', cat: 'static', demo: 'box',
    desc: 'Shifts the element 1px to the right. Nobody will ever know why.',
    css: 'margin-left:1px',
  },
  {
    e: '🗿', name: 'moai', cat: 'static', demo: 'box',
    desc: 'Does absolutely nothing. Enterprise stability. Zero regressions since 2026.',
    css: '/* 🗿 */',
  },
  {
    e: '🧼', name: 'reset', cat: 'static', demo: 'box',
    desc: 'Washes the element: removes every EmojiCSS animation. For when Legal shows up.',
    rawExtra: (s) => `${s},${s}::before,${s}::after{animation:none!important}`,
  },

  // ───────────────────────── MODIFIERS ─────────────────────────
  { e: '🐌', name: 'speed-x4', cat: 'mod', desc: 'Four times slower. The speed of an architecture committee.', css: '--ec-speed:4' },
  { e: '🐢', name: 'speed-x2', cat: 'mod', desc: 'Twice as slow. Like your CI pipeline.', css: '--ec-speed:2' },
  { e: '🐇', name: 'speed-half', cat: 'mod', desc: 'Twice as fast. Like a PM promising dates.', css: '--ec-speed:.5' },
  { e: '🏎️', name: 'speed-quarter', cat: 'mod', desc: 'Four times faster. Helmet recommended.', css: '--ec-speed:.25' },
  { e: '1️⃣', name: 'once', cat: 'mod', desc: 'Plays once. Like your last raise.', css: '--ec-iter:1' },
  { e: '3️⃣', name: 'thrice', cat: 'mod', desc: 'Three times, then stops. About as long as a good intention lasts.', css: '--ec-iter:3' },
  { e: '♾️', name: 'infinite', cat: 'mod', desc: 'Repeats forever. Like the tabs vs. spaces debate.', css: '--ec-iter:infinite' },
  { e: '⏪', name: 'reverse', cat: 'mod', desc: 'Plays backwards. Ctrl+Z as an animation.', css: '--ec-dir:reverse' },
  { e: '🔁', name: 'alternate', cat: 'mod', desc: 'There and back again. Like the requirements.', css: '--ec-dir:alternate' },
  { e: '⏳', name: 'delay', cat: 'mod', desc: 'Waits half a second before starting. Like the loader you added "so people notice".', css: '--ec-delay:.5s' },
  { e: '⌛', name: 'delay-long', cat: 'mod', desc: 'Waits 1.5 seconds. To build anticipation (or patience).', css: '--ec-delay:1.5s' },
  {
    e: '⏸️', name: 'paused', cat: 'mod', desc: 'Pauses the animation. Very useful for doing nothing in style.',
    rawExtra: (s) => `${s},${s}::before,${s}::after{animation-play-state:paused}`,
  },
  {
    e: '👆', name: 'hover', cat: 'mod', desc: 'Only animates on hover. Tailwind\'s <code>hover:</code> for people with self-control.',
    rawExtra: (s) => `${s}:not(:hover):not(:focus-visible),${s}:not(:hover):not(:focus-visible)::before,${s}:not(:hover):not(:focus-visible)::after{animation-play-state:paused}`,
  },
];
