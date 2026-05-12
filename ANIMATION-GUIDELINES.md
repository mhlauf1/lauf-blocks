# Animation Guidelines

Reference for UI animation, easing, and motion decisions. Apply these when writing or reviewing transitions, keyframes, and motion-related CSS / Framer Motion code.

## Easing Decision Flowchart

```
Is the element entering or exiting the viewport?
├── Yes → ease-out
└── No
    ├── Is it moving/morphing on screen?
    │   └── Yes → ease-in-out
    └── Is it a hover change?
        ├── Yes → ease
        └── Is it constant motion?
            ├── Yes → linear
            └── Default → ease-out
```

## Duration Guidelines

| Element Type                      | Duration  |
| --------------------------------- | --------- |
| Micro-interactions                | 100-150ms |
| Standard UI (tooltips, dropdowns) | 150-250ms |
| Modals, drawers                   | 200-300ms |

**Rules:**

- UI animations should stay under 300ms
- Larger elements animate slower than smaller ones
- Exit animations can be ~20% faster than entrance
- Match duration to distance — longer travel = longer duration

## Practical Tips

| Scenario                        | Solution                                        |
| ------------------------------- | ----------------------------------------------- |
| Make buttons feel responsive    | Add `transform: scale(0.97)` on `:active`       |
| Element appears from nowhere    | Start from `scale(0.95)`, not `scale(0)`        |
| Shaky/jittery animations        | Add `will-change: transform`                    |
| Hover causes flicker            | Animate child element, not parent               |
| Popover scales from wrong point | Set `transform-origin` to trigger location      |
| Sequential tooltips feel slow   | Skip delay/animation after first tooltip        |
| Small buttons hard to tap       | Use 44px minimum hit area (pseudo-element)      |
| Something still feels off       | Add subtle blur (under 20px) to mask it         |
| Hover triggers on mobile        | Use `@media (hover: hover) and (pointer: fine)` |

## Review Checklist

When reviewing UI code, check for:

| Issue                                  | Fix                                                              |
| -------------------------------------- | ---------------------------------------------------------------- |
| `transition: all`                      | Specify exact properties: `transition: transform 200ms ease-out` |
| `scale(0)` entry animation             | Start from `scale(0.95)` with `opacity: 0`                       |
| `ease-in` on UI element                | Switch to `ease-out` or custom curve                             |
| `transform-origin: center` on popover  | Set to trigger location or use Radix/Base UI CSS variable        |
| Animation on keyboard action           | Remove animation entirely                                        |
| Duration > 300ms on UI element         | Reduce to 150-250ms                                              |
| Hover animation without media query    | Add `@media (hover: hover) and (pointer: fine)`                  |
| Keyframes on rapidly-triggered element | Use CSS transitions for interruptibility                         |
| Framer Motion `x`/`y` props under load | Use `transform: "translateX()"` for hardware acceleration        |
| Same enter/exit transition speed       | Make exit faster than enter (e.g., enter 2s, exit 200ms)         |
| Elements all appear at once            | Add stagger delay (30-80ms between items)                        |
