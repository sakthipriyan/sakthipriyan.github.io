/* Slidetake 0.5.6 · https://slidetake.com · Apache-2.0 */
"use strict";(()=>{var G=(e,t)=>()=>(e&&(t=e(e=0)),t);var Co,$r=G(()=>{Co=`---
title: Slidetake \u2014 write in markdown with AI, record without timeline editing
description: "Write a deck in markdown, with AI, present it on a spatial canvas, and record it slide by slide: retake any slide, pick the best take, download the video. Open source."
brand: slidetake
pip: bottom-right
---

<!-- camera: on, full, on -->

# ![](/favicon.svg) Slide<span class="st-take">take</span>

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 290" font-family="IBM Plex Sans, system-ui, sans-serif">
  <defs>
    <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill:var(--accent)"/>
    </marker>
  </defs>

  <!-- four panels -->
  <g style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5">
    <rect x="14" y="10" width="212" height="270" rx="18"/>
    <rect x="254" y="10" width="212" height="270" rx="18"/>
    <rect x="494" y="10" width="212" height="270" rx="18"/>
    <rect x="734" y="10" width="212" height="270" rx="18"/>
  </g>
  <g fill="none" style="stroke:var(--accent)" stroke-width="2.5" marker-end="url(#head)">
    <path d="M228 110 H251"/><path d="M468 110 H491"/><path d="M708 110 H731"/>
  </g>

  <!-- write: a markdown file, and the AI writing it -->
  <rect x="66" y="36" width="104" height="140" rx="11" style="fill:var(--node-bg);stroke:var(--accent)" stroke-width="2"/>
  <g font-family="IBM Plex Mono, monospace" font-size="13" font-weight="600" style="fill:var(--accent)">
    <text x="78" y="62">#</text><text x="78" y="112">##</text>
  </g>
  <g style="fill:var(--text-muted)" opacity=".55">
    <rect x="92" y="53" width="52" height="9" rx="4.5"/>
    <rect x="78" y="74" width="80" height="6" rx="3"/><rect x="78" y="86" width="60" height="6" rx="3"/>
    <rect x="100" y="103" width="46" height="9" rx="4.5"/>
    <rect x="78" y="124" width="80" height="6" rx="3"/><rect x="78" y="136" width="68" height="6" rx="3"/><rect x="78" y="148" width="50" height="6" rx="3"/>
  </g>
  <path d="M176 28 l6 14 14 6 -14 6 -6 14 -6 -14 -14 -6 14 -6z" style="fill:var(--accent)"/>

  <!-- present: cards on a path, the one on screen framed -->
  <g fill="none" style="stroke:var(--accent);stroke-opacity:.6" stroke-width="2">
    <path d="M310 58 H320 M358 58 H368 M387 71 V92 M406 105 H416"/>
  </g>
  <g style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent);stroke-opacity:.7" stroke-width="1.5">
    <rect x="272" y="45" width="38" height="26" rx="6"/><rect x="320" y="45" width="38" height="26" rx="6"/>
    <rect x="368" y="45" width="38" height="26" rx="6"/><rect x="368" y="92" width="38" height="26" rx="6"/>
    <rect x="416" y="92" width="38" height="26" rx="6"/>
  </g>
  <rect x="358" y="82" width="58" height="46" rx="9" fill="none" style="stroke:var(--accent)" stroke-width="3"/>
  <rect x="368" y="92" width="38" height="26" rx="6" style="fill:var(--accent);fill-opacity:.45"/>
  <g style="fill:var(--text-muted)" font-size="12">
    <text x="272" y="156">\u2192 walks the path</text><text x="272" y="174">O zooms out to all</text>
  </g>

  <!-- record: the red dot, in either mode -->
  <circle cx="600" cy="62" r="24" fill="none" stroke="#ef4444" stroke-opacity=".45" stroke-width="2"/>
  <circle cx="600" cy="62" r="14" fill="#ef4444"/>
  <g font-size="13" text-anchor="middle">
    <rect x="522" y="102" width="156" height="30" rx="15" style="fill:var(--node-bg)"/>
    <rect x="522" y="102" width="156" height="30" rx="15" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="1.5"/>
    <text x="600" y="122" fill="currentColor"><tspan font-weight="600">Easy</tspan> \xB7 Chrome</text>
    <rect x="522" y="142" width="156" height="30" rx="15" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.6" stroke-width="1.5"/>
    <text x="600" y="162" fill="currentColor"><tspan font-weight="600">Pro</tspan> \xB7 OBS</text>
  </g>

  <!-- edit: pick a take, get the video -->
  <g font-size="12" text-anchor="middle">
    <rect x="752" y="36" width="96" height="27" rx="8" fill="none" style="stroke:var(--text-muted);stroke-opacity:.6" stroke-width="1.5" stroke-dasharray="4 4"/>
    <text x="800" y="54" style="fill:var(--text-muted)">Take 1</text>
    <rect x="752" y="72" width="96" height="27" rx="8" style="fill:var(--node-bg)"/>
    <rect x="752" y="72" width="96" height="27" rx="8" style="fill:var(--accent);fill-opacity:.15;stroke:var(--accent)" stroke-width="2"/>
    <text x="800" y="90" fill="currentColor">Take 2 \u2713</text>
  </g>
  <path d="M850 86 C878 86 884 96 884 108" fill="none" style="stroke:var(--accent)" stroke-width="2.5" marker-end="url(#head)"/>
  <rect x="836" y="112" width="92" height="60" rx="10" style="fill:var(--node-bg);stroke:var(--accent)" stroke-width="2"/>
  <path d="M874 130 l16 12 -16 12z" style="fill:var(--accent)"/>

  <!-- the steps -->
  <g text-anchor="middle" fill="currentColor">
    <text x="120" y="222" font-size="20" font-weight="700">Write</text>
    <text x="120" y="248" font-size="14" style="fill:var(--text-muted)">in markdown, with AI</text>
    <text x="360" y="222" font-size="20" font-weight="700">Present</text>
    <text x="360" y="248" font-size="14" style="fill:var(--text-muted)">on a spatial canvas</text>
    <text x="600" y="222" font-size="20" font-weight="700">Record</text>
    <text x="600" y="248" font-size="14" style="fill:var(--text-muted)">slide by slide, retake any</text>
    <text x="840" y="222" font-size="20" font-weight="700">Edit</text>
    <text x="840" y="248" font-size="14" style="fill:var(--text-muted)">just pick the best take</text>
  </g>
</svg>
\`\`\`

<p style="text-align:center">For developers and technical educators who explain things on video. You're inside a Slidetake deck right now.</p>

### \u23F1\uFE0F Hours, not days

A video that takes two or three days to script, record and edit takes a couple of hours: an AI writes the deck, you record it slide by slide, and pick the best take of each in Studio. What comes out is ready to upload.

## \u270D\uFE0F Write in markdown, with AI {#ai}

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 380" font-family="IBM Plex Sans, system-ui, sans-serif">
  <defs>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill:var(--accent)"/>
    </marker>
  </defs>

  <!-- the four steps -->
  <g>
    <rect x="16" y="40" width="196" height="150" rx="18" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <path d="M114 70 l7 17 17 7 -17 7 -7 17 -7 -17 -17 -7 17 -7z" style="fill:var(--accent)"/>
    <text x="114" y="150" text-anchor="middle" font-size="19" font-weight="600" fill="currentColor">Claude Code</text>
    <text x="114" y="173" text-anchor="middle" font-size="13" style="fill:var(--text-muted)">or any AI agent</text>
  </g>
  <g>
    <rect x="262" y="34" width="196" height="162" rx="18" style="fill:var(--accent)" filter="url(#glow)" opacity=".1"/>
    <rect x="262" y="40" width="196" height="150" rx="18" style="fill:var(--node-bg)"/>
    <rect x="262" y="40" width="196" height="150" rx="18" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2.5"/>
    <path d="M343 66 h26 l12 12 v34 h-38z" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M369 66 v12 h12" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="360" y="150" text-anchor="middle" font-size="19" font-weight="600" font-family="IBM Plex Mono, monospace" fill="currentColor">deck.md</text>
    <text x="360" y="173" text-anchor="middle" font-size="13" style="fill:var(--text-muted)">text, dot, d2, echarts, svg</text>
  </g>
  <g>
    <rect x="508" y="40" width="196" height="150" rx="18" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <rect x="577" y="68" width="58" height="44" rx="7" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>
    <path d="M588 82 l9 8 -9 8 M601 99 h12" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="606" y="150" text-anchor="middle" font-size="19" font-weight="600" font-family="IBM Plex Mono, monospace" fill="currentColor">npx slidetake</text>
    <text x="606" y="173" text-anchor="middle" font-size="13" style="fill:var(--text-muted)">serves it, watches the file</text>
  </g>
  <g>
    <rect x="754" y="40" width="190" height="150" rx="18" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <rect x="818" y="66" width="62" height="46" rx="7" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>
    <path d="M818 78 h62" style="stroke:var(--accent)" stroke-width="2.5"/>
    <circle cx="826" cy="72" r="1.8" style="fill:var(--accent)"/><circle cx="833" cy="72" r="1.8" style="fill:var(--accent)"/>
    <rect x="828" y="86" width="22" height="16" rx="3" style="fill:var(--accent);fill-opacity:.55"/>
    <text x="849" y="150" text-anchor="middle" font-size="19" font-weight="600" fill="currentColor">Chrome</text>
    <text x="849" y="173" text-anchor="middle" font-size="13" style="fill:var(--text-muted)">redraws the slide you're on</text>
  </g>

  <!-- forward: write, save, reload -->
  <path d="M214 115 H256" fill="none" style="stroke:var(--accent)" stroke-width="3" marker-end="url(#head)"/>
  <path d="M460 115 H502" fill="none" style="stroke:var(--accent)" stroke-width="3" marker-end="url(#head)"/>
  <path d="M706 115 H748" fill="none" style="stroke:var(--accent)" stroke-width="3" marker-end="url(#head)"/>
  <text x="237" y="104" text-anchor="middle" font-size="12" style="fill:var(--text-muted)">writes</text>
  <text x="483" y="104" text-anchor="middle" font-size="12" style="fill:var(--text-muted)">saved</text>
  <text x="729" y="104" text-anchor="middle" font-size="12" style="fill:var(--text-muted)">reloads</text>

  <!-- back: you ask for a change -->
  <path d="M849 196 C849 300 780 330 480 330 C180 330 114 300 114 202" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-dasharray="7 7" marker-end="url(#head)"/>
  <rect x="300" y="306" width="360" height="48" rx="24" style="fill:var(--node-bg)"/>
  <rect x="300" y="306" width="360" height="48" rx="24" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="1.5"/>
  <text x="480" y="336" text-anchor="middle" font-size="16" fill="currentColor">You: <tspan font-style="italic">\u201Cmake the chart a donut\u201D</tspan></text>
  <text x="480" y="22" text-anchor="middle" font-size="13" font-weight="600" letter-spacing="2" style="fill:var(--accent)">EACH ROUND TRIP TAKES SECONDS</text>
</svg>
\`\`\`

Ask your AI for a change, and see it on the slide you're on in seconds.

### Real diagrams and charts, as text

AI already writes **Graphviz**, **D2**, **ECharts** and **SVG** well, so they arrive in the same reply as the words, drawn in your deck's colours for dark and light, and changed by asking. The diagram before this slide is one: SVG inside the markdown. Headings, lists, tables, code, steps, images and YouTube links too: [see them all in the showcase \u2192](/showcase)

### Fewer tokens, nothing to fix

The AI writes only content: headings, text and a few comments. Slidetake does the rest: card sizes, the map, the camera moves. No CSS or layout code to generate, and none to repair.

### A few comments do the rest

Markdown has no word for "reveal one at a time" or "move the camera", so a handful of HTML comments say it. They stay invisible anywhere else markdown is read:

\`\`\`md
<!-- steps -->            \u2190 one press each
<!-- camera: full, on --> \u2190 move the camera
<!-- view: overview -->   \u2190 the map first
<!-- view: full -->       \u2190 a big image
\`\`\`

## \u{1F5FA}\uFE0F Present on a spatial canvas

<!-- view: overview -->

\`\`\`dot
digraph {
  rankdir=LR  nodesep=0.25  ranksep=0.7
  node [shape=box style=rounded margin="0.3,0.1" fontsize=16 fontname="IBM Plex Mono"]
  edge [arrowsize=0.7]
  talk [label="# Talk"]  why [label="## Why"]  how [label="## How"]
  demo [label="## Demo"]  detail [label="### Detail"]
  talk -> {why how demo}
  why -> detail
}
\`\`\`

Your headings are the hierarchy: \`#\` is the first card, \`##\` branches from it, \`###\` goes a level deeper. Slidetake lays it out as a map you move through: \u2192 walks the path, and **O** zooms out to the whole talk, as this slide just did. The diagram is Graphviz, written as text in the deck.

### The camera is part of the deck

<!-- camera: on, full, on -->

A comment in a slide moves you: corner, full screen, beside the words, or a split screen. Turn on **Camera** and watch this slide do it.

### Your colours

One line, \`accent: "#3b82f6"\`, gives a deck its own colour, shaded for dark and light. On your website, decks wear your site's palette.

\`brand:\` and \`logo:\` put your name and logo in the corner of every slide, so every frame of the video carries them.

## \u{1F534} Record slide by slide

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 190" font-family="IBM Plex Sans, system-ui, sans-serif">
  <!-- easy mode -->
  <rect x="14" y="10" width="452" height="170" rx="18" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent)" stroke-width="2"/>
  <rect x="38" y="52" width="92" height="68" rx="9" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>
  <path d="M38 70 H130" style="stroke:var(--accent)" stroke-width="2.5"/>
  <circle cx="48" cy="61" r="2.2" style="fill:var(--accent)"/><circle cx="57" cy="61" r="2.2" style="fill:var(--accent)"/>
  <circle cx="84" cy="95" r="10" fill="#ef4444"/>
  <text x="156" y="58" font-size="21" font-weight="700" style="fill:var(--accent)">Easy mode</text>
  <text x="156" y="88" font-size="15" fill="currentColor">Chrome or Edge, nothing to install</text>
  <text x="156" y="114" font-size="15" fill="currentColor">The deck records itself: slides and</text>
  <text x="156" y="136" font-size="15" fill="currentColor">camera in one frame: 16:9, or 9:16</text>

  <!-- pro mode -->
  <rect x="494" y="10" width="452" height="170" rx="18" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.5" stroke-width="1.5"/>
  <circle cx="564" cy="86" r="36" fill="none" style="stroke:var(--accent)" stroke-width="2.5"/>
  <circle cx="564" cy="86" r="10" fill="#ef4444"/>
  <text x="626" y="58" font-size="21" font-weight="700" style="fill:var(--accent)">Pro mode</text>
  <text x="626" y="88" font-size="15" fill="currentColor">OBS Studio, from any browser</text>
  <text x="626" y="114" font-size="15" fill="currentColor">The deck starts and stops it, and</text>
  <text x="626" y="136" font-size="15" fill="currentColor">drives every slide: you only talk</text>
</svg>
\`\`\`

Press **<span class="st-rec">\u25CF Record</span>** (R). **Every slide is a take:** stumbled? Press \u2190 and say it again. Every attempt is kept, and recording carries on.

### Shorts and Reels too

\`format: portrait\` makes the deck a 9:16 column and its video 1080\xD71920, recorded the same way, slide by slide, with the words above or below you. **New \u2192 Short** starts one.

## \u2702\uFE0F Edit by picking the best take

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 360" font-family="IBM Plex Sans, system-ui, sans-serif">
  <defs>
    <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill:var(--accent)"/>
    </marker>
  </defs>
  <text x="480" y="20" text-anchor="middle" font-size="13" font-weight="600" letter-spacing="2" style="fill:var(--accent)">EVERY ATTEMPT IS KEPT \xB7 PICK ONE PER SLIDE</text>

  <!-- slide headers -->
  <g font-size="15" font-weight="600" text-anchor="middle" fill="currentColor">
    <text x="140" y="56">Slide 1</text><text x="380" y="56">Slide 2</text><text x="620" y="56">Slide 3</text><text x="860" y="56">Slide 4</text>
  </g>

  <!-- takes: picked ones in the accent, the rest faded -->
  <g font-size="14" text-anchor="middle">
    <rect x="55" y="72" width="170" height="40" rx="10" style="fill:var(--node-bg)"/>
    <rect x="55" y="72" width="170" height="40" rx="10" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2"/>
    <text x="140" y="97" fill="currentColor">Take 1 \u2713</text>

    <rect x="295" y="72" width="170" height="40" rx="10" fill="none" style="stroke:var(--text-muted);stroke-opacity:.5" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="380" y="97" style="fill:var(--text-muted)">Take 1</text>
    <text x="380" y="134" font-size="13" font-weight="600" style="fill:var(--accent)">\u2190 again</text>
    <rect x="295" y="146" width="170" height="40" rx="10" style="fill:var(--node-bg)"/>
    <rect x="295" y="146" width="170" height="40" rx="10" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2"/>
    <text x="380" y="171" fill="currentColor">Take 2 \u2713</text>

    <rect x="535" y="72" width="170" height="40" rx="10" style="fill:var(--node-bg)"/>
    <rect x="535" y="72" width="170" height="40" rx="10" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2"/>
    <text x="620" y="97" fill="currentColor">Take 1 \u2713</text>

    <rect x="775" y="72" width="170" height="40" rx="10" fill="none" style="stroke:var(--text-muted);stroke-opacity:.5" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="860" y="97" style="fill:var(--text-muted)">Take 1</text>
    <text x="860" y="134" font-size="13" font-weight="600" style="fill:var(--accent)">\u2190 again</text>
    <rect x="775" y="146" width="170" height="40" rx="10" fill="none" style="stroke:var(--text-muted);stroke-opacity:.5" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="860" y="171" style="fill:var(--text-muted)">Take 2</text>
    <text x="860" y="208" font-size="13" font-weight="600" style="fill:var(--accent)">\u2190 again</text>
    <rect x="775" y="220" width="170" height="40" rx="10" style="fill:var(--node-bg)"/>
    <rect x="775" y="220" width="170" height="40" rx="10" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2"/>
    <text x="860" y="245" fill="currentColor">Take 3 \u2713</text>
  </g>

  <!-- the picked takes, joined -->
  <g fill="none" style="stroke:var(--accent)" stroke-width="2" marker-end="url(#head)">
    <path d="M140 114 V292"/><path d="M380 188 V292"/><path d="M620 114 V292"/><path d="M860 262 V292"/>
  </g>
  <rect x="20" y="298" width="920" height="44" rx="12" style="fill:var(--accent);fill-opacity:.18;stroke:var(--accent)" stroke-width="2"/>
  <g style="stroke:var(--accent)" stroke-width="2"><path d="M260 298 V342 M500 298 V342 M740 298 V342"/></g>
  <g font-size="14" fill="currentColor" font-family="IBM Plex Mono, monospace">
    <text x="36" y="325">0:00 Slide 1</text><text x="276" y="325">Slide 2</text><text x="516" y="325">Slide 3</text><text x="756" y="325">Slide 4</text>
  </g>
  <text x="924" y="325" text-anchor="end" font-size="13" font-weight="600" style="fill:var(--accent)">one video</text>
</svg>
\`\`\`

**Pick the best of each** in \u25CF Studio: one video in seconds, at YouTube's loudness, with **chapters** to paste. With OBS, an **[ffmpeg](https://ffmpeg.org)** cut.

## \u{1F310} Run it anywhere

Three places, one deck format: a markdown file.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 320" font-family="IBM Plex Sans, system-ui, sans-serif">
  <defs>
    <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill:var(--accent)"/>
    </marker>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>

  <!-- one file -->
  <rect x="40" y="104" width="230" height="112" rx="18" style="fill:var(--accent)" filter="url(#glow)" opacity=".1"/>
  <rect x="40" y="110" width="230" height="100" rx="18" style="fill:var(--node-bg)"/>
  <rect x="40" y="110" width="230" height="100" rx="18" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2.5"/>
  <path d="M74 136 h22 l10 10 v30 h-32z M96 136 v10 h10" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="122" y="160" font-size="21" font-weight="600" font-family="IBM Plex Mono, monospace" fill="currentColor">deck.md</text>
  <text x="122" y="184" font-size="13" style="fill:var(--text-muted)">one markdown file</text>

  <g fill="none" style="stroke:var(--accent)" stroke-width="2.5" marker-end="url(#head)">
    <path d="M272 150 C380 150 400 62 498 62"/>
    <path d="M272 160 H498"/>
    <path d="M272 170 C380 170 400 258 498 258"/>
  </g>

  <g>
    <rect x="504" y="20" width="430" height="84" rx="16" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="526" y="54" font-size="18" font-weight="600" fill="currentColor">slidetake.com</text>
    <text x="526" y="80" font-size="13" style="fill:var(--text-muted)">write, open from a link, record in \u25CF Studio, share</text>
    <rect x="504" y="118" width="430" height="84" rx="16" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="526" y="152" font-size="18" font-weight="600" fill="currentColor">Your computer \xB7 <tspan font-family="IBM Plex Mono, monospace" font-size="16">npx slidetake</tspan></text>
    <text x="526" y="178" font-size="13" style="fill:var(--text-muted)">the AI loop, local images, edits saved to the file</text>
    <rect x="504" y="216" width="430" height="84" rx="16" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="526" y="250" font-size="18" font-weight="600" fill="currentColor">Your website \xB7 <tspan font-family="IBM Plex Mono, monospace" font-size="16">slidetake.js</tspan></text>
    <text x="526" y="276" font-size="13" style="fill:var(--text-muted)">a viewer for your readers, in your site's colours</text>
  </g>
</svg>
\`\`\`

### slidetake.com: write, present, record, edit and share

Write a deck in the **\u270E Editor**, or view one straight from a link: a GitHub file, a gist or any markdown URL. Record it and cut the video in **\u25CF Studio**, in the same tab. **Share** a link with the deck inside it. Nothing to install.

### Your computer: all that, plus AI

The same app on your own files, offline:

\`\`\`sh
npx slidetake deck.md
\`\`\`

Images next to the markdown load as they are. Save in any editor and the deck reloads where you are; type in the browser and it saves to the file. That's [the AI loop](#ai): an agent writes \`deck.md\` while you watch it take shape.

### Your website: a viewer for your readers

\`slidetake.js\` puts decks inside your own pages, in your site's colours: a clean viewer, nothing else to set up. Record the same markdown here or with \`npx slidetake\`.

## <span class="st-heart" aria-hidden="true"></span> Open source

Open source, Apache 2.0: [github.com/slidetake/slidetake](https://github.com/slidetake/slidetake). Nothing to sign up for, and your decks stay yours: [Privacy](/privacy).

Next, every feature and what it saves you: **[Features \u2192](/features)**
`});var Qr,Xr=G(()=>{Qr=`---
title: Slidetake Docs
description: "How to use Slidetake, step by step: get started, write a deck, present it, record a video in the browser or with OBS, and share it."
brand: slidetake
pip: none
---

# ![](/favicon.svg) Slide<span class="st-take">take</span> Docs

Everything in order: **get started \u2192 write \u2192 present \u2192 record \u2192 edit \u2192 share**. Press \u2192 to walk it, \u2193 \u2191 to go into a step and back out, **O** for the map.

## 1\uFE0F\u20E3 Get started

Three places to use Slidetake, one deck format for all of them: a markdown file. And any AI can write the deck.

| Where | Best for |
|---|---|
| **slidetake.com** | writing in the Editor, viewing any deck from a link, sharing |
| **Your computer** | the same on your own files and images, offline, with an AI agent writing alongside |
| **Your website** | decks your readers view |

### On slidetake.com

Open a deck straight from a link: a GitHub file, a gist or any markdown URL. Or press **\u270E Editor** and type: the first keystroke makes it [your copy](#your-copy), kept in this browser.

| Link | Opens |
|---|---|
| \`/gh/owner/repo/path/deck.md\` | a GitHub file, default branch |
| \`/gh/owner/repo@branch/deck.md\` | another branch or tag |
| \`/gist/<id>\` | a gist's first markdown file |
| \`/?src=https://\u2026/deck.md\` | anything else |
| \`/new\` | a template: blank, talk, recording or short (9:16) |

### On your computer

Keep the deck and its images together in a folder, and run one command there:

\`\`\`sh
npx slidetake deck.md
\`\`\`

It opens on \`http://localhost:4300\` with the files next to the deck served beside it, so \`![](diagram.png)\` just works. Save the file in any editor and the deck reloads where you are; type in the browser's editor and it saves to the file. Nothing leaves your machine. Needs Node 20 or later.

\`npx slidetake\` in a folder opens its \`index.md\`, \`deck.md\`, \`slides.md\` or \`README.md\`. \`--open\` opens the browser; \`--port 5000\` picks the port.

### On your website

\`slidetake.js\` turns a deck on any page into a Slidetake deck. Describe the deck, then load the script:

\`\`\`html
<script>
window.SLIDETAKE = {
  markdown: "# My deck\\n\\n## A section",
  settings: {title: "My deck"},
  base: location.href,         // for images
  trail: [{label: "My site", url: "/"}],
  themeKey: "my-theme",        // your light/dark key
  colors: {accent: "#2563eb"}  // your colours
};
<\/script>
<script src="https://cdn.jsdelivr.net/npm/slidetake/dist/slidetake.js"><\/script>
\`\`\`

A viewer for your readers. To record, open the deck's markdown here or with \`npx slidetake\`, or add \`recording: true\` on a page only you see, such as your site's local preview. The hugo-continuum theme writes this for pages with \`engine: slidetake\`, with recording under \`hugo server\`.

### With AI

Any AI can write a deck: point it at [slidetake.com/llms.txt](/llms.txt) and say what the talk is about.

- **An agent** (Claude Code and the like): *"Write a Slidetake deck about X in talk/deck.md, following slidetake.com/llms.txt"*, then \`npx slidetake talk/deck.md\`. The deck reloads as it edits.
- **A chat**: ask for one markdown block, then paste it into **\u270E Editor** here.
- **Images**: beside the file for an agent; full URLs in a chat.

### A prompt to copy

Paste this into any AI and change the first line:

\`\`\`text
Write a Slidetake deck about <topic>, a 10-minute talk.
Follow https://slidetake.com/llms.txt.
A # title card, then 4\u20136 ## sections of 1\u20133 ### cards.
<!-- steps --> before lists; a \`\`\`dot or \`\`\`d2 diagram
where a picture helps. Reply with one markdown block.
\`\`\`

## 2\uFE0F\u20E3 Write a deck

A deck is an ordinary markdown file. **Every heading becomes a card**, and a heading branches off the nearest shallower heading above it.

\`\`\`md
# Product          \u2190 the first card
Intro text.

## Pricing         \u2190 from Product
### Enterprise     \u2190 from Pricing
## Roadmap {#plan} \u2190 from Product, id "plan"

See the [roadmap](#plan).
\`\`\`

### Cards

- Text before the first heading becomes a card of its own.
- Headings inside fenced code blocks are ignored.
- A card's id is its heading slugified (\`## Moving around\` \u2192 \`moving-around\`), or set one with \`{#id}\` at the end of the heading.
- A link to \`#id\` flies to that card.
- Cards widen for wide tables, columns, diagrams and embeds; anything wider still is scaled to fit.

### What a card can hold

Plain markdown, and the layout follows from what's on the card. [See every one in the showcase \u2192](/showcase)

| Write | Get |
|---|---|
| \`<!-- steps -->\` | what follows, one press each, to the end of the card or a \`<!-- steps: off -->\` |
| \` \`\`\`dot \`, \` \`\`\`d2 \` | a Graphviz or D2 diagram, in the deck's colours |
| \` \`\`\`echarts \` with JSON options | a chart, in the deck's colours |
| \` \`\`\`svg \` | an SVG drawing: \`currentColor\` and \`var(--text)\`, \`var(--accent)\` follow dark and light |
| a YouTube link alone on a line | the video: the next press plays it |
| \`<!-- view: full -->\` | a frame for a big image or a chart: 16:9, or 9:16 in a portrait deck |

The first and last cards animate in on their own. Charts grow in when you arrive going forward; going back, they're already drawn, so a take that steps back stays clean.

### Images

The layout follows from where the images are. The alt text is the caption.

| Write | Get |
|---|---|
| an image alone | an image card, laid out by its shape: phone, landscape or 16:9 |
| an image and text | a split card, the image on the side written first |
| a list of images, diagrams or charts | a gallery; after \`<!-- steps -->\`, a carousel |
| images in one paragraph | a grid, up to four a row |
| \`![](drawing.svg)\` | an SVG image, as drawn |

### Deck settings

An optional block at the top of the file:

\`\`\`yaml
---
title: My talk        \u2190 page and video title
duration: 10m         \u2190 for the timer
accent: "#3b82f6"     \u2190 the deck's colour
mode: light           \u2190 open in light mode
format: portrait      \u2190 a 9:16 deck, for Shorts and Reels
brand: example.com    \u2190 top-right corner text
brand_style: chip     \u2190 the brand as a pill
logo: https://\u2026/l.png \u2190 image beside it
base: https://\u2026/deck/ \u2190 where images live
site: https://\u2026/      \u2190 where /images live
---
\`\`\`

\`accent\` is one colour; Slidetake makes it bright for dark mode and deep enough to read on white for light mode, and uses it for text accents, lines, charts and diagrams. Camera and recording settings are in [step 4](#4-record-a-video).

### Decks from elsewhere

**reveal.js** decks open as they are: \`---\` starts a slide and \`--\` a vertical one beneath it. Fragments (\`fade-up\`, \`grow\`, \u2026), \`r-stack\`, \`<!-- .element: \u2026 -->\`, \`<section>\` slides, \`data-autoslide\`, \`data-gsap\` entrances and \`title-scramble\` all work.

**Older \`+++\` decks**, with \`id\`, \`parent\`, \`x\`, \`y\` frontmatter, still load.

## 3\uFE0F\u20E3 Present

Click a card to fly to it. Drag to pan; scroll or pinch to zoom. On a touch screen, the bottom bar adds \u2190 \u2192 buttons.

| Key | Does |
|---|---|
| \u2192 \u2190 Space | next / previous step, in document order (PgDn and PgUp too: what clickers send) |
| Home End | first / last slide |
| \u2193 \u2191 | first child / parent |
| O | the whole map; **O** again or Esc goes back |
| F | fullscreen; **F** again or Esc leaves |
| K, / or ? | these keys; again closes them |
| 1 2 3 4 | focus, path, radial, tree |
| + \u2212 | bigger / smaller slides (remembered; = works for +) |
| E \xB7 L | editor \xB7 light / dark |
| C \xB7 V | camera \xB7 camera layouts |
| R \xB7 S | record \xB7 Studio |
| P \xB7 D | in Studio: preview \xB7 download |

### Layouts

**Focus** doesn't travel at all: the next slide fades in where the last one was.

**Path**, the default, is made for presenting and video: a staircase in presenting order. Each section is a row, and the next one starts just below where the last ended, so every move is a short step right or down.

**Radial** rings out from the first card, and **tree** is a top-down chart.

The layout you pick is remembered in this browser, for every deck.

### On screen

Text keeps one size within a section and only changes when the section does; charts and diagrams are fitted on their own.

\`<!-- view: overview -->\` on a slide pulls back to the whole map for a beat before flying in: a good start to a chapter.

### Progress and timer

In fullscreen the cursor and controls hide after two seconds without the mouse moving, and a thin bar along the bottom fills with every press.

With \`duration: 10m\` (or \`90s\`, \`1h\`, \`12:30\`), a lighter layer of the same colour grows behind it with the clock: if it shows past the solid fill, you're behind; if it reaches the end, the bar pulses. The timer is for you, so recordings show progress only, unless the deck says \`timer: always\`. \`progress: off\` hides the bar.

## 4\uFE0F\u20E3 Record a video

Two modes, both slide by slide, so there's no timeline to edit afterwards. **\u25CF Record** in the bottom bar (or **R**) starts a take: the first time it opens Setup, then it records the slides without a take. **\u25CF Studio** (or **S**) is for picking takes and redoing slides; its \u2699 Setup switches between the modes.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 330" font-family="IBM Plex Sans, system-ui, sans-serif">
  <defs>
    <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" style="fill:var(--accent)"/>
    </marker>
  </defs>

  <!-- lanes -->
  <rect x="10" y="20" width="940" height="140" rx="18" style="fill:var(--accent);fill-opacity:.04"/>
  <rect x="10" y="176" width="940" height="140" rx="18" style="fill:var(--accent);fill-opacity:.04"/>
  <text x="30" y="80" font-size="20" font-weight="700" style="fill:var(--accent)">Easy mode</text>
  <text x="30" y="104" font-size="13" style="fill:var(--text-muted)">needs nothing</text>
  <text x="30" y="122" font-size="13" style="fill:var(--text-muted)">to install</text>
  <text x="30" y="236" font-size="20" font-weight="700" style="fill:var(--accent)">Pro mode</text>
  <text x="30" y="260" font-size="13" style="fill:var(--text-muted)">needs OBS</text>
  <text x="30" y="278" font-size="13" style="fill:var(--text-muted)">and ffmpeg</text>

  <g font-size="15" font-weight="600" text-anchor="middle" fill="currentColor">
    <rect x="180" y="50" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="255" y="84">Chrome or Edge</text>
    <rect x="374" y="50" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="449" y="84">records the</text><text x="449" y="104">deck's frame</text>
    <rect x="568" y="50" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="643" y="84">takes kept</text><text x="643" y="104">in the browser</text>
    <rect x="762" y="50" width="150" height="80" rx="14" style="fill:var(--node-bg)"/>
    <rect x="762" y="50" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2"/>
    <text x="837" y="84">\u2193 Download</text><text x="837" y="104" font-weight="400" font-size="13" style="fill:var(--text-muted)">one MP4</text>

    <rect x="180" y="206" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="255" y="240">any browser</text><text x="255" y="260" font-weight="400" font-size="13" style="fill:var(--text-muted)">Safari, Firefox too</text>
    <rect x="374" y="206" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="449" y="240">OBS records</text><text x="449" y="260">the screen</text>
    <rect x="568" y="206" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.06;stroke:var(--accent);stroke-opacity:.45" stroke-width="1.5"/>
    <text x="643" y="240">one recording,</text><text x="643" y="260">every take in it</text>
    <rect x="762" y="206" width="150" height="80" rx="14" style="fill:var(--node-bg)"/>
    <rect x="762" y="206" width="150" height="80" rx="14" style="fill:var(--accent);fill-opacity:.12;stroke:var(--accent)" stroke-width="2"/>
    <text x="837" y="240">\u29C9 ffmpeg</text><text x="837" y="260" font-weight="400" font-size="13" style="fill:var(--text-muted)">the frame-exact cut</text>
  </g>
  <g fill="none" style="stroke:var(--accent)" stroke-width="2.5" marker-end="url(#head)">
    <path d="M332 90 H372"/><path d="M526 90 H566"/><path d="M720 90 H760"/>
    <path d="M332 246 H372"/><path d="M526 246 H566"/><path d="M720 246 H760"/>
  </g>
</svg>
\`\`\`

### Which mode?

| | Easy mode: in the browser | Pro mode: with OBS |
|---|---|---|
| Install | nothing | [OBS Studio](https://obsproject.com) and [ffmpeg](https://ffmpeg.org), both free; a virtual display if your screen isn't 16:9 |
| Browser | Chrome, Edge or another Chromium browser | any: Safari and Firefox too |
| Screen | any shape: the deck is recorded in a 16:9 frame (9:16 for a [Short](#shorts-and-reels)) | a 16:9 screen, physical or virtual |
| Quality | 1080p, or 720p on a smaller screen | whatever OBS records |
| Final video | **Download** joins the picked takes, in the browser | an ffmpeg command |

### Easy mode: record in the browser

1. **\u25CF Record** (R) the first time opens **\u2699 Setup**: pick your camera (or **No camera**, and **Mirror** if you want it flipped; off, it shows you as others see you) and microphone. Recording turns the camera on and off by itself.
2. **\u25CF Record** again, and share **this tab** when the browser asks. Only the frame is recorded (16:9, or 9:16 for a Short): slides and camera.
3. Next time, **\u25CF Record** carries on with the slides that have no take yet. When every slide has one, it records from the slide on screen to the end.

For 1080p the frame needs 1920\xD71080 real pixels (a Retina laptop has them); 1280\xD7720 makes 720p. Smaller: use pro mode.

### Retake slides later

Tick slides (shift-click for a range): **\u25CF Record** records just those, then stops.

A take starts with the move in from the slide before it. So when you edit a slide, its takes and the next slide's are marked *outdated*: kept, but not picked until you record them again.

To drop a slide, delete it, then record the slide after it again.

### Takes stay in this browser

Each take is a file in this browser's private storage until you purge it, in \u2699 Setup \u2192 Files:

| Purge | Removes |
|---|---|
| **Unused takes** | takes the video doesn't use |
| **All takes** | this deck's takes |
| **Every deck's takes\u2026** | everything Slidetake keeps here; it says how much first |

### Pro mode: set up OBS

1. In OBS: Tools \u2192 WebSocket Server Settings, turn it on.
2. In Studio's **\u2699 Setup**, turn on **Pro** (top right), enter OBS's host, port and password, and **Connect**. Tick *Remember*.
3. Present on a 16:9 screen, physical or virtual (say 1920\xD71080). Setup checks it.

Studio opens in the mode you used last: its title says **Slidetake Studio Pro** in pro mode, with the size (\`1080p\`) beside it, and the camera and microphone a take uses on the right.

### A 16:9 screen

YouTube is 16:9. If your screen isn't (a MacBook is 16:10, an ultrawide 21:9), add a virtual 1920\xD71080 display, present there with **F**, and point OBS at it:

| System | Virtual display |
|---|---|
| macOS | [BetterDisplay](https://github.com/waydabber/BetterDisplay) |
| Windows | [Virtual Display Driver](https://github.com/VirtualDrivers/Virtual-Display-Driver) |
| Linux | \`xrandr\` (X11), or a dummy HDMI plug |

A dummy HDMI plug works on any system.

### Connect from the address

\`?obs=localhost:4455\` (or \`?obs=localhost:4455:password\`) in the address connects to OBS as the page opens. OBS runs on the same computer as the deck.

### Add your camera

**C** (or **Camera**) turns your webcam on in its box while presenting. A recording doesn't depend on it: it turns on the camera chosen for the deck (or none) by itself. It stays as you left it when the page reloads. While it's off, the deck's camera settings are ignored, so readers get slides using the whole screen, except a slide with the camera behind it, which shows its layout over an empty frame.

\`\`\`yaml
---
pip: bottom-right      \u2190 corner, or none
pip_size: 24%          \u2190 box width
pip_shape: rect        \u2190 or circle
pip_mirror: yes        \u2190 mirror the webcam (until you choose in Setup)
camera: 24%, full, off \u2190 what V cycles
---
\`\`\`

Slides are always placed clear of the brand and the camera box.

### Move the camera per slide

A comment in a slide changes the camera from that slide on:

\`\`\`md
## Intro
<!-- camera: full -->     \u2190 fills the screen

## Pricing
<!-- camera: 18% flip --> \u2190 small, other side
\`\`\`

Words you can combine: \`on\`, \`off\`, \`full\`, \`behind\` (next), a size like \`30%\`, a corner, \`flip\`, \`circle\` / \`rect\`, \`mirror\` / \`unmirror\`. List them with commas to step through them on one slide: \`full, on\` opens on you, and the next \u2192 shrinks the camera to its corner and shows the slide.

**V** steps through the deck's \`camera:\` list by hand.

### Talk beside your slides

\`behind\` fills the frame with you and puts the slide's words beside you, on a half see-through card:

\`\`\`md
<!-- camera: behind -->               \u2190 words on the left
<!-- camera: behind right -->         \u2190 or right, top, bottom
<!-- camera: behind solid -->         \u2190 split screen: you centred on the other side
<!-- camera: behind bottom clear -->  \u2190 no card, for a plain wall
\`\`\`

It stays on its slide; \`pip: behind\` makes it the whole deck's. Between a split slide and a plain card the move is a cross-fade where the cards stand, not a flight across the map. With the camera off, the slide still shows this way, over an empty frame.

### Shorts and Reels

\`format: portrait\` in the top block makes the deck a 9:16 column, and its video 1080\xD71920 (or 720\xD71280):

- \`top\` and \`bottom\` are halves, above or below you; \`left\` and \`right\` go below you
- a slide's words are larger, to read on a phone
- easy mode records the column from the middle of the screen: a Retina laptop makes 720p, a 16" one or a screen on its side 1080p

Start from the [Short template](https://slidetake.com/new?template=short): **New** \u2192 **Short**.

### Take by take

**\u25CF Record** (R) counts down and starts. From then on \u2192 drives everything: slides, reveals and camera moves (a Bluetooth clicker works).

- **\u2190** takes the slide again. The deck goes back and replays the slide's entry, so whichever take you pick joins smoothly
- **B** (or **.**, a clicker's blank-screen key) pauses and resumes
- one press past the last step ends the take; **Esc** ends it early

## 5\uFE0F\u20E3 Edit the video

When the take ends you're back in **Slidetake Studio**, the same in both modes:

- the player, with **\u25CF Record** and **\u25B6 Preview** under it
- every slide and its takes on the right: click one to preview it
- **\u29C9 Chapters** copies the chapters (\`0:00 Intro\`, one per section) for the YouTube description. YouTube needs at least three, each 10 seconds or more

### Download (easy mode)

**\u25B6 Preview** plays the picked takes back to back.

**\u2193 Download** joins them into one MP4 in seconds, without re-encoding the video, in a folder you pick once: \`deck 2026-10-30 20-04-49.mp4\`. Pressed again with nothing changed, it says where the video already is.

### The ffmpeg cut (pro mode)

Studio shows the deck's latest OBS recording; recording again replaces it here (the old file stays in your OBS folder).

Previews come from the OBS file: open it once, or, in Chrome and Edge, pick your OBS folder and later recordings load by themselves.

**\u29C9 ffmpeg** copies a command that cuts the picked takes, frame-exact. \u2699 Setup \u2192 Video sets how it encodes.

### Sound

In \u2699 Setup \u2192 Microphone:

| Setting | Does |
|---|---|
| **Voice** (default) | Chrome's noise suppression: fans, hum, steady noise |
| **Raw** | the mic as it is: for a good mic in a quiet room |
| **\u{1F50A} Volume boost** (on) | raises the voice to YouTube's \u221214 LUFS, never past a \u22121.5 dB peak |
| **Peak limiter** (off) | catches the few loud peaks, so the boost goes all the way |

YouTube turns loud videos down but not quiet ones up, so without the boost your voice sounds quiet. With OBS, Volume boost adds \`loudnorm\` to the ffmpeg command.

## 6\uFE0F\u20E3 Share and keep

Every deck you open is **read-only**: Slidetake's own decks, templates, files on the web and shared links. Viewing one never changes anything.

### Your copy

**Type in a deck**, and it becomes your copy, at \`/edit\`. It lives in this browser, remembers where it came from, and is there whenever you come back: **Your copy \u2192** in the editor takes you to it.

- There's one copy at a time; the editor bar says whose it is, and marks **edited** while it has changes you haven't saved or shared.
- **Reset to original** throws your edits away.
- Starting a new copy asks first if the old one has edits you haven't kept.

### Save and share

**Save** downloads the markdown. **Share** copies a link: the short link while your copy still matches an online original, otherwise a \`/share#deflate:\u2026\` link with the whole deck compressed inside it. That part of a link never reaches a server. **Open** loads a markdown file from your computer into your copy, and **\u21E3 Load** a deck from a link: a GitHub file, a gist or any markdown URL.

### Address options

| Option | Does |
|---|---|
| \`?edit=1\` | opens the editor |
| \`?layout=focus\` (path, radial, tree) | picks the layout; path is the default |
| \`?mode=light\` | light theme |
| \`?duration=10m\` | talk length for the timer |
| \`#card-id\` | opens at a card |

## \u{1F512} Your data

No accounts, and no decks kept. Recording stays on your device.

Next, everything that leaves your browser, and where it goes: **[Privacy \u2192](/privacy)**
`});var en,Zr=G(()=>{en=`---
title: Slidetake Features
description: "Every Slidetake feature, one line each: recording in the browser or with OBS, a map instead of a stack, the camera in the deck, plain markdown, your colours, and where it runs."
brand: slidetake
pip: none
---

# ![](/favicon.svg) Slide<span class="st-take">take</span> Features

The complete list, one line each. Press \u2192 to walk it, **O** for the map.

## \u270D\uFE0F Write in markdown, with AI

| Feature | Advantage |
|---|---|
| **The AI loop** (\`npx slidetake\`) | an agent writes the file; the slide you're on redraws on save |
| **One file** | any editor, versioned in git, reviewed like code |
| **Steps, diagrams, charts** | Graphviz, D2, SVG and ECharts as text |
| **Image cards** | laid out by shape: beside text, across the card, galleries, carousels, grids |
| **Full-screen cards** (\`view: full\`) | a frame for a big image or a chart: 16:9, or 9:16 in a Short |
| **YouTube** | plays on the next press, pauses when you leave |
| **reveal.js and \`+++\` decks** | open as they are |

## \u{1F5FA}\uFE0F Present on a spatial canvas

| Feature | Advantage |
|---|---|
| **Four layouts** | focus, path (the default), radial, tree |
| **The map** (O) | the whole talk at a glance, and back |
| **Map moments** (\`view: overview\`) | open a chapter on the big picture |
| **Steady text** | one size per section, so slides don't jump |
| **Short flights** | camera moves made to read well on video |
| **Charts that grow in** | drawn as you arrive going forward; going back they're already there, so a retake stays clean |
| **Progress and timer** | a bar that fills, and a clock that tells you if you're behind |

### The camera is part of the deck

| Feature | Advantage |
|---|---|
| **Webcam in its box** | you and the slides in one recording, no compositing |
| **Camera per slide** | corner, size, side, circle, full screen, behind the slide or off |
| **Words around you** (\`behind left\`\u2026) | the slide's content beside, above or below you, on a see-through card, a solid one (split screen) or none |
| **Smooth moves** | the camera glides between corner, full frame and split screen, swaps sides with the words, and cross-fades between a split screen and a card |
| **Steps on one slide** | open on you, then reveal the slide |
| **Camera layouts** (V) | try them live, without editing the deck |
| **Off until you turn it on** | the slides get the whole screen; a slide built around you shows an empty frame; a reload remembers it |
| **Mirror** (Setup) | off by default, so writing behind you reads the right way |

### Your colours

| Feature | Advantage |
|---|---|
| **Dark and light** (L) | follows the reader, or your site |
| **\`accent:\`** | one colour, shaded for both modes, charts and diagrams included |
| **\`brand:\` and \`logo:\`** | your name on every frame |
| **Site colours** | embedded decks wear your site's palette and header |

## \u{1F534} Record slide by slide

Two modes, the same takes: **easy** in the browser, **pro** with OBS.

| Feature | Advantage |
|---|---|
| **Takes per slide** (\u2190) | every attempt kept; recording never stops |
| **Pause and resume** (B) | step away without a gap to cut |
| **Clicker support** | any Bluetooth presenter remote moves the deck |
| **Shorts and Reels** (\`format: portrait\`) | a 9:16 deck and video, the words above or below you; New \u2192 Short starts one |

### Easy mode: in the browser

For Chrome, Edge or another Chromium browser, on a screen with enough pixels: 1920\xD71080 for 1080p (a Retina laptop has them), 1280\xD7720 for 720p.

| Feature | Advantage |
|---|---|
| **Nothing to install** | the deck records itself in a 16:9 frame (9:16 for a Short), on a screen of any shape |
| **Retake any slide later** | tick slides and record just those; an edited slide's takes are marked outdated |
| **Takes kept in the browser** | every take, from every recording, until you purge them |

### Pro mode: with OBS

For Safari, Firefox or any browser, a screen too small for easy mode, or whatever OBS can record.

| Feature | Advantage |
|---|---|
| **[OBS](https://obsproject.com), driven by the deck** | it starts and stops for you; you only talk |
| **16:9 check** | Setup warns before a video with bars; use a 16:9 screen, physical or virtual |

## \u2702\uFE0F Edit by picking the best take

| Feature | Advantage |
|---|---|
| **Slidetake Studio** | every slide's takes, Preview and Chapters, the same in both modes |
| **Download** (easy mode) | the picked takes joined into one MP4 in seconds |
| **Frame-exact [ffmpeg](https://ffmpeg.org) cut** (pro mode) | one command, no video editor |
| **Volume boost** | your voice at YouTube's loudness (\u221214 LUFS), never clipped |
| **YouTube chapters** | one click copies them, one per section |

## \u{1F310} Run it anywhere

| Where | Also gives you |
|---|---|
| **slidetake.com** | share links that carry the whole deck; your copy of any deck, kept in this browser |
| **Your computer** | relative images, reload on save, browser edits saved to the file |
| **Your website** | a clean viewer in your site's colours; the hugo-continuum theme with one frontmatter key |

## \u{1F512} Private and open

| Feature | Advantage |
|---|---|
| **No accounts, no stored decks** | nothing to sign up for or lose ([privacy](/privacy)) |
| **Decks inside links** | the deck stays in the \`#\` part, never sent to a server |
| **Analytics you can turn off** | one button on slidetake.com |
| **Open source, Apache 2.0** | read it, host it, change it: [github.com/slidetake/slidetake](https://github.com/slidetake/slidetake) |

Next, see them working: **[Showcase \u2192](/showcase)**
`});var an,tn=G(()=>{an=`---
title: Slidetake Privacy
brand: slidetake
pip: none
---

# ![](/favicon.svg) Slide<span class="st-take">take</span> Privacy

Slidetake has no accounts and keeps no decks. This page lists everything that leaves your browser, and where it goes.

*Last updated 31 October 2026.*

## \u{1F4CA} What slidetake.com collects

slidetake.com counts visits with **Google Analytics**: the page's address, your browser and screen, and roughly where you are. Google Analytics sets its own cookies (\`_ga\`) to tell visits apart.

The address it records leaves out the part after \`#\` and \`?obs=\`, so neither a deck carried in a link nor an OBS password reaches it.

**You can turn it off:** the **Privacy & analytics** button in the header (the pulse icon) \u2192 *Turn analytics off*. Nothing more is sent from that browser, the \`_ga\` cookies are removed, and the tag isn't loaded on later visits. Cloudflare, which serves the site, still sees each request the way any web server does.

> That is the only analytics. A copy of Slidetake you host yourself, the embed on your own site, and \`npx slidetake\` send none.

## \u{1F3A5} Recording stays on your device

Your camera, your microphone and the tab you share are read only by your browser, and only while you record. Nothing is uploaded:

- **Easy mode** saves each take in this browser's private storage. **\u2193 Download** writes the video to a folder you pick.
- **Pro mode** has OBS record on your computer; Slidetake only tells it when to start and stop.

## \u{1F4BE} What stays in your browser

Kept in this browser's storage on your device, and never sent anywhere:

| What | Why |
|---|---|
| Your copy of a deck | so it's there when you come back |
| Theme, layout, slide size, editor width | your preferences |
| Recorded takes | to cut the video, until you purge them |
| Camera, mic and sound choices | your recording setup |
| Folders you pick for videos | so Studio needn't ask again |
| OBS host, port and password | only with *Remember*, as plain text |
| Your analytics choice | so *off* stays off |

Clearing this site's data in your browser removes all of it, recorded takes included.

## \u{1F310} Services a deck can reach

Opening Slidetake, or a deck that uses these, loads files from other services. Each sees your IP address, as with any web request.

| Service | When |
|---|---|
| Google Fonts | every page, for the typefaces |
| cdnjs, jsDelivr | every page (animation, markdown), and for diagrams, charts, recording and OBS |
| esm.sh | a deck with a D2 diagram |
| GitHub | opening a GitHub file or gist |
| YouTube (youtube-nocookie.com) | a deck with a YouTube link; YouTube's own cookies only once you play it |
| The deck's own address | opening a deck from a link, and its images |

OBS is reached only on the address you give it, normally your own computer.

## \u{1F517} Decks in links

A shared link carries the whole deck after \`#\`. Browsers never send that part of an address to a server, so the deck travels from you to whoever opens the link without passing through slidetake.com.

## \u{1F4BB} On your computer

\`npx slidetake\` runs on your machine, serves only the deck's folder, and listens only on \`localhost\`. It sends nothing to slidetake.com or anyone else. The deck's own diagrams, charts and fonts load from the services above as on the web.

## \u2709\uFE0F Questions

Open an issue on [github.com/slidetake/slidetake](https://github.com/slidetake/slidetake/issues). Slidetake is open source, so everything above can be checked in its code.
`});var rn,on=G(()=>{rn=`---
title: My deck
---

# My deck

Start typing: this becomes your own copy, and the template stays as it is.

## A section

Every heading is a card. \`##\` sections branch from the first card.

### A detail

\`###\` branches from the section above it.
`});var sn,nn=G(()=>{sn=`---
title: Talk title
duration: 15m
---

# Talk title

One line on what the audience will take away.

## \u{1F9ED} Why this matters

- The problem, in the audience's words
- Why now
- What changes if it's solved

## \u{1F4A1} The idea

The one thing to remember, stated plainly.

### How it works

Three steps, a diagram or a table.

### An example

Something concrete the audience will recognise.

## \u2696\uFE0F Trade-offs

- What it costs
- When not to use it

## \u2705 Summary

- Point one
- Point two
- Point three

## \u{1F64F} Thank you

Where to find you, and the link to these slides.
`});var cn,ln=G(()=>{cn=`---
title: Video title
duration: 10m
pip: bottom-right
pip_size: 24%
camera: 24%, 40%, full, off
---

<!-- camera: full, on -->

# Video title

Opens full screen on you; the next press shows this slide with you in the corner.

## \u{1F4CC} Disclaimer

<!-- camera: off, on -->

Opens without the camera, so the text has the whole screen; the next press brings you back.

## \u{1F9ED} Contents

- Part one
- Part two
- Part three

## \u{1F539} Part one

<!-- view: overview -->

The overview comment pulls back to the whole map first: a good start to a chapter.

### A detail

Slides you talk over in the corner.

## \u{1F538} Part two

### A detail

## \u{1F537} Part three

### A detail

## \u{1F64F} Thanks for watching

<!-- camera: on, full, on, off -->

Ends on you full screen, then back to the slide, then without the camera.
`});var hn,dn=G(()=>{hn=`---
title: My Short
description: "A portrait (9:16) deck for Shorts and Reels: one markdown file, the camera behind the words."
format: portrait
pip: behind bottom
---

# A hook in one line

What the viewer gets, in under a minute.

## The first point

<!-- camera: behind top -->

The words above, you below. Keep each slide to a line or two.

## Split screen

<!-- camera: behind top solid, behind bottom solid -->

\`solid\` hides the camera behind the card. Press \u2192 and you swap places.

## A number that matters

<!-- camera: behind top -->

\`\`\`echarts
{
  "xAxis": {"type": "category", "data": ["Mon", "Tue", "Wed", "Thu", "Fri"]},
  "yAxis": {"type": "value"},
  "series": [{"type": "bar", "data": [3, 5, 4, 8, 11]}]
}
\`\`\`

## Just you

<!-- camera: full -->

Say the key line straight to the camera.

## Follow for more

<!-- camera: on -->

The camera back in its corner, the slide full size.
`});var un,pn=G(()=>{un=`---
title: Slidetake Showcase
description: "Everything a Slidetake deck can hold, working on screen: text, steps, code, Graphviz, D2, SVG, charts, image layouts, YouTube, the camera and the map."
brand: slidetake
duration: 10m
---

# ![](https://slidetake.com/favicon.svg) Slide<span class="st-take">take</span> Showcase

Everything a deck can hold, written in plain markdown and working on screen. Open **\u270E Editor** to see the source of any card. Press \u2192 to walk it, **O** for the map.

## \u270D\uFE0F Text

Paragraphs, **bold**, *italic*, \`code\`, [links](https://slidetake.com) and lists, as markdown writes them.

- One point
- Another point
  - A detail under it

### Steps

Put \`<!-- steps -->\` before a list and it reveals one item per press. Everything after it on the card steps too, so a closing line waits its turn:

<!-- steps -->
- First, the problem
- Then, the idea
- Finally, the result

> The conclusion comes last. \`<!-- steps: off -->\` ends the steps early.

### Quotes and tables

> A quote stands out from the text around it.

| Plan | Price | Users |
|---|---:|---:|
| Starter | \u20B90 | 1 |
| Team | \u20B9499 | 10 |

### Code

\`\`\`python
def take(slide):
    return slide.best_attempt()
\`\`\`

### Links between cards

\`{#charts}\` at the end of a heading gives its card an id, and a link to \`#charts\` flies there: [see the charts](#charts).

## \u{1F4D0} Diagrams

Write the diagram in a fenced block named after its language.

### Graphviz

\`\`\`dot
digraph {
  rankdir=LR
  node [shape=box style=rounded]
  Markdown -> Deck -> Takes -> Video
}
\`\`\`

### D2

\`\`\`d2
direction: right
write: Write {shape: rectangle}
present: Present
record: Record
write -> present -> record: one session
\`\`\`

### SVG

Drawn inline, so \`currentColor\` and \`var(--accent)\` follow the deck's colours. Press **L** and watch it switch.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130">
  <rect x="10" y="10" width="90" height="80" rx="10" style="fill:var(--accent)"/>
  <rect x="115" y="10" width="90" height="80" rx="10" style="fill:var(--accent);opacity:.6"/>
  <rect x="220" y="10" width="90" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="160" y="120" text-anchor="middle" font-size="14" fill="currentColor">accent, faded, outlined</text>
</svg>
\`\`\`

### One at a time

Diagrams or charts in a row after \`<!-- steps -->\` become a carousel: one per press.

<!-- steps -->

\`\`\`dot
digraph { rankdir=LR; node [shape=box style=rounded]; Idea -> Markdown -> Deck -> Takes }
\`\`\`

\`\`\`dot
digraph { rankdir=LR; node [shape=box style=rounded]; Takes -> Studio -> Video -> YouTube }
\`\`\`

## \u{1F4CA} Charts {#charts}

ECharts, as a fenced \`echarts\` block of JSON options. They grow in as you arrive; go back and they're already drawn.

### A bar chart

\`\`\`echarts
{
  "xAxis": {"type": "category", "data": ["Jan", "Feb", "Mar", "Apr", "May"]},
  "yAxis": {"type": "value"},
  "series": [{"type": "bar", "data": [12, 19, 15, 24, 30]}]
}
\`\`\`

### A donut

\`\`\`echarts
{
  "series": [{"type": "pie", "radius": ["45%", "70%"],
    "data": [{"name": "Equity", "value": 85}, {"name": "Debt", "value": 5}, {"name": "Gold", "value": 10}]}]
}
\`\`\`

## \u{1F5BC}\uFE0F Images

The layout comes from what's on the slide; the alt text is the caption.

### One image

![An image alone fills the card edge to edge](https://slidetake.com/og.jpg)

### A tall image

![A square or tall image sits beside its heading](https://slidetake.com/apple-touch-icon.png)

### Image and text

![Written first, so it sits on the left](https://slidetake.com/og.jpg)

An image beside text makes a split card. Write the text first and the image moves to the right.

### A gallery

A list of images is a gallery. With \`<!-- steps -->\` it becomes a carousel: one image at a time, the next on each press.

<!-- steps -->
- ![The logo](https://slidetake.com/favicon.svg)
- ![The home-screen icon](https://slidetake.com/apple-touch-icon.png)
- ![The link preview](https://slidetake.com/og.jpg)

### A grid

Several images in one paragraph sit side by side, up to four a row:

![Logo](https://slidetake.com/favicon.svg) ![Icon](https://slidetake.com/apple-touch-icon.png) ![Preview](https://slidetake.com/og.jpg)

### Full screen

<!-- view: full -->

![A card tagged view: full is a frame for a big image or a chart: 16:9, or 9:16 in a Short](https://slidetake.com/og.jpg)

## \u25B6\uFE0F YouTube

https://www.youtube.com/watch?v=jNQXAC9IVRw

A YouTube link alone on a line becomes the video: the next press plays it, leaving the slide pauses it.

## \u{1F3A5} Camera

<!-- camera: on, full, on -->

Try it: press **C** to turn on your camera, then \u2192. This card puts you in the corner, then full screen, then back, from one comment: \`<!-- camera: on, full, on -->\`. The cards after it put the words beside you.

### Behind the slide

<!-- camera: behind -->

With the camera on, you fill the frame and this slide's words sit beside you: a talking head with slides. One comment does it: \`<!-- camera: behind -->\`, or \`pip: behind\` for a whole deck. They go on the left, on a half see-through card; \`right\`, \`top\` or \`bottom\` put them elsewhere.

### Words around you

<!-- camera: behind left, behind right, behind top, behind bottom -->

Press \u2192 and these words move around you: \`left\`, \`right\`, \`top\`, \`bottom\`. One comment, one press each.

### Split screen

<!-- camera: behind solid, behind right solid, behind top solid, behind bottom solid -->

Add \`solid\` and the card hides the camera behind it: a split screen, with the camera moved to the other side and you centred there.

### Clear

<!-- camera: behind clear, behind bottom clear -->

\`clear\` takes the card away: the words sit straight on the camera. Best over a plain wall or a green screen.

### Shorts and Reels

\`format: portrait\` in the top block turns the whole deck into a 9:16 column, for a video at 1080\xD71920. The words go above or below you. Start from the [Short template](https://slidetake.com/new?template=short).

### A picture beside you

<!-- camera: behind right, behind left, behind bottom -->

![The link preview, beside you](https://slidetake.com/og.jpg)

### A Graphviz diagram beside you

<!-- camera: behind left, behind left solid -->

Talk through the flow while it sits beside you.

\`\`\`dot
digraph {
  rankdir=LR
  node [shape=box style=rounded]
  Markdown -> Deck -> Takes -> Video
}
\`\`\`

### A D2 diagram beside you

<!-- camera: behind right, behind top -->

\`\`\`d2
direction: right
write: Write
present: Present
record: Record
write -> present -> record
\`\`\`

### An SVG beside you

<!-- camera: behind left, behind bottom solid -->

Drawn in the deck's colours.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130">
  <rect x="10" y="10" width="90" height="80" rx="10" style="fill:var(--accent)"/>
  <rect x="115" y="10" width="90" height="80" rx="10" style="fill:var(--accent);opacity:.6"/>
  <rect x="220" y="10" width="90" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="160" y="120" text-anchor="middle" font-size="14" fill="currentColor">accent, faded, outlined</text>
</svg>
\`\`\`

### A chart beside you

<!-- camera: behind right, behind bottom -->

Views a month, and growing.

\`\`\`echarts
{
  "xAxis": {"type": "category", "data": ["Jan", "Feb", "Mar", "Apr", "May"]},
  "yAxis": {"type": "value"},
  "series": [{"type": "bar", "data": [12, 19, 15, 24, 30]}]
}
\`\`\`

## \u{1F5FA}\uFE0F Layouts and the map

<!-- view: overview -->

This card began by pulling back to the whole map: \`<!-- view: overview -->\` does that. Try it: press **1** to **4** for focus, path (the default), radial and tree, and **O** to zoom out and back.

### Progress and timer

Press **F**: in fullscreen a thin bar along the bottom fills as you go. This deck says \`duration: 10m\`, so a lighter clock layer grows behind it; if it shows past the fill, you're behind.

## \u{1F3A8} Colours

Try it: press **L** now. Dark and light switch, charts and diagrams included.

A deck sets its own colour with one line, \`accent: "#3b82f6"\`, shaded for both modes. See it in [blue](/share#deflate:ZVJNa9wwEL3rV0y1hzZGTummn6YENodCoYVCAjksC9Zak5VY1zKacXZN2Gt-QH9if0kl2aSBnPTGevPmjZ_KshTsuMUKvnewbQcUummw4wrk4mL7eXn3UYoyksTiiSBurCMw2OzBagLfIeCRg4bWRagZ2CKw7xXUL7RqBbozgPcYRrau28Gdb1t_oAo4iqisQSpLNFYHzvRUGad3Qf8-h18BiaAofhRFnAKECFvPFshqg3QenS7gmrEnIb6-KkughKEsL0UZu658a4pCwToO2tPmzVuy_tBowrM8yaI20RUB6z1OLnzrhxB7rz0YjzR5n3b1Xab0mm0krGanIa2lgx_mmlpnEEY_vA6pJRtcTdsJUdc1ZkjiQR5XR0eyggfJY48RyEYz7nwYpQJpNOv4bS1_-i7VNwOm4xZNruyQjm_Byc0pgvGF1r2O6cmTEiAJg8N0u_5_vdXh-ZT3Cj4p-KDgi4J3y81pc0peZ_NzGNm-WQrjAjbsfFfF5XeWxSE4RigvoY9hxReQYKT4YKr8XihGGOlPile62QuxTkfKNP-1ORf4-_jnWUyLKQ86E_8A), [coral](/share#deflate:ZVJNa9wwEL3rV0y1hzZGSkn6EWJKYHMoFFooJNDDsrATa7IS61pGI2fXhL32B-Qn9pdUkk0TyElvrDdv3vhJay2iiy3V8K2DxgdsBTYNdbEGubi_vPhw9lkKnVhi8cwQt9YxGGp2YJHBdwR0iAGhdQlihGgJou8VbF6JbRRgZ4AeKIzRum4L975t_Z5riElEFQ1WRaKxGGKh58o43Ab8fQo_AzFDVX2vqjQFmAjufLTAFg3xabK6gJtIPQvx5Y3WwBmD1ldCp65r35qqUrBKg3a8fveerd83yHRSJllCk1wxRNzR5MK3fgip98aD8cST92lX3xVKj9EmwnJ2GvJaGPww19w6QzD64W3ILcXgctpOiM1mQwWyeJSH5cGxrOFRxrGnBGSDkbY-jFKBNBgxfVvJH77L9e1A-fhFplR2yMfX4OT6mMD4SusB29RxVAIkU3CUb1fP13cYXk75qOBCwScFlwrOztfH9TF7nc3PYRT75lwYF6iJznd1Wn5ro9gHFwn0FfQprPQCMkwUH0xd3gunCBP9v-I1NjshVvnImZa_NucCf_88vYhpMeXBJ-If) or [violet](/share#deflate:ZVJNa9wwEL3rV0y1hzZGTmlo-mFKYHMoFFooJJDDsmCtNVmJdS2jGe-uCXvtD-hP7C-pJJt0ISe9sd68eeOnsiwFO26xgm8d7J1vkYVuGuy4Arn4tLluHj9IUUaaWJxRxL11BAabHVhN4DsEPHLQ0LoINQNbBPa9gvqFWq1AdwZwj2Fk67otPPq29QeqgKOIyhqkskRjdeBMT5Vxehv0r0v4GZAIiuJ7UcQpQIiw8WyBrDZIl9HrAu4YexLiy6uyBEoYyvJGlLHr1remKBSs4qAdrd-8JesPjSa8yJMsahNdEbDe4eTCt34IsffOg_FIk_dpV99lSq_ZRsJydhrSWjr4Ya6pdQZh9MPrkFqyweW0nRB1XWOGJJ7kcXl0JCt4kjz2GIFsNOPWh1EqkEazjt9W8ofvUn0_YDoe0OTKDun4GpxcnyIYX2jtdRs7TkqAJAwO0-3q__VGh_Mp7xV8VHCt4LOCd1fr0_qUvM7m5zCyfXMljAvYsPNdFZffWhaH4BihvIE-hhVfQIKR4oOp8nuhGGGkPyve6mYnxCodKdP81-Zc4O_vP2cxLaY86EL8Aw).

## \u2702\uFE0F Record a video

Try it: press **\u25CF Record** in the bottom bar, or **R**. Stumble on a slide, press \u2190, say it again; then pick the best take of each. Step by step: [Docs \u2192 Record a video](/docs#4-record-a-video).

## \u{1F310} Open from anywhere

Try it: this deck is a file on GitHub, and opens from there too: **[slidetake.com/gh/slidetake/slidetake/examples/showcase.md](/gh/slidetake/slidetake/examples/showcase.md)**. Gists, any markdown URL, and a link with the deck inside it open the same way, and \`npx slidetake deck.md\` opens one from your computer.

## \u{1F680} Start your own

Open **\u270E Editor** and press **New** for a template (blank, talk, recording or a 9:16 short), or type in this deck to make it your copy.

The templates and this deck live in [examples/](https://github.com/slidetake/slidetake/tree/main/examples) on GitHub.

Next, how it all works, step by step: **[Docs \u2192](/docs)**
`});function mt(e){return e.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-+|-+$/g,"")||"card"}function Gt(e){return e.replace(/<[^>]*>/g,"").replace(/!?\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/[*_`~]/g,"").trim()}function B(e){return String(e).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t])}function mn(e){if(typeof document<"u"){let t=document.createElement("textarea");return t.innerHTML=e,t.value}return e.replace(/&(#x[\da-f]+|#\d+|\w+);/gi,(t,a)=>a[0]==="#"?String.fromCodePoint(a[1].toLowerCase()==="x"?parseInt(a.slice(2),16):parseInt(a.slice(1),10)):tl[a.toLowerCase()]??t)}function Vt(e){let t={};for(let a of e.matchAll(/([\w-]+)="([^"]*)"/g))t[a[1]]=a[2];return t}function Yt(e,t){let a=[[]],o=null;return e.split(`
`).forEach(r=>{let n=r.match(/^\s{0,3}(`{3,}|~{3,})/);n&&(o?n[1][0]===o[0]&&n[1].length>=o.length&&(o=null):o=n[1]),!o&&!n&&t.test(r)?a.push([]):a[a.length-1].push(r)}),a.map(r=>r.join(`
`))}function fn(e){let t=String(e??"").trim().toLowerCase();if(!t)return 0;let a=t.match(/^(\d+):(\d{1,2})$/);if(a)return(+a[1]*60+ +a[2])*1e3;if(a=t.match(/^(\d+(?:\.\d+)?)\s*(h|hrs?|hours?|m|mins?|minutes?|s|secs?|seconds?)?$/),!a)return 0;let o=(a[2]||"m")[0];return parseFloat(a[1])*(o==="h"?3600:o==="s"?1:60)*1e3}function Sa(e){let t=Math.max(0,Math.round(e/1e3)),a=Math.floor(t/3600),o=Math.floor(t%3600/60),r=t%60;return(a?a+":"+String(o).padStart(2,"0"):o)+":"+String(r).padStart(2,"0")}function ft(e){let t=Math.max(0,Math.round(e/1e3)),a=Math.floor(t/3600),o=Math.floor(t%3600/60),r=t%60;return a?a+"h "+String(o).padStart(2,"0")+"m":o?o+"m "+String(r).padStart(2,"0")+"s":r+"s"}var tl,Ea=G(()=>{"use strict";tl={amp:"&",lt:"<",gt:">",quot:'"',apos:"'",nbsp:"\xA0",mdash:"\u2014",ndash:"\u2013",hellip:"\u2026",rsquo:"\u2019",lsquo:"\u2018",rdquo:"\u201D",ldquo:"\u201C"}});function yn(e){let t=null;return e.split(`
`).filter(a=>{let o=a.match(/^\s{0,3}(`{3,}|~{3,})/);return o?(t?o[1][0]===t[0]&&o[1].length>=t.length&&(t=null):t=o[1],!1):!t}).join(`
`).replace(/`[^`\n]*`/g,"")}function Mo(e){return/<!--\s*view\s*:\s*(overview|map)\s*-->/i.test(yn(e))}function To(e){let t=yn(e).match(/<!--\s*camera\s*:\s*([\s\S]*?)\s*-->/i);return t?t[1].trim():null}function al(e){let t={},a=e.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);if(!a)return{deck:t,body:e};let o=null;return a[1].split(`
`).forEach(r=>{let n=r.match(/^\s+-\s+(.*)$/);if(n&&o){t[o].push(n[1].trim().replace(/^["']|["']$/g,""));return}let i=r.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);if(!i){o=null;return}let s=i[1].toLowerCase(),l=i[2].trim().replace(/^["']|["']$/g,"");l===""?(t[s]=[],o=s):(t[s]=l,o=null)}),{deck:t,body:e.slice(a[0].length)}}function bn(e){let t=r=>typeof r=="string"||typeof r=="number"||typeof r=="boolean",a=r=>String(r).replace(/\s*\n\s*/g," "),o=[];for(let[r,n]of Object.entries(e||{}))/^[A-Za-z_][\w-]*$/.test(r)&&(t(n)?o.push(r+": "+a(n)):Array.isArray(n)&&n.every(t)&&(o.push(r+":"),n.forEach(i=>o.push("  - "+a(i)))));return o.length?`---
`+o.join(`
`)+`
---
`:""}function ol(e){let t=e.split(`
`),a={},o=e;if(t[0]!==void 0&&t[0].trim()==="---"){let r=-1;for(let n=1;n<t.length;n++)if(t[n].trim()==="---"){r=n;break}r!==-1&&(t.slice(1,r).forEach(n=>{let i=n.indexOf(":");i>-1&&(a[n.slice(0,i).trim()]=n.slice(i+1).trim().replace(/^["']|["']$/g,""))}),o=t.slice(r+1).join(`
`).replace(/^\n+/,""))}return{meta:a,body:o}}function rl(e){let t=e.replace(/<!--[\s\S]*?-->/g,""),a=t.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/m),o=t.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i),r=null;if(a&&(!o||a.index<o.index)?r=a[1]:o&&(r=o[1].replace(/<[^>]+>/g," ")),!r){let n=t.split(`
`).map(i=>i.replace(/<[^>]+>/g,"").trim()).find(i=>i&&!/^[-|:\s]+$/.test(i));r=n?n.slice(0,60):null}return r?mn(Gt(r)).replace(/\s+/g," ").trim():null}function gn(e){let t=e.match(/<!--\s*\.slide:([\s\S]*?)-->/i);return t?Vt(t[1]):{}}function vn(e,{render:t=a=>({html:a,err:null})}={}){let a=new Map,o=f=>{let g=f,p=2;for(;a.has(g);)g=f+"-"+p++;return g},r=f=>(a.set(f.id,{x:null,y:null,children:[],...f}),f.id);e=e.replace(/\r\n?/g,`
`);let n=/^\+\+\+[ \t]*$/m.test(e),i={};n||({deck:i,body:e}=al(e));let s=/^slides?$/i.test(String(i.layout||""))||/^slides?$/i.test(String(i.type||"")),l=!n&&(Yt(e,/^--\s*$/).length>1||s&&Yt(e,/^---\s*$/).length>1),c=n?M():l?u():d();return a.forEach(f=>{(!f.parent||f.parent===f.id||!a.has(f.parent))&&(f.parent=null)}),a.forEach(f=>{let g=new Set([f.id]),p=f.parent;for(;p;){if(g.has(p)){f.parent=null;break}g.add(p),p=a.get(p).parent}}),a.forEach(f=>{f.parent&&a.get(f.parent).children.push(f.id)}),{deck:i,nodes:a,format:n?"+++":l?"reveal":"headings",errCount:c};function d(){let f=[],g=null,p=null,E={level:0,title:null,explicitId:null,lines:[]};e.split(`
`).forEach(x=>{let v=x.match(/^\s{0,3}(`{3,}|~{3,})/);v&&(p?v[1][0]===p[0]&&v[1].length>=p.length&&(p=null):p=v[1]);let S=!p&&!v?x.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/):null;if(S){let L=S[2],$=null,re=L.match(/\s*\{#([\w\-:.]+)\}\s*$/);re&&($=re[1],L=L.slice(0,re.index)),g={level:S[1].length,title:Gt(L),explicitId:$,lines:[S[1]+" "+L]},f.push(g)}else(g||E).lines.push(x)});let C=E.lines.join(`
`);C.trim()&&(f.length&&!C.replace(/<!--[\s\S]*?-->/g,"").trim()?f[0].lines.splice(1,0,...E.lines):f.unshift(E));let w=[];return f.forEach(x=>{for(;w.length&&w[w.length-1].level>=x.level;)w.pop();let v=w.length?w[w.length-1].id:null,S=x.lines.join(`
`).trim(),L=x.title||Gt((S.split(`
`).find(X=>X.trim())||"Intro").slice(0,48));x.id=o(x.explicitId||mt(L));let{html:$,err:re}=t(S);r({id:x.id,parent:v,title:L,html:$,err:re,camera:To(S),mapFirst:Mo(S)}),w.push(x)}),0}function M(){let f=e.split(/\n\+\+\+[ \t]*\n/).map(E=>E.trim()).filter(E=>E.length),g=null,p=0;return f.forEach((E,C)=>{let{meta:w,body:x}=ol(E),v=o(w.id||"slide-"+(C+1)),S="parent"in w?w.parent||null:g,L=x.match(/^#{1,6}\s+(.+)$/m),$=w.title||(L?Gt(L[1]):v),{html:re,err:X}=t(x);X&&p++,r({id:v,parent:S,title:$,html:re,err:X,camera:w.camera||To(x),mapFirst:Mo(x),x:w.x!==void 0?parseFloat(w.x):null,y:w.y!==void 0?parseFloat(w.y):null}),g=v}),p}function u(){let f=0,g=0,p=null;function E(w,x){let v=w.body.trim();g++;let S=rl(v)||"Slide "+g,L=x?a.get(x).title:null;L&&S.startsWith(L+" / ")&&(S=S.slice(L.length+3));let $=o(mt(S)),{html:re,err:X}=t(v);return X&&f++,r({id:$,parent:x,title:S,html:re,err:X,camera:To(v),mapFirst:Mo(v),autoslide:parseInt(w.attrs["data-autoslide"],10)||0})}let C=[];return Yt(e,/^---\s*$/).forEach(w=>{if(/<section\b/i.test(w)){for(let S of w.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi))C.push([{body:S[2],attrs:Vt(S[1])}]);let v=w.replace(/<section\b[^>]*>[\s\S]*?<\/section>/gi,"");v.trim()&&C.push([{body:v,attrs:gn(v)}]);return}let x=Yt(w,/^--\s*$/).filter(v=>v.trim()).map(v=>({body:v,attrs:gn(v)}));x.length&&C.push(x)}),C.forEach(w=>{let x=null;w.forEach((v,S)=>{if(!p){p=x=E(v,null);return}S===0?x=E(v,p):E(v,x)})}),f}}var wn=G(()=>{"use strict";Ea()});function Xe(e,t){return String(t||"").toLowerCase().split(/\s+/).forEach(a=>{a&&(a==="solid"?(e.card=100,e.used=!0):a==="clear"?(e.card=0,e.used=!0):a==="off"||a==="hide"?e.off=!0:a==="on"||a==="pip"||a==="show"?(e.off=!1,e.full=!1,e.behind=!1,e.place="",e.used=!0):a==="full"||a==="fullscreen"?(e.full=!0,e.behind=!1,e.place="",e.off=!1,e.used=!0):a==="behind"||a==="under"?(e.full=!0,e.behind=!0,e.place="left",e.off=!1,e.used=!0):nl.includes(a)?(e.place=a,e.used=!0):/^\d+(\.\d+)?%?$/.test(a)?(e.size=Lo(parseFloat(a)),e.used=!0):Kt.includes(a)?(e.corner=a,e.used=!0):a==="flip"?(e.flip=!e.flip,e.used=!0):a==="circle"?e.circle=!0:a==="rect"?e.circle=!1:a==="mirror"?e.mirror=!0:(a==="unmirror"||a==="no-mirror")&&(e.mirror=!1))}),e}function xn(e){return e?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function kn(e,t){let a=[];if(!e.length){for(let r=0;r<=t;r++)a.push({cam:0,frag:r});return a}let o=e.findIndex(r=>!Xe({},r).full);o<0&&(o=e.length-1);for(let r=0;r<=o;r++)a.push({cam:r,frag:0});for(let r=1;r<=t;r++)a.push({cam:o,frag:r});for(let r=o+1;r<e.length;r++)a.push({cam:r,frag:t});return a}var Kt,nl,Lo,Sn=G(()=>{"use strict";Kt=["top-left","top-right","bottom-left","bottom-right"],nl=["left","right","top","bottom"],Lo=e=>Math.max(8,Math.min(60,e))});function En(e){let t=String(e||"").trim();if(!t)return null;let a;try{a=new URL(/^[a-z]+:\/\//i.test(t)?t:"https://"+t)}catch{return null}let o=a.pathname.split("/").filter(Boolean);if(a.hostname==="github.com"||a.hostname==="www.github.com"){let[r,n,i,s,...l]=o;if(r&&n&&(i==="blob"||i==="raw"||i==="tree")&&s){let c=l.join("/");return(i==="tree"||!/\.(md|markdown|txt)$/i.test(c))&&(c=(c?c+"/":"")+"index.md"),{kind:"url",url:Ao+[r,n,s].join("/")+"/"+c}}if(r&&n&&!i)return{kind:"url",url:Ao+r+"/"+n+"/HEAD/README.md"}}if(a.hostname==="gist.github.com"){let r=o.length>=2?o[1]:o[0];if(r&&/^[\da-f]+$/i.test(r))return{kind:"gist",id:r}}if(a.hostname==="slidetake.com"||a.hostname==="www.slidetake.com"){let r=Bo(a.pathname);if(r)return r;let n=a.searchParams.get("src");if(n)return{kind:"url",url:n}}return{kind:"url",url:a.href}}function Bo(e){let t=String(e||"").split("/").filter(Boolean).map(a=>{try{return decodeURIComponent(a)}catch{return a}});if(t[0]==="gh"&&t.length>=4){let[,a,o,...r]=t,n=o.indexOf("@"),i=n<0?o:o.slice(0,n),s=n<0?"HEAD":o.slice(n+1);return!a||!i||!s?null:{kind:"url",url:Ao+[a,i,s,...r].map(encodeURIComponent).join("/")}}return t.length===1&&(t[0]==="docs"||t[0]==="help")?{kind:"builtin",id:"docs"}:t[0]==="showcase"&&t.length===1?{kind:"builtin",id:"showcase"}:t[0]==="examples"&&(t.length===1||t.length===2&&t[1]==="showcase")?{kind:"builtin",id:"showcase"}:t.length===1&&t[0]==="features"?{kind:"builtin",id:"features"}:t.length===1&&t[0]==="privacy"?{kind:"builtin",id:"privacy"}:t[0]==="gist"&&t[1]&&/^[\da-f]+$/i.test(t[1])?t[2]?{kind:"gist",id:t[1],file:t[2]}:{kind:"gist",id:t[1]}:null}function Cn(e){if(e.kind==="builtin")return e.id==="home"?"/":e.id==="showcase"?"/showcase":e.id.startsWith("template:")?"/new?template="+e.id.slice(9):"/"+e.id;if(e.kind==="gist")return"/gist/"+e.id+(e.file?"/"+encodeURIComponent(e.file):"");let t=e.url.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);if(t){let[,a,o,r,n]=t;if(!/^refs$/.test(r))return"/gh/"+a+"/"+o+(r==="HEAD"?"":"@"+r)+"/"+n}return"/?src="+encodeURIComponent(e.url)}var Ao,Oo=G(()=>{"use strict";Ao="https://raw.githubusercontent.com/"});function il(e){let t="";for(let a=0;a<e.length;a+=32768)t+=String.fromCharCode(...e.subarray(a,a+32768));return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function sl(e){let t=atob(e.replace(/-/g,"+").replace(/_/g,"/")+"===".slice((e.length+3)%4));return Uint8Array.from(t,a=>a.charCodeAt(0))}async function Mn(e,t){let a=new Response(new Blob([e]).stream().pipeThrough(t));return new Uint8Array(await a.arrayBuffer())}async function Tn(e){return il(await Mn(new TextEncoder().encode(e),new CompressionStream("deflate-raw")))}async function Ln(e){return new TextDecoder().decode(await Mn(sl(e),new DecompressionStream("deflate-raw")))}function Ca(e){let t=e.replace(/^#/,"");if(!t.startsWith(Io)){let n=t;try{n=decodeURIComponent(t)}catch{}return{data:null,slide:n}}let a=t.slice(Io.length),o=a.indexOf("~"),r=o<0?"":a.slice(o+1);try{r=decodeURIComponent(r)}catch{}return{data:o<0?a:a.slice(0,o),slide:r}}function Po(e,t){return"#"+Io+e+(t?"~"+encodeURIComponent(t):"")}var Io,zo=G(()=>{"use strict";Io="deflate:"});function An(e,t,a){let o=e.replace(/\/+$/,"")||"/",r=new URLSearchParams(t),{data:n,slide:i}=Ca(a);if(o==="/share")return n?{page:"share",data:n,slide:i}:{page:"source",source:{kind:"builtin",id:"home"},slide:""};if(o==="/edit")return{page:"edit",slide:i};if(o==="/new"){let c=r.get("template");return c&&ll.includes(c)?{page:"source",source:{kind:"builtin",id:"template:"+c},slide:i}:{page:"pick"}}let s=Bo(o);if(s)return{page:"source",source:s,slide:i};let l=r.get("src");return o==="/"&&l?{page:"source",source:{kind:"url",url:l},slide:i}:{page:"source",source:{kind:"builtin",id:"home"},slide:i}}function Ae(e){switch(e.kind){case"builtin":return e.id==="home"?"Home":e.id==="docs"||e.id==="help"?"the docs":e.id==="showcase"?"the showcase":e.id==="features"?"the features":e.id==="privacy"?"the privacy page":"the "+e.id.replace(/^template:/,"")+" template";case"gist":return"a gist"+(e.file?" ("+e.file+")":"");case"shared":return"a shared deck";case"file":return e.name;case"url":{let t=e.url.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/[^/]+\/(.+)$/);if(t)return t[1]+"/"+t[2]+"/"+t[3];try{let a=new URL(e.url);return a.hostname+a.pathname}catch{return e.url}}}}function Ma(e,t,{exported:a=!1}={}){return{text:e,origin:t,originText:e,exported:a?e:null}}function Ta(e){return e.text!==(e.exported??e.originText)}function La(e){return e.text===e.originText}function Bn(e){try{let t=JSON.parse(e||"null");return!t||typeof t.text!="string"||!t.origin||typeof t.origin.kind!="string"?null:{text:t.text,origin:t.origin,originText:typeof t.originText=="string"?t.originText:t.text,exported:typeof t.exported=="string"?t.exported:null}}catch{return null}}var ll,On=G(()=>{"use strict";Oo();zo();ll=["blank","talk","recording","short"]});function Ro(e){let t;try{t=new URL(e)}catch{return null}let a=t.hostname.replace(/^(www\.|m\.)/,""),o=null,r=!1;if(a==="youtu.be")o=t.pathname.slice(1).split("/")[0];else if(a==="youtube.com"||a==="youtube-nocookie.com"){let n=t.pathname.split("/").filter(Boolean);n[0]==="watch"?o=t.searchParams.get("v"):["shorts","live","embed"].includes(n[0])&&(o=n[1]||null,r=n[0]==="shorts")}return!o||!/^[\w-]{6,}$/.test(o)?null:{id:o,start:cl(t.searchParams.get("t")||t.searchParams.get("start")||""),portrait:r}}function cl(e){if(/^\d+$/.test(e))return+e;let t=e.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);return t&&e?+(t[1]||0)*3600+ +(t[2]||0)*60+ +(t[3]||0):0}function In(e){return"https://www.youtube-nocookie.com/embed/"+encodeURIComponent(e.id)+"?enablejsapi=1&rel=0&playsinline=1"+(e.start?"&start="+e.start:"")}var Pn=G(()=>{"use strict"});function we(e){let t=new Map,a=e.totalObs??e.total;return e.events.forEach((o,r)=>{t.has(o.id)||t.set(o.id,{id:o.id,title:o.title,takes:[]});let n=t.get(o.id),i=e.events[r+1];n.takes.push({no:n.takes.length+1,start:zn(o)+(o.skip||0),end:i?zn(i)-(i.lead||0):a})}),t}function Jt(e){let t=[],a=Ba(e);return we(e).forEach(o=>{let r=e.picks[o.id]??o.takes.length;if(!r)return;let n=o.takes[r-1];if(!n)return;let i=Rn(n.start,a),s=Rn(n.end,a);s>i&&t.push({id:o.id,title:o.title,f0:i,f1:s,start:i*1e3/a,end:s*1e3/a})}),t}function dl(e){let t=[];return e.forEach(a=>{let o=t[t.length-1];o&&a.f0===o.f1?(o.f1=a.f1,o.end=a.end):t.push({f0:a.f0,f1:a.f1,start:a.start,end:a.end})}),t}function Do(e,t){let a=0,o=[];return Jt(e).forEach(r=>{let{sec:n,title:i}=t(r.id,r.title),s=o[o.length-1];(!s||s.sec!==n&&s.title!==i)&&o.push({sec:n,title:i,t:a}),a+=r.end-r.start}),{list:o,length:a}}function Fn(e,t){let{list:a,length:o}=Do(e,t),r=a.filter((n,i)=>i===0||(a[i+1]?a[i+1].t:o)-n.t>=1e4);return r.length&&(r[0].t=0),{lines:r.map(n=>Sa(n.t)+" "+n.title),dropped:a.length-r.length,length:o}}function Nn(e,t,{input:a,outputName:o,sectionOf:r,loudness:n}){let i=dl(Jt(e));if(!e.withObs)return"# This was a rehearsal: nothing was recorded.";if(!i.length)return"# Every slide is left out: nothing to render.";let s=hl(a)+o,{list:l,length:c}=Do(e,r),d=v=>String(v).replace(/[=;#\\\n]/g,S=>"\\"+S),u=`cat > /tmp/slidetake-chapters.txt <<'EOF'
`+(`;FFMETADATA1
title=`+d(e.deckTitle)+`
`+l.map((v,S)=>`[CHAPTER]
TIMEBASE=1/1000
START=`+Math.round(v.t)+`
END=`+Math.round(l[S+1]?l[S+1].t:c)+`
title=`+d(v.title)).join(`
`))+`
EOF
`,f=" -map 0:v:0 -map 0:a:0 -map_metadata 1 -map_chapters 1";if(t==="copy"){let v=i.map(L=>"file "+Aa(a)+`
inpoint `+Dn(L.start)+`
outpoint `+Dn(L.end)).join(`
`);return(i.length>1?`# Careful: without re-encoding, cuts can only land on keyframes (OBS puts one about every 2 s),
# so `+(i.length===2?"the cut":"each of the "+(i.length-1)+" cuts")+` here may keep or lose up to ~2 s. Use a frame-accurate option for retakes.
`:"")+`cat > /tmp/slidetake-cuts.txt <<'EOF'
`+v+`
EOF
`+u+"ffmpeg -f concat -safe 0 -i /tmp/slidetake-cuts.txt -i /tmp/slidetake-chapters.txt"+f+" -c copy -movflags +faststart "+Aa(s)}let g=Ba(e),p=v=>(v/g).toFixed(6),E=v=>((v-.5)/g).toFixed(6),C=i.map(v=>"gte(t,"+E(v.f0)+")*lt(t,"+E(v.f1)+")").join("+"),w=i.map(v=>"gte(t,"+p(v.f0)+")*lt(t,"+p(v.f1)+")").join("+"),x=t==="mac"?"-c:v h264_videotoolbox -b:v 12M":"-c:v libx264 -crf 18 -preset medium";return u+"ffmpeg -i "+Aa(a)+" -i /tmp/slidetake-chapters.txt"+f+` -vf "select='`+C+`',setpts=N/FRAME_RATE/TB" -af "asetnsamples=n=48:p=0,aselect='`+w+"',asetpts=N/SR/TB"+(n?",loudnorm=I=-14:TP=-1:LRA=11":"")+'"'+(n?" -ar 48000":"")+" "+x+" -c:a aac -b:a 192k -movflags +faststart "+Aa(s)}var zn,Ba,Rn,gt,hl,Aa,Dn,Oa=G(()=>{"use strict";Ea();zn=e=>e.obsT??e.t,Ba=e=>e.fps||60,Rn=(e,t)=>Math.round(e*t/1e3);gt=e=>String(e||"").split(/[\\/]/).pop()||"",hl=e=>{let t=Math.max(String(e).lastIndexOf("/"),String(e).lastIndexOf("\\"));return t>=0?String(e).slice(0,t+1):""},Aa=e=>"'"+String(e).replace(/'/g,"'\\''")+"'",Dn=e=>(e/1e3).toFixed(3)});function pl(e,t,a){let o=a?.5625:1.7777777777777777,r=Math.min(e,t*o),n=r/o;return{w:r,h:n,x:(e-r)/2,y:(t-n)/2}}function Hn(e,t,a,o){let r=pl(e,t,o),n=[Math.floor(r.w*a),Math.floor(r.h*a)];return{quality:De.find(i=>{let s=Pa(i,o);return n[0]>=s.w&&n[1]>=s.h})||null,device:n}}function Xt(e){let t=new Map;e.events.forEach((o,r)=>{t.has(o.id)||t.set(o.id,[]),t.get(o.id).push(r)});let a=[];return we(e).forEach(o=>{let r=e.picks[o.id]??o.takes.length,n=r?o.takes[r-1]:null;if(!n)return;let i=e.events[t.get(o.id)[r-1]];i&&i.clip&&n.end>n.start&&a.push({id:o.id,title:o.title,clip:i.clip,keep:(n.end-n.start)/1e3})}),a}var De,Ia,$t,Pa,ul,jn,Fo,Wn,za,_n,Un,qn,Gn=G(()=>{"use strict";Oa();De=[{name:"1080p",w:1920,h:1080,bitrate:8e6},{name:"720p",w:1280,h:720,bitrate:5e6}],Ia=192e3,$t=30,Pa=(e,t)=>t?{...e,w:e.h,h:e.w}:e;ul=["video/mp4;codecs=avc1.640028,mp4a.40.2","video/mp4;codecs=avc1,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"],jn=e=>ul.find(t=>e(t))||"",Fo=e=>e.startsWith("video/mp4")?"mp4":"webm",Wn=e=>Math.round((e.bitrate+Ia)/8*60);za=(e,t)=>t>e?t:e+.001,_n=e=>e>1/$t?e:0,Un=e=>e.replace(/\s*\([0-9a-f]{4}:[0-9a-f]{4}\)\s*$/i,""),qn=(e,t)=>Math.min(e,t)+"p"+(t>e?" portrait":"")});function ml(e){let t=1681.974450955533,a=.7071752369554196,o=Math.tan(Math.PI*t/e),r=Math.pow(10,3.999843853973347/20),n=Math.pow(r,.4996667741545416),i=1+o/a+o*o,s={b0:(r+n*o/a+o*o)/i,b1:2*(o*o-r)/i,b2:(r-n*o/a+o*o)/i,a1:2*(o*o-1)/i,a2:(1-o/a+o*o)/i};t=38.13547087602444,a=.5003270373238773,o=Math.tan(Math.PI*t/e),i=1+o/a+o*o;let l={b0:1,b1:-2,b2:1,a1:2*(o*o-1)/i,a2:(1-o/a+o*o)/i};return{shelf:s,highPass:l}}function Vn(e,t){let{shelf:a,highPass:o}=ml(e),r=Math.round(e/10),n=[],i=Array.from({length:t},()=>new Float64Array(8)),s=d=>d>=3&&d<=4?1.41:1,l=0,c=0;return{add(d){let M=d[0].length;for(let u=0;u<t;u++){let f=d[u]||d[0],g=i[u],p=s(u),[E,C,w,x,v,S,L,$]=g,re=l,X=Math.floor(re/r),F=(X+1)*r,V=0;for(let de=0;de<M;de++){let te=f[de];te>c?c=te:-te>c&&(c=-te);let Q=a.b0*te+a.b1*E+a.b2*C-a.a1*w-a.a2*x;C=E,E=te,x=w,w=Q;let qt=o.b0*Q+o.b1*v+o.b2*S-o.a1*L-o.a2*$;S=v,v=Q,$=L,L=qt,V+=qt*qt,++re===F&&(n[X]=(n[X]||0)+p*V,V=0,X++,F+=r)}V&&(n[X]=(n[X]||0)+p*V),g.set([E,C,w,x,v,S,L,$])}l+=M},result(){let d=Math.floor(l/r),M=[];for(let p=3;p<d;p++)M.push(((n[p-3]||0)+(n[p-2]||0)+(n[p-1]||0)+(n[p]||0))/(4*r));let u=p=>p.reduce((E,C)=>E+C,0)/p.length,f=M.filter(p=>Ra(p)>-70),g=f.length?f.filter(p=>Ra(p)>Ra(u(f))-10):[];return{integrated:g.length?Ra(u(g)):-1/0,peak:c,peakDb:c>0?fl(c):-1/0}}}}function Ho(e,{limit:t=!1,target:a=-14,ceiling:o=-1.5}={}){if(!isFinite(e.integrated))return 0;let r=Math.min(a-e.integrated,No);return r<=0||t||e.peakDb==null||!isFinite(e.peakDb)?r:Math.max(0,Math.min(r,o-e.peakDb))}function jo(e,t,a={}){let o=Da(a.ceilingDb??-1.5),r=Math.max(1,Math.round((a.lookahead??.005)*e)),n=1-Math.exp(-1/((a.release??.05)*e)),i=Array.from({length:t},()=>[]),s=[],l=[],c=new Float64Array(r),d=0,M=r,u=1,f=!1,g=0,p=0;c.fill(1);let E=C=>{for(;l.length&&l[l.length-1][1]>=C;)l.pop();for(l.push([d,C]);l[0][0]<=d-r;)l.shift();let w=l[0][1];if(u=w<u?w:u+(w-u)*n,u>.999&&(u=1),M+=u-c[d%r],c[d%r]=u,d>=r-1){let x=M/r,v=x>.999?1:x;s.push(v),v<.999&&!f&&g++,f=v<.999}d++};return{push(C){let w=C[0].length;for(let x=0;x<w;x++){let v=0;for(let S=0;S<t;S++){let L=(C[S]||C[0])[x];i[S].push(L),L>v?v=L:-L>v&&(v=-L)}E(v>o?o/v:1)}},ready:()=>s.length-p,take(C){let w=Array.from({length:t},()=>new Float32Array(C));for(let x=0;x<C;x++){let v=s[p+x];for(let S=0;S<t;S++)w[S][x]=i[S][p+x]*v}return p+=C,p>65536&&(s.splice(0,p),i.forEach(x=>x.splice(0,p)),p=0),w},end(){for(let C=0;C<r-1;C++){for(let w=0;w<t;w++)i[w].push(0);E(1)}},get events(){return g}}}var fl,Ra,No,Da,Yn=G(()=>{"use strict";fl=e=>20*Math.log10(e),Ra=e=>-.691+10*Math.log10(e);No=20;Da=e=>Math.pow(10,e/20)});function Kn(e){let t=2166136261;for(let a=0;a<e.length;a++)t^=e.charCodeAt(a),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function Jn(e,t){return e.map((a,o)=>{let r=e[o-1]||"";return{id:a,title:t(a).title,fp:t(a).fp,prev:r,prevFp:r?t(r).fp:""}})}function $n(e,t,a){let o=new Map(a.map(i=>[i.id,i])),r=new Map;e.events.forEach(i=>{r.has(i.id)||r.set(i.id,[]),r.get(i.id).push(i)});let n=[];return we(e).forEach(i=>i.takes.forEach((s,l)=>{let c=r.get(i.id)[l];if(!c||!c.clip||s.end<=s.start)return;let d=o.get(i.id);d&&n.push({uid:c.clip,id:i.id,title:i.title,clip:c.clip,ms:s.end-s.start,run:t,date:e.date,fp:d.fp,prev:d.prev,prevFp:d.prevFp,at:s.start})})),n.sort((i,s)=>i.at-s.at).map(({at:i,...s})=>s)}function Fa(e,t){return t.map(a=>{let o=e.takes.filter(i=>i.id===a.id).map((i,s)=>({...i,no:s+1,outdated:i.fp!==a.fp?"slide":(i.prev??null)!==a.prev||i.prevFp!==a.prevFp?"before":""})),r=e.picks[a.id],n=null;if(r&&o.some(i=>i.uid===r))n=r;else{let i=o.filter(s=>!s.outdated);n=i.length?i[i.length-1].uid:null}return{id:a.id,title:a.title,takes:o,pick:n}})}function Xn(e){let t=[],a=0;return e.forEach(o=>{let r=o.pick?o.takes.find(n=>n.uid===o.pick):null;r&&(t.push({id:o.id,title:o.title,t:a,clip:r.clip}),a+=r.ms)}),{events:t,picks:{},total:a}}function Na(e,t){let a=new Set(t);return e.filter(o=>a.has(o))}function Qn(e,t,a){let o=t?e.indexOf(t):-1,r=e.indexOf(a);return o<0||r<0?[a]:e.slice(Math.min(o,r),Math.max(o,r)+1)}var Zn=G(()=>{"use strict";Oa()});var Md={};function j(e){try{let t=localStorage.getItem(e);if(t!==null||!e.startsWith("slidetake:"))return t;let a=e.slice(10);return localStorage.getItem("slidetake:"+a)??localStorage.getItem("traverse:"+a)}catch{return null}}function W(e,t){try{localStorage.setItem(e,t)}catch{}}function Cl(e){try{return{html:window.marked?window.marked.parse(e):"<pre>"+B(e)+"</pre>",err:null}}catch{return{html:"<p>(could not render)</p>",err:"render error"}}}function Tl(e){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:o=>/Slidetake/.test(o.nodeValue||"")&&!o.parentElement?.closest("code, pre, kbd, svg, em, .st-name")?1:2}),a=[];for(;t.nextNode();)a.push(t.currentNode);a.forEach(o=>{let r=document.createElement("span");r.innerHTML=B(o.nodeValue||"").replace(/Slidetake/g,Ml),o.replaceWith(...r.childNodes)})}function Ja(){let e=D.brand||"",t=D.logo||"",a=/^chip$/i.test(D.brand_style||""),o=/^slidetake$/i.test(e)?'<span class="st-mark">'+gr+'<span class="word">Slide<span>take</span></span></span>':(t?'<img alt="" src="'+B(t)+'">':"")+(e?"<span"+(a?' class="chip"':"")+">"+B(e)+"</span>":"");if(Fe.dataset.html!==o){Fe.dataset.html=o,Fe.innerHTML=o;let n=Fe.querySelector("img");n&&(n.onload=n.onerror=()=>ye(!0))}Fe.hidden=!o;let r=document.body.classList.contains("portrait");document.body.classList.toggle("portrait",ge()),r!==ge()&&ye(!0),Te(),document.title=D.title||"Slidetake",Al(),xi()}function Ll(){let e=String(D.accent||"").trim();if(!e||!window.CSS||!CSS.supports("color",e))return null;if(!CSS.supports("color","oklch(from red l c h)"))return{accent:e,line:e};let t=a=>"oklch(from "+e+" "+a+" c h)";return{dark:{accent:t(.8),accentSoft:t(.87),line:t(.5)},light:{accent:t(.45),accentSoft:t(.4),line:t(.75),ring:t(.7)}}}function Al(){let e="",t=(o,r)=>{let n=Object.entries(r||{}).filter(([i,s])=>ti[i]&&s&&typeof s!="object").map(([i,s])=>ti[i]+":"+String(s).replace(/[;{}<>]/g,"")).join(";");n&&(e+=o+"{"+n+`}
`)};[Ll(),U&&U.colors].filter(Boolean).forEach(o=>{["dark","light"].forEach(r=>{let n={...o,...o[r]||{}},i=r==="dark";n.accent&&typeof n.accent=="string"&&(n.accentSoft=n.accentSoft||n.accent,n.line=n.line||"color-mix(in srgb, "+n.accent+(i?" 45%, #09090b)":" 55%, #fff)"),n.ring=n.ring||(i?n.accent:n.line),n.onAccent=n.onAccent||(i?"color-mix(in srgb, "+n.accent+" 15%, #000)":"#fff")),t(i?'body:not([data-mode="light"])':'body[data-mode="light"]',n)})});let a=document.getElementById("st-colors");a||(a=document.createElement("style"),a.id="st-colors",document.head.appendChild(a)),a.textContent!==e&&(a.textContent=e),document.body.classList.toggle("st-header-color",e.includes("--header-bg"))}function Ie(e){let t=document.createElement("span");t.style.color="var("+e+")",document.body.appendChild(t);let a=getComputedStyle(t).color;return t.remove(),Qe=Qe||Object.assign(document.createElement("canvas"),{width:1,height:1}).getContext("2d",{willReadFrequently:!0}),Qe.clearRect(0,0,1,1),Qe.fillStyle="#000",Qe.fillStyle=a,Qe.fillRect(0,0,1,1),"#"+[...Qe.getImageData(0,0,1,1).data.slice(0,3)].map(o=>o.toString(16).padStart(2,"0")).join("")}function Bl(e,t,a){let o=i=>[1,3,5].map(s=>parseInt(i.slice(s,s+2),16)),r=o(e),n=o(t);return"#"+r.map((i,s)=>Math.round(i*a+n[s]*(1-a)).toString(16).padStart(2,"0")).join("")}function ho(){if(U&&U.themeKey&&!ai){let t=j(U.themeKey);return t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}return String(ai||j("slidetake:mode")||D.mode||"dark").toLowerCase()==="light"?"light":"dark"}function xi(){let e=ho()==="light";e?document.body.dataset.mode="light":delete document.body.dataset.mode;let t=document.getElementById("btn-mode");t&&(t.innerHTML=e?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',t.title=(e?"Dark theme":"Light theme")+" (L)",t.setAttribute("aria-label",t.title))}function ki(){let e=ho()==="light"?"dark":"light";U&&U.themeKey?(W(U.themeKey,e),document.documentElement.classList.toggle("dark",e==="dark")):W("slidetake:mode",e),xi(),ee.querySelector(".echarts-container, .diagram.d2, .diagram.dot")&&Ot(!0)}function Ol(){let t=(D.camera||"").replace(/^\[|\]$/g,"").split(",").map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(Boolean);return t.length?t:["on","full","off"]}function Zo(e){if(!e)return[];let t=xn(e.camera);return!oe||t.some(Il)?t:[]}function Il(e){return!!Xe({},e).behind}function Nt(e){return kn(Zo(e),e&&e.frags?e.frags.length:0)}function Si(){let e=Nt(m.get(y));return e[Math.min(Me,e.length-1)]||{cam:0,frag:0}}function Pl(){if(!y)return null;let e=m.get(y),t=Zo(e);if(t.length)return t[Math.min(Si().cam,t.length-1)];if(e&&e.el&&e.el.classList.contains("card-full"))return"off";for(let a=b.indexOf(y)-1;a>=0;a--){let o=Zo(m.get(b[a]));if(o.length)return Xe({},o[o.length-1]).behind?null:o[o.length-1]}return null}function br(){let e={corner:(D.pip||"none").toLowerCase(),size:Lo(parseFloat(D.pip_size)||(ge()?40:24)),circle:(D.pip_shape||"").toLowerCase()==="circle",mirror:$i(),full:!1,off:!1,flip:!1,used:!1,card:50};if(/^(behind|under)\b/.test(e.corner)){let t=e.corner;e.corner="bottom-right",Xe(e,t)}return Xe(e,Pl()),ke&&!/\b(off|hide)\b/i.test(ke)&&(e.off=!1),Xe(e,ke),!Kt.includes(e.corner)&&(ne||e.used)&&(e.corner="bottom-right"),e.flip&&Kt.includes(e.corner)&&(e.corner=e.corner.includes("left")?e.corner.replace("left","right"):e.corner.replace("right","left")),e}function Te(){if(Xa)return;let e=!A.hidden&&A.offsetWidth?A.getBoundingClientRect():null,t=We=br();t.behind&&(!y||me)&&(t.full=!1,t.behind=!1);let a=Kt.includes(t.corner),o=oe&&!!t.behind&&!t.off;A.className=a?[t.corner,t.circle&&"circle",ne&&"live",t.mirror&&"mirror",t.full&&"full",t.behind&&"behind",o&&"empty",A.classList.contains("msg")&&"msg"].filter(Boolean).join(" "):"",A.style.width=t.full?"":t.size+"%",A.hidden=!a||t.off||oe&&!o,le.dataset.pip=A.hidden||t.full?"none":t.corner,le.classList.toggle("cam-behind",!A.hidden&&!!t.behind),le.style.setProperty("--cam-card",String((t.card||0)/100)),le.classList.toggle("cam-card",(t.card||0)>0),le.classList.toggle("cam-solid",(t.card||0)>=100),le.classList.toggle("cam-live",!A.hidden&&!!t.behind&&!o);let r=!!Ye;if(ge()&&/^(left|right)$/.test(t.place||"")&&(t.place="bottom"),Ei(!A.hidden&&t.behind&&t.place||""),Ye&&!r&&e&&!Ce&&xe.animate&&xe.animate([{opacity:0},{opacity:1}],{duration:300,delay:550,easing:"ease-out",fill:"backwards"}),A.hidden||Ce||!A.animate)return;let n="cubic-bezier(.65,0,.35,1)";if(!e){A.animate([{opacity:0},{opacity:1}],{duration:300,easing:"ease-out"});return}let i=A.getBoundingClientRect();if(Math.abs(e.left-i.left)+Math.abs(e.top-i.top)+Math.abs(e.width-i.width)+Math.abs(e.height-i.height)<2)return;let s=Math.max(e.width/i.width,e.height/i.height),l=e.left+e.width/2-(i.left+i.width/2),c=e.top+e.height/2-(i.top+i.height/2),d=Math.max(0,(i.width-e.width/s)/2),M=Math.max(0,(i.height-e.height/s)/2),u=parseFloat(getComputedStyle(A).borderTopLeftRadius)||0;A.animate([{transformOrigin:"50% 50%",transform:"translate("+l+"px,"+c+"px) scale("+s+")",clipPath:"inset("+M+"px "+d+"px round "+10/s+"px)"},{transformOrigin:"50% 50%",transform:"none",clipPath:"inset(0px 0px round "+u+"px)"}],{duration:600,easing:n})}function Ei(e){let t=ia===y?Qt:[];!t.length&&window.echarts&&Qt.forEach(u=>{let f=echarts.getInstanceByDom(u);f&&f.dispose()}),Qt=[];let a=Ye,o=xe.querySelector(".cam-box"),r=o&&o.getBoundingClientRect();Ye=e,le.dataset.place=e,xe.innerHTML="";let n=e&&m.get(y);if(!n||!n.el){ia=null;return}let i=n.el.querySelector(".body"),s=[...i.children].map(u=>{let f=u.cloneNode(!0);return[f,...f.querySelectorAll("[style]")].forEach(g=>{g.style.removeProperty("opacity"),g.style.removeProperty("transform"),g.style.removeProperty("visibility")}),[f,...f.querySelectorAll("[data-text]")].forEach(g=>{g.dataset.text&&(g.textContent=g.dataset.text)}),f}),l=u=>u.matches("figure.media, .diagram, .echarts-container, .gallery"),c=[[e,s]],d=i.clientWidth;if(c.forEach(([u,f])=>{if(!f.length)return;let g=document.createElement("div");g.className="cam-box "+u;let p=(E,C)=>{if(!C.length)return;let w=document.createElement("div");w.className=E;let x=document.createElement("section");x.className="node";let v=document.createElement("div");v.className="body",C.forEach(S=>v.appendChild(S)),x.appendChild(v),E==="cam-media"&&(x.style.width=d+"px"),w.appendChild(x),g.appendChild(w)};p("cam-text",f.filter(E=>!l(E))),p("cam-media",f.filter(l)),xe.appendChild(g)}),xe.querySelectorAll("img").forEach(u=>{u.complete||u.addEventListener("load",er,{once:!0})}),er(),window.echarts){let u=[...i.querySelectorAll(".echarts-container")];xe.querySelectorAll(".echarts-container").forEach((f,g)=>{let p=u[g]&&u[g]._opt;if(!p)return;let E=t[g];if(E){f.replaceWith(E),Qt.push(E);return}let C=f;C.removeAttribute("_echarts_instance_"),C.innerHTML="",echarts.init(C,Bi(),{renderer:"svg"}).setOption(wr(p,Oi())),Qt.push(C)})}ia=y;let M=xe.querySelector(".cam-box");if(r&&a&&a!==e&&M&&!Ce&&M.animate){let u=M.getBoundingClientRect();Math.abs(r.width-u.width)<2&&Math.abs(r.height-u.height)<2&&M.animate([{transform:"translate("+(r.left-u.left)+"px,"+(r.top-u.top)+"px)"},{transform:"none"}],{duration:600,easing:"cubic-bezier(.65,0,.35,1)"})}}function er(){let e=R.clientHeight/240;xe.querySelectorAll(".cam-media").forEach(t=>{let a=t.firstElementChild,o=Math.min(t.clientWidth/a.offsetWidth,t.clientHeight/a.offsetHeight,e*1.5);a.style.transform="translate(-50%, -50%) scale("+o+")"}),xe.querySelectorAll(".cam-text").forEach(t=>{let a=t.firstElementChild,o=t.clientWidth,r=t.clientHeight,n=.3,i=e;for(let s=0;s<12;s++){let l=(n+i)/2;a.style.width=o/l+"px",a.offsetHeight*l<=r?n=l:i=l}a.style.width=o/n+"px",a.style.transform="scale("+n+")"})}function zl(){let e=We;if(!e||A.hidden||e.full)return null;let t=R.clientWidth,a=R.clientHeight,o=16,r=t*e.size/100,n=e.circle?r:r*9/16,i=e.corner.includes("left")?o:t-o-r,s=e.corner.includes("top")?o:a-o-n;return{x0:i,y0:s,x1:i+r,y1:s+n}}function Rl(){if(!Je)return;if(oe){_t(!0);return}let e=Ol();je=(je+1)%e.length,ke=e[je],Te(),K||Mt("Camera: "+ke),!ne&&!A.hidden?ht():ye()}function Ci(e){let t=vn(e,{render:Cl});D=t.deck,m=t.nodes,Ja();let a={"+++":"+++ format",reveal:"reveal.js format",headings:"headings"}[t.format];gl.textContent=m.size+(m.size===1?" card":" cards")+" \xB7 "+a,la.textContent=t.errCount?t.errCount+" card(s) had errors":""}function Mi(){rt=[...m.values()].filter(o=>!o.parent).map(o=>o.id);let e=0;function t(o,r){let n=m.get(o);if(n.depth=r,n.children.length===0)n._slot=e++;else{n.children.forEach(s=>t(s,r+1));let i=n.children.map(s=>m.get(s)._slot);n._slot=(Math.min(...i)+Math.max(...i))/2}}rt.forEach(o=>t(o,0)),b=[];function a(o){b.push(o),m.get(o).children.forEach(a)}return rt.forEach(a),Math.max(1,e)}function Dl(){let e=[],t=[],a=[];return m.forEach(o=>{e[o.depth]=Math.max(e[o.depth]||0,o._h),t[o.depth]=Math.max(t[o.depth]||0,o._w),a[o.depth]=(a[o.depth]||0)+1}),{maxH:e,maxW:t,count:a,maxDepth:e.length-1}}function Ti(e){e.x!==null&&!isNaN(e.x)&&(e.cx=e.x+e._w/2),e.y!==null&&!isNaN(e.y)&&(e.cy=e.y+e._h/2)}function Fl(){let{maxH:e,maxDepth:t}=Dl(),a=[0];for(let l=1;l<=t;l++)a[l]=a[l-1]+e[l-1]+wl;let o=vl-Lt,r=[],n=(l,c)=>{let d=m.get(l);d.cx+=c,d.children.forEach(M=>n(M,c))},i=l=>{let c=m.get(l);r[c.depth]=Math.max(r[c.depth]??-1/0,c.cx+c._w/2),c.children.forEach(i)};function s(l){let c=m.get(l),d=r[c.depth]!==void 0?r[c.depth]+o:-1/0;c.children.length?(c.children.forEach(s),c.cx=(m.get(c.children[0]).cx+m.get(c.children[c.children.length-1]).cx)/2,c.cx-c._w/2<d&&n(l,d-(c.cx-c._w/2))):c.cx=(d===-1/0?0:d)+c._w/2,i(l)}rt.forEach(s),m.forEach(l=>{l.cy=a[l.depth]+l._h/2,Ti(l)})}function Nl(e){let t=Math.PI*2/e,a=32,o=[],r=(s,l)=>Math.abs(s.cx-l.cx)<(s._w+l._w)/2+a&&Math.abs(s.cy-l.cy)<(s._h+l._h)/2+a,n=Math.max(0,...[...m.values()].map(s=>s.depth)),i=0;for(let s=0;s<=n;s++){let l=[...m.values()].filter(d=>d.depth===s);if(!l.length)continue;let c=s===0?rt.length>1?kl*.5:0:i+xl;for(let d=0;d<400&&(l.forEach(u=>{let f=(u._slot+.5)*t-Math.PI/2;u.cx=c*Math.cos(f),u.cy=c*Math.sin(f),Ti(u)}),!!l.some((u,f)=>l.some((g,p)=>p>f&&r(u,g))||o.some(g=>r(u,g))));d++)c=c*1.02+10;i=c,o.push(...l)}}function Hl(e){let t=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT),a=[];for(;t.nextNode();)a.push(t.currentNode);a.forEach(o=>{let r=o.data.match(/^\s*\.element:\s*([\s\S]*)$/);if(!r)return;let n=o.previousSibling;for(;n&&n.nodeType===3&&!n.data.trim();)n=n.previousSibling;let i=n&&n.nodeType===1?n:o.parentElement;i&&Object.entries(Vt(r[1])).forEach(([s,l])=>{s==="class"?i.classList.add(...l.split(/\s+/).filter(Boolean)):s==="style"?i.style.cssText+=";"+l:i.setAttribute(s,l)})})}function _l(e){let t=new DOMParser().parseFromString(e,"image/svg+xml"),a=t.documentElement;if(!a||a.localName!=="svg"||t.getElementsByTagName("parsererror").length)return null;let o=a.namespaceURI,r=i=>{[...i.children].forEach(s=>{s.namespaceURI!==o||!jl.has(s.localName)?s.remove():r(s)}),[...i.attributes].forEach(s=>{let l=s.name.toLowerCase(),c=s.value;(l.startsWith("on")||/javascript:|expression\(/i.test(c)||/url\(\s*['"]?(?!#)/i.test(c)||(l==="href"||l==="xlink:href")&&!c.trim().startsWith("#"))&&i.removeAttribute(s.name)})};r(a);let n="st-svg"+ ++Wl+"-";return[a,...a.querySelectorAll("*")].forEach(i=>[...i.attributes].forEach(s=>{let l=s.name==="id"?n+s.value:s.value.replace(/url\(\s*(['"]?)#/g,"url($1#"+n);(s.name==="href"||s.name==="xlink:href")&&l.startsWith("#")&&(l="#"+n+l.slice(1)),l!==s.value&&(s.value=l)})),document.importNode(a,!0)}function He(e,t){let a=e.classList.contains("fragment");["fragment","fade-up","visible","current-fragment"].forEach(o=>{e.classList.contains(o)&&(t.classList.add(o),e.classList.remove(o))}),e.dataset.fragmentIndex!==void 0&&(t.dataset.fragmentIndex=e.dataset.fragmentIndex,delete e.dataset.fragmentIndex),e.replaceWith(t),a&&m.forEach(o=>o.frags&&o.frags.forEach(r=>{let n=r.indexOf(e);n>=0&&(r[n]=t)}))}function qo(e){let t=document.createElement("figure");t.className="media",He(e,t),t.appendChild(e);let a=e.getAttribute("alt");return a&&t.insertAdjacentHTML("beforeend","<figcaption>"+B(a)+"</figcaption>"),t}function Ul(e,t){let a=document.createElement("figure");return a.className="media yt fragment yt-play"+(e.portrait?" portrait":""),a.innerHTML='<div class="frame"><iframe src="'+In(e)+'" title="'+B(t||"YouTube video")+'" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>'+(t?"<figcaption>"+B(t)+"</figcaption>":""),a}function oi(e,t){let a=t<=4?t:t<=6?3:4;e.style.setProperty("--cols",a),e.style.setProperty("--rows",Math.ceil(t/a))}function Gl(e,t){t.querySelectorAll("pre > code.language-svg").forEach(n=>{let i=_l(n.textContent.trim()),s=document.createElement("div");s.className=i?"diagram svg":"diagram err",i?s.appendChild(i):s.textContent="SVG error: not a valid <svg> drawing",He(n.parentElement,s)}),t.querySelectorAll(":scope > p").forEach(n=>{let i=n.children.length===1?n.children[0]:null;if(!i)return;let s=i.tagName==="A"&&n.textContent.trim()===i.textContent.trim()?i.getAttribute("href"):i.tagName==="IMG"?i.getAttribute("src"):null,l=s&&Ro(s);l&&He(n,Ul(l,i.tagName==="IMG"?i.getAttribute("alt"):""))}),t.querySelectorAll(":scope > ul, :scope > ol").forEach(n=>{let i=[...n.children];!i.length||!i.every(s=>Go(s)||Yl(s))||(n.classList.add("gallery"),i.some(s=>!Go(s))&&n.classList.add("diagrams"),i.forEach(s=>{if(!Go(s))return;let l=s.querySelector("img");s.innerHTML="",s.appendChild(l),qo(l)}),i.length>1&&i.every(s=>s.classList.contains("fragment"))?(n.classList.add("carousel"),i[0].classList.remove("fragment","fade-up"),i.forEach((s,l)=>{s.classList.replace("fade-up","current-visible");let c=s.querySelector("figcaption");c&&(c.dataset.count=l+1+" / "+i.length)})):oi(n,i.length))}),t.querySelectorAll(":scope > p").forEach(n=>{if(!ql(n))return;let i=[...n.querySelectorAll("img")];if(i.length===1){He(n,i[0]),qo(i[0]);return}let s=document.createElement("div");s.className="gallery grid",He(n,s),i.forEach(l=>{s.appendChild(l),qo(l)}),oi(s,i.length)});let a=[...t.children].filter(n=>!/^H[1-6]$/.test(n.tagName)&&!(n.nodeType===1&&n.tagName==="HR")),o=a.filter(n=>n.matches("figure.media"));o.length===1&&a.length===1&&e.classList.add("card-media");let r=document.createTreeWalker(t,NodeFilter.SHOW_COMMENT);for(;r.nextNode();)/^\s*view\s*:\s*full\s*$/i.test(r.currentNode.data)&&e.classList.add("card-full");if(a.length===1&&(a[0].matches("figure.media:not(.yt)")||a[0].matches(".gallery.carousel:not(.diagrams)")))e.classList.add("card-bleed");else if(o.length===1&&a.length>1&&!o[0].matches(".yt")){e.classList.add("card-split",a.indexOf(o[0])===0?"media-first":"media-last");let n=document.createElement("div");n.className="split-text",a.filter(i=>i!==o[0]).forEach(i=>n.appendChild(i)),o[0].after(n),a.indexOf(o[0])!==0&&n.after(o[0])}t.querySelector(".gallery")&&e.classList.add("card-gallery")}function Li(e,t){let a=e.querySelector("iframe");a&&a.contentWindow&&a.contentWindow.postMessage(JSON.stringify({event:"command",func:t,args:[]}),"*")}function Vl(e){let t=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT),a=[];for(;t.nextNode();)/^\s*steps\s*$/i.test(t.currentNode.data)&&a.push(t.currentNode);a.forEach(o=>{for(let r=o.nextSibling;r&&!(r.nodeType===8&&/^\s*steps\s*:\s*off\s*$/i.test(r.data));r=r.nextSibling)r.nodeType!==1||r.classList.contains("fragment")||(/^(UL|OL)$/.test(r.tagName)?r.querySelectorAll(":scope > li").forEach(n=>n.classList.add("fragment","fade-up")):r.classList.add("fragment","fade-up"))})}function Kl(e){let t=r=>r.classList.contains("fragment")&&(r.tagName==="P"&&r.children.length===1&&r.children[0].tagName==="IMG"&&!r.textContent.trim()&&!Ro(r.children[0].getAttribute("src")||"")||r.tagName==="PRE"&&!!r.querySelector(Ai)),a=[],o=[];[...e.children].forEach(r=>{t(r)?o.push(r):(o.length>1&&a.push(o),o=[])}),o.length>1&&a.push(o),a.forEach(r=>{let n=document.createElement("ul");r[0].before(n),r.forEach(i=>{let s=document.createElement("li");s.className="fragment fade-up",i.classList.remove("fragment","fade-up"),s.appendChild(i),n.appendChild(s)})})}function Jl(e){let t=[...e.querySelectorAll(".fragment")].map((r,n)=>({e:r,i:n,k:r.dataset.fragmentIndex}));if(t.every(r=>r.k===void 0))return t.map(r=>[r.e]);let a=0;t.forEach(r=>{r.k=r.k===void 0?a:parseFloat(r.k),a=Math.max(a,r.k)+1}),t.sort((r,n)=>r.k-n.k||r.i-n.i);let o=[];return t.forEach((r,n)=>{n&&t[n-1].k===r.k?o[o.length-1].push(r.e):o.push([r.e])}),o}function vr(e,t,a){!e||!e.frags||(a&&e.el.classList.add("snap"),e.frags.forEach((o,r)=>o.forEach(n=>{let i=n.classList.contains("visible");n.classList.toggle("visible",r<t),n.classList.toggle("current-fragment",r===t-1),n.classList.contains("yt-play")&&i!==r<t&&!a&&Li(n,r<t?"playVideo":"pauseVideo")})),a&&(e.el.offsetWidth,e.el.classList.remove("snap")))}function $l(){try{return D.base?new URL(D.base,_e||location.href):_e?new URL(_e):null}catch{return null}}function Xl(e){let t=$l(),a=0;return e.querySelectorAll("img[src], source[src], video[src], iframe[src], a[href]").forEach(o=>{let r=o.hasAttribute("src")?"src":"href",n=o.getAttribute(r);if(!n||/^(#|[a-z][a-z0-9+.-]*:|\/\/)/i.test(n))return;if(!t){r==="src"&&!n.startsWith("/")&&a++;return}let i=t;try{D.site&&(i=new URL(D.site,t))}catch{}o.setAttribute(r,new URL(n,n.startsWith("/")?i:t).href)}),a}function po(e){let t=e.el,a=t.querySelector(".body");t.classList.add("measuring"),a.style.zoom="";let o=Lt;e.visual=!!a.querySelector("iframe, .echarts-container, pre > code.language-dot, pre > code.language-d2, pre > code.language-echarts, .diagram, figure.media"),e.visual&&(o=ie);let r=t.classList.contains("card-full");if(t.classList.remove("img-portrait","img-landscape","img-overlay","img-cover"),r&&(o=ge()?yt:ie),t.classList.contains("card-bleed")){let l=Math.max(0,...[...a.querySelectorAll("img")].map(d=>d.naturalWidth&&d.naturalHeight?d.naturalWidth/d.naturalHeight:0))||1.7777777777777777,c=ie-yt*l>=260;if(r&&c)t.classList.add("img-portrait"),t.style.setProperty("--img-w",Math.round(yt*l)+"px"),o=ie;else if(r||Math.abs(l-16/9)<.08)t.classList.add("img-overlay"),o=ie,l>=16/9&&l<=16/9*1.15&&t.classList.add("img-cover");else if(l<1.3){let d=Math.min(Math.round(yt*l),ie-300);t.classList.add("img-portrait"),t.style.setProperty("--img-w",d+"px"),o=Math.min(ie,Math.max(Uo,d*2))}else t.classList.add("img-landscape"),o=Math.round(Math.max(Lt,Math.min(ie,(yt-bl)*l))),t.style.setProperty("--img-h",Math.round(o/l)+"px")}else(a.querySelector('[style*="flex"], [style*="grid"], .r-hstack')||a.querySelectorAll("img").length>=4)&&(o=Uo);let n=a.querySelectorAll("table");if(n.length){t.style.width=ie+"px";let l=t.offsetWidth-a.clientWidth;n.forEach(c=>{o=Math.max(o,Math.min(Uo,Math.ceil(c.offsetWidth)+l+12))})}let i=a.querySelectorAll("pre");if(i.length){t.style.width=ie+"px";let l=t.offsetWidth-a.clientWidth;i.forEach(c=>{c.style.width="max-content",o=Math.max(o,Math.min(ie,Math.ceil(c.offsetWidth)+l+2)),c.style.width=""})}let s=a.querySelectorAll(".fragment.grow");if(s.length){t.style.width=o+"px";let l=t.offsetWidth-a.clientWidth;s.forEach(c=>{o=Math.max(o,Math.min(ie,Math.ceil(c.offsetWidth*1.3)+l))})}r&&(o=ge()?yt:ie),t.style.width=o+"px",!r&&t.scrollWidth>o+2&&(t.style.width=(o=Math.min(ie,t.scrollWidth+24))+"px"),a.scrollWidth>a.clientWidth+2&&(a.style.zoom=(a.clientWidth/a.scrollWidth).toFixed(3)),e._w=o,e._h=t.offsetHeight||Qo,t.classList.remove("measuring")}function Ql(){clearTimeout(ri),ri=setTimeout(()=>{m.forEach(po),fa(),ye(!0)},200)}function Bi(){let e=ho()==="light"?"light":"dark",t=Ie(e==="light"?"--accent-ring":"--accent"),a="slidetake-"+e+"-"+t.slice(1);return ni.has(a)||(ac(a,tc[e],t),ni.add(a)),a}function ac(e,t,a){let o={axisLine:{lineStyle:{color:t.line}},axisTick:{lineStyle:{color:t.line}},axisLabel:{color:t.muted},splitLine:{lineStyle:{color:t.split}},nameTextStyle:{color:t.muted}};echarts.registerTheme(e,{color:[a,...t.palette],backgroundColor:"transparent",textStyle:{color:t.text,fontFamily:"'IBM Plex Sans', sans-serif"},title:{textStyle:{color:t.text},subtextStyle:{color:t.muted}},legend:{textStyle:{color:t.text}},tooltip:{backgroundColor:t.tip,borderColor:t.line,textStyle:{color:t.text}},categoryAxis:o,valueAxis:o,logAxis:o,timeAxis:o,pie:{label:{color:t.text,textBorderWidth:0},labelLine:{lineStyle:{color:t.muted}}},funnel:{label:{color:t.text,textBorderWidth:0}},bar:{label:{color:t.text,textBorderWidth:0}},line:{symbolSize:6,lineStyle:{width:2.5},label:{color:t.text,textBorderWidth:0}}})}function nc(){let e=ho()==="light"?"light":"dark",t=Ie("--node-bg"),a=Ie(e==="dark"?"--accent":"--accent-line"),o=e==="dark"?[.58,.38,.25,.18,.12]:[.7,.45,.25,.15,.08],r={...rc[e],N7:t,B1:Ie("--accent")};return o.forEach((n,i)=>{r["B"+(i+2)]=Bl(a,t,n)}),r}function ic(){let e=Ie("--text"),t=Ie("--text-muted"),a=Ie("--accent"),o='"Helvetica,Arial,sans-serif"';return' graph [bgcolor=transparent color="'+t+'" fontcolor="'+e+'" fontname='+o+'] node [color="'+a+'" fontcolor="'+e+'" fontname='+o+'] edge [color="'+t+'" fontcolor="'+t+'" fontname='+o+"] "}function tr(e){return Vo[e]||(Vo[e]=new Promise((t,a)=>{let o=document.createElement("script");o.src=e,o.onload=t,o.onerror=()=>{delete Vo[e],a(new Error("could not load "+e))},document.head.appendChild(o)}))}function wr(e,t){return Object.assign({backgroundColor:"transparent",animationDelay:300},e,{animation:t&&!Ce})}function Oi(){if(ar)return!0;let e=b.indexOf(Ni),t=b.indexOf(y);return e<0||t>e}function cc(e){Ce||!window.echarts||!Oi()||e.el.querySelectorAll(".echarts-container").forEach(t=>{let a=echarts.getInstanceByDom(t);!a||!t._opt||(a.clear(),a.setOption(wr(t._opt,!0)))})}async function dc(){let e=Ze,t=[...ee.querySelectorAll(".node pre > code.language-dot")];ee.querySelectorAll(".node pre > code.language-echarts").forEach(n=>{let i=document.createElement("div");i.className="echarts-container",i.dataset.chart=n.textContent,He(n.parentElement,i)});let a=[...ee.querySelectorAll(".node .echarts-container[data-chart]")],o=[...ee.querySelectorAll(".node pre > code.language-d2")];if(!t.length&&!a.length&&!o.length)return;let r=[];if(t.length)try{if(await tr(Zl),Yo=Yo||await Viz.instance(),e!==Ze)return;let n=ic();t.forEach(i=>{let s=document.createElement("div");s.className="diagram dot";try{s.appendChild(Yo.renderSVGElement(sc(i.textContent,n)))}catch(l){s.className="diagram err",s.textContent="Diagram error: "+l.message}He(i.parentElement,s)})}catch{r.push("diagrams")}if(o.length)try{if(!Ha){let i=await import(oc);Ha=new i.D2}if(e!==Ze)return;let n=nc();for(let i of o){let s=document.createElement("div");s.className="diagram d2";try{let l=await Ha.compile(lc(i.textContent));s.innerHTML=await Ha.render(l.diagram,{...l.renderOptions||{},themeOverrides:n,darkThemeOverrides:n})}catch(l){s.className="diagram err",s.textContent="Diagram error: "+(l.message||l)}if(e!==Ze)return;He(i.parentElement,s)}}catch{r.push("D2 diagrams")}if(a.length)try{if(await tr(ec),e!==Ze)return;let n=Bi();a.forEach(i=>{let s;try{s=JSON.parse(i.dataset.chart)}catch{i.textContent="Chart data is not valid JSON.";return}i._opt=s;let l=echarts.init(i,n,{renderer:"svg"}),c=i.closest(".node")===(m.get(y)||{}).el;l.setOption(wr(s,c))})}catch{r.push("charts")}e===Ze&&(ia=null,Ye&&Ei(Ye),r.length&&(la.textContent="Could not load the "+r.join(" and ")+" renderer (offline?)"),m.forEach(po),fa(),ye(!0))}function hc(){let e=[];return b.forEach(t=>{let a=Dt(t),o=e[e.length-1];o&&o.sec===a?o.ids.push(t):e.push({sec:a,ids:[t]})}),e}function pc(){let a=0,o=0,r=0;hc().forEach((n,i)=>{let s=Math.max(...n.ids.map(d=>m.get(d)._h));i&&(a+=r/2+120+s/2);let l=o,c=o;n.ids.forEach((d,M)=>{let u=m.get(d);M&&(l+=90+u._w/2),u.cx=l,u.cy=a,c=l,l+=u._w/2}),o=c,r=s})}function uc(){m.forEach(e=>{e.cx=0,e.cy=0})}function Ii(){Ze++,window.echarts&&ee.querySelectorAll(".echarts-container").forEach(a=>{let o=echarts.getInstanceByDom(a);o&&o.dispose()}),ee.querySelectorAll("div.node").forEach(a=>a.remove());let e=Mi(),t=0;m.forEach(a=>{let o=document.createElement("div");o.className="node",o.tabIndex=0,o.dataset.id=a.id;let r=a.parent?uo(a.id).slice(0,-1).map(i=>m.get(i).title).join(" / "):"";o.innerHTML=(r?'<div class="crumb">'+B(r)+"</div>":"")+'<div class="body">'+a.html+"</div>"+(a.err?'<div class="err-badge">!</div>':"");let n=o.querySelector(".body");Hl(n),Vl(n),Kl(n),Gl(o,n),/^slidetake$/i.test(D.brand||"")&&Tl(n),n.querySelectorAll("thead").forEach(i=>{i.textContent.trim()||i.remove()}),t+=Xl(n),a.frags=Jl(n),n.querySelectorAll("img").forEach(i=>{i.complete||i.addEventListener("load",Ql,{once:!0})}),o.querySelectorAll("a[href]").forEach(i=>{let s=i.getAttribute("href");if(s.startsWith("#")){let l=decodeURIComponent(s.slice(1));m.has(l)&&(i.classList.add("xlink"),i.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),h.active||_(l)}))}else i.target="_blank",i.rel="noopener",i.addEventListener("click",l=>l.stopPropagation())}),o.addEventListener("click",()=>{h.active||_(a.id)}),o.addEventListener("keydown",i=>{i.key==="Enter"&&i.target===o&&_(a.id)}),ee.appendChild(o),a.el=o,vr(a,a.frags.length)}),t&&!la.textContent&&(la.textContent=t+" image(s) use relative paths: add base: to the deck, or open it with ?src="),m.forEach(po),fa(e),dc()}function fa(e){e===void 0&&(e=Mi()),J==="radial"?Nl(e):J==="path"?pc():J==="focus"?uc():Fl(),ee.classList.toggle("focus",J==="focus"),m.forEach(t=>{let a=t.el.style;a.setProperty("--cx",t.cx),a.setProperty("--cy",t.cy)}),mc(),Ht(),Sr()}function mc(){let e="";if(J==="focus"){_o.innerHTML="";return}if(J==="path"){for(let t=1;t<b.length;t++){let a=m.get(b[t-1]),o=m.get(b[t]);e+='<path data-from="'+a.id+'" data-to="'+o.id+'" d="M '+a.cx+" "+a.cy+" L "+o.cx+" "+o.cy+'"/>'}_o.innerHTML=e;return}m.forEach(t=>{if(!t.parent)return;let a=m.get(t.parent);if(J==="radial")e+='<path data-from="'+a.id+'" data-to="'+t.id+'" d="M '+a.cx+" "+a.cy+" L "+t.cx+" "+t.cy+'"/>';else{let o=a.cy+a._h/2,r=t.cy-t._h/2,n=o+(r-o)/2;e+='<path data-from="'+a.id+'" data-to="'+t.id+'" d="M '+a.cx+" "+o+" L "+a.cx+" "+n+" L "+t.cx+" "+n+" L "+t.cx+" "+r+'"/>'}}),_o.innerHTML=e}function uo(e){let t=[],a=e;for(;a;)t.unshift(a),a=m.get(a).parent;return t}function At(){let e=R.clientWidth,t=R.clientHeight;ee.style.transform="translate("+e/2+"px,"+t/2+"px) scale("+z.zoom+") translate("+-z.x+"px,"+-z.y+"px)",Wi()}function xr(){na&&(na.kill(),na=null)}function Pi(e,t){if(xr(),t||Ce||!window.gsap){Object.assign(z,e),At();return}let a=R.clientWidth,o=Math.hypot(e.x-z.x,e.y-z.y),r=e.zoom,n=gsap.timeline({onUpdate:At,onComplete:()=>{na=null}}),{zoom:i,...s}=e,l=o*Math.min(z.zoom,r),c=Math.max(.55,Math.min(1.3,.55+l/a*.3));if(n.to(z,{...s,duration:c,ease:"power2.inOut"},0),l>a*1.2){let d=Math.max(.06,Math.min(z.zoom,r,a*.9/(o+Lt)));n.to(z,{zoom:d,duration:c/2,ease:"sine.out"},0).to(z,{zoom:r,duration:c/2,ease:"sine.in"},c/2)}else n.to(z,{zoom:r,duration:c,ease:"power2.inOut"},0);na=n}function fc(){let e=R.getBoundingClientRect(),t=14,a=[];if(!Fe.hidden&&Fe.offsetWidth){let r=Fe.getBoundingClientRect();a.push({x0:r.left-e.left-t,y0:r.top-e.top-t,x1:r.right-e.left+t,y1:r.bottom-e.top+t})}let o=zl();return o&&a.push({x0:o.x0-t,y0:o.y0-t,x1:o.x1+t,y1:o.y1+t}),a}function gc(){let e=R.clientWidth,t=R.clientHeight,a=[{x0:16,y0:K?20:56,x1:e-16,y1:t-(K?20:74)}];return fc().forEach(o=>{let r=[];a.forEach(n=>{if(o.x1<=n.x0||o.x0>=n.x1||o.y1<=n.y0||o.y0>=n.y1){r.push(n);return}[{...n,x1:Math.min(n.x1,o.x0)},{...n,x0:Math.max(n.x0,o.x1)},{...n,y1:Math.min(n.y1,o.y0)},{...n,y0:Math.max(n.y0,o.y1)}].forEach(i=>{i.x1-i.x0>80&&i.y1-i.y0>80&&r.push(i)})}),r.length&&(a=r)}),a}function or(e,t,a){let o=R.clientWidth,r=R.clientHeight,n=null;return gc().forEach(i=>{let s=a*Math.min((i.x1-i.x0)/e,(i.y1-i.y0)/t);(!n||s>n.zoom)&&(n={zoom:s,sx:(i.x0+i.x1)/2-o/2,sy:(i.y0+i.y1)/2-r/2})}),n}function zi(e,t,a,o){return{x:e-a.sx/o,y:t-a.sy/o}}function Re(e,t){let a=m.get(e);if(!a)return;let o=or(a._w,a._h,ca),r=Dt(e),n=b.filter(l=>Dt(l)===r&&!m.get(l).visual).map(l=>{let c=m.get(l);return or(c._w,c._h,ca).zoom}).sort((l,c)=>l-c),i=n.length?n[Math.floor((n.length-1)/2)]:o.zoom,s=Math.max(.2,Math.min(5,o.zoom,i));Pi(Object.assign(zi(a.cx,a.cy,o,s),{zoom:s}),t)}function ga(e){let t=[...m.values()];if(!t.length)return;let a=R.clientWidth,o=R.clientHeight,r=Math.min(...t.map(d=>d.cx-d._w/2)),n=Math.max(...t.map(d=>d.cx+d._w/2)),i=Math.min(...t.map(d=>d.cy-d._h/2)),s=Math.max(...t.map(d=>d.cy+d._h/2)),l=or(n-r,s-i,.94),c=Math.max(.05,Math.min(1,l.zoom));Pi(Object.assign(zi((r+n)/2,(i+s)/2,l,c),{zoom:c}),e)}function ye(e){y&&m.has(y)?Re(y,e):ga(e)}function Ht(){let e=y?uo(y):[];m.forEach(t=>{let a=t.el;a.classList.toggle("current",t.id===y),a.classList.toggle("active-path",e.includes(t.id))}),ee.querySelectorAll("#connectors path").forEach(t=>{let a=J==="path"?!!y&&b.indexOf(t.dataset.to)<=b.indexOf(y):e.includes(t.dataset.from)&&e.includes(t.dataset.to);t.classList.toggle("active",a)}),wc(e),Di()}function Ri(){return fn(new URLSearchParams(location.search).get("duration")??D.duration)}function yc(){return K&&Ri()>0&&(!h.active||/^always$/i.test(D.timer||""))}function $a(){let e=yc()&&Ue.start>0;if(tt.classList.toggle("timed",e),!e){tt.classList.remove("over");return}let a=(h.active&&h.t0?It():performance.now()-Ue.start)/Ri();tt.firstChild.style.width=Math.min(100,a*100)+"%",tt.classList.toggle("over",a>=1)}function bc(){Ue.start=performance.now(),clearInterval(Ue.timer),Ue.timer=setInterval($a,1e3),$a()}function vc(){clearInterval(Ue.timer),Ue.timer=null,Ue.start=0,$a()}function Di(){let e=K&&b.length>1&&!/^(off|no|false)$/i.test(D.progress||"");if(tt.classList.toggle("show",e),!e)return;$a();let t=b.indexOf(y),a=0,o=0;b.forEach((r,n)=>{let i=Nt(m.get(r)).length;a+=i,n<t?o+=i:n===t&&(o+=Math.min(Me,i-1)+1)}),tt.lastChild.style.width=(a?o/a*100:0)+"%"}function wc(e){ei.innerHTML=e.map((t,a)=>(a>0?'<span class="sep">\u203A</span>':"")+'<button class="crumb-btn'+(t===y?" here":"")+'" data-id="'+B(t)+'">'+B(m.get(t).title)+"</button>").join(""),ei.querySelectorAll(".crumb-btn").forEach(t=>t.addEventListener("click",()=>{h.active||_(t.dataset.id)}))}function mo(e){let t=m.get(y);t&&(vr(t,Si().frag,e),Te(),(A.hidden||!We||!We.full||We.behind)&&Sc(t),kr(t))}function kc(e){return!b.length||e.id!==b[0]&&e.id!==b[b.length-1]||e.el.querySelector("[data-gsap], .title-scramble")?null:[...e.el.querySelector(".body").children].filter(t=>!t.classList.contains("fragment"))}function Sc(e){if(e._played||(e._played=!0,cc(e),!window.gsap||Ce))return;let t=kc(e);t&&t.length&&(e._auto=t,gsap.from(t,{opacity:0,y:24,duration:.7,ease:"power2.out",delay:.3,stagger:.45})),e.el.querySelectorAll("[data-gsap]").forEach(a=>{let o;try{o=JSON.parse(a.dataset.gsap)}catch{return}let r={duration:o.duration??1,delay:o.delay??0,ease:o.ease||"power2.out"};o.to?gsap.fromTo(a,o.from||{},Object.assign({},o.to,r)):o.from&&gsap.from(a,Object.assign({},o.from,r))}),e.el.querySelectorAll(".title-scramble").forEach(Ec)}function fo(e){!e||!e._played||(e._played=!1,window.gsap&&(e._auto&&(e._auto.forEach(t=>{gsap.killTweensOf(t),gsap.set(t,{clearProps:"opacity,transform"})}),e._auto=null),e.el.querySelectorAll("[data-gsap]").forEach(t=>{gsap.killTweensOf(t);let a={};try{a=JSON.parse(t.dataset.gsap)}catch{}let o=new Set(Object.keys(Object.assign({},a.from,a.to)).map(r=>xc.includes(r)?"transform":r));o.size&&gsap.set(t,{clearProps:[...o].join(",")})}),e.el.querySelectorAll(".title-scramble").forEach(t=>{t._scramble&&t._scramble.kill(),t.dataset.text&&(t.textContent=t.dataset.text)})))}function Ec(e){let t=e.dataset.text||(e.dataset.text=e.textContent),a=Array.from(t),o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=?",r={p:0};e._scramble=gsap.to(r,{p:1,duration:1.4,ease:"none",onUpdate(){let n=Math.floor(r.p*a.length);e.textContent=a.map((i,s)=>s<n||/\s/.test(i)?i:o[Math.random()*o.length|0]).join("")},onComplete(){e.textContent=t}})}function kr(e){clearTimeout(Bt),!(!K||!e||!e.autoslide||h.active&&(!h.t0||h.paused))&&(Bt=setTimeout(()=>{y===e.id&&qe(1)},e.autoslide))}function Fi(e){let t=e&&e!==b[0]?e:"";try{T&&T.kind==="share"?history.replaceState(null,"",location.pathname+location.search+Po(T.data,t)):history.replaceState(null,"",e?"#"+encodeURIComponent(e):location.pathname+location.search)}catch{}}function _(e,t,a){if(!m.has(e))return;Tc();let o=!!Ye;if(e!==y){ke=null,je=-1,Me=a?Nt(m.get(e)).length-1:0;let s=m.get(y);s&&J==="focus"&&!t&&(s.el.classList.add("leaving"),setTimeout(()=>s.el.classList.remove("leaving"),600)),Hi()}let r=e!==y;if(r&&(Ni=y),y=e,clearTimeout(me),me=null,r&&J==="focus"&&!t&&!Ce){let s=m.get(e).el;s.classList.add("entering"),s.offsetWidth,s.classList.remove("entering")}let n=m.get(e),i=r&&!t&&!Ce&&!!R.animate&&!n.mapFirst&&o!==Cc(br());i&&o&&(Xa=!0),mo(r),r&&!Pe&&ua("slide",e),i?Mc(e,o):r&&n.mapFirst&&!a&&!t&&J!=="focus"?(ga(),me=setTimeout(()=>{me=null,y===e&&(Te(),Re(e))},1900),Te()):Re(e,t),Ht(),Sr(),Fi(e)}function Cc(e){return!!(e.behind&&e.place&&!e.off)}function Mc(e,t){t&&(Re(e,!0),ee.style.display="none",ee.offsetWidth,ee.style.display=""),R.classList.add("layout-fade");let a=R.animate([{opacity:t?0:1},{opacity:t?1:0}],{duration:450,easing:"ease-in-out"});wt=()=>{wt=null,a.cancel(),R.classList.remove("layout-fade"),Xa&&(Xa=!1,br().behind||(A.hidden=!0),Te()),!t&&y&&Re(y,!0)},a.onfinish=()=>{wt&&wt()}}function Tc(){wt&&wt()}function Hi(){let e=m.get(y);e&&(e.el.querySelectorAll("figure.yt").forEach(t=>Li(t,"pauseVideo")),vr(e,e.frags.length,!0),fo(e))}function Lc(){if(!y&&at&&m.has(at)){ji();return}y&&(at=y),J==="focus"&&Er("path"),Hi(),clearTimeout(Bt),y=null,Te(),Ht(),Sr(),ga(),Fi(null)}function ji(){if(me)return clearTimeout(me),me=null,Te(),Re(y),!0;if(!y&&at&&m.has(at)){let e=at;return at=null,_(e),!0}return!1}function qe(e){if(!y){b.length&&_(b[e>0?0:b.length-1]);return}if(me&&e>0){clearTimeout(me),me=null,Te(),Re(y);return}let t=Nt(m.get(y)),a=Math.min(Me,t.length-1)+e;if(a>=0&&a<t.length){Me=a,ke=null,je=-1,mo(),!ne&&!A.hidden&&We.used?ht():ye(),Ht();return}let o=b.indexOf(y)+e;o>=0&&o<b.length&&_(b[o],!1,e<0)}function Ac(){let e=m.get(y);e&&e.parent&&_(e.parent)}function Bc(){let e=m.get(y);e&&e.children.length?_(e.children[0]):!y&&b.length&&_(b[0])}function Sr(){let e=[...m.values()];if(!e.length){Xo.innerHTML="",Be=null;return}yl.textContent="map";let t=p=>p.cx,a=p=>p.cy,o=Math.min(...e.map(t))-Lt/2,r=Math.max(...e.map(t))+Lt/2,n=Math.min(...e.map(a))-Qo/2,i=Math.max(...e.map(a))+Qo/2,s=16,l=180,c=130,d=Math.min((l-2*s)/Math.max(1,r-o),(c-2*s-6)/Math.max(1,i-n)),M=l/2-(o+r)/2*d,u=c/2+5-(n+i)/2*d,f=y?uo(y):[],g="";e.forEach(p=>{if(!p.parent)return;let E=m.get(p.parent);g+='<line x1="'+(t(E)*d+M)+'" y1="'+(a(E)*d+u)+'" x2="'+(t(p)*d+M)+'" y2="'+(a(p)*d+u)+'" stroke="var(--panel-line)" stroke-width="1"/>'}),e.forEach(p=>{let E=p.id===y?"var(--accent)":f.includes(p.id)?"var(--accent-teal)":"var(--node-border)";g+='<circle data-id="'+B(p.id)+'" cx="'+(t(p)*d+M)+'" cy="'+(a(p)*d+u)+'" r="'+(p.id===y?4:3)+'" fill="'+E+'"><title>'+B(p.title)+"</title></circle>"}),g+='<rect id="mm-viewport" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.7"/>',Xo.innerHTML=g,Be={s:d,ox:M,oy:u},Wi()}function Wi(){let e=document.getElementById("mm-viewport");if(!e||!Be)return;let t=R.clientWidth/z.zoom,a=R.clientHeight/z.zoom;e.setAttribute("x",(z.x-t/2)*Be.s+Be.ox),e.setAttribute("y",(z.y-a/2)*Be.s+Be.oy),e.setAttribute("width",Math.max(2,t*Be.s)),e.setAttribute("height",Math.max(2,a*Be.s))}function Ot(e){Ci(ce.value),y&&!m.has(y)&&(y=null),Ii(),y?_(y,e):b.length?_(b[0],e):(y=null,ga(!0))}function Er(e,t){J=e,W("slidetake:layout",e),document.querySelectorAll("#layout-toggle .seg-btn").forEach(a=>a.classList.toggle("active",a.dataset.mode===e)),m.size&&(!t&&!Ce&&(ee.classList.add("morph"),setTimeout(()=>ee.classList.remove("morph"),700)),fa(),At(),y?Re(y,t):ga(t))}function _i(e){return Math.max(.04,Math.min(5,e))}function Oc(e){ca=Math.round(Math.max(Sl,Math.min(El,e))*100)/100,W("slidetake:slideSize",ca),y&&Re(y)}function ii(e){y?Oc(ca+e*.1):Ui(e>0?1.2:1/1.2)}function Ui(e,t,a){xr();let o=_i(z.zoom*e);if(t!==void 0){let r=R.getBoundingClientRect(),n=t-r.left-r.width/2,i=a-r.top-r.height/2;z.x+=n/z.zoom-n/o,z.y+=i/z.zoom-i/o}z.zoom=o,At()}function go(){U||(Ve.classList.toggle("collapsed"),document.getElementById("btn-edit-toggle").classList.toggle("active",!Ve.classList.contains("collapsed")))}function Se(e){K=e,document.body.classList.toggle("presenting",e),zs(document.getElementById("btn-present"),e),Rs();let t=document.documentElement;e&&t.requestFullscreen&&!document.fullscreenElement&&t.requestFullscreen().catch(()=>{}),!e&&document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen().catch(()=>{}),e&&!y&&b.length&&_(b[0]);let a=D.camera||[...m.values()].some(o=>o.camera);e&&a&&!ne&&!oe&&ht(),e?kr(m.get(y)):clearTimeout(Bt),e?bc():vc(),Di()}function It(){return(h.paused?h.pauseAt:performance.now())-h.t0-h.pausedMs}function ya(e){e.classList.add("open")}function Rc(e){if(W("slidetake:analytics",e?"on":"off"),!e){window["ga-disable-"+Pc]=!0;let t=["","; Domain="+location.hostname,"; Domain=."+location.hostname.replace(/^www\./,"")];document.cookie.split(";").map(a=>a.split("=")[0].trim()).filter(a=>a==="_ga"||a.startsWith("_ga_")).forEach(a=>t.forEach(o=>{document.cookie=a+"=; Max-Age=0; Path=/"+o}))}Gi()}function Gi(){Tr.querySelectorAll("[data-analytics]").forEach(e=>e.setAttribute("aria-checked",String(e.dataset.analytics==="on"===zc())))}function ba(){document.querySelectorAll(".modal.open").forEach(e=>e.classList.remove("open"))}function Dc(){let e=new URLSearchParams(location.search).get("obs");if(e){let[t,a,...o]=e.split(":");return Qa.value=t||"localhost",Za.value=a||"4455",eo.value=o.join(":"),!0}try{let t=JSON.parse(j("slidetake:obs")||"null");t&&(Qa.value=t.host||"localhost",Za.value=t.port||"4455",eo.value=t.password||"",Cr.checked=!0)}catch{}return!1}function Yi(){if(Cr.checked)W("slidetake:obs",JSON.stringify({host:Qa.value.trim(),port:Za.value.trim(),password:eo.value}));else try{localStorage.removeItem("slidetake:obs")}catch{}}function Zt(e,t,a){sa.textContent=e,sa.className=t||"",sa.title=a||e;let o=document.getElementById("obs-detail");o.textContent=a||"",o.hidden=!a}function Nc(e){return location.protocol==="https:"&&!Fc(e)}async function Lr(){let e=Qa.value.trim()||"localhost",t="ws://"+e+":"+(Za.value.trim()||"4455");if(Nc(e)){ze=!1,Zt("Blocked here","err",Hc);return}Zt("Connecting\u2026"),sa.title="Connecting to "+t;try{await tr(Ic);let a=window.OBSWebSocket&&(window.OBSWebSocket.default||window.OBSWebSocket);if(se)try{await se.disconnect()}catch{}se=new a,se.on("ConnectionClosed",()=>{ze=!1,Zt("Disconnected","err")}),se.on("RecordStateChanged",r=>{r.outputState==="OBS_WEBSOCKET_OUTPUT_STARTED"&&ot&&(ot(),ot=null),r.outputState==="OBS_WEBSOCKET_OUTPUT_STOPPED"&&h.active&&h.withObs&&!h.finishing&&Rt("Stopped in OBS")});let o=await se.connect(t,eo.value||void 0);ze=!0;try{let r=await se.call("GetVideoSettings");r&&r.fpsNumerator&&r.fpsDenominator&&(Mr=r.fpsNumerator/r.fpsDenominator),qi=r&&r.outputWidth&&r.outputHeight?qn(r.outputWidth,r.outputHeight):""}catch{}Zt("Connected","ok",""),sa.title="Connected"+(o&&o.obsWebSocketVersion?" \xB7 OBS WebSocket "+o.obsWebSocketVersion:""),Yi(),Y.classList.contains("open")&&ct()&&(O("Connected to OBS. Press \u25CF Record."),$e())}catch(a){ze=!1;let o=a&&a.message&&a.message!=="Error"?a.message+".":"Nothing answered at "+t+".";Zt("Could not connect","err",o+" Is OBS running with its WebSocket server on, and are the port and password right?")}}function jc(){let e=document.getElementById("rec-screen"),t=screen.width,a=screen.height;if(ge()){e.innerHTML='<span class="warn">This deck is portrait (9:16). In OBS, set the canvas to 1080\xD71920 (Settings \u2192 Video) and fit the 9:16 column in the middle of the screen to it.</span>';return}if(Math.abs(t/a-16/9)<.02){e.innerHTML='<span class="ok">This screen is 16:9 ('+t+"\xD7"+a+"), right for YouTube.</span>";return}let o=[["16:10",1.6],["3:2",1.5],["4:3",4/3],["21:9",21/9],["16:9",16/9]],[r,n]=o.reduce((s,l)=>Math.abs(l[1]-t/a)<Math.abs(s[1]-t/a)?l:s),i=Math.abs(n-t/a)<.005?r:"about "+r;e.innerHTML='<span class="warn">This screen is '+i+" ("+t+"\xD7"+a+"), not 16:9, so the video will have bars or be cropped. Move this window to a 16:9 screen, physical or virtual (say 1920\xD71080), then press F there.</span>"}function Le(){let e=navigator.mediaDevices;if(!window.isSecureContext||!e||!e.getDisplayMedia)return{why:"This page can\u2019t capture itself here. Open Slidetake in Chrome or Edge on a computer."};if(!window.RestrictionTarget&&!window.CropTarget)return{why:"Recording in the browser needs Chrome or Edge (or another Chromium browser) on a computer."};let t=window.MediaRecorder?jn(r=>MediaRecorder.isTypeSupported(r)):"";if(!t||!navigator.storage||!navigator.storage.getDirectory)return{why:"This browser can\u2019t record video here. Use a recent Chrome or Edge."};let{quality:a,device:o}=Hn(screen.width,screen.height-_c,devicePixelRatio||1,ge());return a?{ok:!0,type:t,quality:a}:{why:"This screen gives a "+o[0]+"\xD7"+o[1]+" frame, less than 720p. Use pro mode (OBS), or a larger screen."}}async function yo(){ir++,pe&&(cancelAnimationFrame(pe.raf),pe.stream.getTracks().forEach(e=>e.stop()),pe.ctx.close().catch(()=>{}),pe=null,nr.value=0,Et.getContext("2d").clearRect(0,0,Et.width,Et.height),Ki())}function Ki(){sr++,Ua&&(Ua.getTracks().forEach(e=>e.stop()),Ua=null),Ar.srcObject=null}async function Ji(){Ki(),Br();let e=sr,t=St.value;if(Wa.hidden=t!=="none"&&!!t,Wa.textContent="No camera",!(!t||t==="none"))try{let a=await navigator.mediaDevices.getUserMedia({video:t==="default"?!0:{deviceId:{exact:t}}});if(e!==sr){a.getTracks().forEach(o=>o.stop());return}Ua=a,Ar.srcObject=a}catch{Wa.hidden=!1,Wa.textContent="The camera isn\u2019t available"}}async function to(){await yo();let e=ir;try{let t=Pt.value,a=await navigator.mediaDevices.getUserMedia({audio:ps(t)});if(e!==ir){a.getTracks().forEach(u=>u.stop());return}let o=new AudioContext,r=o.createAnalyser();r.fftSize=512,o.createMediaStreamSource(a).connect(r);let n=new Float32Array(r.fftSize),i=pe={stream:a,ctx:o,raf:0},s=Et.getContext("2d"),l=Et.width,c=Et.height,d=Ie("--accent"),M=()=>{if(pe!==i)return;r.getFloatTimeDomainData(n);let u=0;for(let f of n)u=Math.max(u,Math.abs(f));nr.value=Math.max(u,nr.value*.85),s.clearRect(0,0,l,c),s.lineWidth=3,s.strokeStyle=d,s.lineJoin="round",s.beginPath();for(let f=0;f<n.length;f++){let g=f/(n.length-1)*l,p=c/2-Math.max(-1,Math.min(1,n[f]*3))*(c/2-4);f?s.lineTo(g,p):s.moveTo(g,p)}s.stroke(),i.raf=requestAnimationFrame(M)};M()}catch(t){xt.innerHTML='<span class="warn">The microphone isn\u2019t available: '+B(t.message||t.name)+". Allow it in the site settings.</span>"}}async function ao(e=!0){try{e&&!pe&&await to();let t=await navigator.mediaDevices.enumerateDevices(),a=(n,i)=>{let s=t.filter(g=>g.kind===n),l=s.find(g=>g.deviceId==="default"),c=l?l.label.replace(/^Default - /,""):"",d=s.filter(g=>g.deviceId!=="default"&&g.deviceId!=="communications"),M=g=>!!l&&(g.label===c||!!l.groupId&&g.groupId===l.groupId&&!d.some(p=>p!==g&&p.label===c)),u=d.map((g,p)=>Un(g.label)||(n==="audioinput"?"Microphone ":"Camera ")+(p+1));u.forEach((g,p)=>{let E=u.slice(0,p).filter(C=>C===g).length;E&&(u[p]=g+" "+(E+1))});let f=d.some(g=>g.deviceId===i)||i==="none"?i:(d.find(M)||d[0]||{}).deviceId;return d.map((g,p)=>'<option value="'+B(g.deviceId)+'"'+(g.deviceId===f?" selected":"")+">"+B(u[p]+(M(g)?" (system default)":""))+"</option>").join("")},o=Or();St.innerHTML='<option value="none"'+(o==="none"?" selected":"")+">No camera</option>"+a("videoinput",o);let r=j("slidetake:mic")||"";Pt.innerHTML=a("audioinput",r),r&&Pt.value===r&&pe&&pe.stream.getAudioTracks()[0].getSettings().deviceId!==r&&to()}catch{}}function $i(){let e=j("slidetake:mirror");return e?e==="on":/^(yes|true|on)$/i.test(D.pip_mirror||"")}function Br(){oo.checked=$i(),Ar.parentElement.classList.toggle("mirror",oo.checked)}function Or(){let e=j(Xi());return e||(Uc()?j("slidetake:cam")||"default":"none")}function qc(e){W(Xi(),e),e!=="none"&&e!=="default"&&W("slidetake:cam",e)}function Gc(){h.camWas=!oe;let e=Or()!=="none";e!==!oe&&_t(e,!0)}function Qi(){h.camWas!=null&&(h.camWas!==!oe&&_t(h.camWas,!0),h.camWas=null)}async function Zi(){let e=Le();if(!e.ok)return xt.innerHTML='<span class="warn">'+B(e.why)+"</span>",e;_a&&(xt.innerHTML='<span class="warn">'+B(_a)+"</span>",_a="");let t=De.indexOf(e.quality),a=j("slidetake:quality");zt.innerHTML=De.slice(t).map(r=>"<option"+(r.name===a?" selected":"")+">"+r.name+"</option>").join("");let o="";try{let{quota:r,usage:n}=await navigator.storage.estimate(),i=De.find(s=>s.name===zt.value)||e.quality;o=" Room for about "+Math.floor((r-n)/Wn(i))+" minutes of takes."}catch{}return xt.querySelector(".warn")||(xt.innerHTML='<span class="ok">Ready: this screen records up to '+e.quality.name+" in fullscreen."+B(o)+"</span>"),e}function Vc(e){fe=e,W("slidetake:rec-mode",e),pa({setup:Wt()})}function pa(e={}){Je&&(Le().ok&&(fe||"browser")==="browser"?Hr(e):Yc(e))}function Yc(e={}){let t=bo().find(a=>a.key===Ke()&&a.withObs&&!a.inBrowser);gs(t||{key:Ke(),deckTitle:D.title||(b[0]?m.get(b[0]).title:"Deck"),date:new Date().toISOString(),withObs:!0,outputPath:null,reason:"",total:0,totalObs:null,fps:Mr,events:[],picks:{},empty:!0},e)}async function Ir(){if(!(!Je||h.active||!b.length)){if(!Kc()){dr({note:"Set up once: after this, \u25CF Record (R) starts recording straight away."});return}if(Le().ok&&(fe||"browser")==="browser"){let t=Fa(dt(),xo()).filter(r=>!r.pick).map(r=>r.id),a=b.indexOf(y),o=t.length?t:a>0?b.slice(a):b;ro("browser",o.length===b.length?null:o);return}if(!ze&&j("slidetake:obs")&&await Lr(),ze){ro("obs");return}dr({note:"Connect to OBS first: OBS \u2192 Connect."})}}async function Pr(e,t){return(await(await navigator.storage.getDirectory()).getDirectoryHandle("slidetake-takes",{create:!0})).getDirectoryHandle(e,{create:!!t})}async function zr(e){try{await(await(await navigator.storage.getDirectory()).getDirectoryHandle("slidetake-takes")).removeEntry(e,{recursive:!0})}catch{}}function ts(){if(!document.body.classList.contains("rec-frame"))return;let e=devicePixelRatio||1,t=ge()?9/16:16/9,a=kt.clientWidth,o=kt.clientHeight,r=s=>Math.floor(s*e/2)*2/e,n=r(Math.min(o,a/t)),i=r(n*t);i>a&&(i=r(a),n=r(i/t)),Object.assign(le.style,{width:i+"px",height:n+"px",aspectRatio:"auto",margin:Math.floor((o-n)/2)+"px 0 0 "+Math.floor((a-i)/2)+"px"})}function Rr(e){document.body.classList.toggle("rec-frame",e),e?ts():["width","height","aspectRatio","margin"].forEach(t=>le.style.removeProperty(t.replace(/[A-Z]/g,a=>"-"+a.toLowerCase())))}async function as(e){window.RestrictionTarget&&e.restrictTo?await e.restrictTo(await RestrictionTarget.fromElement(le)):await e.cropTo(await CropTarget.fromElement(le))}function Jc(e){let t=devicePixelRatio||1,a=le.clientWidth*t,o=le.clientHeight*t,r=De.slice(De.indexOf(e));return r.find(n=>{let i=Pa(n,ge());return a>=i.w-2&&o>=i.h-2})||r[r.length-1]}async function $c(e){try{window.RestrictionTarget&&e.track.restrictTo?await e.track.restrictTo(null):await e.track.cropTo(null),await as(e.track)}catch{}let t=Jc(e.quality);t!==e.quality&&(Ft("Recording at "+t.name+": the frame on this screen is too small for "+e.quality.name+".",5e3),e.quality=t),await e.track.applyConstraints(es(e.quality)).catch(a=>console.warn("Slidetake: the recording size was refused",a)),await ha()}async function Xc(){let e=Le();if(!e.ok)throw new Error(e.why);let t=De.find(s=>s.name===zt.value)||e.quality;Rr(!0);let a=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:$t},audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"exclude",monitorTypeSurfaces:"exclude"}),o=a.getVideoTracks()[0],r=()=>a.getTracks().forEach(s=>s.stop());if(!o.restrictTo&&!o.cropTo)throw r(),new Error("Share \u201Cthis tab\u201D to record the slides.");try{await as(o)}catch(s){throw r(),new Error("Chrome could not record just the slides ("+(s.message||s.name)+").")}await o.applyConstraints(es(t)).catch(s=>console.warn("Slidetake: the recording size was refused",s));let n;try{let s=j("slidetake:mic");n=await navigator.mediaDevices.getUserMedia({audio:ps(s)})}catch(s){throw r(),new Error("The microphone isn\u2019t available ("+(s.message||s.name)+").")}let i=new Date().toISOString().replace(/[:.]/g,"-");h.browser={id:i,display:a,mic:n,track:o,quality:t,type:e.type,stream:new MediaStream([o,...n.getAudioTracks()]),dir:await Pr(i,!0),clips:[],cur:null,chain:Promise.resolve(),error:null},o.addEventListener("ended",()=>{h.active&&!h.finishing&&Rt("Sharing stopped")})}function os(){let e=h.browser;e&&(e.display.getTracks().forEach(t=>t.stop()),e.mic.getTracks().forEach(t=>t.stop()),Rr(!1))}function Qc(e){let t=h.browser,a="take-"+t.clips.length+"."+Fo(t.type),o={name:a,rec:null,done:null};t.clips.push(o),e.clip=t.id+"/"+a,t.chain=t.chain.then(async()=>{let r=await(await t.dir.getFileHandle(a,{create:!0})).createWritable(),n=new MediaRecorder(t.stream,{mimeType:t.type,videoBitsPerSecond:t.quality.bitrate,audioBitsPerSecond:Ia}),i=Promise.resolve();n.ondataavailable=l=>{l.data.size&&(i=i.then(()=>r.write(l.data)).catch(c=>{t.error=c}))},o.done=new Promise(l=>{n.onstop=async()=>{await i,await r.close().catch(()=>{}),l()}}),await new Promise(l=>{n.onstart=l,n.start(1e3)}),e.t=Math.round(It()),e.cutAt!=null&&(e.lead=Math.max(0,Math.round(e.t-e.cutAt)));let s=t.cur;t.cur=o,o.rec=n,s&&s.rec.state!=="inactive"&&s.rec.stop()}).catch(r=>{t.error=r})}async function ro(e,t){if(h.active||!b.length)return;let a=e==="obs";if(yo(),fe||(fe=a?"obs":"browser",W("slidetake:rec-mode",fe)),e==="browser"){K||Se(!0);try{await Xc()}catch(l){Rr(!1),K&&Se(!1),_a=l.name==="NotAllowedError"?"Recording needs this tab shared: press \u25CF Record again and choose Share.":l.message,Hr({setup:!0});return}}ba();let o=t&&t.length?t.filter(l=>b.includes(l)):null,r=o?o[0]:b[0],n=b[b.indexOf(r)-1]||null;Object.assign(h,{active:!0,withObs:a,counting:!0,paused:!1,finishing:!1,t0:0,pausedMs:0,events:[],outputPath:null,only:o?new Set(o):null}),e!=="browser"&&(h.browser=null),document.body.classList.add("recording"),Wr(),K||Se(!0),Gc(),n?(document.body.classList.add("no-anim"),m.get(n)._played=!0,Pe=!0,_(n,!0,!0),Pe=!1,A.getAnimations().forEach(l=>l.finish()),await ha(),document.body.classList.remove("no-anim")):(y===r&&(Me=0,ke=null,je=-1),_(r,!0)),!document.fullscreenElement&&document.documentElement.requestFullscreen&&await document.documentElement.requestFullscreen().catch(()=>{});let i=ta.querySelector(".hint");for(let l=3;l>0;l--)if(i.textContent=(document.fullscreenElement?"":"Press F for fullscreen \xB7 ")+"recording starts after the countdown \xB7 Esc to cancel",ta.querySelector(".num").textContent=l,ta.classList.add("show"),await da(1e3),!h.active)return;if(ta.classList.remove("show"),await ha(),a){let l=new Promise(c=>{ot=c,setTimeout(()=>{ot&&(ot(),ot=null)},2500)});try{await se.call("StartRecord")}catch(c){Dr("OBS could not start recording: "+(c&&c.message||c));return}if(await l,!h.active)return}h.browser&&await $c(h.browser),h.counting=!1,h.t0=performance.now();let s=m.get(r);if(n){ua("slide",r),h.browser&&await h.browser.chain,fo(s),Pe=!0,_(r),Pe=!1;return}is(s),ua("slide",y)}function Dr(e){if(h.active=!1,h.counting=!1,h.browser){let t=h.browser;t.chain.then(()=>{t.cur&&t.cur.rec.state!=="inactive"&&t.cur.rec.stop()}).then(()=>zr(t.id)),os(),h.browser=null}ta.classList.remove("show"),document.body.classList.remove("recording"),K&&Se(!1),Qi(),Mt(e)}function ua(e,t,a){if(!h.active||!h.t0||h.finishing)return;let o=m.get(t),r={id:t,title:o?o.title:t,retake:e==="retake",t:Math.round(It()),obsT:null};a==null&&h.browser&&(a=r.t),a!=null&&(r.cutAt=a,r.lead=Math.max(0,Math.round(r.t-a))),h.events.push(r),h.browser&&Qc(r),h.withObs&&ze&&(se.call("GetRecordStatus").then(n=>{n&&typeof n.outputDuration=="number"&&(r.obsT=n.outputDuration)}).catch(()=>{}),o&&se.call("CreateRecordChapter",{chapterName:(r.retake?"RETAKE \xB7 ":"")+o.title}).catch(()=>{}))}function Zc(e){let t=e.key;if((li.includes(t)||ci.includes(t)||di.includes(t)||t==="Escape")&&e.preventDefault(),t==="Escape"){h.counting?Dr("Take cancelled"):Rt("Stopped early");return}if((t==="f"||t==="F")&&!document.fullscreenElement&&document.documentElement.requestFullscreen){e.preventDefault(),document.documentElement.requestFullscreen().catch(()=>{});return}if(!(h.counting||h.finishing||nt)){if(di.includes(t)){od();return}h.paused||(li.includes(t)?ed():ci.includes(t)&&td())}}function ed(){let e=Nt(m.get(y)),t=Math.min(Me,e.length-1)>=e.length-1,a=b.indexOf(y);if(!t){qe(1);return}if(!h.only){a===b.length-1?Rt():qe(1);return}let o=b.slice(a+1).find(r=>h.only.has(r));o?b[a+1]===o?qe(1):rs(b[b.indexOf(o)-1],o,"slide"):Rt()}async function td(){let e=m.get(y);if(!e||nt)return;let t=y,a=b[b.indexOf(t)-1];if(!a){ad(e);return}rs(a,t,"retake")}async function rs(e,t,a){let o=m.get(t);if(!o||nt)return;nt=!0;let r=It();document.body.classList.add("no-anim");let n=m.get(e);Pe=!0,n._played=!0,_(e,!0,!0),A.getAnimations().forEach(i=>i.finish()),Pe=!1,await ha(),document.body.classList.remove("no-anim"),ua(a,t,r),h.browser&&await h.browser.chain,h.withObs&&await ns(),fo(o),Pe=!0,_(t),Pe=!1,!ne&&!A.hidden&&We.used&&ht(),nt=!1}async function ns(){let e=h.events[h.events.length-1];e&&(e.skip=hi/2),await da(hi)}function is(e){fo(e),ar=!0,ia=null,mo(!0),ar=!1}async function ad(e){nt=!0,Me=0,ke=null,je=-1,is(e),!ne&&!A.hidden&&We.used?ht():ye(),Ht(),ua("retake",y),h.withObs&&await ns(),nt=!1}async function od(){if(h.t0)if(h.paused){if(rr.classList.remove("show"),await ha(),h.withObs&&await se.call("ResumeRecord").catch(()=>{}),h.browser){let e=h.browser;e.chain=e.chain.then(()=>{e.cur&&e.cur.rec.state==="paused"&&e.cur.rec.resume()})}h.pausedMs+=performance.now()-h.pauseAt,h.paused=!1,kr(m.get(y))}else{if(h.paused=!0,h.pauseAt=performance.now(),clearTimeout(Bt),h.withObs&&await se.call("PauseRecord").catch(()=>{}),h.browser){let e=h.browser;e.chain=e.chain.then(()=>{e.cur&&e.cur.rec.state==="recording"&&e.cur.rec.pause()})}rr.classList.add("show")}}async function Rt(e){if(!h.active||h.finishing)return;if(h.counting){Dr("Take cancelled");return}h.finishing=!0,clearTimeout(Bt),h.paused&&(h.pausedMs+=performance.now()-h.pauseAt,h.paused=!1,rr.classList.remove("show"));let t=Math.round(It()),a=null;if(h.withObs){try{let n=await se.call("GetRecordStatus");n&&typeof n.outputDuration=="number"&&(a=n.outputDuration)}catch{}await da(1200);try{let n=await se.call("StopRecord");h.outputPath=n&&n.outputPath}catch(n){e=(e?e+". ":"")+"OBS did not confirm the stop ("+(n&&n.message||n)+")"}}let o=h.browser;o&&(await da(600),await o.chain,t=Math.round(It()),o.cur&&o.cur.rec&&o.cur.rec.state!=="inactive"&&o.cur.rec.stop(),await Promise.all(o.clips.map(n=>n.done)),os(),h.browser=null,o.error&&(e=(e?e+". ":"")+"Some of the take could not be saved ("+(o.error.message||o.error.name)+")")),h.active=!1,h.finishing=!1,document.body.classList.remove("recording"),K&&Se(!1),Qi();let r={key:Ke(),deckTitle:D.title||m.get(b[0]).title,date:new Date().toISOString(),withObs:h.withObs,outputPath:h.outputPath,reason:e||"",total:t,totalObs:a,fps:o?$t:Mr,...o?{inBrowser:!0,takesId:o.id,quality:o.quality.name,type:o.type}:{},events:h.events.map(n=>({id:n.id,title:n.title,retake:n.retake,t:n.t,obsT:n.obsT,...n.lead?{lead:n.lead}:{},...n.skip?{skip:n.skip}:{},...n.clip?{clip:n.clip}:{}})),picks:{}};if(r.inBrowser){hd(r);return}Fr(r),gs(r,{note:(e?e+". ":"")+we(r).size+" slides recorded with OBS."})}function Ke(){return mt(D.title||(b[0]?m.get(b[0]).title:"deck"))}function bo(){try{return JSON.parse(j("slidetake:sessions")||"[]")}catch{return[]}}function Fr(e){let t=bo().filter(a=>a.date!==e.date);t.unshift(e),t.slice(12).forEach(a=>{a.takesId&&zr(a.takesId)}),W("slidetake:sessions",JSON.stringify(t.slice(0,12)))}function Dt(e){let t=m.has(e)?uo(e):[e];return t[Math.min(1,t.length-1)]}function ss(e,t){let a=Dt(e);return{sec:a,title:m.has(a)?m.get(a).title:t}}function O(e,{warn:t=!1,html:a="",title:o=""}={}){ea.classList.toggle("warn",t),a?ea.innerHTML=a:ea.textContent=e,ea.title=o||ea.textContent;let r=document.getElementById("rv-save-again");r&&(r.onclick=()=>Cs(!0))}function gs(e,t={}){ba(),H=e,Z=null;let a=e.events.filter(i=>i.retake).length,o=e.empty?"":we(e).size+" slides, "+(a?a+" retake"+(a>1?"s":""):"no retakes")+", recorded "+ft(e.totalObs??e.total)+". ";Y.classList.remove("in-browser","board"),Y.classList.add("obs");let r=document.getElementById("rv-rec");r.title="Records the deck with OBS: a new video in place of this one",r.disabled=!1,document.getElementById("rv-render-btn").disabled=document.getElementById("rv-clean").disabled=!!e.cleaned,document.getElementById("rv-file").textContent=e.outputPath?" ("+gt(e.outputPath)+")":"";let n=Ba(e);no.value=[...no.options].reduce((i,s)=>Math.abs(s.value-n)<Math.abs(i.value-n)?s:i).value,k.src&&(e.inBrowser||Ge!==gt(e.outputPath)&&e.outputPath)&&(k.removeAttribute("src"),k.load(),Ge=""),document.getElementById("rv-novideo").hidden=!!k.src||!!e.empty,Z=null,N=null,jt(),vo(),ya(Y),t.setup?ko(t):(So(),ao(!1).then($e)),O(t.note||(e.empty?ze?"Press \u25CF Record: OBS records the deck.":"Connect to OBS in Setup, then press \u25CF Record.":o+(k.src?"Click a take to preview it.":"Open the recording to preview it."))),e.empty||gd(e)}function vo(){if(H&&H.board){lt();return}let e=H,t=document.getElementById("rv-list"),a=null;t.innerHTML=[...we(e).values()].map(o=>{let r=e.picks[o.id]??o.takes.length,n=Dt(o.id),i=n!==a;a=n;let s=o.takes.map(l=>'<button class="rv-chip'+(r===l.no?" on":"")+'" data-id="'+B(o.id)+'" data-take="'+l.no+'">Take '+l.no+" \xB7 "+ft(l.end-l.start)+"</button>").join("");return'<div class="rv-row'+(i?" sec":"")+'"><div class="t">'+B(o.title)+"<small>"+Sa(o.takes[0].start)+'</small></div><div class="rv-chips">'+s+"</div></div>"}).join(""),t.querySelectorAll(".rv-chip").forEach(o=>o.onclick=()=>{e.picks[o.dataset.id]=+o.dataset.take,Fr(e),vo();let r=we(e).get(o.dataset.id),n=r&&r.takes[+o.dataset.take-1];if(!n)return;let i=r.title+(r.takes.length>1?" \xB7 take "+n.no:"");if(e.inBrowser){let s=e.events.filter(l=>l.id===o.dataset.id)[n.no-1];s&&s.clip&&wo([{clip:s.clip,keep:(n.end-n.start)/1e3,title:i}])}else so([{start:n.start,end:n.end,title:i}])}),document.getElementById("rv-ffmpeg-copy").disabled=document.getElementById("rv-play-final").disabled=!e.events.length,bs(e),ws(e)}function bs(e){let t=rd(e),a=document.getElementById("rv-chapters");ys=t.lines.join(`
`),a.disabled=t.lines.length<3,a.title=t.lines.length<3?"YouTube needs at least three chapters of 10 seconds or more":"Copies the "+t.lines.length+" chapters, to paste into the YouTube description"}function vs(e,t){let a=e.dataset.label||(e.dataset.label=e.textContent);(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).catch(()=>{}),e.textContent="\u2713 Copied",clearTimeout(+e.dataset.timer),e.dataset.timer=String(setTimeout(()=>{e.textContent=a},1500))}async function ws(e){let t=document.getElementById("rv-final"),a=++Ko,o=Jt(e).reduce((n,i)=>n+i.end-i.start,0),r=n=>(n?"about "+(n>1e9?(n/1e9).toFixed(1)+" GB":Math.max(1,Math.round(n/1e6))+" MB")+" \xB7 ":"Final cut ")+ft(o);if(!e.inBrowser||e.cleaned){t.textContent=r(null);return}try{let n=0;for(let i of Xt(e))Ga.has(i.clip)||Ga.set(i.clip,(await va(i.clip)).size),n+=Ga.get(i.clip);a===Ko&&(t.textContent=r(n))}catch{a===Ko&&(t.textContent=r(null))}}function so(e){if(!k.src){io=e,O(pr?"Opening the recording\u2026 it plays when ready.":"Open the recording to preview.");return}io=null,Z={ranges:e,i:0},O("\u25B6 "+e[0].title);let t=()=>{k.currentTime=e[0].start/1e3,k.play().catch(a=>{a&&a.name!=="AbortError"&&O("Could not play: "+a.message,{warn:!0})})};k.readyState>=1?t():k.addEventListener("loadedmetadata",t,{once:!0})}function jt(){Ct=null}function Nr(){let e=N&&!N.single&&!k.paused;xs.innerHTML=e?'\u275A\u275A <span><u class="key">P</u>ause</span>':'\u25B6 <span><u class="key">P</u>review</span>',document.querySelectorAll("#rv-list .rv-row.playing").forEach(o=>o.classList.remove("playing"));let t=N&&N.parts[N.i],a=t&&t.id&&document.querySelector('#rv-list .rv-row[data-id="'+CSS.escape(t.id)+'"]');a&&(a.classList.add("playing"),a.scrollIntoView({block:"nearest"}))}function id(e){let t=H?Xt(H):[],a=t.findIndex(r=>r.id===e.id),o=a>=0?t[a+1]:null;Ct=o?o.id:null,O(o?"Preview continues from "+o.title+".":"That was the last slide: Preview plays from the start.")}function ks(e){return Array.from({length:e.numberOfChannels},(t,a)=>{let o=new Float32Array(e.numberOfFrames);return e.copyTo(o,{planeIndex:a,format:"f32-planar"}),o})}async function va(e){let[t,a]=e.split("/");return(await(await Pr(t)).getFileHandle(a)).getFile()}async function wo(e,t=0,a=!1){if(!(!H||H.cleaned||!e.length)){Z=null,N={parts:e,i:t,single:a};try{let o=await va(e[t].clip);if(!Y.classList.contains("open"))return;k.src&&URL.revokeObjectURL(k.src),k.src=URL.createObjectURL(o),O("\u25B6 "+e[t].title),await k.play()}catch(o){if(o&&o.name==="AbortError")return;N=null,O(o&&o.name==="NotFoundError"?"This take is no longer in the browser.":"Could not play this take: "+(o&&o.message||o),{warn:!0})}}}function Ss(){let e=N;if(e.i+1<e.parts.length){wo(e.parts,e.i+1,e.single);return}N=null,k.pause(),e.single?id(e.parts[0]):O(""),Nr()}async function sd(e){if(!e.where)return!0;try{let t=await jr("video-folder");return!t||t.name!==e.where||await t.queryPermission({mode:"readwrite"})!=="granted"||await t.getFileHandle(e.name),!0}catch{return!1}}async function Cs(e){let t=H;if(!t||!t.inBrowser||t.cleaned)return;let a=Xt(t);if(!a.length){O("No slide has a take yet: nothing to save.",{warn:!0});return}let o=JSON.stringify([a.map(d=>[d.clip,Math.round(d.keep*1e3)]),it(),ma(),t.type]),r=t.board&&I.lastDownload;if(!e&&r&&r.sig===o&&await sd(r)){O("",{html:'<button class="btn small" id="rv-save-again">Save another copy</button> Already saved in '+B(Jo(r))+".",title:"Already saved in "+Jo(r)+". A new video is made only when a take or the sound settings change."});return}let n=Fo(t.type||"")==="mp4",i=Ke()+" "+cd(new Date)+"."+(n?"mp4":"webm"),s=null,l="";try{let d=await Ms(!1);d&&(s=await(await d.getFileHandle(i,{create:!0})).createWritable(),l=d.name)}catch(d){if(d&&d.name==="AbortError")return}let c=lo;c.disabled=!0,et("Preparing\u2026");try{let d=await import(Wc),M=s?new d.StreamTarget(s):new d.BufferTarget,u=new d.Output({format:n?new d.Mp4OutputFormat({fastStart:s?!1:"in-memory"}):new d.WebMOutputFormat,target:M}),f=1,g="",p=it()&&ma();if(it()){let F=await pi(d,a,1,!1,"Measuring");if(F&&isFinite(F.integrated)){let V=Ho(F,{limit:p});if(p&&Math.abs(V)>=.05){let Q=await pi(d,a,Da(V),!0,"Checking");Q&&isFinite(Q.integrated)&&(V=Math.min(V+(-14-Q.integrated),No))}f=Da(V);let de=p?-14:F.integrated+V,te=!p&&Ho(F,{limit:!0})-V>.5;g=" \xB7 loudness "+F.integrated.toFixed(1)+(Math.abs(V)<.05?" LUFS, left as is":" \u2192 "+de.toFixed(1)+" LUFS")+(te?"; a loud peak held it back, turn on Peak limiter to reach "+-14:"")}}let E=f!==1||p;await ld(d,a);let C=null,w=null,x=0,v=-1,S=-1,L=null,$=[],re=async()=>{for(;$.length&&L.ready()>=$[0].n;){let F=$.shift(),V=L.take(F.n),de=new Float32Array(F.n*F.ch);V.forEach((te,Q)=>de.set(te,Q*F.n)),await w.add(new d.AudioSample({data:de,format:"f32-planar",numberOfChannels:F.ch,sampleRate:F.rate,timestamp:F.t}))}};for(let[F,V]of a.entries()){et("Joining "+(F+1)+"/"+a.length);let de=new d.Input({source:new d.BlobSource(await va(V.clip)),formats:d.ALL_FORMATS}),te=await de.getPrimaryVideoTrack(),Q=await de.getPrimaryAudioTrack();if(!te)throw new Error(V.title+" has no video");C||(C=new d.EncodedVideoPacketSource(await te.getCodec()),u.addVideoTrack(C),Q&&(w=E?new d.AudioSampleSource({codec:n?"aac":"opus",bitrate:Ia}):new d.EncodedAudioPacketSource(await Q.getCodec()),u.addAudioTrack(w)),await u.start());let qt={decoderConfig:await te.getDecoderConfig()},Gr=await new d.EncodedPacketSink(te).getFirstPacket(),be=_n(Gr?Gr.timestamp:0),pt=0,Vr=!0;for await(let q of new d.EncodedPacketSink(te).packets())q.timestamp>=V.keep||(v=za(v,x+q.timestamp-be),await C.add(q.clone({timestamp:v}),Vr&&F===0?qt:void 0),Vr=!1,pt=Math.max(pt,q.timestamp-be+q.duration));if(Q&&w&&E)for await(let q of new d.AudioSampleSink(Q).samples(be,be+pt)){if(q.timestamp<be-1e-4||q.timestamp-be+q.duration>pt+1e-4){q.close();continue}S=za(S,x+q.timestamp-be);let ve=ks(q);if(ve.forEach(he=>{for(let ut=0;ut<he.length;ut++)he[ut]*=f}),p)L=L||jo(q.sampleRate,ve.length),L.push(ve),$.push({t:S,n:q.numberOfFrames,rate:q.sampleRate,ch:ve.length}),q.close(),await re();else{let he=q.numberOfFrames,ut=new Float32Array(he*ve.length);ve.forEach((Ws,_s)=>ut.set(Ws,_s*he)),await w.add(new d.AudioSample({data:ut,format:"f32-planar",numberOfChannels:ve.length,sampleRate:q.sampleRate,timestamp:S})),q.close()}}else if(Q&&w){let q={decoderConfig:await Q.getDecoderConfig()},ve=!0;for await(let he of new d.EncodedPacketSink(Q).packets())he.timestamp<be-1e-4||he.timestamp-be+he.duration>pt+1e-4||(S=za(S,x+he.timestamp-be),await w.add(he.clone({timestamp:S}),ve&&F===0?q:void 0),ve=!1)}x+=pt}if(L&&(L.end(),await re(),L.events&&(g+=", "+L.events+" peak"+(L.events===1?"":"s")+" limited")),et("Finishing\u2026"),await u.finalize(),!s){let F=document.createElement("a");F.href=URL.createObjectURL(new Blob([M.buffer],{type:n?"video/mp4":"video/webm"})),F.download=i,F.click(),setTimeout(()=>URL.revokeObjectURL(F.href),1e4)}let X={sig:o,name:i,where:l};t.board&&(I.lastDownload=X,wa()),O("Saved in "+Jo(X)+" ("+ft(x*1e3)+g+")."),et("\u2713 Saved"),Es=setTimeout(()=>et(),2500)}catch(d){et(),O("Could not save the video: "+(d&&d.message||d),{warn:!0}),s&&s.abort().catch(()=>{})}finally{c.disabled=!!t.cleaned}}async function pi(e,t,a,o,r){let n=null,i=null;for(let[s,l]of t.entries()){et(r+" "+(s+1)+"/"+t.length);let c=await new e.Input({source:new e.BlobSource(await va(l.clip)),formats:e.ALL_FORMATS}).getPrimaryAudioTrack();if(c)for await(let d of new e.AudioSampleSink(c).samples(0,l.keep)){let M=ks(d);n=n||Vn(d.sampleRate,M.length),a!==1&&o?(M.forEach(u=>{for(let f=0;f<u.length;f++)u[f]*=a}),i=i||jo(d.sampleRate,M.length),i.push(M),i.ready()&&n.add(i.take(i.ready()))):n.add(M),d.close()}}return i&&(i.end(),i.ready()&&n.add(i.take(i.ready()))),n?n.result():null}async function ld(e,t){let a=[];for(let i of t){let s=await new e.Input({source:new e.BlobSource(await va(i.clip)),formats:e.ALL_FORMATS}).getPrimaryVideoTrack(),l=s&&await s.getDecoderConfig();a.push(l?l.codec+" "+l.codedWidth+"\xD7"+l.codedHeight+" "+(l.description?[...new Uint8Array(l.description)].join("."):""):"none")}let o=new Map;a.forEach(i=>o.set(i,(o.get(i)||0)+1));let r=[...o.entries()].sort((i,s)=>s[1]-i[1])[0][0],n=t.filter((i,s)=>a[s]!==r);if(n.length)throw new Error(n.map(i=>i.title).join(", ")+(n.length===1?" was":" were")+" recorded at a different size ("+a[t.indexOf(n[0])].split(" ")[1]+", not "+r.split(" ")[1]+"). Tick "+(n.length===1?"it":"them")+" and record again")}async function Ms(e){if(!window.showDirectoryPicker)return null;let t=e?null:await jr("video-folder");if(t){let a=await t.queryPermission({mode:"readwrite"});if(a==="prompt"&&(a=await t.requestPermission({mode:"readwrite"})),a==="granted")return t}return t=await window.showDirectoryPicker({id:"slidetake-videos",mode:"readwrite",startIn:"videos"}),Bs("video-folder",t),t}function dt(){let e=Ts();if(I&&cr===e)return I;cr=e;try{I=JSON.parse(j(e)||"null")}catch{I=null}return(!I||!Array.isArray(I.takes))&&(I={takes:[],picks:{},type:"",quality:""}),I}function hd(e){dt();let t=$n(e,e.takesId,xo());t.forEach(a=>{delete I.picks[a.id]}),I.takes.push(...t),Object.assign(I,{type:e.type,quality:e.quality}),wa(),Ne.clear(),Hr({note:(e.reason?e.reason+". ":"")+t.length+" new take"+(t.length===1?"":"s")+" on the board."})}function Ls(){let e=Fa(dt(),xo()),t=Object.assign(Xn(e),{board:!0,inBrowser:!0,withObs:!1,type:I.type||"video/mp4",quality:I.quality||"",deckTitle:D.title||(b[0]?m.get(b[0]).title:"Deck"),date:new Date().toISOString()});return{rows:e,sess:t}}function ko(e={}){Y.classList.add("setup-view"),mi.textContent=e.note||"",mi.hidden=!e.note,st.textContent="\u2190 Back",st.title="Back to Studio",st.setAttribute("aria-expanded","true"),pd()}function So(){let e=Wt();e&&Y.classList.remove("setup-view"),st.textContent="\u2699 Setup",st.title="Settings: camera, microphone, video, OBS and files",st.setAttribute("aria-expanded","false"),e&&(yo(),$e())}function dr(e={}){Y.classList.contains("open")?ko(e):pa({...e,setup:!0})}function pd(){let e=()=>{$e(),Wt()&&Ji()};if(ct()){jc(),ao(!1).then(e);return}xt.innerHTML="",Zi().then(t=>{t.ok?ao().then(e):e()})}function $e(){let e=i=>{let s=i.selectedOptions[0];return s?s.textContent.replace(/ \(system default\)$/,""):""},t=e(St)||(Or()==="none"?"No camera":"Camera"),a=ct(),o=a?qi:Le().ok?zt.value:"",r=a?[t]:[t,e(Pt)||"Microphone"],n=document.getElementById("rv-using");n.textContent=r.join(" \xB7 "),n.title="Recording with "+r.join(" \xB7 "),document.getElementById("rv-size").textContent=o||"",vt.classList.toggle("on",a),vt.setAttribute("aria-pressed",String(a)),vt.disabled=!Le().ok,vt.title=vt.disabled?Va+" records only with OBS: pro mode":a?"Pro mode: recording with OBS. Click for easy mode, in "+Va:"Easy mode: recording in "+Va+". Click for pro mode, with OBS"}function Hr(e={}){Je&&(ba(),dt(),Y.classList.remove("obs"),Y.classList.add("in-browser","board"),document.getElementById("rv-rec").title="Records the whole deck, or only the ticked slides (shift-click ticks a range)",document.getElementById("rv-novideo").hidden=!0,k.src&&(URL.revokeObjectURL(k.src),k.removeAttribute("src"),k.load()),Z=null,N=null,jt(),qa=-1,lt(),ya(Y),e.setup||!Le().ok?ko(e):(So(),Zi().then(()=>ao(!1)).then($e)),O(e.note||fs()||(I.takes.length?ud()+". Click a take to preview it.":b.length+" slides, nothing recorded yet. Press \u25CF Record.")))}function ud(){let e=Fa(dt(),xo()),t=e.filter(o=>o.pick).length,a=e.filter(o=>o.takes.length&&!o.pick).length;return t+" of "+e.length+" slides ready"+(a?", "+a+" to record again":"")}function lt(){let{rows:e,sess:t}=Ls();H=t;let a=document.getElementById("rv-list"),o=null;a.innerHTML=e.map(i=>{let s=Dt(i.id),l=s!==o;o=s;let c=B(i.id),d={slide:"Recorded before this slide changed",before:"Starts with the entry from the slide before, which has changed or is gone: record this slide again"},M=i.takes.length?i.takes.map(u=>'<button class="rv-chip'+(i.pick===u.uid?" on":"")+(u.outdated?' outdated" title="'+d[u.outdated]:"")+'" data-id="'+c+'" data-uid="'+B(u.uid)+'">Take '+u.no+" \xB7 "+ft(u.ms)+"</button>").join("")+(i.pick?"":'<span class="rv-none">'+(i.takes.some(u=>u.outdated==="before")&&!i.takes.some(u=>u.outdated==="slide")?"The slide before changed: record again":"Changed since: record again")+"</span>"):'<span class="rv-none">No take yet</span>';return'<div class="rv-row with-sel'+(l?" sec":"")+(Ne.has(i.id)?" selected":"")+'" data-id="'+c+'"><input type="checkbox" class="rv-sel" data-id="'+c+'"'+(Ne.has(i.id)?" checked":"")+' aria-label="Select '+B(i.title)+' to record"><div><div class="t">'+B(i.title)+'</div><div class="rv-chips">'+M+"</div></div></div>"}).join(""),a.querySelectorAll(".rv-chip").forEach(i=>i.onclick=()=>{I.picks[i.dataset.id]=i.dataset.uid,wa(),lt();let s=e.find(c=>c.id===i.dataset.id),l=s&&s.takes.find(c=>c.uid===i.dataset.uid);l&&wo([{id:s.id,clip:l.clip,keep:l.ms/1e3,title:s.title+" \xB7 take "+l.no}],0,!0)}),a.querySelectorAll(".rv-sel").forEach(i=>i.addEventListener("click",s=>{(s.shiftKey?Qn(b,ui,i.dataset.id):[i.dataset.id]).forEach(c=>{i.checked?Ne.add(c):Ne.delete(c)}),jt(),ui=i.dataset.id,lt()}));let r=Na(b,Ne),n=Le().ok;document.getElementById("rv-rec").disabled=!n,qa>=0&&r.length!==qa&&O(fs()||"Record takes the whole deck."),qa=r.length,document.getElementById("rv-render-btn").disabled=document.getElementById("rv-play-final").disabled=!t.events.length,bs(t),ws(t)}async function md(e){for(let a of e)try{let[o,r]=a.clip.split("/");await(await Pr(o)).removeEntry(r)}catch{}let t=new Set(e.map(a=>a.uid));I.takes=I.takes.filter(a=>!t.has(a.uid)),Object.keys(I.picks).forEach(a=>{t.has(I.picks[a])&&delete I.picks[a]}),wa(),k.src&&(URL.revokeObjectURL(k.src),k.removeAttribute("src"),k.load()),N=null,jt(),lt()}function As(e){return new Promise((t,a)=>{let o=indexedDB.open(e||"slidetake",1);o.onupgradeneeded=()=>o.result.createObjectStore("kv"),o.onsuccess=()=>t(o.result),o.onerror=()=>a(o.error)})}async function jr(e){let t=async a=>{let o=await As(a);return await new Promise(r=>{let n=o.transaction("kv").objectStore("kv").get(e);n.onsuccess=()=>r(n.result),n.onerror=()=>r(null)})};try{return await t()??await t("markcast")??await t("traverse")??null}catch{return null}}async function Bs(e,t){try{(await As()).transaction("kv","readwrite").objectStore("kv").put(t,e)}catch{}}async function Eo(e){pr=!0;try{return await fd(e)}finally{pr=!1}}async function fd(e){let t=await e.getFile();for(let a=0;a<10;a++){await new Promise(r=>setTimeout(r,1e3));let o=await e.getFile();if(o.size===t.size&&o.lastModified===t.lastModified)return o;t=o}return t}function xa(e,t,a){k.src&&URL.revokeObjectURL(k.src),aa=t||null,a||(hr=0),k.src=URL.createObjectURL(e),Ge=e.name,document.getElementById("rv-novideo").hidden=!0,O("Loaded "+e.name+". Click a take to preview it."),io?so(io):a&&Z&&so(Z.ranges.slice(Z.i))}async function gd(e){let t=gt(e.outputPath);if(!(!t||!window.showDirectoryPicker)&&!(Ge===t&&k.src))try{let a=await jr("obs-folder");if(!a||await a.queryPermission({mode:"read"})!=="granted")return;let o=await a.getFileHandle(t);O("Opening "+t+"\u2026"),xa(await Eo(o),o)}catch{}}function Mt(e,t){if(!h.active){if(clearTimeout(Ya),!A.hidden&&!A.classList.contains("live")){ra.classList.remove("show"),Is.textContent=e,A.classList.add("msg"),t||(Ya=setTimeout(Ps,9e3));return}ra.textContent=e,ra.classList.add("show"),t||(Ya=setTimeout(()=>ra.classList.remove("show"),9e3))}}function Ps(){Is.textContent="PIP camera",A.classList.remove("msg")}function Wr(){clearTimeout(Ya),ra.classList.remove("show"),Ps()}function $o(){let e=!1;try{e=window.top!==window.self}catch{e=!0}return e?" This page is running inside a preview frame that may not allow cameras. Open Slidetake directly in Chrome (from localhost or as a file).":window.isSecureContext?" Allow camera access for this page in the browser\u2019s site settings (the icon at the left of the address bar), then try again.":" Browsers only allow cameras on secure pages. Open it from http://localhost or as a local file in Chrome."}function _r(){ne&&ne.getTracks().forEach(t=>t.stop()),ne=null;let e=A.querySelector("video");e&&e.remove()}async function ht(){if(!(ne||oe)){{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){Mt("Camera not available on this page."+$o(),!0);return}if(Oe.disabled)return;Oe.disabled=!0,Mt("Waiting for camera permission \u2014 check the browser prompt near the address bar.",!0);try{let t=j("slidetake:cam");ne=await navigator.mediaDevices.getUserMedia({video:{...t?{deviceId:{ideal:t}}:{},width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30}},audio:!1}),Wr()}catch(t){let a=t&&t.name;Mt(a==="NotAllowedError"||a==="SecurityError"?"Camera access was blocked."+$o():a==="NotFoundError"||a==="OverconstrainedError"?"No camera was found. Check that a webcam is connected.":a==="NotReadableError"?"The camera is busy \u2014 close other apps using it (Zoom, OBS, FaceTime) and try again.":"Could not start the camera"+(a?" ("+a+")":"")+"."+$o(),!0);return}finally{Oe.disabled=!1,Ur()}ne.getVideoTracks().forEach(t=>t.addEventListener("ended",()=>{_r(),Ja(),ye()}));let e=document.createElement("video");e.autoplay=!0,e.muted=!0,e.playsInline=!0,e.srcObject=ne,A.appendChild(e)}Ja(),ye()}}function zs(e,t){e.classList.toggle("on",t),e.setAttribute("aria-pressed",String(t))}function Ur(){Oe.querySelector("svg")||(Oe.innerHTML=yd+'<span class="lbl"> <u class="key">C</u>amera</span>'),Oe.classList.toggle("on",!oe),Oe.setAttribute("aria-pressed",String(!oe)),Oe.title=oe?"Camera is off for every slide (C)":"Camera is on and follows the deck (C)"}function _t(e,t){e&&!Je||(oe=!e,t||W("slidetake:camera",e?"on":"off"),oe&&(_r(),Wr()),ke=null,je=-1,Me=Math.min(Me,Math.max(0,Nt(m.get(y)).length-1)),Ur(),Ja(),mo(),Ht(),ye(),!K&&!t&&Mt(e?"Camera on \u2014 slides follow their camera settings.":"Camera off \u2014 camera settings are ignored and slides use the whole screen."),e&&ht())}function Rs(){document.body.classList.remove("idle"),clearTimeout(fi),K&&(fi=setTimeout(()=>document.body.classList.add("idle"),2e3))}function Ft(e,t){Tt.textContent=e,Tt.classList.add("show"),clearTimeout(yi),yi=setTimeout(()=>Tt.classList.remove("show"),t||2500)}function ur(e,{keepObs:t=!0,keepEdit:a=!0,slide:o=""}={}){let r=new URL(Cn(e),location.origin);return new URLSearchParams(location.search).forEach((n,i)=>{i==="src"||i==="obs"&&!t||i==="edit"&&!a||r.searchParams.set(i,n)}),o&&(r.hash=o),r.href.replace(r.pathname,r.pathname.replace(/%40/g,"@"))}async function vd(e){let t={keepObs:!1,keepEdit:!1,slide:e};if(T.kind==="source")return{link:ur(T.source,t),inside:!1};if(T.kind==="copy"&&La(P)&&["url","gist","builtin"].includes(P.origin.kind))return{link:ur(P.origin,t),inside:!1};let o=T.kind==="share"?T.data:await Tn(ce.value),r=new URLSearchParams(location.search);return["src","obs","edit"].forEach(n=>r.delete(n)),{link:location.origin+"/share"+(r.toString()?"?"+r:"")+Po(o,e),inside:!0}}function wd(){let e=j("slidetake:draft");if(!e||e===Co)return null;let t=Ma(e,{kind:"file",name:"your earlier draft"},{exported:!0});W("slidetake:copy",JSON.stringify(t));try{localStorage.removeItem("slidetake:draft")}catch{}return t}function ka(){W("slidetake:copy",JSON.stringify(P))}function Ut(){if(U)return;let e;if(qr())e='<span class="mine">'+B(ue.file)+'</span> <span class="ro">\xB7 on this computer, saved as you type</span>';else if(T.kind==="copy")e='<span class="mine">Your copy of '+B(Ae(P.origin))+"</span>"+(Ta(P)?' <span class="edited">\xB7 edited</span>':"");else{let a=T.kind==="share"?"a shared deck":Ae(T.source);e='<span class="mine">'+B(a.charAt(0).toUpperCase()+a.slice(1))+'</span> <span class="ro">\xB7 read-only, typing makes your copy</span>'}document.getElementById("doc-state").innerHTML=e,Ve.classList.toggle("unsaved",T.kind==="copy"&&Ta(P)),document.getElementById("btn-reset").hidden=!(T.kind==="copy"&&!La(P));let t=document.getElementById("continue");t.hidden=T.kind==="copy"||!P,P&&(t.textContent="Your copy \u2192",t.title="Continue your copy of "+Ae(P.origin))}function Ds(e){return!P||!Ta(P)?!0:confirm("Your copy of "+Ae(P.origin)+" has edits you haven't saved or shared. Replace it with "+e+"?")}function Fs(){let e=new URLSearchParams(location.search);return e.delete("src"),e.delete("template"),"/edit"+(e.toString()?"?"+e:"")}function xd(){let e=T.kind==="share"?{kind:"shared"}:T.source;return Ds("a copy of "+Ae(e))?(P=Ma(T.text,e),T={kind:"copy"},history.pushState(null,"",Fs()+(y&&y!==b[0]?"#"+encodeURIComponent(y):"")),Ft("Editing your own copy of "+Ae(e)+". The original is unchanged.",4e3),!0):(ce.value=T.text,!1)}function kd(){T={kind:"copy"},history.pushState(null,"",Fs()),Ve.classList.contains("collapsed")&&go(),ce.value=P.text,Ot(!0),Ut()}function qr(){return!!(ue&&T&&T.kind==="source"&&T.source.kind==="url"&&new URL(T.source.url,location.href).pathname===ue.deck)}function Sd(e){fetch(ue.save,{method:"PUT",body:e}).catch(()=>Ft("Could not save "+ue.file+": is npx slidetake still running?",6e3))}async function Ed(e){if(e.kind==="builtin")return Ka[e.id==="help"?"docs":e.id]??Ka.home;if(e.kind==="gist"){let a=await fetch("https://api.github.com/gists/"+encodeURIComponent(e.id));if(!a.ok)throw new Error(a.status===404?"no such gist":a.status+" "+a.statusText);let o=Object.values((await a.json()).files||{}),r=o.find(n=>n.filename===e.file)||o.find(n=>/\.(md|markdown)$/i.test(n.filename))||o[0];if(!r)throw new Error("the gist has no files");return _e=r.raw_url,r.truncated?await(await fetch(r.raw_url)).text():r.content}let t=await fetch(e.url);if(!t.ok)throw new Error(t.status===404?"not found":t.status+" "+t.statusText);return _e=new URL(e.url,location.href).href,await t.text()}function wi(){return T={kind:"source",source:{kind:"builtin",id:"home"},text:Ka.home},T.text}async function Cd(){if(ue&&ae.page==="source"&&ae.source.kind==="builtin"&&ae.source.id==="home"&&location.pathname==="/"&&(ae.source={kind:"url",url:ue.deck}),U)return _e=U.base||location.href,T={kind:"source",source:{kind:"url",url:_e},text:bn(U.settings||{})+String(U.markdown||"")},T.text;if(ae.page==="edit"){if(P)return T={kind:"copy"},P.text;history.replaceState(null,"","/new"+location.search),ae.page="pick"}if(ae.page==="pick")return ya(document.getElementById("new-dialog")),T={kind:"source",source:{kind:"builtin",id:"template:blank"},text:Ka["template:blank"]},T.text;if(ae.page==="share")try{let e=await Ln(ae.data);return T={kind:"share",data:ae.data,text:e},e}catch{return Ft("This link's deck is damaged or cut short, so it could not be opened.",6e3),wi()}try{let e=await Ed(ae.source);return T={kind:"source",source:ae.source,text:e},e}catch(e){return la.textContent="Could not load the deck ("+e.message+")",Ft("Could not load "+Ae(ae.source)+": "+e.message,6e3),wi()}}var U,ue,gr,Je,Ce,Ka,ce,R,ee,_o,ei,gl,la,Xo,yl,Ve,yt,bl,Lt,Uo,ie,Qo,vl,wl,xl,kl,Sl,El,ca,m,b,rt,y,yr,J,K,D,oe,ne,Fe,A,le,z,na,Ml,ge,ti,Qe,ai,Me,ke,je,We,xe,Ye,Qt,ia,jl,Wl,ql,Ai,Go,Yl,_e,ri,Zl,ec,tc,ni,oc,Ha,rc,sc,lc,Vo,Ze,Yo,ar,tt,Ue,xc,Bt,me,Xa,wt,Ni,Pe,at,Be,ja,kt,bt,si,Ic,li,ci,di,Y,ta,rr,Qa,Za,eo,Cr,sa,se,ze,ot,Mr,qi,h,da,ha,Pc,Tr,zc,Vi,Fc,Hc,Wc,St,Pt,zt,nr,xt,Et,fe,_a,pe,_c,ir,Ar,Wa,Ua,sr,oo,Uc,Xi,ct,Kc,es,nt,hi,Ge,rd,nd,ls,it,cs,lr,ma,ds,hs,ps,us,ms,H,Z,k,ea,qa,fs,ys,Ga,Ko,no,io,xs,Ct,N,lo,Es,et,Jo,cd,I,cr,ui,Ne,Ts,wa,dd,xo,st,mi,Wt,Va,vt,aa,hr,pr,oa,Os,Oe,ra,Ya,Is,yd,fi,Ee,gi,Tt,yi,bd,mr,fr,bi,co,ae,vi,T,P,Ns=G(()=>{"use strict";$r();Xr();Zr();tn();on();nn();ln();dn();pn();Ea();wn();Sn();Oo();zo();On();Pn();Gn();Yn();Zn();Oa();U=window.SLIDETAKE||null;document.getElementById("deck-text")?.remove();ue=window.SLIDETAKE_LOCAL||null,gr=document.querySelector("header .mark .logo").outerHTML;document.documentElement.classList.toggle("embed",!!U);Je=!U||U.recording===!0;document.documentElement.classList.toggle("no-record",!Je);Ce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Ka={home:Co,docs:Qr,features:en,privacy:an,showcase:un,"template:blank":rn,"template:talk":sn,"template:recording":cn,"template:short":hn},ce=document.getElementById("editor"),R=document.getElementById("stage"),ee=document.getElementById("world"),_o=document.getElementById("connectors"),ei=document.getElementById("breadcrumbs"),gl=document.getElementById("status-count"),la=document.getElementById("status-err"),Xo=document.getElementById("mm-svg"),yl=document.getElementById("mm-label"),Ve=document.getElementById("editor-pane"),yt=540,bl=96,Lt=440,Uo=720,ie=960,Qo=180,vl=540,wl=100,xl=110,kl=420,Sl=.35,El=1,ca=parseFloat(j("slidetake:slideSize"))||.92,m=new Map,b=[],rt=[],y=null,yr=["focus","path","radial","tree"],J="path",K=!1,D={},oe=!0,ne=null,Fe=document.getElementById("brand"),A=document.getElementById("pip"),le=document.getElementById("stage-wrap"),z={x:0,y:0,zoom:.6},na=null;Ml='<span class="st-name">'+gr+'Slide<span class="st-take">take</span></span>';ge=()=>/^(portrait|vertical|9:16)$/i.test(String(D.format||"").trim());ti={accent:"--accent",accentSoft:"--accent-teal",line:"--accent-line",ring:"--accent-ring",header:"--header-bg",headerText:"--header-ink",onAccent:"--on-accent"};Qe=null;ai=new URLSearchParams(location.search).get("mode");Me=0;ke=null,je=-1,We=null;xe=document.getElementById("cam-overlay"),Ye="",Qt=[],ia=null;new ResizeObserver(()=>{Ye&&er()}).observe(le);jl=new Set("svg g defs symbol use path rect circle ellipse line polyline polygon text tspan textPath title desc marker linearGradient radialGradient stop clipPath mask pattern filter feGaussianBlur feOffset feBlend feFlood feComposite feMerge feMergeNode feColorMatrix feDropShadow".split(" ")),Wl=0;ql=e=>e.querySelector("img")&&!e.textContent.trim()&&[...e.children].every(t=>/^(IMG|BR)$/.test(t.tagName));Ai=["dot","d2","echarts","svg"].map(e=>":scope > code.language-"+e).join(", "),Go=e=>!!e.querySelector("img")&&!e.textContent.trim(),Yl=e=>e.children.length===1&&(e.children[0].tagName==="PRE"&&!!e.children[0].querySelector(Ai)||e.children[0].matches("div.diagram"));_e=null;ri=null;Zl="https://cdn.jsdelivr.net/npm/@viz-js/viz@3.4.0/lib/viz-standalone.js",ec="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js",tc={dark:{palette:["#60a5fa","#f472b6","#a78bfa","#fb923c","#facc15","#a1a1aa"],text:"#e4e4e7",muted:"#a1a1aa",line:"#3f3f46",split:"#27272a",tip:"#18181b"},light:{palette:["#2563eb","#db2777","#7c3aed","#ea580c","#ca8a04","#71717a"],text:"#27272a",muted:"#71717a",line:"#d4d4d8",split:"#e4e4e7",tip:"#ffffff"}};ni=new Set;oc="https://esm.sh/@terrastruct/d2@0.1.33",Ha=null,rc={dark:{N1:"#e4e4e7",N2:"#a1a1aa",N3:"#a1a1aa",N4:"#323238",N5:"#27272a",N6:"#18181b",N7:"#09090b"},light:{N1:"#27272a",N2:"#71717a",N3:"#71717a",N4:"#e4e4e7",N5:"#e4e4e7",N6:"#f4f4f5",N7:"#ffffff"}};sc=(e,t)=>e.replace("{","{"+t),lc=e=>/d2-config\s*:/.test(e)?e:`vars: {
  d2-config: {
    layout-engine: elk
  }
}
`+e,Vo={};Ze=0,Yo=null;ar=!1;tt=document.getElementById("progress");tt.innerHTML="<b></b><i></i>";Ue={start:0,timer:null};xc=["x","y","xPercent","yPercent","scale","scaleX","scaleY","rotation","rotate","skewX","skewY"];Bt=null;me=null,Xa=!1,wt=null;Ni=null,Pe=!1;at=null;Be=null;Xo.addEventListener("click",e=>{let t=e.target.closest("circle");t&&!h.active&&_(t.dataset.id)});ja=null;ce.addEventListener("input",()=>{if(qr()){T.text=ce.value,clearTimeout(ja),ja=setTimeout(()=>{Sd(ce.value),Ot(!0)},300);return}T.kind!=="copy"&&!xd()||(P.text=ce.value,Ut(),clearTimeout(ja),ja=setTimeout(()=>{ka(),Ot(!0)},300))});document.querySelectorAll("#layout-toggle .seg-btn").forEach(e=>{e.addEventListener("click",()=>{e.dataset.mode!==J&&Er(e.dataset.mode)})});(function(){let e=new Map,t=0,a=!1,o=null,r=()=>{let[i,s]=[...e.values()];return Math.hypot(i.x-s.x,i.y-s.y)||1};R.addEventListener("pointerdown",i=>{i.pointerType==="mouse"&&i.button!==0||h.active||i.target.closest("a, pre, code, input, textarea")||(e.set(i.pointerId,{x:i.clientX,y:i.clientY}),t=0,a=!1,e.size===2&&(o={d:r(),zoom:z.zoom}))}),window.addEventListener("pointermove",i=>{let s=e.get(i.pointerId);if(!s)return;let l=i.clientX-s.x,c=i.clientY-s.y;e.set(i.pointerId,{x:i.clientX,y:i.clientY}),t+=Math.abs(l)+Math.abs(c),!a&&t>5&&(a=!0,xr(),R.classList.add("dragging")),a&&(e.size===2&&o?z.zoom=_i(o.zoom*r()/o.d):(z.x-=l/z.zoom,z.y-=c/z.zoom),At())});let n=i=>{e.delete(i.pointerId),e.size<2&&(o=null),e.size||R.classList.remove("dragging")};window.addEventListener("pointerup",n),window.addEventListener("pointercancel",n),R.addEventListener("click",i=>{a&&(i.stopPropagation(),i.preventDefault(),a=!1)},!0)})();R.addEventListener("wheel",e=>{e.preventDefault(),!h.active&&Ui(Math.exp(-e.deltaY*(e.ctrlKey?.01:.0015)),e.clientX,e.clientY)},{passive:!1});document.getElementById("nav-prev").onclick=()=>qe(-1);document.getElementById("nav-next").onclick=()=>qe(1);document.getElementById("btn-open").onclick=()=>document.getElementById("file-input").click();document.getElementById("file-input").addEventListener("change",e=>{let t=e.target.files[0];if(!t)return;let a=new FileReader;a.onload=()=>{Ds("a copy of "+t.name)&&(P=Ma(String(a.result),{kind:"file",name:t.name},{exported:!0}),ka(),_e=null,y=null,kd())},a.readAsText(t),e.target.value=""});document.getElementById("btn-save").onclick=()=>{let e=new Blob([ce.value],{type:"text/markdown"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=(rt[0]?mt(m.get(rt[0]).title):"deck")+".md",t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3),T.kind==="copy"&&(P.exported=P.text,ka(),Ut())};document.getElementById("btn-reset").onclick=()=>{T.kind!=="copy"||La(P)||confirm("Discard your edits and go back to "+Ae(P.origin)+" as it was?")&&(P.text=P.originText,ka(),ce.value=P.text,y=null,Ot(!0),Ut())};document.getElementById("btn-edit-toggle").onclick=go;kt=document.querySelector("main"),bt=document.getElementById("editor-resizer"),si=parseFloat(j("slidetake:editorWidth"));si&&Ve.style.setProperty("--editor-w",si+"px");bt.addEventListener("pointerdown",e=>{e.preventDefault(),bt.setPointerCapture(e.pointerId),kt.classList.add("resizing");let t=kt.getBoundingClientRect().right,a=r=>{let n=Math.round(Math.max(280,Math.min(window.innerWidth*.75,t-r.clientX)));Ve.style.setProperty("--editor-w",n+"px")},o=()=>{kt.classList.remove("resizing"),bt.removeEventListener("pointermove",a),W("slidetake:editorWidth",String(Ve.getBoundingClientRect().width))};bt.addEventListener("pointermove",a),bt.addEventListener("pointerup",o,{once:!0})});bt.addEventListener("dblclick",()=>{Ve.style.removeProperty("--editor-w");try{localStorage.removeItem("slidetake:editorWidth")}catch{}});document.getElementById("btn-mode").onclick=ki;document.getElementById("btn-present").onclick=()=>Se(!K);Ic="https://cdn.jsdelivr.net/npm/obs-websocket-js@5.0.5/dist/obs-ws.min.js",li=["ArrowRight","PageDown"," ","ArrowDown","Enter"],ci=["ArrowLeft","PageUp","ArrowUp","r","R"],di=["b","B","."],Y=document.getElementById("review"),ta=document.getElementById("rec-countdown"),rr=document.getElementById("rec-paused"),Qa=document.getElementById("obs-host"),Za=document.getElementById("obs-port"),eo=document.getElementById("obs-pass"),Cr=document.getElementById("obs-remember"),sa=document.getElementById("obs-status"),se=null,ze=!1,ot=null,Mr=null,qi="",h={active:!1,withObs:!1,counting:!1,paused:!1,finishing:!1,t0:0,pauseAt:0,pausedMs:0,events:[],outputPath:null,browser:null},da=e=>new Promise(t=>setTimeout(t,e)),ha=()=>Promise.race([new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e))),da(100)]);Pc="G-3S9FY4MQLS",Tr=document.getElementById("analytics-dialog"),zc=()=>j("slidetake:analytics")!=="off";Tr.querySelectorAll("[data-analytics]").forEach(e=>e.onclick=()=>Rc(e.dataset.analytics==="on"));Vi=document.getElementById("btn-analytics");Vi.hidden=!/^(www\.)?slidetake\.com$/.test(location.hostname);Vi.onclick=()=>{Gi(),ya(Tr)};document.querySelectorAll(".modal").forEach(e=>{e.addEventListener("click",t=>{(t.target===e||t.target.closest("[data-close]"))&&e.classList.remove("open")})});Fc=e=>/^(localhost|127(\.\d+){3}|\[?::1\]?)$/i.test(e);Hc="Run OBS on this computer and connect to localhost: a secure (https) page can't reach OBS at any other address.";document.getElementById("obs-connect").onclick=Lr;Cr.addEventListener("change",Yi);Wc="https://cdn.jsdelivr.net/npm/mediabunny@1.64.0/+esm",St=document.getElementById("rec-cam"),Pt=document.getElementById("rec-mic"),zt=document.getElementById("rec-quality"),nr=document.getElementById("rec-meter"),xt=document.getElementById("rec-browser-check"),Et=document.getElementById("rec-wave"),fe=j("slidetake:rec-mode")||"",_a="",pe=null,_c=96;ir=0;Ar=document.getElementById("rec-cam-preview"),Wa=document.getElementById("rec-cam-none"),Ua=null,sr=0;Pt.onchange=()=>{W("slidetake:mic",Pt.value),to(),$e()};oo=document.getElementById("rec-mirror");oo.onchange=()=>{W("slidetake:mirror",oo.checked?"on":"off"),Br(),Te()};Br();St.onchange=()=>{qc(St.value),St.value!=="none"&&ne&&(_r(),ht()),Wt()&&Ji(),$e()};Uc=()=>(D.pip||"none").toLowerCase()!=="none"||!!D.camera||[...m.values()].some(e=>e.camera),Xi=()=>"slidetake:rec-cam:"+Ke();zt.onchange=()=>{W("slidetake:quality",zt.value),$e()};ct=()=>!(Le().ok&&(fe||"browser")==="browser");document.getElementById("btn-studio").onclick=()=>pa();Kc=()=>!!fe||dt().takes.length>0||bo().some(e=>e.key===Ke());document.getElementById("btn-record").onclick=()=>Ir();es=e=>{let t=Pa(e,ge());return{width:t.w,height:t.h,aspectRatio:t.w/t.h,frameRate:$t,resizeMode:"crop-and-scale"}};new ResizeObserver(ts).observe(kt);nt=!1;hi=600;Ge="";rd=e=>Fn(e,ss),nd=(e,t)=>Nn(e,t,{input:e.outputPath||Ge||"recording.mov",outputName:Ke()+"-final.mp4",sectionOf:ss,loudness:it()}),ls=document.querySelectorAll(".rv-loud"),it=()=>j("slidetake:loudness")!=="off",cs=()=>ls.forEach(e=>{e.setAttribute("aria-pressed",String(it())),e.classList.toggle("on",it())}),lr=document.getElementById("rv-limiter"),ma=()=>j("slidetake:limiter")==="on",ds=()=>{lr.setAttribute("aria-pressed",String(ma())),lr.classList.toggle("on",ma())};ds();lr.onclick=()=>{W("slidetake:limiter",ma()?"off":"on"),ds()};hs=()=>j("slidetake:mic-sound")==="raw"?"raw":"voice",ps=e=>({...e?{deviceId:{ideal:e}}:{},echoCancellation:!1,autoGainControl:!1,noiseSuppression:hs()==="voice"}),us=document.querySelectorAll("[data-sound]"),ms=()=>us.forEach(e=>{let t=e.dataset.sound===hs();e.classList.toggle("active",t),e.setAttribute("aria-checked",String(t))});ms();us.forEach(e=>e.onclick=()=>{W("slidetake:mic-sound",e.dataset.sound),ms(),pe&&to()});cs();ls.forEach(e=>e.onclick=()=>{W("slidetake:loudness",it()?"off":"on"),cs(),H&&vo()});H=null,Z=null,k=document.getElementById("rv-video"),ea=document.getElementById("rv-now");qa=-1,fs=()=>{let e=Na(b,Ne).length;return e?e+"/"+b.length+" slide"+(e===1?"":"s")+" up for a take":""};ys="";document.getElementById("rv-chapters").onclick=e=>vs(e.currentTarget,ys);document.getElementById("rv-ffmpeg-copy").onclick=e=>{!H||!H.events.length||(vs(e.currentTarget,nd(H,document.getElementById("rv-mode").value)),O("Copied the ffmpeg command: run it in a terminal, in the folder with "+(gt(H.outputPath)||"the recording")+"."))};Ga=new Map,Ko=0;no=document.getElementById("rv-fps");no.onchange=()=>{H&&(H.fps=parseFloat(no.value),Fr(H),vo())};io=null;k.addEventListener("timeupdate",()=>{if(!Z)return;let e=Z.ranges[Z.i];if(k.currentTime*1e3<e.end)return;if(Z.i++,Z.i>=Z.ranges.length){k.pause(),Z=null,O("");return}let t=Z.ranges[Z.i];k.currentTime=t.start/1e3,O("\u25B6 "+t.title)});xs=document.getElementById("rv-play-final"),Ct=null;xs.onclick=()=>{if(!H)return;if(!H.inBrowser){so(Jt(H).map(a=>({start:a.start,end:a.end,title:a.title})));return}if(N&&!N.single){k.paused?k.play().catch(()=>{}):k.pause();return}let e=Xt(H),t=Math.max(0,Ct?e.findIndex(a=>a.id===Ct):0);Ct=null,wo(e.slice(t))};k.addEventListener("play",Nr);k.addEventListener("pause",()=>{N&&N.single&&k.currentTime<N.parts[0].keep-.05&&(Ct=N.parts[0].id,O("Preview starts from "+N.parts[0].title.replace(/ · take \d+$/,"")+".")),Nr()});N=null;k.addEventListener("timeupdate",()=>{N&&k.currentTime>=N.parts[N.i].keep&&Ss()});k.addEventListener("ended",()=>{N&&Ss()});lo=document.getElementById("rv-render-btn");lo.onclick=()=>Cs(!1);Es=0,et=e=>{clearTimeout(Es),e?lo.textContent=e:lo.innerHTML='\u2193 <span><u class="key">D</u>ownload</span>'},Jo=e=>e.where?"\u201C"+e.where+"\u201D as "+e.name:"your downloads as "+e.name;cd=e=>{let t=a=>String(a).padStart(2,"0");return e.getFullYear()+"-"+t(e.getMonth()+1)+"-"+t(e.getDate())+" "+t(e.getHours())+"-"+t(e.getMinutes())+"-"+t(e.getSeconds())};document.getElementById("rv-folder-change").onclick=async()=>{try{let e=await Ms(!0);e&&O("Videos now go to "+e.name+".")}catch{}};I=null,cr="",ui=null,Ne=new Set,Ts=()=>"slidetake:board:"+Ke();wa=()=>W(Ts(),JSON.stringify(I)),dd=e=>{let t=m.get(e);return t?Kn(t.title+`
`+t.html):""},xo=()=>Jn(b,e=>({title:m.get(e).title,fp:dd(e)}));st=document.getElementById("rv-setup-btn"),mi=document.getElementById("setup-note"),Wt=()=>Y.classList.contains("setup-view");new MutationObserver(()=>{Y.classList.contains("open")||So()}).observe(Y,{attributes:!0,attributeFilter:["class"]});st.onclick=()=>{Wt()?So():ko()};document.getElementById("setup-record").onclick=()=>{ba(),fe||(fe=ct()?"obs":"browser",W("slidetake:rec-mode",fe)),Ir()};Y.addEventListener("click",e=>{(e.target===Y||e.target.closest("[data-close]"))&&yo()});Va=(()=>{let e=(navigator.userAgentData&&navigator.userAgentData.brands||[]).map(a=>a.brand).filter(a=>!/chromium|not.?a.?brand/i.test(a));if(e.length)return e[0].replace(/^(Google|Microsoft) /,"");let t=navigator.userAgent;return/Firefox\//.test(t)?"Firefox":/Edg\//.test(t)?"Edge":/OPR\//.test(t)?"Opera":/Chrome\//.test(t)?"Chrome":/Safari\//.test(t)?"Safari":"this browser"})();document.querySelectorAll(".browser-name").forEach(e=>{e.textContent=Va});document.getElementById("rv-rec").onclick=()=>{if(!ct()){ro("browser",Na(b,Ne));return}if(ze){ro("obs");return}dr({note:"Connect to OBS first: OBS \u2192 Connect."})};vt=document.getElementById("rv-pro");vt.onclick=()=>{Le().ok&&Vc(ct()?"browser":"obs")};document.querySelectorAll(".rv-purge .rv-menu button").forEach(e=>e.addEventListener("click",()=>{e.closest("details").open=!1}));document.getElementById("rv-clean-unused").onclick=async()=>{let{rows:e}=Ls(),t=new Set(e.map(o=>o.pick).filter(Boolean)),a=I.takes.filter(o=>!t.has(o.uid));if(!a.length){O("Every take is in use.");return}confirm("Purge "+a.length+" take"+(a.length===1?"":"s")+" the video doesn\u2019t use (earlier attempts and outdated takes)?")&&(await md(a),O("Purged "+a.length+" unused take"+(a.length===1?"":"s")+"."))};document.getElementById("rv-clean").onclick=async()=>{if(!I.takes.length||!confirm("Purge all "+I.takes.length+" takes of this deck from this browser? Download the video first if you need it."))return;let e=new Set(I.takes.map(t=>t.clip.split("/")[0]));I.takes=[],I.picks={},wa();for(let t of e)await zr(t);k.src&&(URL.revokeObjectURL(k.src),k.removeAttribute("src"),k.load()),N=null,jt(),O("All takes purged."),lt()};document.getElementById("rv-clean-every").onclick=async()=>{let e,t=0,a=0;try{e=await navigator.storage.getDirectory()}catch{return}let o=async s=>{for await(let l of s.values())l.kind==="directory"?await o(l):(a++,t+=(await l.getFile()).size)};try{await o(await e.getDirectoryHandle("slidetake-takes"))}catch{}let r=[];try{for(let s=0;s<localStorage.length;s++){let l=localStorage.key(s);l&&l.startsWith("slidetake:board:")&&r.push(l)}}catch{}let n=r.filter(s=>{try{return JSON.parse(localStorage.getItem(s)||"{}").takes.length>0}catch{return!1}}).length;if(!a){O("No takes are kept in this browser.");return}let i=t>1e9?(t/1e9).toFixed(1)+" GB":Math.max(1,Math.round(t/1e6))+" MB";if(confirm("Purge "+i+" of takes ("+a+" file"+(a===1?"":"s")+") from "+(n||"no")+" deck"+(n===1?"":"s")+" and any left behind? Every deck loses its takes; download the videos you need first.")){try{await e.removeEntry("slidetake-takes",{recursive:!0})}catch{}r.forEach(s=>{try{localStorage.removeItem(s)}catch{}}),W("slidetake:sessions",JSON.stringify(bo().map(s=>s.inBrowser?{...s,cleaned:!0}:s))),I=null,cr="",dt(),Ga.clear(),k.src&&(URL.revokeObjectURL(k.src),k.removeAttribute("src"),k.load()),N=null,jt(),lt(),O("Purged "+i+" of takes from every deck.")}};aa=null,hr=0,pr=!1;k.addEventListener("error",async()=>{if(k.getAttribute("src")){if(aa&&hr<5){hr++,O("Reloading "+Ge+" (OBS was still finishing it)\u2026"),await new Promise(e=>setTimeout(e,1500));try{xa(await Eo(aa),aa,!0);return}catch{}}O(aa?"Chrome cannot play "+Ge+". In OBS set Recording Format to Hybrid MP4 (or MP4) with H.264 video; the ffmpeg command still works with this file.":"Could not play "+(Ge||"this file")+". If OBS was still finishing it when you opened it, open it again; if it still fails, set OBS to Hybrid MP4 (or MP4) with H.264 video.",{warn:!0})}});oa=document.getElementById("rv-file-input");oa.addEventListener("change",()=>{oa.files[0]&&xa(oa.files[0]),oa.value=""});document.getElementById("rv-open").onclick=async()=>{if(!window.showOpenFilePicker)return oa.click();try{let[e]=await window.showOpenFilePicker({id:"obs-recordings",types:[{description:"Recordings",accept:{"video/*":[".mov",".mp4",".m4v",".mkv",".webm"]}}]});O("Opening "+e.name+"\u2026"),xa(await Eo(e),e)}catch(e){(!e||e.name!=="AbortError")&&O("Could not open that file.",{warn:!0})}};Os=document.getElementById("rv-folder");window.showDirectoryPicker||(Os.style.display="none");Os.onclick=async()=>{let e=H&&gt(H.outputPath);try{let t=await window.showDirectoryPicker({id:"obs-recordings",mode:"read"});if(Bs("obs-folder",t),!e){O("Folder remembered. This session has no file name from OBS; open the file instead.");return}let a=await t.getFileHandle(e);xa(await Eo(a),a)}catch{}};Dc()&&new URLSearchParams(location.search).get("obs")&&Lr();Oe=document.getElementById("btn-camera"),ra=document.getElementById("pip-msg"),Ya=null,Is=A.querySelector("span");yd='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10.5 22 7v10l-6-3.5z"/></svg>';Oe.onclick=()=>_t(oe);Ur();fi=null;window.addEventListener("pointermove",Rs);document.addEventListener("fullscreenchange",()=>{document.fullscreenElement||(h.active?Rt("Stopped: the browser left fullscreen"):K&&Se(!1))});Ee=document.getElementById("help");new MutationObserver(()=>zs(document.getElementById("btn-keys"),Ee.classList.contains("open"))).observe(Ee,{attributes:!0,attributeFilter:["class"]});new MutationObserver(()=>{let e=Y.classList.contains("open");document.getElementById("btn-studio").classList.toggle("active",e),!e&&!k.paused&&k.pause()}).observe(Y,{attributes:!0,attributeFilter:["class"]});document.getElementById("btn-keys").onclick=()=>Ee.classList.add("open");document.getElementById("help-close").onclick=()=>Ee.classList.remove("open");Ee.addEventListener("click",e=>{e.target===Ee&&Ee.classList.remove("open")});window.addEventListener("keydown",e=>{if(e.key==="F5"){e.preventDefault(),h.active||pa();return}if(h.active){Zc(e);return}if(document.querySelector(".modal.open")){let o=Y.classList.contains("open")&&Wt();if(e.key==="Escape")ba();else if(Y.classList.contains("open")&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||"")){let r=e.key.toLowerCase(),n=r==="r"?o?"setup-record":"rv-rec":o?"":r==="p"?"rv-play-final":r==="d"?ct()?"rv-ffmpeg-copy":"rv-render-btn":"",i=n?document.getElementById(n):null;i&&!i.disabled&&(e.preventDefault(),i.click())}return}let t=document.activeElement&&document.activeElement.tagName;if(t==="TEXTAREA"||t==="INPUT"||e.metaKey||e.ctrlKey||e.altKey)return;if(Ee.classList.contains("open")){/^(Escape|k|K|\?|\/)$/.test(e.key)&&Ee.classList.remove("open");return}let a=e.key;a==="ArrowRight"||a===" "||a==="PageDown"?(e.preventDefault(),qe(1)):a==="ArrowLeft"||a==="PageUp"?(e.preventDefault(),qe(-1)):a==="ArrowDown"?(e.preventDefault(),Bc()):a==="ArrowUp"?(e.preventDefault(),Ac()):a==="Home"?b.length&&_(b[0]):a==="End"?b.length&&_(b[b.length-1]):a==="o"||a==="O"?Lc():a==="e"||a==="E"?go():a==="f"||a==="F"||a==="p"||a==="P"?Se(!K):a==="r"||a==="R"?Ir():a==="s"||a==="S"?pa():/^[1-4]$/.test(a)?Er(yr[+a-1]):a==="c"||a==="C"?_t(oe):a==="v"||a==="V"?Rl():a==="l"||a==="L"?ki():a==="+"||a==="="?ii(1):a==="-"||a==="_"?ii(-1):a==="?"||a==="/"||a==="k"||a==="K"?Ee.classList.add("open"):a==="Escape"&&!ji()&&K&&Se(!1)});window.addEventListener("hashchange",()=>{let{data:e,slide:t}=Ca(location.hash);if(e&&!(T&&T.kind==="share"&&e===T.data)){location.reload();return}t&&t!==y&&m.has(t)&&_(t)});gi="";new ResizeObserver(()=>{let e=R.clientWidth+"x"+R.clientHeight;e!==gi&&(gi=e,At(),ye(!0))}).observe(R);Tt=document.createElement("div");Tt.id="toast";Tt.setAttribute("role","status");document.body.appendChild(Tt);yi=null;bd=document.getElementById("open-dialog"),mr=document.getElementById("open-url"),fr=document.getElementById("open-error");document.getElementById("btn-load").onclick=()=>{fr.hidden=!0,ya(bd),mr.focus(),mr.select()};document.getElementById("open-form").onsubmit=e=>{e.preventDefault();let t=En(mr.value);if(!t){fr.textContent="That doesn't look like a link.",fr.hidden=!1;return}location.href=ur(t)};document.getElementById("btn-share").onclick=async()=>{let{link:e,inside:t}=await vd(y&&y!==b[0]?y:""),a=t?"Link copied, with the whole deck inside it ("+(e.length/1024).toFixed(1)+" KB)"+(e.length>8e3?". Some chat apps cut long links short: a GitHub file or gist makes a shorter one.":"."):"Link copied.";try{await navigator.clipboard.writeText(e),Ft(a,5e3)}catch{prompt("Copy this link:",e)}T.kind==="copy"&&(P.exported=P.text,ka(),Ut())};bi=j("slidetake:layout");J=yr.includes(bi)?bi:"path";document.querySelectorAll("#layout-toggle .seg-btn").forEach(e=>e.classList.toggle("active",e.dataset.mode===J));co=new URLSearchParams(location.search);yr.includes(co.get("layout"))&&(J=co.get("layout"),document.querySelectorAll("#layout-toggle .seg-btn").forEach(e=>e.classList.toggle("active",e.dataset.mode===J)));if(U){let e=(Array.isArray(U.trail)?U.trail:U.back?[U.back]:[]).filter(r=>r&&r.label),t=document.querySelector("header .brand");e.length&&(t.innerHTML='<nav class="trail" aria-label="Site">'+e.map((r,n)=>(n?'<span class="sep" aria-hidden="true">|</span>':"")+(r.url?'<a href="'+B(r.url)+'">'+B(r.label)+"</a>":"<span>"+B(r.label)+"</span>")).join("")+"</nav>");let a=document.createElement("a");a.id="credit",a.href="https://slidetake.com",a.target="_blank",a.rel="noopener",a.title="Made with Slidetake",a.setAttribute("aria-label","Made with Slidetake"),a.innerHTML=gr+'<span class="word">Slide<span>take</span></span>';let o=document.querySelector("header .hdr-actions");if(o.insertBefore(a,o.firstChild),!Je){let r=n=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+n+"</svg>";o.insertAdjacentHTML("beforeend",'<button class="btn icon" id="hdr-keys" title="Keyboard shortcuts (K)" aria-label="Keyboard shortcuts">'+r('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M8 16h8M10 13h4"/>')+'</button><button class="btn icon" id="hdr-full" title="Fullscreen (F)" aria-label="Fullscreen">'+r('<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>')+"</button>"),document.getElementById("hdr-keys").onclick=()=>document.getElementById("help").classList.add("open"),document.getElementById("hdr-full").onclick=()=>Se(!K)}}ae=An(location.pathname,location.search,location.hash),vi=ae.page==="pick"?"":ae.slide,T=null,P=Bn(j("slidetake:copy"))||wd();window.addEventListener("popstate",()=>location.reload());ue&&window.EventSource&&(new EventSource(ue.events).onmessage=async e=>{if(!qr())return;let t=(JSON.parse(e.data).file||"").replace(/\\/g,"/");if(t===ue.file){let a=await(await fetch(ue.deck,{cache:"no-store"})).text();if(a===ce.value)return;ce.value=T.text=a,Ot(!0);return}ee.querySelectorAll("img").forEach(a=>{let o=new URL(a.src);decodeURIComponent(o.pathname).endsWith("/"+t)&&(o.searchParams.set("t",String(Date.now())),a.src=o.href)})});(co.get("edit")==="1"||ae.page==="edit"&&P&&co.get("edit")!=="0")&&go();Cd().then(e=>(ce.value=e,Ut(),Ci(ce.value),Ii(),document.fonts?document.fonts.ready:null)).then(()=>{m.forEach(po),fa(),_(m.has(vi)?vi:b[0],!0),Je&&j("slidetake:camera")==="on"&&_t(!0,!0)})});var Yr=`  /* Every colour comes from these tokens. Slidetake's own is seafoam green: bright on zinc in dark mode,
     deep on white in light mode. A host page passes its own (window.SLIDETAKE.colors) and a deck can carry
     its own (accent: in its top block); see applyColors in app.js. */
  :root{
    --bg:#09090b;
    --grid-dot:#1d1d21;
    --panel:#111113;
    --panel-line:#27272a;
    --node-bg:#18181b;
    --node-border:#323238;
    --accent:#29b685;                  /* 6.9:1 on the card: an accent, kept below body text so it doesn't glare */
    --accent-teal:#3bc493;              /* headings below h2 */
    --text:#e4e4e7;
    --text-muted:#a1a1aa;
    --danger:#e0645c;
    --code-bg:#0f0f12;
    --overlay:rgba(17,17,19,.9);       /* breadcrumbs, nav bar, minimap */
    --on-accent:#022c22;               /* text on an accent-filled button */
    --card-shadow:0 6px 24px rgba(0,0,0,.35);
    --brand-shadow:0 1px 6px rgba(0,0,0,.6);
    --mono: 'IBM Plex Mono', ui-monospace, monospace;
    --display: 'Space Grotesk', sans-serif;
    --body: 'IBM Plex Sans', sans-serif;
  }
  /* Tokens derived from others are declared on body, not :root: a custom property resolves var() where
     it is declared, so on :root these would freeze the default palette's colours. */
  body{
    --accent-line:#047857;             /* borders and connector lines on the active path */
    --accent-ring:var(--accent);        /* the current slide's border, glow and the progress bar */
    --edge:var(--node-border);          /* connector lines off the active path */
    --header-bg:none;                   /* a host's band of colour behind the header (an image layer) */
    --header-ink:var(--text);           /* text on that band */
  }
  /* Light mode (L, mode: light, ?mode=light): #047857 carries text (5.5:1 on white); the brighter seafoam
     only rings and lines, which never need to be read. */
  body[data-mode="light"]{
    --bg:#fafaf9; --grid-dot:#e7e5e4; --panel:#ffffff; --panel-line:#e4e4e7;
    --node-bg:#ffffff; --node-border:#e4e4e7; --edge:#d4d4d8;
    --accent:#047857; --accent-teal:#065f46; --accent-line:#34d399; --accent-ring:#10b981;
    --text:#27272a; --text-muted:#71717a; --danger:#c2410c;
    --code-bg:#f4f4f5; --overlay:rgba(255,255,255,.92); --on-accent:#ffffff;
    --card-shadow:0 4px 18px rgba(24,24,27,.08); --brand-shadow:0 1px 4px rgba(255,255,255,.9);
  }
  body[data-mode="light"] .node .body pre code{color:var(--text);}
  body[data-mode="light"] #help, body[data-mode="light"] .modal{background:rgba(24,24,27,.45);}
  *{box-sizing:border-box;}
  html,body{height:100%;margin:0;}
  body{
    background:var(--bg);
    color:var(--text);
    font-family:var(--body);
    overflow:hidden;
    display:flex;
    flex-direction:column;
  }
  ::selection{background:var(--accent);color:var(--on-accent);}
  :focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
  button{font-family:var(--mono);}

  /* ---------- header ---------- */
  header{
    min-height:56px;flex:none;
    display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;
    padding:8px 16px;
    background:var(--header-bg), var(--panel);
    border-bottom:1px solid var(--panel-line);
    z-index:20;
  }
  /* a host's coloured header band: its own ink for the text, buttons and borders on it */
  body.st-header-color header{color:var(--header-ink);border-bottom-color:transparent;
    --text:var(--header-ink);--text-muted:color-mix(in srgb, var(--header-ink) 72%, transparent);
    --node-border:color-mix(in srgb, var(--header-ink) 28%, transparent);}
  .brand{display:flex;align-items:baseline;gap:10px;}
  /* the name and the links beside it share one baseline: the mark's baseline is its word's, the logo centred beside it */
  .brand .mark{font-family:var(--display);font-weight:700;font-size:17px;letter-spacing:.02em;color:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:7px;}
  .brand .mark .word{align-self:baseline;}
  .brand .mark .logo{width:20px;height:20px;fill:var(--accent);flex:none;align-self:center;}
  .brand .mark .word > span{color:var(--accent);}
  /* Slidetake's two-tone name in its own decks' titles, as in the header */
  .node .body .st-take{color:var(--accent);}
  .node .body .st-name{white-space:nowrap;color:var(--text);}
  /* in bold the rest of the name (Studio) keeps the text colour too, not the accent bold text takes */
  .node .body strong:has(> .st-name){color:var(--text);}
  .node .body .st-name .logo{width:1em;height:1em;vertical-align:-.14em;margin-right:.2em;fill:var(--accent);}
  /* the Record button's red, where a deck names the button; deeper on white so it reads */
  .node .body .st-rec{color:#f87171;}
  body[data-mode="light"] .node .body .st-rec{color:#dc2626;}
  /* a heart in the deck's own colour, where an emoji would keep its fixed green */
  .node .body .st-heart{display:inline-block;width:.9em;height:.9em;vertical-align:-.08em;background:var(--accent);
    -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54z'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54z'/%3E%3C/svg%3E") center/contain no-repeat;}
  /* Features, Showcase, Docs and GitHub (what it is, see it, how to use it, the source) sit with the name:
     they're about Slidetake, not about the deck on screen */
  .brand .site-links{display:flex;align-items:center;gap:16px;align-self:center;margin-left:8px;}
  .brand .site-link{font-family:var(--mono);font-size:13px;color:var(--text-muted);text-decoration:none;display:inline-flex;align-items:center;}
  .brand .site-link:hover, .brand .site-link:focus-visible{color:var(--accent);}
  .brand .site-link svg{width:15px;height:15px;display:block;margin-right:5px;}
  .hdr-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
  /* Buttons come in four kinds, and only these:
     1. a button: a grey outline that turns accent on hover; regular (32px) or .small (24px); .icon makes it square
     2. an accent button (.primary, and .rec in red): the one main action of a dialog or bar. Coloured text, the
        same grey outline as any button, filling with its colour on hover
     3. selected (.toggle.on, .seg-btn.active, .rv-chip.on, a chosen card): the accent outline on a light accent tint
     4. bare (.close, the deck's floating bar): no outline at all */
  .btn{
    background:transparent;color:var(--text);
    border:1px solid var(--node-border);border-radius:6px;box-sizing:border-box;
    height:32px;padding:0 12px;font-size:12px;letter-spacing:.02em;white-space:nowrap;cursor:pointer;
    display:inline-flex;align-items:center;justify-content:center;gap:6px;
    transition:border-color .15s, color .15s, background .15s;
  }
  .btn.small{height:24px;padding:0 9px;font-size:11px;}
  .btn.icon{width:32px;padding:0;}
  .btn.small.icon{width:24px;}
  .btn.icon svg{width:15px;height:15px;display:block;}
  .btn .ico{font-size:1.1em;line-height:1;}
  a.btn{text-decoration:none;}
  .btn:hover:not(:disabled){border-color:var(--accent);color:var(--accent);}
  .btn:disabled{opacity:.4;cursor:not-allowed;}
  .btn.primary{color:var(--accent);}
  .btn.primary:hover:not(:disabled){background:var(--accent);border-color:var(--accent);color:var(--on-accent);}
  .btn.rec{color:#f87171;}
  .btn.rec:hover:not(:disabled){background:#b91c1c;border-color:#b91c1c;color:#fff;}
  .btn.toggle{color:var(--text-muted);}
  .btn.active, .btn.toggle.on, .seg-btn.active{border-color:var(--accent);color:var(--accent);background:color-mix(in srgb, var(--accent) 10%, transparent);}
  .seg{display:inline-flex;height:32px;box-sizing:border-box;border:1px solid var(--node-border);border-radius:6px;overflow:hidden;}
  .seg-btn{
    background:transparent;border:none;color:var(--text-muted);font-family:var(--mono);height:100%;
    font-size:12px;padding:0 12px;cursor:pointer;display:flex;align-items:center;transition:background .15s,color .15s;
  }
  .seg-btn:hover{color:var(--accent);}

  /* ---------- main layout ---------- */
  main{flex:1;display:flex;min-height:0;}
  /* the editor sits on the right; its width is dragged with #editor-resizer and remembered */
  #editor-pane{
    width:var(--editor-w, 38%);min-width:280px;max-width:75vw;
    display:flex;flex-direction:column;
    background:var(--panel);border-left:1px solid var(--panel-line);
    transition:width .25s ease, min-width .25s ease, opacity .2s ease;
    overflow:hidden;
  }
  #editor-pane.collapsed{width:0;min-width:0;opacity:0;border-left:none;}
  main.resizing #editor-pane{transition:none;}
  main.resizing{cursor:col-resize;user-select:none;}
  #editor-resizer{flex:none;width:6px;margin-right:-3px;margin-left:-3px;z-index:5;cursor:col-resize;position:relative;}
  #editor-resizer:hover, main.resizing #editor-resizer{background:var(--accent-line, var(--accent));opacity:.6;}
  #editor-resizer:has(+ #editor-pane.collapsed){display:none;}
  /* two lines: the buttons, then what the text below is (the deck, read-only or your copy) */
  .pane-bar{flex:none;display:flex;flex-direction:column;align-items:stretch;gap:8px;padding:8px 10px 8px 14px;border-bottom:1px solid var(--panel-line);}
  .pane-actions{display:flex;gap:6px;flex-wrap:wrap;}
  .pane-state{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:24px;}
  #doc-state{text-transform:none;letter-spacing:.02em;font-size:11px;min-width:0;flex:1 1 auto;flex-shrink:1;}
  #doc-state .ro{color:var(--text-muted);}
  #doc-state .mine{color:var(--text);}
  #doc-state .edited{color:var(--accent);}
  #continue{color:var(--accent);border-color:var(--accent-line);}
  #continue[hidden]{display:none;}
  #btn-analytics[hidden]{display:none;}
  /* a built-in page's deck as text, for search engines and AI tools that don't run JavaScript: out of sight
     until the app removes it (without JavaScript, the page's <noscript> shows it) */
  .deck-text{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}
  /* links in a dialog's notes (the privacy page, say) in the accent, readable in dark and light */
  .modal .note a{color:var(--accent);text-decoration:underline;text-underline-offset:2px;}
  .modal ul.templates{list-style:none;padding:0;display:grid;gap:8px;margin:12px 0;}
  .modal ul.templates a{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border:1px solid var(--panel-line);border-radius:8px;text-decoration:none;color:var(--text);}
  .modal ul.templates a:hover{border-color:var(--accent);}
  .modal ul.templates span{font-size:12px;color:var(--text-muted);}
  /* the analytics choice: two cards, the chosen one in the accent */
  .modal .choices{display:grid;gap:8px;margin:12px 0;}
  /* a choice card (analytics on or off; recording in the browser or with OBS): the chosen one looks selected */
  .modal .choice{padding:10px 12px;border:1px solid var(--panel-line);border-radius:8px;background:transparent;color:var(--text);font:inherit;cursor:pointer;}
  .modal .choice:hover{border-color:var(--accent);}
  .modal .choice[aria-checked="true"]{border-color:var(--accent);background:color-mix(in srgb, var(--accent) 10%, transparent);}
  .modal .choice{display:flex;flex-direction:column;gap:4px;text-align:left;}
  .modal .choice strong{font-family:var(--display);font-size:14px;}
  .modal .choice span{font-size:12px;line-height:1.55;color:var(--text-muted);}
  .modal .note{font-size:12px;}
  #editor-pane.unsaved .pane-bar{box-shadow:inset 0 -2px 0 var(--accent);}
  #editor-pane.unsaved #btn-share, #editor-pane.unsaved #btn-save{color:var(--accent);}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
  .pane-label{
    font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;
    color:var(--text-muted);flex:none;
  }
  #editor{
    flex:1;resize:none;border:none;outline:none;padding-top:10px !important;
    background:var(--panel);color:var(--text);
    font-family:var(--mono);font-size:12.5px;line-height:1.65;
    padding:0 14px 14px;tab-size:2;
  }
  #status-line{
    flex:none;padding:6px 14px;font-family:var(--mono);font-size:11px;
    color:var(--text-muted);border-top:1px solid var(--panel-line);
    display:flex;justify-content:space-between;gap:10px;
  }
  #status-line .err{color:var(--danger);}
  #btn-reset{background:none;border:none;color:var(--text-muted);font-size:11px;cursor:pointer;padding:0;text-decoration:underline;}
  #btn-reset:hover{color:var(--accent);}

  body.presenting header, body.presenting #editor-pane, body.presenting #editor-resizer{display:none;}
  #breadcrumbs, #navbar, #minimap{transition:opacity .4s;}
  body.presenting.idle #breadcrumbs, body.presenting.idle #navbar, body.presenting.idle #minimap{opacity:0;pointer-events:none;}
  body.presenting.idle, body.presenting.idle *{cursor:none !important;}

  /* ---------- stage ---------- */
  #stage-wrap{flex:1;position:relative;overflow:hidden;}
  #stage{
    position:absolute;inset:0;
    background-color:var(--bg);
    background-image:radial-gradient(var(--grid-dot) 1.2px, transparent 1.2px);
    background-size:28px 28px;
    overflow:hidden;cursor:grab;touch-action:none;
  }
  #stage.dragging{cursor:grabbing;user-select:none;}
  #world{position:absolute;left:0;top:0;transform-origin:0 0;}
  #connectors{position:absolute;left:0;top:0;overflow:visible;pointer-events:none;}
  #connectors path{fill:none;stroke:var(--edge);stroke-width:1.5;transition:stroke .2s;}
  #connectors path.active{stroke:var(--accent-line);stroke-width:2;}

  div.node{ /* div: Graphviz also puts class="node" on its SVG shapes */
    position:absolute;left:0;top:0;width:440px;
    /* centre of the card sits at (--cx, --cy); --push is Focus's settle-in scale */
    transform:translate(calc(var(--cx,0) * 1px), calc(var(--cy,0) * 1px)) scale(var(--push,1)) translate(-50%,-50%);
    transform-origin:0 0; /* the last translate puts the card centre at 0,0, so the scale pivots on it */
    background:var(--node-bg);
    border:1px solid var(--node-border);border-radius:8px;
    padding:16px 18px 18px;cursor:pointer;
    box-shadow:var(--card-shadow);
    transition:border-color .18s, box-shadow .18s, opacity .3s;
  }
  /* Focus: every card sits at the same spot and only the current one shows; the next fades in with
     a slight push-in instead of the camera travelling */
  /* other cards vanish at once (no stacked fade on load or layout change); only the slide just left
     fades out, beneath the incoming one */
  #world.focus div.node{transition:none;}
  #world.focus div.node:not(.current){opacity:0;pointer-events:none;}
  #world.focus div.node.current{z-index:2;transition:opacity .55s ease, transform .8s cubic-bezier(.2,.7,.2,1), border-color .18s;}
  #world.focus div.node.leaving{z-index:1;transition:opacity .45s ease;}
  #world.focus div.node.entering{--push:.96;transition:none;}
  #world.focus #connectors{display:none;}
  /* progress: one continuous bar that moves with every press, reveals and camera steps included */
  #progress{position:absolute;left:0;right:0;bottom:0;height:5px;z-index:9;display:none;
    background:color-mix(in srgb, var(--text-muted) 22%, transparent);}
  #progress.show{display:block;}
  #progress i{position:absolute;inset:0 auto 0 0;width:0;background:var(--accent-ring);transition:width .5s ease;}
  /* talk timer on the same bar, in the same colour: the clock grows a half-strength layer behind the
     solid progress, so any half-strength stretch showing past the solid is how far behind the talk is */
  #progress b{position:absolute;inset:0 auto 0 0;width:0;background:color-mix(in srgb, var(--accent-ring) 50%, transparent);transition:width 1s linear;display:none;}
  #progress.timed b{display:block;}
  #progress.over b{animation:over 1.4s ease-in-out infinite;}
  @keyframes over{50%{opacity:.45;}}
  #world.morph div.node{transition:transform .65s cubic-bezier(.65,0,.35,1), border-color .18s, opacity .3s;}
  .node .body{overflow-wrap:anywhere;word-break:break-word;}
  /* only the current slide is ringed in the accent; hover and the route back to the root are faint tints */
  /* hover never touches the current slide, or its border would sit inside the ring as a second line */
  .node:not(.current):hover{border-color:color-mix(in srgb, var(--accent-line) 35%, var(--node-border));}
  body.presenting .node:not(.current):hover{border-color:var(--node-border);}
  /* cards take focus on click; the current-slide ring already marks them, so no second outline
     (Chrome re-shows :focus-visible when the window regains focus) */
  .node:focus-visible{outline:none;}
  .node:not(.current):focus-visible{border-color:var(--accent-line);}
  .node.current{border-color:var(--accent-ring);box-shadow:0 0 0 1px var(--accent-ring), 0 10px 34px color-mix(in srgb, var(--accent-ring) 22%, transparent);}
  .node.active-path:not(.current){border-color:color-mix(in srgb, var(--accent-line) 30%, var(--node-border));}
  .node .crumb{
    font-family:var(--mono);font-size:10px;color:var(--text-muted);overflow-wrap:anywhere;
    letter-spacing:.06em;margin-bottom:8px;text-transform:uppercase;
  }
  .node .body h1,.node .body h2,.node .body h3,.node .body h4,.node .body h5,.node .body h6{
    font-family:var(--display);color:var(--text);margin:0 0 8px;line-height:1.25;
  }
  .node .body h1{font-size:19px;}
  .node .body h2{font-size:16px;}
  .node .body h3{font-size:14px;color:var(--accent-teal);}
  .node .body h4,.node .body h5,.node .body h6{font-size:13px;color:var(--accent-teal);}
  .node .body p{margin:0 0 10px;font-size:13px;line-height:1.6;}
  .node .body > :last-child{margin-bottom:0;}
  .node .body ul,.node .body ol{margin:0 0 10px;padding-left:18px;font-size:13px;line-height:1.6;}
  .node .body li{margin-bottom:3px;}
  .node .body blockquote{margin:0 0 10px;padding-left:10px;border-left:2px solid var(--accent);color:var(--text-muted);font-size:13px;}
  .node .body img{max-width:100%;border-radius:4px;}
  .node .body table{border-collapse:collapse;font-size:12px;margin:0 0 10px;}
  .node .body th,.node .body td{border:1px solid var(--panel-line);padding:3px 7px;}
  .node .body code{
    font-family:var(--mono);background:var(--code-bg);border:1px solid var(--panel-line);
    padding:1px 5px;border-radius:4px;font-size:12px;color:var(--accent-teal);
  }
  .node .body pre{
    background:var(--code-bg);border:1px solid var(--panel-line);border-radius:6px;
    padding:10px 12px;overflow-x:auto;margin:0 0 10px;
  }
  .node .body pre code{border:none;background:none;padding:0;color:var(--text);}
  /* a long line scrolls on a slim accent bar, not the system's grey one */
  .node .body pre{scrollbar-width:thin;scrollbar-color:color-mix(in srgb, var(--accent) 45%, transparent) transparent;}
  .node .body pre::-webkit-scrollbar{height:5px;}
  .node .body pre::-webkit-scrollbar-track{background:transparent;}
  .node .body pre::-webkit-scrollbar-thumb{background:color-mix(in srgb, var(--accent) 45%, transparent);border-radius:3px;}
  .node .body strong{color:var(--accent);}
  .node .body a{color:var(--accent-teal);}
  .node .body a.xlink::after{content:" \u2197";font-size:10px;}
  .node .err-badge{
    position:absolute;top:-8px;right:-8px;background:var(--danger);color:#1a0a08;
    font-family:var(--mono);font-size:10px;padding:2px 7px;border-radius:20px;font-weight:600;
  }

  /* ---------- recording ---------- */
  .modal{position:fixed;inset:0;background:rgba(4,7,13,.72);z-index:50;display:none;align-items:center;justify-content:center;padding:16px;}
  .modal.open{display:flex;}
  .modal .panel{
    position:relative;width:min(620px,100%);max-height:88vh;overflow-y:auto;
    background:var(--panel);border:1px solid var(--panel-line);border-radius:12px;padding:24px 26px;
  }
  .modal .panel.wide{width:min(760px,100%);}
  .modal h2{font-family:var(--display);font-size:18px;margin:0 0 6px;color:var(--accent);}
  .modal h3{font-family:var(--display);font-size:13px;margin:18px 0 8px;color:var(--text);display:flex;align-items:center;gap:10px;}
  .modal p, .modal li{font-size:13px;line-height:1.6;color:var(--text-muted);margin:0 0 6px;}
  .modal ul{padding-left:18px;margin:0;}
  /* \u2715 Close: a regular button at the top right, on the title's line (with \u2699 Setup beside it on the board) */
  .modal .panel > .close, .modal .panel-actions{position:absolute;top:20px;right:24px;}
  .modal .panel-actions{display:flex;gap:8px;}
  .modal h2{padding-right:96px;}
  .modal .fields{display:grid;grid-template-columns:2fr 1fr 2fr;gap:10px;}
  #open-form{display:flex;gap:8px;margin:12px 0 6px;}
  #help table.keys{border-collapse:collapse;margin:6px 0 12px;font-size:13px;}
  #help table.keys td{padding:5px 14px 5px 0;color:var(--text-muted);vertical-align:top;}
  #help table.keys td:first-child{white-space:nowrap;}
  #help a{color:var(--accent);}
  #open-url{flex:1;min-width:0;}
  .modal p.warn{color:var(--danger);}
  #toast{position:fixed;left:50%;top:64px;transform:translateX(-50%) translateY(-8px);opacity:0;pointer-events:none;z-index:60;
    background:var(--panel, #18181b);color:var(--text);border:1px solid var(--accent-line, var(--accent));border-radius:8px;
    padding:8px 14px;font-family:var(--mono);font-size:12px;transition:opacity .2s, transform .2s;max-width:min(560px,calc(100vw - 32px));}
  #toast.show{opacity:1;transform:translateX(-50%);}
  .modal label{display:flex;flex-direction:column;gap:4px;font-family:var(--mono);font-size:11px;color:var(--text-muted);}
  .modal label.check{flex-direction:row;align-items:center;gap:8px;margin-top:10px;}
  .modal input[type=text], .modal input[type=password], .modal textarea{
    background:var(--code-bg);border:1px solid var(--node-border);border-radius:6px;color:var(--text);
    font-family:var(--mono);font-size:12.5px;padding:8px 10px;outline:none;
  }
  .modal input:focus, .modal textarea:focus{border-color:var(--accent);}
  .modal textarea{width:100%;resize:vertical;line-height:1.6;}
  .modal .row{display:flex;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap;}
  .modal .row.end{justify-content:flex-end;margin-top:20px;}
  #obs-status{font-family:var(--mono);font-size:12px;color:var(--text-muted);white-space:nowrap;}
  #obs-detail{color:var(--danger);}
  #obs-status.ok, #rec-screen .ok{color:#10b981;}
  #rec-screen a{color:inherit;text-decoration:underline;}
  #obs-status.err{color:var(--danger);}
  .modal .warn{color:var(--accent);}
  #rv-setup .warn{color:var(--danger);}
  @media (max-width:560px){ .modal .fields{grid-template-columns:1fr;} }
  /* Studio, beside the Editor: an accent dot (red is for \u25CF Record itself); lit, like the Editor, while open */
  #btn-studio .rec-dot{color:var(--accent);}
  /* the key that does it, its letter in the accent: Keys, Camera, Record, Fullscreen, Editor, Studio */
  u.key{text-decoration:none;color:var(--accent);font-weight:600;}
  /* \u25CF Record looks the same in the bottom bar and in Studio: a red dot, plain text, the R in the accent */
  /* \u25CF Record looks the same in the bottom bar and in Studio: like the buttons beside it, with a red dot and
     its R in the accent; on hover it fills red, dot, text and R in white */
  #btn-record .rec-dot, #rv-rec .rec-dot, #setup-record .rec-dot{color:#ef4444;}
  .btn.rec#rv-rec, .btn.rec#setup-record{color:var(--text);}
  #navbar #btn-record:hover, .btn.rec#rv-rec:hover:not(:disabled), .btn.rec#setup-record:hover{background:#dc2626;border-color:#dc2626;color:#fff;}
  #btn-record:hover .rec-dot, #btn-record:hover u.key, #rv-rec:hover:not(:disabled) .rec-dot, #rv-rec:hover:not(:disabled) u.key,
  #setup-record:hover .rec-dot, #setup-record:hover u.key{color:#fff;}
  @media (pointer:coarse){ #btn-record{display:none;} }
  /* phones and tablets can't record */
  @media (pointer:coarse){ #btn-studio{display:none;} }
  /* the bottom bar: Keys, Camera, Fullscreen, each in the accent while it is on */
  #btn-camera{display:inline-flex;align-items:center;gap:6px;}
  #btn-camera svg{display:block;}
  #navbar button.on{color:var(--accent);background:color-mix(in srgb, var(--accent) 14%, transparent);}
  /* while a take runs nothing but the slides and the camera is on screen */
  body.recording #breadcrumbs, body.recording #navbar, body.recording #minimap, body.recording #pip-msg{display:none !important;}
  body.recording, body.recording *{cursor:none !important;}
  /* a retake's jump back to the slide before: no transition may ease it into place */
  body.no-anim *, body.no-anim *::before, body.no-anim *::after{transition:none !important;animation:none !important;}
  /* recording in the browser: the deck in a 16:9 frame, the only part captured. Chrome captures an element
     only while it is its own stacking context, hence the isolation (without it the capture is silently empty). */
  body.rec-frame main{background:#000;}
  body.rec-frame #stage-wrap{flex:none;margin:auto;width:min(100%, calc(100vh * 16 / 9));aspect-ratio:16/9;isolation:isolate;}
  /* format: portrait \u2014 the deck is a 9:16 column, always: what you see is what a Short records */
  body.portrait main{background:color-mix(in srgb, var(--text) 5%, var(--bg));}
  body.portrait #stage-wrap, body.portrait.rec-frame #stage-wrap{flex:none;margin:0 auto;width:auto;height:100%;max-width:100%;aspect-ratio:9/16;isolation:isolate;}
  body.portrait.rec-frame main{background:#000;}
  /* While a take records, two specks in opposite corners of the frame change a little every frame, out of sight.
     Chrome's capture follows what moves: with a live camera it settles on the camera's box, and when that box
     starts to move (a split screen, the words swapping sides) it dropped about a quarter of a second of frames
     while it found the new area. With the whole frame always changing, there is no new area to find. */
  .rec-tick{display:none;}
  body.rec-frame .rec-tick{display:block;position:absolute;width:2px;height:2px;z-index:40;pointer-events:none;
    background:#808080;opacity:.01;animation:rec-tick .1s linear infinite alternate;}
  body.rec-frame .rec-tick:first-of-type{top:0;left:0;}
  body.rec-frame .rec-tick:last-of-type{right:0;bottom:0;}
  @keyframes rec-tick{to{opacity:.02;}}
  body.portrait .rv-video{aspect-ratio:9/16;max-height:62vh;margin:0 auto;}
  /* the bottom bar and the map go beside the column, where the window is empty (they're never recorded); a window
     too narrow for that keeps the bar in the column and drops the map */
  @media (min-aspect-ratio: 1/1){
    body.portrait #navbar{position:fixed;left:16px;bottom:16px;transform:none;}
    body.portrait #stage-wrap[data-pip] #minimap{position:fixed;right:16px;bottom:16px;left:auto;}
  }
  @media (max-aspect-ratio: 1/1){ body.portrait #minimap{display:none;} }
  /* a card's words are larger for its width, so a slide filling the narrow column reads on a phone */
  body.portrait #world .node:not(.card-full) > .body{zoom:1.8;}
  /* a full card keeps its frame: only its heading grows, the chart or image fills the rest */
  body.portrait #world .node.card-full > .body > :is(h1, h2, h3, h4){zoom:1.8;}
  #review.in-browser #rv-novideo{display:none !important;}
  /* the takes screen records in this browser, or with OBS: each mode's own controls */
  #review.obs .for-browser, #review:not(.obs) .for-obs{display:none !important;}
  /* Studio's dialog shows Studio or its Setup view, not both */
  #review:not(.setup-view) #rv-setup-view, #review.setup-view .rv-grid{display:none;}
  #rec-countdown{
    position:fixed;inset:0;z-index:70;display:none;align-items:center;justify-content:center;flex-direction:column;gap:14px;
    background:rgba(4,7,13,.9);font-family:var(--display);color:var(--accent);
  }
  #rec-countdown.show{display:flex;}
  #rec-countdown .num{font-size:180px;font-weight:700;line-height:1;}
  #rec-countdown .hint{font-family:var(--mono);font-size:13px;color:var(--text-muted);}
  #rec-paused{
    position:fixed;inset:0;z-index:70;display:none;align-items:center;justify-content:center;
    background:rgba(4,7,13,.94);font-family:var(--mono);font-size:15px;color:var(--text-muted);letter-spacing:.06em;
  }
  #rec-paused.show{display:flex;}
  .modal .panel.xwide{width:min(1480px,100%);max-height:94vh;}
  /* scrollbars: thin, in the accent */
  .modal .panel, .rv-list, .modal textarea{scrollbar-width:thin;scrollbar-color:color-mix(in srgb, var(--accent) 45%, transparent) transparent;}
  /* the player and the take list side by side, the list exactly as tall as the player (it scrolls inside that);
     play and download under both */
  .rv-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(280px,3fr);grid-template-areas:"video list" "bar dl";
    column-gap:18px;margin-top:12px;}
  .rv-grid > div:first-child{display:contents;}
  .rv-video{grid-area:video;}
  .rv-list{grid-area:list;contain:size;}
  .rv-bar{grid-area:bar;display:flex;align-items:center;gap:10px;margin-top:12px;min-width:0;}
  .rv-purge{position:relative;}
  .rv-purge summary{list-style:none;font-family:var(--mono);}
  .rv-purge summary::-webkit-details-marker{display:none;}
  .rv-purge .rv-menu{position:absolute;left:0;top:calc(100% + 6px);display:flex;flex-direction:column;gap:6px;padding:8px;z-index:3;
    background:var(--panel);border:1px solid var(--panel-line);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.35);white-space:nowrap;}
  /* the take board: every slide, a box to select it for recording, its takes */
  .rv-row.with-sel{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:10px;align-items:start;}
  .rv-row .rv-sel{margin:3px 0 0;accent-color:var(--accent);}
  .rv-row.selected{background:color-mix(in srgb, var(--accent) 7%, transparent);}
  .rv-row.playing{box-shadow:inset 3px 0 0 var(--accent);}
  .rv-chip.outdated{opacity:.6;text-decoration:line-through;}
  .rv-none{font-size:12px;color:var(--text-muted);font-style:italic;}
  /* Recording setup: opened from the \u2699 Setup button at the top right, shown under the title */
  .modal .rv-setup-btn[aria-expanded="true"]{border-color:var(--accent);color:var(--accent);background:color-mix(in srgb, var(--accent) 10%, transparent);}
  /* Setup, a view of Studio's dialog */
  .setup-note{margin:0 0 10px;font-size:13px;color:var(--accent);}
  #rv-setup{margin:8px 0 0;}
  /* the chosen camera, live, as a recording would see it (mirrored like the camera box), and the mic's waveform */
  .setup-cam{position:relative;aspect-ratio:16/9;background:#000;border-radius:8px;overflow:hidden;border:1px solid var(--panel-line);}
  .setup-cam video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .setup-cam.mirror video{transform:scaleX(-1);}
  .setup-cam span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;color:#a1a1aa;}
  .setup-cam span[hidden]{display:none;}
  .setup-wave{display:block;width:100%;height:60px;border-radius:8px;border:1px solid var(--panel-line);
    background:color-mix(in srgb, var(--accent) 5%, transparent);}
  .setup-actions{display:flex;justify-content:flex-start;gap:8px;margin-top:16px;}
  #review h2.rv-brand{display:flex;align-items:center;gap:8px;color:var(--text);}
  #review h2.rv-brand .logo{width:22px;height:22px;fill:var(--accent);flex:none;}
  #review h2.rv-brand .word > span{color:var(--accent);}
  /* Slidetake Studio, Pro in pro mode, / Settings in the setup view, and the size as a chip */
  #review h2 .rv-pro-tag{color:var(--accent);}
  #review h2 .rv-settings-tag{color:var(--text-muted);font-weight:500;}
  #review:not(.setup-view) h2 .rv-settings-tag, #review:not(.setup-view) #rv-pro{display:none;}
  /* in Setup, \u2190 Back and Pro only: Back returns to Studio, which has \u2715 Close */
  #review.setup-view .panel-actions .close{display:none;}
  #review h2 .rv-size:empty{display:none;}
  #review h2 .rv-size{font-family:var(--mono);font-size:11px;font-weight:600;color:var(--text-muted);border:1px solid var(--panel-line);border-radius:6px;padding:2px 7px;margin-left:4px;}
  .rv-using{align-self:center;max-width:34vw;font-family:var(--mono);font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  #review h2{padding-right:calc(34vw + 200px);}
  @media (max-width:900px){ .rv-using{display:none;} #review h2{padding-right:190px;} }
  /* three sections side by side: Camera, Microphone, Video; Use OBS at the top right */
  .rv-setup-cols{display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:18px;}
  .rv-setup-cols section{display:flex;flex-direction:column;gap:8px;min-width:0;}
  .rv-setup-cols h4{margin:0;font-family:var(--display);font-size:13px;color:var(--text);}
  .rv-setup-cols select{width:100%;}
  .rv-setup-cols #rv-fps{width:auto;}
  .rv-setup-cols meter{width:100%;height:8px;}
  .rv-setup-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;}
  .rv-setup-gap{flex:1}
  .rv-files{margin-left:auto;}
  .rv-files .rv-menu{left:auto;right:0;}
  .rv-obs-fields{display:grid;grid-template-columns:minmax(0,1.2fr) 60px minmax(0,1fr);gap:6px;}
  .modal .rv-obs-fields input{width:100%;min-width:0;font-size:11.5px;padding:4px 8px;}
  .rv-setup-foot{display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;margin-top:14px;padding-top:10px;border-top:1px solid var(--panel-line);}
  .modal .rv-setup-foot label{flex-direction:row;align-items:center;gap:8px;margin:0;}
  .rv-setup-foot select{width:auto;}
  .modal .rv-setup-row label.check{gap:6px;margin:0;}
  .rv-setup-label{font-size:12px;color:var(--text-muted);}
  .seg.small{height:24px;}
  .seg.small .seg-btn{font-size:11px;padding:0 10px;}
  .rv-setup-note{margin:0;font-size:12px;color:var(--text-muted);line-height:1.5;}
  #rv-setup > .rv-setup-note{margin-top:12px;}
  @media (max-width:900px){ .rv-setup-cols{grid-template-columns:1fr;} }
  .rv-final{font-family:var(--mono);font-size:12px;color:var(--text-muted);white-space:nowrap;}
  /* under the takes: the final cut's size, and Download */
  .rv-dl{grid-area:dl;display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-top:12px;}
  #rv-chapters{margin-right:auto;min-width:112px;}
  /* Preview and Pause: one width, so the button doesn't change size as it switches */
  .btn.rv-preview{min-width:104px;}
  @media (max-width:900px){
    .rv-grid{grid-template-columns:1fr;grid-template-areas:"video" "bar" "list" "dl";}
    .rv-list{contain:none;max-height:50vh;margin-top:12px;}
  }
  .rv-video{position:relative;background:#000;border-radius:8px;overflow:hidden;aspect-ratio:16/9;}
  .rv-video video{width:100%;height:100%;display:block;}
  #rv-novideo{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px;text-align:center;}
  #rv-novideo[hidden]{display:none;}
  /* the preview's message, right before Preview */
  #rv-now{flex:1;min-width:0;text-align:right;font-family:var(--mono);font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  #rv-now.warn{color:var(--danger);}
  #rv-now .btn{vertical-align:middle;margin-right:6px;}
  #rv-render-btn, #rv-ffmpeg-copy{min-width:120px;}
  .rv-list{overflow-y:auto;border:1px solid var(--panel-line);border-radius:8px;}
  .rv-row{padding:9px 12px;border-bottom:1px solid var(--panel-line);}
  .rv-row:last-child{border-bottom:none;}
  .rv-row .t{font-size:12.5px;color:var(--text);margin-bottom:6px;display:flex;justify-content:space-between;gap:8px;}
  .rv-row .t small{font-family:var(--mono);color:var(--text-muted);font-size:10.5px;white-space:nowrap;}
  .rv-row.sec .t{color:var(--accent-teal);}
  .rv-chips{display:flex;flex-wrap:wrap;gap:6px;}
  .rv-chip{background:transparent;border:1px solid var(--node-border);color:var(--text-muted);border-radius:20px;
    font-family:var(--mono);font-size:11px;padding:3px 10px;cursor:pointer;}
  .rv-chip:hover{border-color:var(--accent);color:var(--accent);}
  .rv-chip.on{border-color:var(--accent);color:var(--accent);background:color-mix(in srgb, var(--accent) 10%, transparent);}
  .rv-chip.skip.on{border-color:var(--danger);color:var(--danger);background:rgba(224,100,92,.1);}
  .modal select{background:var(--code-bg);border:1px solid var(--node-border);border-radius:6px;color:var(--text);font-family:var(--mono);font-size:11.5px;padding:4px 8px;}

  /* ---------- reveal.js compatibility: fragments, stacks, diagrams, charts ---------- */
  .node .fragment{opacity:0;visibility:hidden;transition:opacity .45s ease, transform .45s ease, visibility 0s .45s;}
  .node .fragment.visible{opacity:1;visibility:inherit;transition:opacity .45s ease, transform .45s ease;}
  .node .fragment.fade-up{transform:translateY(24px);}
  .node .fragment.fade-down{transform:translateY(-24px);}
  .node .fragment.fade-left{transform:translateX(40px);}
  .node .fragment.fade-right{transform:translateX(-40px);}
  .node .fragment.zoom-in{transform:scale(.1);}
  .node .fragment.visible:is(.fade-up,.fade-down,.fade-left,.fade-right,.zoom-in){transform:none;}
  /* these start visible and change when their step comes */
  .node .fragment:is(.grow,.shrink,.fade-out,.semi-fade-out,.strike,.highlight-red,.highlight-green,.highlight-blue){opacity:1;visibility:inherit;}
  /* grow: sized to its content and growing rightwards, so the card can make room for its last step */
  .node .fragment.grow{width:fit-content;max-width:100%;transform-origin:left center;}
  .node .fragment.grow.visible{transform:scale(1.3);}
  .node .fragment.shrink.visible{transform:scale(.7);}
  .node .fragment.fade-out.visible{opacity:0;visibility:hidden;}
  .node .fragment.semi-fade-out.visible{opacity:.5;}
  .node .fragment.strike.visible{text-decoration:line-through;}
  .node .fragment.highlight-red.visible{color:var(--danger);}
  .node .fragment.highlight-green.visible{color:#10b981;}
  .node .fragment.highlight-blue.visible{color:#60a5fa;}
  /* shown only while it is the newest step */
  .node .fragment.visible:is(.fade-in-then-out,.current-visible):not(.current-fragment){opacity:0;visibility:hidden;}
  .node .fragment.fade-in-then-semi-out.visible:not(.current-fragment){opacity:.5;}
  .node .r-stack{display:grid;}
  .node .r-stack > *{grid-area:1/1;margin:auto;}
  .node .r-hstack{display:flex;flex-direction:row;align-items:center;justify-content:center;}
  .node .r-vstack{display:flex;flex-direction:column;align-items:center;justify-content:center;}
  .node .body img{max-width:100%;height:auto;object-fit:contain;}
  /* ---------- media from plain markdown (see applyMedia) ---------- */
  .node .body figure.media{margin:0;}
  .node .body figure.media img{display:block;width:100%;height:auto;max-height:70vh;object-fit:contain;border-radius:8px;}
  .node .body figure.media.yt + *{margin-top:10px;}
  /* one caption size on every kind of image card: the size of the text (.node .body p) */
  .node .body figure.media figcaption{margin-top:8px;font-size:13px;color:var(--text-muted);line-height:1.45;}
  .node .body figure.yt .frame{position:relative;width:100%;aspect-ratio:16/9;border-radius:8px;overflow:hidden;background:#000;}
  .node .body figure.yt.portrait .frame{aspect-ratio:9/16;max-height:70vh;width:auto;margin:0 auto;}
  .node .body figure.yt iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}
  /* the video is always on show; its step only plays it */
  .node .fragment.yt-play{opacity:1 !important;visibility:inherit !important;transform:none !important;}
  .node.card-split .body{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:4px 22px;align-items:center;}
  .node.card-split .body > :is(h1,h2,h3,h4,h5,h6){grid-column:1 / -1;}
  .node.card-split .body .split-text > :first-child{margin-top:0;}
  .node.card-split.media-last .body{grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);}
  .node .body .gallery{list-style:none;padding:0;margin:8px 0 0;display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));gap:14px;align-items:end;}
  .node .body .gallery li{margin:0;}
  .node .body .gallery figure.media img{max-height:calc(56vh / var(--rows,1));margin:0 auto;}
  .node .body .gallery figure.media figcaption{text-align:center;}
  /* a stepped gallery: the images stack in one place and each press brings the next */
  .node .body .gallery.carousel{grid-template-columns:minmax(0,1fr);}
  .node .body .gallery.carousel > li{grid-area:1/1;}
  .node .body .gallery.carousel figure.media img{max-height:58vh;}
  .node .body .gallery.carousel figcaption[data-count]::before{content:attr(data-count) " ";color:var(--accent);font-weight:600;white-space:pre;}
  .node .body .gallery.carousel:has(> li.visible) > li:not(.fragment){opacity:0;visibility:hidden;transition:opacity .45s ease, visibility 0s .45s;}
  .node .body .gallery.carousel > li:not(.fragment){transition:opacity .45s ease;}
  /* image cards: an image or carousel alone, laid out by the image's shape (see sizeCard) */
  div.node.card-bleed{padding:0;overflow:hidden;}
  .node.card-bleed .body .gallery{margin:0;}
  .node.card-bleed .body figure.media img,
  .node.card-bleed .body .gallery.carousel figure.media img{max-height:none;border-radius:0;background:var(--code-bg);}
  .node.card-bleed .body figure.media figcaption{margin:0;text-align:left;}
  /* landscape: the image spans the card; the heading sits above it, the caption below */
  .node.img-landscape .crumb{margin:12px 18px 4px;}
  .node.img-landscape .body > :is(h1,h2,h3,h4,h5,h6):first-child{margin:0 18px 10px;}
  .node.img-landscape .body figure.media img{width:100%;height:var(--img-h);object-fit:contain;}
  .node.img-landscape .body figure.media figcaption{padding:10px 18px 14px;}
  /* portrait or near-square: the image on the right at the card's height; the heading and caption share the left */
  div.node.img-portrait{height:540px;padding:20px calc(var(--img-w) + 26px) 22px 24px;display:flex;flex-direction:column;}
  /* the text column takes what the breadcrumb leaves, so the caption ends inside the card */
  .node.img-portrait .body{display:flex;flex-direction:column;flex:1;min-height:0;}
  .node.img-portrait .crumb{margin-bottom:10px;}
  .node.img-portrait .body > .gallery, .node.img-portrait .body > figure.media{margin-top:auto;}
  .node.img-portrait .body figure.media img{position:absolute;top:0;right:0;width:var(--img-w);height:540px;object-fit:contain;}
  /* 16:9, or a full-screen card: the image fills the card, the heading and caption over it */
  .node.img-overlay::before{content:"";position:absolute;inset:0 0 auto;height:96px;z-index:2;pointer-events:none;
    background:linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,0));border-radius:8px 8px 0 0;}
  .node.img-overlay .crumb{position:absolute;top:12px;left:18px;right:18px;z-index:3;margin:0;color:rgba(255,255,255,.72);}
  .node.img-overlay .body > :is(h1,h2,h3,h4,h5,h6):first-child{position:absolute;top:28px;left:18px;right:18px;z-index:3;margin:0;
    color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.6);}
  .node.img-overlay .body figure.media{position:relative;}
  .node.img-overlay .body figure.media img{width:100%;height:540px;object-fit:contain;background:#000;}
  .node.img-overlay.img-cover .body figure.media img{object-fit:cover;}
  .node.img-overlay .body figure.media figcaption{position:absolute;left:0;right:0;bottom:0;padding:36px 18px 14px;
    color:#f4f4f5;background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.78));}
  .node.img-overlay .body .gallery.carousel figure.media figcaption::before{color:color-mix(in srgb, var(--accent) 55%, #fff);}
  /* <!-- view: full -->: a 16:9 card, framed and placed like any other slide */
  div.node.card-full{height:540px;overflow:hidden;display:flex;flex-direction:column;}
  body.portrait div.node.card-full{height:960px;}
  /* a chart on a full card takes the room the heading leaves */
  div.node.card-full > .body{flex:1;min-height:0;display:flex;flex-direction:column;}
  div.node.card-full .echarts-container{flex:1;min-height:0;height:auto;margin:0;}
  /* measure cards at their resting size, without grow/zoom transforms */
  div.node.measuring .fragment{transform:none !important;transition:none !important;}
  /* a card re-measured mid-entrance (a theme switch replays it) must not count a gsap "from" state such
     as scale(3) as its width, or it shrinks the whole card to fit */
  div.node.measuring [data-gsap]{transform:none !important;}
  /* arriving at or leaving a slide snaps its fragments; only steps within the slide animate */
  div.node.snap .fragment{transition:none !important;}
  .node .body iframe{max-width:100%;border:0;border-radius:6px;background:#fff;}
  .node .diagram{background:#f8fafc;border:1px solid var(--panel-line);border-radius:8px;padding:12px;margin:0 0 10px;overflow:auto;}
  .node .diagram svg{display:block;width:100%;height:auto;max-height:640px;}
  .node .diagram.err{background:none;color:var(--danger);font-family:var(--mono);font-size:12px;padding:0;}
  /* D2 and Graphviz are drawn in the deck's own palette, so they need no light backdrop */
  .node .diagram.d2, .node .diagram.dot{background:none;border:none;padding:0;}
  /* a \`\`\`svg drawing is inline: currentColor is the card's text colour, and the deck's variables switch with dark and light */
  .node .diagram.svg{background:none;border:none;padding:0;color:var(--text);}
  .node .diagram.svg svg{max-height:62vh;}
  .node .diagram.d2 svg{max-height:62vh;}
  .node .echarts-container{width:100%;height:360px;margin:0 0 10px;}

  /* ---------- overlays ---------- */
  #breadcrumbs{
    position:absolute;top:14px;left:14px;z-index:10;
    display:flex;align-items:center;gap:6px;flex-wrap:wrap;max-width:60%;
    font-family:var(--mono);font-size:11.5px;
  }
  #breadcrumbs .crumb-btn{
    background:var(--overlay);border:1px solid var(--panel-line);color:var(--text-muted);
    padding:4px 9px;border-radius:5px;cursor:pointer;backdrop-filter:blur(4px);
  }
  #breadcrumbs .crumb-btn:hover,#breadcrumbs .crumb-btn.here{color:var(--accent);border-color:var(--accent);}
  #breadcrumbs .sep{color:var(--text-muted);}

  #navbar{
    position:absolute;bottom:16px;left:50%;transform:translateX(-50%);z-index:10;
    display:flex;align-items:center;gap:4px;
    background:var(--overlay);border:1px solid var(--panel-line);border-radius:9px;
    padding:6px;backdrop-filter:blur(6px);
  }
  #navbar button{
    background:transparent;border:none;color:var(--text-muted);white-space:nowrap;
    font-size:12px;padding:7px 11px;border-radius:6px;cursor:pointer;
  }
  #navbar button:hover{color:var(--accent);background:var(--node-bg);}
  #navbar .divider{width:1px;height:18px;background:var(--panel-line);margin:0 2px;}
  /* the arrows are for touch screens; keyboards and clickers use the keys */
  #navbar .touch-only{display:none;}
  @media (pointer:coarse){ #navbar .touch-only{display:inline-block;} }

  #minimap{
    position:absolute;bottom:16px;right:14px;z-index:10;width:180px;height:130px;
    background:var(--overlay);border:1px solid var(--panel-line);border-radius:8px;
    backdrop-filter:blur(6px);overflow:hidden;
  }
  #minimap .mm-label{
    position:absolute;top:5px;left:8px;font-family:var(--mono);font-size:9px;
    color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;pointer-events:none;
  }
  #mm-svg circle{cursor:pointer;}
  #stage-wrap[data-pip="bottom-right"] #minimap{right:auto;left:14px;}

  /* channel mark: fixed in the corner, never moves with the camera */
  #brand{
    position:absolute;top:16px;right:18px;z-index:12;pointer-events:none;
    display:flex;align-items:center;gap:10px;opacity:.9;
    font-family:var(--display);font-weight:600;font-size:18px;letter-spacing:.02em;color:var(--text);
    text-shadow:var(--brand-shadow);
  }
  #brand[hidden]{display:none;}
  /* embedded in a site page: one read-only deck, so no editor, links or copies */
  html.embed #btn-edit-toggle, html.embed #continue, html.embed #editor-pane, html.embed #editor-resizer, html.embed #help tr.edit{display:none !important;}
  html.embed .brand .trail{display:flex;align-items:center;gap:10px;font-family:var(--display);font-weight:600;font-size:15px;min-width:0;}
  html.embed .brand .trail a{color:var(--text);text-decoration:none;white-space:nowrap;}
  /* the header wears the site's colours, so an accent-coloured link can vanish into it (gold on gold):
     the trail stays in the text colour, as the site's own header does, and underlines mark where you are */
  html.embed .brand .trail a:hover, html.embed .brand .trail a:last-child{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:5px;}
  html.embed .brand .trail a:last-child{text-decoration-color:color-mix(in srgb, currentColor 45%, transparent);}
  html.embed .hdr-actions .seg-btn.active{color:var(--text);}
  html.embed .brand .trail .sep{color:var(--text-muted);font-weight:400;}
  #credit{display:inline-flex;align-items:center;gap:6px;padding:4px 6px;text-decoration:none;
    font-family:var(--display);font-weight:700;font-size:14px;color:var(--text);}
  #credit .logo{width:18px;height:18px;fill:var(--accent);}
  #credit .word > span{color:var(--accent);}
  #credit:hover{opacity:.85;}
  /* on a site's coloured header in light mode the accent is the band's own colour, so the credit takes the header's ink */
  html:not(.dark) body.st-header-color #credit .logo{fill:currentColor;}
  html:not(.dark) body.st-header-color #credit .word > span{color:inherit;opacity:.78;}
  html.embed .site-links, html.embed #btn-github, html.embed #btn-analytics{display:none !important;}
  /* a reader's page (embedded, not recording): no bottom bar, except the arrows on touch screens */
  html.embed.no-record #navbar{display:none;}
  @media (pointer:coarse){
    html.embed.no-record #navbar{display:flex;}
    html.embed.no-record #navbar > :not(.touch-only){display:none !important;}
  }
  html.no-record #btn-camera, html.no-record #btn-studio, html.no-record #btn-record, html.no-record #pip:not(.empty), html.no-record #help tr.rec{display:none !important;}
  /* the logo written into a heading: # ![](/favicon.svg) Slidetake */
  .node .body :is(h1,h2) img[src$="favicon.svg"]{height:1em;width:auto;vertical-align:-.12em;margin-right:.25em;display:inline;}
  #brand .st-mark{display:inline-flex;align-items:center;gap:8px;font-family:var(--display);font-weight:700;font-size:20px;color:var(--text);}
  #brand .st-mark .logo{width:24px;height:24px;fill:var(--accent);}
  #brand .st-mark .word > span{color:var(--accent);}
  #brand img{height:40px;width:auto;display:block;}
  /* optional accent chip, as on the decks' title slides (brand_style: chip); plain text is the default */
  #brand .chip{display:inline-block;padding:5px 22px;border-radius:30px;color:#fff;font-family:var(--body);
    font-size:15px;font-weight:600;letter-spacing:.01em;text-shadow:none;
    background:linear-gradient(90deg, var(--accent-line), color-mix(in srgb, var(--accent-line) 80%, #000));box-shadow:0 2px 10px rgba(0,0,0,.25);}

  /* PIP camera: slides are laid out to keep clear of this box */
  #pip{
    position:absolute;z-index:11;pointer-events:none;aspect-ratio:16/9;
    border:2px dashed color-mix(in srgb, var(--accent-teal) 55%, transparent);border-radius:10px;
    display:flex;align-items:center;justify-content:center;
    font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-teal);
    background:color-mix(in srgb, var(--accent-teal) 4%, transparent);
  }
  #pip[hidden]{display:none;}
  /* a message in the box (no camera found, waiting for permission, a layout picked with V) */
  #pip.msg span{padding:10px 14px;text-align:center;text-transform:none;letter-spacing:0;font-size:12px;line-height:1.45;color:var(--accent);
    background:color-mix(in srgb, var(--panel) 88%, transparent);border-radius:6px;max-width:92%;max-height:92%;overflow:hidden;}
  #pip.circle{aspect-ratio:1;border-radius:50%;}
  #pip.top-left{top:16px;left:16px;}
  #pip.top-right{top:16px;right:16px;}
  #pip.bottom-left{bottom:16px;left:16px;}
  #pip.bottom-right{bottom:16px;right:16px;}
  /* full: the camera takes the whole stage, under the brand and the controls */
  /* it also swallows clicks, so a click can't land on the hidden cards behind it */
  #pip.full{inset:0;width:100%;height:100%;aspect-ratio:auto;border-radius:0;z-index:9;pointer-events:auto;}
  /* behind: the camera fills the frame under the slides, which stay on top as cards; the stage's dotted
     background makes way so the camera shows around them */
  #pip.full.behind{z-index:0;pointer-events:none;box-shadow:none;}
  /* split screen (a solid card): the camera fills what the card leaves, centred there, and glides into it */
  /* behind a split screen the frame is the card's colour, so as the words and the camera pass each other on a
     swap, the edges they uncover read as card */
  #stage-wrap.cam-solid{background:var(--panel);}
  #stage-wrap.cam-solid[data-place="left"] #pip.full.behind{left:50%;width:50%;}
  #stage-wrap.cam-solid[data-place="right"] #pip.full.behind{right:50%;width:50%;}
  #stage-wrap.cam-solid[data-place="top"] #pip.full.behind{top:25%;height:75%;}
  #stage-wrap.cam-solid[data-place="bottom"] #pip.full.behind{bottom:25%;height:75%;}
  body.portrait #stage-wrap.cam-solid[data-place="top"] #pip.full.behind{top:50%;height:50%;}
  body.portrait #stage-wrap.cam-solid[data-place="bottom"] #pip.full.behind{bottom:50%;height:50%;}
  /* the camera behind the slide while it is off: an empty frame with a faint person where you'd be */
  #stage-wrap #pip.empty{border:none;background:color-mix(in srgb, var(--text) 6%, var(--bg)) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23fff' fill-opacity='.07'%3E%3Ccircle cx='50' cy='40' r='15'/%3E%3Cpath d='M18 100c0-22 14-36 32-36s32 14 32 36z'/%3E%3C/g%3E%3C/svg%3E") 50% 100%/auto 70% no-repeat;}
  body[data-mode="light"] #stage-wrap #pip.empty{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23000' fill-opacity='.06'%3E%3Ccircle cx='50' cy='40' r='15'/%3E%3Cpath d='M18 100c0-22 14-36 32-36s32 14 32 36z'/%3E%3C/g%3E%3C/svg%3E");}
  /* the person stands where the words leave room */
  #stage-wrap[data-place="left"] #pip.empty{background-position:76% 100%;}
  #stage-wrap[data-place="right"] #pip.empty{background-position:24% 100%;}
  #pip.empty:not(.msg) > span{position:absolute;left:50%;bottom:4%;transform:translateX(-50%);font-size:0;}
  #pip.empty:not(.msg) > span::after{content:"Camera off \xB7 press C";font-size:12px;color:var(--text);opacity:.45;letter-spacing:.08em;}
  html.no-record #pip.empty > span{display:none;}
  #stage-wrap.cam-behind #stage{z-index:1;background:transparent;}
  /* a cut between a split and a card: the slides come over the camera and the words, fading in or out */
  #stage-wrap #stage.layout-fade{z-index:3;background-color:var(--bg);background-image:radial-gradient(var(--grid-dot) 1.2px, transparent 1.2px);}
  #stage.layout-fade #world{opacity:1 !important;}
  /* behind: the slide's content in regions around the person (the card itself steps aside), in the deck's own
     colours, light or dark, camera on or off. A card under the words (half see-through unless set) keeps them
     readable; with card 0% they sit straight on the video, and diagrams, charts and table cells keep a pane */
  #cam-overlay{position:absolute;inset:0;z-index:2;pointer-events:none;display:none;color:var(--text);}
  #stage-wrap.cam-live:not(.cam-card) #cam-overlay .cam-media :is(.diagram, .echarts-container){
    background:color-mix(in srgb, var(--bg) 85%, transparent);border-radius:14px;padding:14px;}
  #stage-wrap.cam-live:not(.cam-card) #cam-overlay .body :is(th, td){background:color-mix(in srgb, var(--bg) 70%, transparent);}
  #stage-wrap:not([data-place=""])[data-place] #cam-overlay{display:block;}
  #stage-wrap:not([data-place=""])[data-place] #world{opacity:0;}
  /* the card under the words: half see-through, solid (no camera through it) or clear (none, kept off the edges) */
  #cam-overlay .cam-box{position:absolute;display:flex;flex-direction:column;gap:3%;box-sizing:border-box;padding:1.2%;
    border-radius:18px;background:color-mix(in srgb, var(--panel) calc(var(--cam-card, 0) * 100%), transparent);}
  #cam-overlay .cam-box.left{left:4%;top:8%;width:42%;height:84%;}
  #cam-overlay .cam-box.right{right:4%;top:8%;width:42%;height:84%;}
  #cam-overlay .cam-box.top{left:5%;top:3%;width:90%;height:22%;flex-direction:row;}
  #cam-overlay .cam-box.bottom{left:5%;bottom:3%;width:90%;height:22%;flex-direction:row;}
  /* with a card, the region fills its part of the frame edge to edge: a half or a quarter band */
  #stage-wrap.cam-card #cam-overlay .cam-box{border-radius:0;padding:2.5%;}
  #stage-wrap.cam-card #cam-overlay .cam-box.left{left:0;top:0;width:50%;height:100%;}
  #stage-wrap.cam-card #cam-overlay .cam-box.right{right:0;top:0;width:50%;height:100%;}
  #stage-wrap.cam-card #cam-overlay .cam-box.top{left:0;top:0;width:100%;height:25%;}
  #stage-wrap.cam-card #cam-overlay .cam-box.bottom{left:0;bottom:0;width:100%;height:25%;}
  /* portrait: the words take half the column, above or below you, stacked like a card */
  body.portrait #cam-overlay .cam-box:is(.top, .bottom){height:44%;flex-direction:column;}
  body.portrait #stage-wrap.cam-card #cam-overlay .cam-box:is(.top, .bottom){height:50%;}
  body.portrait #cam-overlay .cam-box:is(.top, .bottom) .cam-text + .cam-media{flex-basis:55%;}
  /* the words take what the picture leaves: below it beside you, to its left in a band */
  #cam-overlay .cam-text{flex:1 1 0;min-width:0;min-height:0;display:flex;align-items:center;}
  #cam-overlay .cam-box.top .cam-text{align-items:flex-start;}
  #cam-overlay .cam-box.bottom .cam-text{align-items:flex-end;}
  #cam-overlay .cam-media{flex:1 1 0;min-width:0;min-height:0;position:relative;}
  #cam-overlay .cam-text + .cam-media{flex:0 0 55%;}
  #cam-overlay :is(.cam-box.top, .cam-box.bottom) .cam-text + .cam-media{flex-basis:38%;}
  #cam-overlay .node{background:none;border:none;padding:0;}
  #cam-overlay .cam-text > .node{flex:none;transform-origin:0 0;}
  #cam-overlay .cam-box.bottom .cam-text > .node{transform-origin:0 100%;}
  #cam-overlay .cam-box.left .cam-text > .node, #cam-overlay .cam-box.right .cam-text > .node{transform-origin:0 50%;}
  #cam-overlay .cam-media > .node{position:absolute;left:50%;top:50%;transform-origin:50% 50%;}
  #cam-overlay .cam-media > .node > .body > *{margin:0;}
  /* while presenting the box is empty so the camera overlay sits on plain background */
  /* while presenting, the empty box stays as a faint guide for lining up a camera overlay */
  body.presenting #pip{border-color:color-mix(in srgb, var(--accent-teal) 30%, transparent);background:none;}
  body.presenting #pip span{opacity:.5;}
  /* live webcam inside the box */
  #pip.live{border:none;background:#000;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.55), 0 0 0 1px var(--panel-line);}
  #pip.live span{display:none;}
  #pip video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  #pip.mirror video{transform:scaleX(-1);}
  #pip-msg{
    position:absolute;left:50%;top:70px;transform:translateX(-50%);z-index:30;
    background:var(--panel);border:1px solid var(--danger);color:var(--text);
    font-family:var(--mono);font-size:13px;line-height:1.5;padding:10px 16px;border-radius:6px;display:none;
    width:max-content;max-width:min(620px, 90%);text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.5);
  }
  #pip-msg.show{display:block;}

  /* ---------- help popover ---------- */
  #help{position:fixed;inset:0;background:rgba(4,7,13,.7);z-index:50;display:none;align-items:center;justify-content:center;}
  #help.open{display:flex;}
  #help .panel{
    position:relative;width:min(580px,92vw);max-height:84vh;overflow-y:auto;
    background:var(--panel);border:1px solid var(--panel-line);border-radius:12px;padding:26px 28px;
  }
  #help h2{font-family:var(--display);font-size:18px;margin:0 0 14px;color:var(--accent);}
  #help h3{font-family:var(--display);font-size:13px;margin:18px 0 6px;color:var(--text);}
  #help p, #help li{font-size:13px;line-height:1.65;color:var(--text-muted);margin:0 0 8px;}
  #help pre{
    background:var(--code-bg);border:1px solid var(--panel-line);border-radius:6px;
    padding:10px 12px;font-family:var(--mono);font-size:11.5px;color:var(--text);overflow-x:auto;
  }
  #help .close{position:absolute;top:22px;right:16px;}
  kbd{
    font-family:var(--mono);background:var(--node-bg);border:1px solid var(--node-border);
    border-radius:4px;padding:1px 6px;font-size:11px;color:var(--accent);
  }

  @media (max-width:760px){
    main{flex-direction:column;}
    #editor-pane{width:100% !important;max-width:none;min-width:0;height:40vh;border-left:none;border-top:1px solid var(--panel-line);}
    #editor-resizer{display:none;}
    #editor-pane.collapsed{height:0;}
    #stage-wrap{flex:1;}
    #minimap{display:none;}
    #navbar .lbl{display:none;}
  }
`;var Kr=`
<noscript>
  <style>#deck-text{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;max-width:760px;margin:24px auto;padding:0 16px;}#deck-text img{max-width:100%;height:auto;}#deck-text :is(h1,h2) img{height:1em;width:auto;vertical-align:-.12em;}#deck-text table{border-collapse:collapse;}#deck-text :is(td,th){border:1px solid #3f3f46;padding:4px 8px;}#deck-text a{color:#29b685;}</style>
  <p class="deck-text-note">Slidetake needs JavaScript to present and record decks. Here is this page as text; the source is on <a href="https://github.com/slidetake/slidetake">GitHub</a>.</p>
</noscript>

<header>
  <div class="brand">
    <a class="mark" href="/" title="Slidetake home"><svg class="logo" viewBox="0 0 64 64" aria-hidden="true"><path d="M 10 8 H 38 C 41.3 8 44 10.7 44 14 V 18 H 22 C 16.5 18 12 22.5 12 28 V 36 H 10 C 6.7 36 4 33.3 4 30 V 14 C 4 10.7 6.7 8 10 8 Z" opacity="0.4"/><path fill-rule="evenodd" d="M 22 22 H 54 C 57.3 22 60 24.7 60 28 V 50 C 60 53.3 57.3 56 54 56 H 22 C 18.7 56 16 53.3 16 50 V 28 C 16 24.7 18.7 22 22 22 Z M 26 34 C 28.2 34 30 32.2 30 30 C 30 27.8 28.2 26 26 26 C 23.8 26 22 27.8 22 30 C 22 32.2 23.8 34 26 34 Z M 38 40 C 36.9 40 36 40.9 36 42 V 48 C 36 49.1 36.9 50 38 50 H 50 C 51.1 50 52 49.1 52 48 V 42 C 52 40.9 51.1 40 50 40 H 38 Z"/></svg><span class="word">Slide<span>take</span></span></a>
    <nav class="site-links" aria-label="Slidetake">
      <a class="site-link" id="btn-features" href="/features" title="Every feature, and what it's for"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg><span>Features</span></a>
      <a class="site-link" id="btn-showcase" href="/showcase" title="Showcase: every feature in one deck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg><span>Showcase</span></a>
      <a class="site-link" id="btn-docs" href="/docs" title="Docs: step by step, itself a deck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg><span>Docs</span></a>
      <a class="site-link" id="btn-github" href="https://github.com/slidetake/slidetake" target="_blank" rel="noopener noreferrer" title="GitHub repository"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg><span>GitHub</span></a>
    </nav>
  </div>
  <div class="hdr-actions">
    <input type="file" id="file-input" accept=".md,.markdown,.txt,text/markdown" hidden>
    <div class="seg" id="layout-toggle">
      <button class="seg-btn" data-mode="focus" title="Focus: one slide at a time, no travel (1)">focus</button>
      <button class="seg-btn" data-mode="path" title="Path: slides in presenting order (2)">path</button>
      <button class="seg-btn" data-mode="radial" title="Radial: rings out from the first card (3)">radial</button>
      <button class="seg-btn" data-mode="tree" title="Tree: a top-down chart (4)">tree</button>
    </div>
    <button class="btn icon" id="btn-analytics" title="Privacy &amp; analytics" aria-label="Privacy &amp; analytics" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg></button>
    <button class="btn icon" id="btn-mode" title="Light / dark (L)" aria-label="Light / dark"></button>
    <button class="btn" id="btn-edit-toggle" title="Editor: write, open, share (E)">\u270E <span><u class="key">E</u>ditor</span></button>
    <button class="btn" id="btn-studio" title="Slidetake Studio: pick takes, redo slides, download (S)"><span class="rec-dot" aria-hidden="true">\u25CF</span> <span><u class="key">S</u>tudio</span></button>
  </div>
</header>

<main>
  <div id="stage-wrap">
    <div id="stage">
      <div id="world">
        <svg id="connectors"></svg>
      </div>
    </div>
    <div id="breadcrumbs"></div>
    <div id="navbar">
      <button id="btn-keys" title="Keyboard shortcuts (K)" aria-pressed="false">\u2328<span class="lbl"> <u class="key">K</u>eys</span></button>
      <button id="nav-prev" class="touch-only" title="Previous (\u2190)" aria-label="Previous">\u2190</button>
      <button id="nav-next" class="touch-only" title="Next (\u2192)" aria-label="Next">\u2192</button>
      <button id="btn-camera" title="Camera (C)" aria-pressed="false"></button>
      <button id="btn-record" title="Record (R): the slides without a take, or from this slide on when every slide has one"><span class="rec-dot" aria-hidden="true">\u25CF</span><span class="lbl"> <u class="key">R</u>ecord</span></button>
      <button id="btn-present" title="Fullscreen (F)" aria-pressed="false">\u26F6<span class="lbl"> <u class="key">F</u>ullscreen</span></button>
    </div>
    <div id="progress" aria-hidden="true"></div>
    <div id="minimap"><div class="mm-label" id="mm-label">map</div><svg id="mm-svg" width="180" height="130"></svg></div>
    <div id="brand" hidden></div>
    <div id="pip" hidden><span>PIP camera</span></div>
    <div id="cam-overlay" aria-hidden="true"></div>
    <div id="pip-msg" role="status"></div>
    <i class="rec-tick" aria-hidden="true"></i><i class="rec-tick" aria-hidden="true"></i>
  </div>
  <div id="editor-resizer" role="separator" aria-orientation="vertical" aria-label="Resize the editor" title="Drag to resize"></div>
  <div id="editor-pane" class="collapsed">
    <div class="pane-bar">
      <span class="pane-actions">
        <a class="btn small" id="btn-new" href="/new" title="Start from a template">New</a>
        <button class="btn small" id="btn-load" title="Load a deck from a link: GitHub, a gist or any URL">\u21E3 Load</button>
        <button class="btn small" id="btn-open" title="Open a markdown file from this computer">Open</button>
        <button class="btn small" id="btn-save" title="Save the markdown to a file on this computer">Save</button>
        <button class="btn small" id="btn-share" title="Copy a link to this deck">Share</button>
      </span>
      <!-- what the text below is: the deck, and whether typing makes your copy -->
      <span class="pane-state">
        <span class="pane-label" id="doc-state" aria-live="polite"></span>
        <a class="btn small" id="continue" href="/edit" hidden></a>
      </span>
    </div>
    <textarea id="editor" spellcheck="false"></textarea>
    <div id="status-line"><span id="status-count"></span><span id="status-err" class="err"></span><button id="btn-reset" hidden title="Discard your edits and go back to the original">reset to original</button></div>
  </div>
</main>

<div id="help">
  <div class="panel">
    <button class="btn close" id="help-close">\u2715 Close</button>
    <h2>Keys</h2>
    <table class="keys">
      <tr><td><kbd>\u2192</kbd> <kbd>\u2190</kbd> <kbd>Space</kbd></td><td>next / previous step (a clicker's <kbd>PgDn</kbd> <kbd>PgUp</kbd> too)</td></tr>
      <tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>first / last slide</td></tr>
      <tr><td><kbd>\u2193</kbd> <kbd>\u2191</kbd></td><td>first child / parent</td></tr>
      <tr><td><kbd>O</kbd></td><td>the whole map; <kbd>O</kbd> or <kbd>Esc</kbd> goes back</td></tr>
      <tr><td><kbd>1</kbd>\u2013<kbd>4</kbd></td><td>focus, path, radial, tree</td></tr>
      <tr><td><kbd>F</kbd></td><td>fullscreen; <kbd>F</kbd> or <kbd>Esc</kbd> leaves</td></tr>
      <tr><td><kbd>+</kbd> <kbd>\u2212</kbd></td><td>bigger / smaller slides (<kbd>=</kbd> works for <kbd>+</kbd>)</td></tr>
      <tr class="edit"><td><kbd>E</kbd></td><td>editor: write, open, share</td></tr>
      <tr><td><kbd>L</kbd></td><td>light / dark</td></tr>
      <tr class="rec"><td><kbd>C</kbd> <kbd>V</kbd></td><td>camera, camera layouts</td></tr>
      <tr class="rec"><td><kbd>R</kbd> <kbd>S</kbd></td><td>record (the slides without a take), Studio</td></tr>
      <tr class="rec"><td><kbd>\u2190</kbd> <kbd>B</kbd> <kbd>Esc</kbd></td><td>while recording: take the slide again, pause, stop</td></tr>
      <tr class="rec"><td><kbd>P</kbd> <kbd>D</kbd></td><td>in Studio: preview, download</td></tr>
      <tr><td><kbd>K</kbd> <kbd>/</kbd> <kbd>?</kbd></td><td>this card; again or <kbd>Esc</kbd> closes it</td></tr>
    </table>
    <p>Drag to pan, scroll or pinch to zoom, click a card to fly to it.</p>
    <p><a href="https://slidetake.com/docs" target="_blank" rel="noopener">The docs \u2192</a> write, present, record, edit and share, step by step.</p>
  </div>
</div>

<div id="analytics-dialog" class="modal" role="dialog" aria-labelledby="analytics-title">
  <div class="panel">
    <button class="btn small close" data-close>\u2715 Close</button>
    <h2 id="analytics-title">Privacy &amp; analytics</h2>
    <p>Your decks, copies and recordings never leave this browser. This is only about counting visits to slidetake.com.</p>
    <div class="choices" role="radiogroup" aria-label="Privacy &amp; analytics">
      <button class="choice" role="radio" data-analytics="on">
        <strong>Allow analytics</strong>
        <span>Standard Google Analytics (<code>G-3S9FY4MQLS</code>), to see which pages get read and where readers come from. Sets the <code>_ga</code> cookies. The address it records leaves out the part after <code>#</code> and <code>?obs=</code>, so never a deck or an OBS password.</span>
      </button>
      <button class="choice" role="radio" data-analytics="off">
        <strong>Turn analytics off</strong>
        <span>Nothing more is sent from this browser, and the <code>_ga</code> cookies are removed. Cloudflare, which serves the site, still sees each request the way any web server does.</span>
      </button>
    </div>
    <p class="note" id="analytics-note"><code>slidetake:analytics</code> in this browser remembers your choice. Everything else is on the <a href="/privacy">privacy page</a>.</p>
  </div>
</div>

<div id="new-dialog" class="modal" role="dialog" aria-labelledby="new-title">
  <div class="panel">
    <button class="btn close" data-close>\u2715 Close</button>
    <h2 id="new-title">Start a new deck</h2>
    <p>Pick a template. It opens as it is; start typing and it becomes your own copy at <code>/edit</code>.</p>
    <ul class="templates">
      <li><a href="/new?template=blank"><strong>Blank</strong><span>A first card, a section and a detail.</span></a></li>
      <li><a href="/new?template=talk"><strong>Talk</strong><span>Why it matters, the idea, trade-offs, summary.</span></a></li>
      <li><a href="/new?template=recording"><strong>Recording</strong><span>Camera steps, an overview moment and a closing on camera.</span></a></li>
      <li><a href="/new?template=short"><strong>Short</strong><span>A 9:16 deck for Shorts and Reels: words above or below you.</span></a></li>
      <li><a href="/showcase"><strong>Showcase</strong><span>Every feature in one deck: diagrams, charts, images, YouTube, camera.</span></a></li>
    </ul>
    <p>Or <strong>\u21E3 Load</strong> a deck from a link, or <strong>Open</strong> a file from this computer.</p>
  </div>
</div>

<div id="open-dialog" class="modal" role="dialog" aria-labelledby="open-title">
  <div class="panel">
    <button class="btn close" data-close>\u2715 Close</button>
    <h2 id="open-title">Load a deck from a link</h2>
    <p>Paste a link to a markdown file: a GitHub file or folder, a gist, or any URL that allows other sites to read it.</p>
    <form id="open-form" class="row">
      <input type="text" id="open-url" placeholder="https://github.com/you/repo/blob/main/talk.md" spellcheck="false" autocomplete="off">
      <button class="btn primary" type="submit">Load</button>
    </form>
    <p id="open-error" class="warn" hidden></p>
    <h3>Try one</h3>
    <ul id="open-examples">
      <li><a href="/gh/slidetake/slidetake/examples/why-debt-is-not-bad.md">Why debt is a tool, not an enemy</a> (headings format)</li>
      <li><a href="/gh/sakthipriyan/sakthipriyan.github.io/content/building-wealth/slides/2025/invest-in-gold/index.md">Invest in gold</a> (a reveal.js deck)</li>
    </ul>
    <h3>Short links</h3>
    <p><code>slidetake.com/gh/owner/repo/path/deck.md</code> opens a file on GitHub (add <code>@branch</code> after the repo for another branch), and <code>slidetake.com/gist/&lt;id&gt;</code> a gist. Images next to the deck load as they are.</p>
    <p>A file on this computer? Use <strong>Open</strong>.</p>
  </div>
</div>

<div id="review" class="modal" role="dialog" aria-labelledby="rv-title">
  <div class="panel xwide">
    <div class="panel-actions">
      <span class="rv-using" id="rv-using"></span>
      <button class="btn toggle" id="rv-pro" aria-pressed="false" title="Pro mode: record with OBS">Pro</button>
      <button class="btn rv-setup-btn" id="rv-setup-btn" aria-expanded="false" aria-controls="rv-setup-view">\u2699 Setup</button>
      <button class="btn close" data-close>\u2715 Close</button>
    </div>
    <h2 id="rv-title" class="rv-brand"><svg class="logo" viewBox="0 0 64 64" aria-hidden="true"><path d="M 10 8 H 38 C 41.3 8 44 10.7 44 14 V 18 H 22 C 16.5 18 12 22.5 12 28 V 36 H 10 C 6.7 36 4 33.3 4 30 V 14 C 4 10.7 6.7 8 10 8 Z" opacity="0.4"/><path fill-rule="evenodd" d="M 22 22 H 54 C 57.3 22 60 24.7 60 28 V 50 C 60 53.3 57.3 56 54 56 H 22 C 18.7 56 16 53.3 16 50 V 28 C 16 24.7 18.7 22 22 22 Z M 26 34 C 28.2 34 30 32.2 30 30 C 30 27.8 28.2 26 26 26 C 23.8 26 22 27.8 22 30 C 22 32.2 23.8 34 26 34 Z M 38 40 C 36.9 40 36 40.9 36 42 V 48 C 36 49.1 36.9 50 38 50 H 50 C 51.1 50 52 49.1 52 48 V 42 C 52 40.9 51.1 40 50 40 H 38 Z"/></svg><span class="word">Slide<span>take</span></span> Studio<span class="rv-pro-tag for-obs">Pro</span><span class="rv-settings-tag"> / Settings</span><span class="rv-size" id="rv-size"></span></h2>
    <div id="rv-setup-view">
      <p class="setup-note" id="setup-note" hidden></p>
      <div id="rv-setup">
        <div class="rv-setup-cols">
          <section class="for-obs">
            <h4>OBS</h4>
            <div class="rv-obs-fields">
              <input type="text" id="obs-host" value="localhost" spellcheck="false" aria-label="Host" title="Host">
              <input type="text" id="obs-port" value="4455" inputmode="numeric" aria-label="Port" title="Port">
              <input type="password" id="obs-pass" autocomplete="off" placeholder="Password" aria-label="Password">
            </div>
            <div class="rv-setup-row">
              <button class="btn small" id="obs-connect">Connect</button>
              <label class="check rv-setup-label"><input type="checkbox" id="obs-remember"> Remember</label>
              <span class="rv-setup-gap"></span>
              <span id="obs-status">Not connected</span>
            </div>
            <p class="rv-setup-note" id="obs-detail" hidden></p>
            <p class="rv-setup-note">In OBS: Tools \u2192 WebSocket Server Settings \u2192 enable it (the port and password are there). Point OBS at this browser window plus your microphone; no scenes needed.</p>
          </section>
          <section>
            <h4>Camera</h4>
            <select id="rec-cam" aria-label="Camera"></select>
            <div class="setup-cam"><video id="rec-cam-preview" muted playsinline autoplay></video><span id="rec-cam-none">No camera</span></div>
            <div class="rv-setup-row">
              <label class="check rv-setup-label" title="Flip the camera left to right, like a mirror. Off, it shows you as others see you, and words on a shirt or sign read the right way."><input type="checkbox" id="rec-mirror"> Mirror</label>
            </div>
            <p class="rv-setup-note">Turns on by itself when recording starts. Choose No camera for slides only.</p>
          </section>
          <section class="for-browser">
            <h4>Microphone</h4>
            <select id="rec-mic" aria-label="Microphone"></select>
            <meter id="rec-meter" min="0" max="1" low="0.1" high="0.8" optimum="0.5" value="0" aria-label="Mic level" hidden></meter>
            <canvas id="rec-wave" class="setup-wave" width="640" height="120" aria-label="What the microphone hears"></canvas>
            <div class="rv-setup-row">
              <span class="rv-setup-label">Sound</span>
              <div class="seg small" role="radiogroup" aria-label="Sound">
                <button class="seg-btn" data-sound="voice" role="radio" title="Chrome's noise suppression: takes out fans, hum and other steady noise (the default)">Voice</button>
                <button class="seg-btn" data-sound="raw" role="radio" title="No processing: best for a good mic in a quiet room">Raw</button>
              </div>
              <span class="rv-setup-gap"></span>
              <button class="btn small toggle rv-loud" id="rv-loud" aria-pressed="true" title="Raises the video towards YouTube's volume (-14 LUFS), stopping before the loudest peak would clip"><span class="ico" aria-hidden="true">\u{1F50A}</span> Volume boost</button>
              <button class="btn small toggle" id="rv-limiter" aria-pressed="false" title="Catches the few peaks (a click, a plosive) that would pass -1.5 dB, so Volume boost can reach -14 LUFS">Peak limiter</button>
            </div>
          </section>
          <section class="for-browser">
            <h4>Video</h4>
            <select id="rec-quality" aria-label="Quality"></select>
            <p class="rv-setup-note" id="rec-browser-check"></p>
          </section>
          <section class="for-obs">
            <h4>Video</h4>
            <select id="rv-mode" aria-label="How ffmpeg cuts">
              <option value="accurate">Frame-accurate (x264)</option>
              <option value="mac">Frame-accurate, Mac hardware encoder (faster)</option>
              <option value="copy">No re-encode (only when nothing is cut out)</option>
            </select>
            <div class="rv-setup-row">
              <select id="rv-fps" aria-label="Frame rate" title="Recording frame rate: cut points snap to its frames">
                <option value="24">24 fps</option><option value="25">25 fps</option><option value="30">30 fps</option>
                <option value="50">50 fps</option><option value="60">60 fps</option>
                <option value="23.976">23.976 fps</option><option value="29.97">29.97 fps</option><option value="59.94">59.94 fps</option>
              </select>
              <span class="rv-setup-gap"></span>
              <button class="btn small toggle rv-loud" id="rv-loud-obs" aria-pressed="true" title="Adds loudnorm to the ffmpeg command: YouTube's volume (-14 LUFS), peaks held below -1 dB"><span class="ico" aria-hidden="true">\u{1F50A}</span> Volume boost</button>
            </div>
            <p class="rv-setup-note" id="rec-screen"></p>
          </section>
        </div>
        <div class="rv-setup-foot for-browser">
          <span class="rv-setup-note for-browser">When Chrome asks, share <strong>this tab</strong>: only the slides and your camera are recorded, in a 16:9 frame.</span>
          <div class="rv-setup-row rv-files for-browser">
            <span class="rv-setup-label">Files</span>
            <button class="btn small" id="rv-folder-change" title="Where Download saves videos">Download folder\u2026</button>
            <details class="rv-purge">
              <summary class="btn small" title="Delete takes from this browser">\u{1F5D1} Purge takes</summary>
              <div class="rv-menu"><button class="btn small" id="rv-clean-unused">Unused takes</button><button class="btn small" id="rv-clean">All takes</button><button class="btn small" id="rv-clean-every" title="Every take Slidetake keeps in this browser, of every deck">Every deck's takes\u2026</button></div>
            </details>
          </div>
        </div>
      </div>
      <div class="setup-actions">
        <button class="btn rec" id="setup-record" title="Start recording (R)"><span class="rec-dot" aria-hidden="true">\u25CF</span> <span><u class="key">R</u>ecord</span></button>
      </div>
    </div>
    <div class="rv-grid">
      <div>
        <div class="rv-video">
          <video id="rv-video" controls playsinline preload="metadata"></video>
          <div id="rv-novideo">
            <div class="row" style="justify-content:center;margin:0">
              <button class="btn primary" id="rv-open">Open the recording file\u2026</button>
              <button class="btn" id="rv-folder" hidden>Use my OBS recordings folder\u2026</button>
            </div>
            <p>Pick the file OBS saved<span id="rv-file"></span> (.mov, .mp4 or .mkv) to preview takes. Or choose your OBS recordings folder once, and later takes load by themselves.</p>
          </div>
        </div>
        <div class="rv-bar">
          <button class="btn rec" id="rv-rec" title="Records the whole deck, or only the ticked slides (shift-click ticks a range) (R)"><span class="rec-dot" aria-hidden="true">\u25CF</span> <span><u class="key">R</u>ecord</span></button>
          <span id="rv-now"></span>
          <button class="btn rv-preview" id="rv-play-final" title="Plays the picked takes back to back (P)">\u25B6 <span><u class="key">P</u>review</span></button>
        </div>
      </div>
      <div class="rv-list" id="rv-list"></div>
      <div class="rv-dl">
        <button class="btn" id="rv-chapters" title="Copies the chapters, to paste into the YouTube description">\u29C9 Chapters</button>
        <span class="rv-final" id="rv-final"></span>
        <button class="btn for-browser" id="rv-render-btn" title="Saves the video: the picked takes joined into one file (D)">\u2193 <span><u class="key">D</u>ownload</span></button>
        <button class="btn for-obs" id="rv-ffmpeg-copy" title="Copies the ffmpeg command that cuts the picked takes from the OBS file (D)">\u29C9 ffmpeg</button>
      </div>
    </div>
  </div>
</div>
<input type="file" id="rv-file-input" accept="video/*,video/quicktime,.mov,.mp4,.m4v,.mkv,.webm" hidden>

<div id="rec-countdown"><div class="num"></div><div class="hint">recording starts after the countdown \xB7 Esc to cancel</div></div>
<div id="rec-paused">Paused \xB7 press B to resume</div>

<!-- The sample deck. Plain markdown, nothing else. -->
`;var Jr=`<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">`;var Hs=e=>new Promise((t,a)=>{let o=document.createElement("script");o.src=e,o.onload=t,o.onerror=()=>a(new Error("could not load "+e)),document.head.appendChild(o)});async function js(){document.head.insertAdjacentHTML("beforeend",Jr);let e=document.createElement("style");e.textContent=Yr,document.head.appendChild(e),document.body.insertAdjacentHTML("afterbegin",Kr),await Promise.all([window.gsap?null:Hs("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"),window.marked?null:Hs("https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js")]),await Promise.resolve().then(()=>(Ns(),Md))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",js,{once:!0}):js();})();
