---
mode: agent
description: "Create a new Building Wealth tool page following established design principles from existing tools."
---

# Create a New Building Wealth Tool

You are creating a new financial tool page for the **building-wealth** section of this Hugo static site. Study the existing tools to maintain perfect consistency in structure, tone, and frontmatter.

## Inputs Required

Ask the user for the following if not provided:

- **Tool name** — full display name (e.g., "RealValue SIP Engine")
- **Tool description** — 1–2 sentence SEO/meta description
- **Tool type** — camelCase identifier for the Hugo layout (e.g., `sipCalculator`, `emiCalculator`, `multiAssetAllocator`)
- **JS script filename** — the JS file under `static/js/` (e.g., `realvalue-sip-engine.js`)
- **External JS dependencies** — typically `echarts` for tools with charts, or omit entirely for simple tools
- **wealth_tags** — semantic tags (2–4) from the financial domain (e.g., SIP, Investment, Loan, Debt Management, Asset Allocation)
- **YouTube video ID** — if a demo video exists (optional)
- **Complexity level** — simple (frontmatter-only) or complex (with full markdown body)

## Frontmatter Rules

Every tool MUST follow this exact frontmatter structure:

```yaml
---
title: "<Full Display Name>"
date: "YYYY-MM-DD"
draft: "false"
description: "<1–2 sentence SEO description.>"
type: "tools"
tool_type: "<camelCaseType>"
tool_script: "js/<script-filename>.js"
tool_dependencies:       # include ONLY if the tool uses external JS libs
  - echarts
summary: "<Slightly longer summary for list pages — 1 sentence.>"
wealth_tags:
  - Tag1
  - Tag2
---
```

**Key rules:**
- `draft` is a string `"false"`, never a boolean
- `type` is always `"tools"` — do not change this
- `tool_script` path is relative to `static/`, always `js/<name>.js`
- `tool_dependencies` is omitted entirely for tools that need no external libs
- `summary` is more descriptive than `description` and written for readers, not search engines
- Use `wealth_tags` (not `tags`) per the section convention

## Content Structure (Complex Tools Only)

For tools that have a rich feature set, include a markdown body after the frontmatter following this structure:

### 1. Introduction Section

```markdown
## About <Tool Name>

> **<Tool Name>** helps you <core value proposition in one sentence>.

<2–3 sentence paragraph explaining what makes this tool different from conventional calculators. Always position it as "not just another X calculator".>
```

### 2. YouTube Embed

Include immediately after the intro paragraph if a video ID exists:

```markdown
### <Descriptive video title>

{{< youtube VIDEO_ID >}}
```

For YouTube embeds with a start time, use:
```markdown
{{< youtube id="VIDEO_ID" start="97" >}}
```

### 3. Supported Modes Table

Include when the tool supports multiple calculation modes:

```markdown
### One Engine. Every <Domain> Scenario.

<One sentence explaining the adaptive nature.>

#### Supported Calculation Modes

| Mode | What does it answer? |
|------|---------------------|
| **Mode Name** | "Plain-English question the user is asking?" |
| **Mode Name** | "Plain-English question the user is asking?" |
```

### 4. Why This Tool Section

Always frame it as problem (traditional tools) vs. solution (this tool):

```markdown
### Why <Tool Name>?

Traditional <calculators/tools> mislead you by:
- <specific shortcoming 1>
- <specific shortcoming 2>
- <specific shortcoming 3>

**<Tool Name>** solves this by:
- <solution 1>
- <solution 2>
- <solution 3>
```

### 5. Built for Real Life Section (optional)

```markdown
### Built for Real Life (Not Marketing Numbers)

- <Feature / design principle 1>
- <Feature / design principle 2>
- No assumptions about <unrealistic assumptions others make>
- Transparent calculations you can verify
```

### 6. Key Features Table (for complex multi-feature tools)

```markdown
### Key Features

| Feature | Description |
|---------|-------------|
| **Feature Name** | One-line description |
```

### 7. Key Insights Section

```markdown
### Key Insights

> **<Core insight as a pithy takeaway statement.>**

<Explanation paragraph with a concrete ₹ example showing the insight in practice.>
```

### 8. Real-World Use Cases

```markdown
### Real-World Use Cases

Want to see how to use the <Tool Name> for different scenarios? Check out our comprehensive guide:

**[<Tool Name> Use Cases](/building-wealth/blogs/<tool-slug>-use-cases/)** - Discover <N>+ practical scenarios including:

1. **<Scenario Name>** — <one-line description>
2. **<Scenario Name>** — <one-line description>
```

### 9. FAQ Section

Include for complex tools with non-obvious behavior:

```markdown
## Frequently Asked Questions (FAQs)

### <Question 1>

<Answer paragraph.>

### <Question 2>

<Answer paragraph.>
```

## Naming Conventions

| Concern | Rule |
|---------|------|
| File name | kebab-case matching the URL slug (e.g., `realvalue-emi-engine.md`) |
| `title` | Title Case, full display name |
| `tool_type` | camelCase, no hyphens (e.g., `sipCalculator`) |
| `tool_script` | kebab-case JS filename (e.g., `realvalue-sip-engine.js`) |
| "RealValue" prefix | Use for any tool doing inflation/real-value-adjusted calculations |

## Tone and Writing Principles

Follow these content principles observed across all existing tools:

1. **India-first**: Use ₹ symbol, reference Indian financial instruments (SIP, EMI, TCS, LTCG, tax slabs)
2. **Educational, not just functional**: Explain WHY the tool matters, not just WHAT it does
3. **Problem-solution framing**: Every tool intro must establish what conventional calculators get wrong
4. **Concrete examples**: Use specific ₹ amounts and time periods (e.g., "₹50,000 EMI today feels like ₹27,000 in 10 years at 6% inflation")
5. **Minimal assumptions**: Explicitly call out what the tool does NOT assume (salary hike, tax benefits, etc.)
6. **Plain-English modes**: Describe each calculator mode as a user question in quotes

## File Location

Save the new file at:
```
content/building-wealth/tools/<tool-slug>.md
```

## After Creating the File

Remind the user to:
1. Add the corresponding JS file to `static/js/`
2. Verify the `tool_type` value matches what the Hugo theme layout expects
3. Run `hugo server` to preview the tool page locally
4. Create a companion use-cases blog post at `content/building-wealth/blogs/<year>/<tool-slug>-use-cases.md`
