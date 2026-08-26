---
title: "Building Wealth"
weight: 20
emoji: "💰"
description: "Investment strategies, financial planning, and wealth building techniques to secure your financial future"
# Section identity, read by the theme. Gold is intrinsically light, so this
# section pairs its accent with dark ink text rather than white (11.3:1 / 8.7:1).
taxonomy: "wealth_tags"
accentFrom: "#f5c542"
accentTo: "#d4af37"
accentInk: "#7a5c12"

# Dark. The derivation in the theme lands on these anyway; naming them makes
# them this section's decision rather than a formula's, and editable without
# reasoning about oklch. Ink is the brightest, then the line, then the fill --
# a fill has to stay dark enough for light text to sit on it.
accentInkDark: "#e0b024"      # kind labels, hover titles, kickers
accentLineDark: "#966f04"     # card left borders, rules, the footer line
accentSurfaceDark: "#865f04"  # badges, buttons, pills
onAccent: "#1a1408"

# Curated landing. Presence of this key is what switches the section from the
# grouped listing to the front-page layout; every field below is optional.
landing:
  # The doorway: one wide card above the featured six.
  lead:
    page: /building-wealth/start-here/
  # One curated list, most important first. Cards show each page's own
  # summary, so there is nothing to write twice.
  featured:
    # Whichever edition is newest, so this does not go stale each month.
    - topic: State Of The 1 Portfolio
    - page: /building-wealth/books/the-global-indian-investor/
    - page: /building-wealth/tools/realvalue-portfolio/
    - page: /building-wealth/tools/xfina/
    - page: /building-wealth/blogs/the-perpetual-rebalancing-framework/
    - page: /building-wealth/videos/stop-paying-1.5/usd-cut-forex-markup-when-funding-ibkr-india-guide/
  # Each format block leads with these, then fills with the newest. Anything
  # already shown further up the page is skipped, so a pick that also appears
  # in Featured quietly gives way to the next candidate.
  tools:
    featured:
      - page: /building-wealth/tools/realvalue-family-sip-allocator/
      - page: /building-wealth/tools/realvalue-fx-engine/
      - page: /building-wealth/tools/realvalue-sip-engine/
  videos:
    featured:
      # Recency buries this one, and it is the reason for everything else.
      - page: /building-wealth/videos/how-i-missed-a-crore/
  slides:
    featured:
      - page: /building-wealth/slides/credit-cards-usage-risks-smart-practices/
  latestCount: 6
  topicsCount: 9
---

Learn about investment strategies, financial planning, and wealth building techniques to secure your financial future.
