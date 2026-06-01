# Email Validator

A lightweight, dependency-free email validation UI built with plain HTML, CSS, and JavaScript. The project contains **two distinct validator components** on a single page, each demonstrating a different validation pattern and visual style.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Components](#components)
  - [Component 1 — Card Validator](#component-1--card-validator)
  - [Component 2 — Floating Label Validator](#component-2--floating-label-validator)
- [How It Works](#how-it-works)
  - [Regex Pattern](#regex-pattern)
  - [Validation Logic — Component 1](#validation-logic--component-1)
  - [Validation Logic — Component 2](#validation-logic--component-2)
  - [Focus and Fill State — Component 2](#focus-and-fill-state--component-2)
- [Styling](#styling)
  - [Global Reset](#global-reset)
  - [Component 1 Styles](#component-1-styles)
  - [Component 2 Styles](#component-2-styles)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Known Limitations](#known-limitations)
- [Improvement Suggestions](#improvement-suggestions)

---

## Overview

| Feature | Details |
|---|---|
| Language | HTML5, CSS3, Vanilla JavaScript |
| Dependencies | None (Font Awesome icons loaded via CDN expected) |
| Components | 2 independent validators |
| Validation | Regex-based, client-side only |
| Responsive | Partially (fixed-width card on Component 1) |

---

## Project Structure

```
EmailValidator/
├── EmailValidator.html   # Markup for both validator components
├── EmailValidator.css    # Styles for both components
└── EmailValidator.Js     # Validation logic for both components
```

All three files must be in the same directory. The HTML file references both the CSS and JS files by relative path.

---

## Components

### Component 1 — Card Validator

A compact white card centered near the top of the viewport. It features:

- A labeled `email` input field with a placeholder.
- An inline icon (✓ or ⚠) that appears to the right of the input field as the user types.
- A red error message paragraph below the input that appears for invalid input.
- Green border and check icon for valid email; red border, warning icon, and error text for invalid.

**HTML element IDs used:**

| ID | Element | Purpose |
|---|---|---|
| `emailid` | `<input type="email">` | User input field |
| `icon` | `<div>` | Displays Font Awesome icon |
| `error-msg` | `<p>` | Displays error text |

**Trigger:** The `oninput` event on `#emailid` calls `checker()` on every keystroke.

---

### Component 2 — Floating Label Validator

A full-viewport hero section with a centered, minimal text input. It features:

- A floating label that animates upward when the field is focused or filled.
- A bottom-border-only input that changes color based on validation state.
- An error message that slides in below the input for invalid emails.
- The label turns green (`#2ebf75`) when the field is active or has content.

**HTML element IDs used:**

| ID | Element | Purpose |
|---|---|---|
| `email-field` | `<input type="email">` | User input field |
| `email-label` | `<label>` | Floating animated label |
| `error-msg-2` | `<span>` | Inline error message |

**Trigger:** The `onkeyup` event calls `validateEmail()`; `onfocus` calls `focusInput()`; `onblur` calls `blurInput()`.

---

## How It Works

### Regex Pattern

Both components share the same regular expression:

```
/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
```

| Part | Matches |
|---|---|
| `^` | Start of string |
| `[A-Za-z\._\-0-9]*` | Local part — letters, digits, dots, underscores, hyphens |
| `[@]` | Literal `@` symbol |
| `[A-Za-z]*` | Domain name — letters only |
| `[\.]` | Literal dot |
| `[a-z]{2,4}` | TLD — 2 to 4 lowercase letters |
| `$` | End of string |

> **Note:** See [Known Limitations](#known-limitations) for edge cases this regex does not cover.

---

### Validation Logic — Component 1

Called by `checker()` on every `input` event:

```
if field is empty      → hide icon, reset border, hide error
if value matches regex → show green ✓ icon, green border, hide error
else                   → show red ⚠ icon, red border, show error message
```

The icon is injected as a Font Awesome `<i>` element string via `innerHTML`. Font Awesome must be loaded (e.g., via CDN) for icons to render; otherwise the icon `<div>` will be empty.

---

### Validation Logic — Component 2

Called by `validateEmail()` on every `keyup` event:

```
if value does NOT match regex → show error span, set border-bottom red
if value matches regex        → hide error span, set border-bottom green
```

Returns `true` for valid, `false` for invalid — useful if this is later wired into a form submission handler.

---

### Focus and Fill State — Component 2

CSS classes on `.input-group` drive the floating label animation:

| Function | Trigger | Class Added | Effect |
|---|---|---|---|
| `focusInput()` | `onfocus` | `.focused` | Label floats up, turns green |
| `blurInput()` | `onblur` | `.filled` (if not empty) | Label stays up if field has content |
| `blurInput()` | `onblur` (empty) | removes `.filled` | Label returns to placeholder position |

The CSS transition on `#email-label` animates the `bottom` property over `0.3s`.

---

## Styling

### Global Reset

```css
*, *:before, *:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

Ensures consistent box model and removes browser default spacing across all elements.

---

### Component 1 Styles

| Selector | Key Properties |
|---|---|
| `body` | Full-viewport green gradient background (`#61d954` → `#2ebf75`), Poppins font |
| `.container` | White card, 400px wide, absolutely centered, rounded corners, drop shadow |
| `input[type="email"]` | 88% width (leaves room for the icon), styled border |
| `#icon` | Hidden by default (`display: none`), shown inline on input |
| `#error-msg` | Hidden by default, red (`#ff2851`), revealed on invalid input |

The `.container` uses `position: absolute; top: 25%; left: 50%; transform: translate(-50%, -50%)` to center the card relative to the viewport, placing it in the upper half of the screen (above Component 2).

---

### Component 2 Styles

| Selector | Key Properties |
|---|---|
| `.hero` | Full-viewport flex container, centers `.input-group` |
| `.input-group` | `position: relative` — anchors the absolutely positioned label and error span |
| `#email-field` | No border except bottom; white text; transparent background; z-index 10 |
| `#email-label` | Absolute, overlaps input, pointer-events none; `transition: bottom 0.3s` |
| `#error-msg-2` | Absolutely positioned below input; `transition: top 0.5s` for slide-in effect |
| `.focused #email-label`, `.filled #email-label` | `bottom: 45px` — floats the label above the field |

---

## Getting Started

No build step or package manager is required.

1. Clone or download the three files into a single folder.
2. Open `EmailValidator.html` in any modern browser.

To use Font Awesome icons in Component 1, add this `<link>` inside `<head>` in `EmailValidator.html`:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
/>
```

Without it, Component 1 will still validate correctly but no icons will be visible.

To use the Poppins font (referenced in CSS), add:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
/>
```

---

## Usage

**Component 1 (card):**
- Start typing in the email input.
- A green check appears and the border turns green for a valid email.
- A red warning icon, red border, and "Please Enter A Valid Email" appear for invalid input.
- Clearing the field resets the field to its default state.

**Component 2 (hero):**
- Click the field — the label animates upward.
- Type an invalid email — the border turns red and an error appears below.
- Type a valid email — the border turns green and the error disappears.
- Click away with a filled field — the label stays up. Click away with an empty field — the label returns to its resting position.

---

## Known Limitations

**Regex coverage gaps:**

| Issue | Example |
|---|---|
| Rejects valid subdomains | `user@mail.example.com` → ❌ |
| Rejects modern long TLDs | `user@example.museum` or `user@example.photography` → ❌ (only 2–4 chars allowed) |
| Rejects `+` in local part | `user+tag@example.com` → ❌ |
| Accepts obviously invalid input | `@.ab` would technically pass depending on field state |
| Domain must be letters only | `user@123.com` → ❌ (numeric domains are valid) |

**UI issues:**

- Component 1's `.container` uses `top: 25%` with a negative transform, which places it at the very top of the page and can overlap Component 2's background on smaller screens or short viewports.
- Component 1's input is `88%` wide with the icon taking up the remaining space. On narrow screens (< 400px), the layout may break since `.container` has a fixed width of `400px`.
- Font Awesome is not imported in the HTML file — icons in Component 1 require a manual CDN link to be added.
- Component 2's error span (`#error-msg-2`) is set to `display: block` in CSS but controlled via inline styles in JavaScript. The initial CSS `display` value has no effect since JS overrides it on first keyup.

---

## Improvement Suggestions

- **Regex:** Replace the custom regex with a more complete RFC-5322-compliant pattern, or use the browser's native `ValidityState` API (`input.validity.valid`) which handles all edge cases automatically.
- **Accessibility:** Add `aria-describedby` on the input fields pointing to the error message elements, and `aria-live="polite"` on error containers so screen readers announce validation results.
- **Font Awesome:** Add the CDN `<link>` tag to `EmailValidator.html` so Component 1 icons render without manual setup.
- **Responsive design:** Replace the fixed `400px` width on `.container` with `width: min(400px, 90vw)` to support mobile viewports.
- **Debounce:** Consider debouncing the `oninput`/`onkeyup` handlers slightly (e.g., 300ms) to avoid validating on every single keystroke, particularly beneficial on slower devices.
- **Form integration:** Component 2's `validateEmail()` already returns a boolean — wire it to a submit button's `onclick` or a `<form>`'s `onsubmit` to prevent submission of invalid emails.
