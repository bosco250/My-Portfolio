# Design system

**For:** Designers, reviewers, and anyone extending the look  
**Use:** This document is the house template. Paint from it. Do not invent new colours or chrome.

This is a daily staff workspace. The interface should read as a working operations tool, not a showcase.

---

## 1. What this document is for

This handbook is the visual standard for every screen.

Use it to:

- apply colour, type, and chrome on a new or existing page
- keep the sidebar clear and accessible as the menu grows
- open records in side panels instead of extra pages
- review work against one house style

---

## 2. Brand

Navy and gold are the house identity. They are not decoration.

| Element | In the interface |
|---|---|
| Navy field | Sidebar, sign-in rail, primary brand **`#012D6E`** |
| Gold | What is current, selected, or the main action **`#BF9F00`**; titles on navy **`#D8A83C`** |
| Mark | Square navy field, simple geometric letter in white |
| Wordmark | Product name (semibold) · short role line (regular) |

Gold means *this is current*. It is not a warning. Pending, due, and low stock use orange. Success, danger, and information keep conventional green, red, and teal so meaning never depends on the brand.

### Product mark

The lockup is only:

1. A navy square with a geometric letter in white  
2. Product name (Inter, semibold)  
3. Short role line (Inter, regular, quieter)

Sizes: 32px in the sidebar, 36px on sign-in. No extra bars, split letters, or decorative tracking. Clutter was reviewed and removed; do not add it back.

---

## 3. How the house is applied

Work follows one method, in this order:

1. **Protect operations.** Permissions, flows, and records stay as they are. Visual work does not rewrite how the work runs.
2. **One colour house.** Every screen uses the palette in this document. Pages do not invent hex values.
3. **Shell first.** Sign-in, sidebar, top bar, and page floor set the language every area inherits.
4. **Lists stay; work slides in.** A list remains on the left. A record opens in a right-hand panel. Create and edit open a second panel on top. The address bar holds the open record so refresh and sharing still work.
5. **Human copy.** Operators see work language — *The service is temporarily unavailable. Try again in a moment.* — not technical errors or account enumeration.
6. **Check contrast, keyboard, and reduced motion** on dark chrome and light pages.

### Sign-in

One card on a photograph of the workplace, with a navy rail and the product mark.

- Staff sign in, request a password reset, set a new password from a reset link, or activate an invited account.
- There is no self-service create-account path. Accounts are issued by an administrator.
- Validation runs when the person submits, with the same wording the service uses.
- Field errors sit on the field. If the service is down, a banner says it is temporarily unavailable.
- The card follows the screen height. Fields sit at the top; the primary action sits at the bottom.

### Application shell

After sign-in, every staff screen uses the same frame:

| Region | Job |
|---|---|
| Sidebar | Navigation, Find a page, signed-in account |
| Top bar | Page title, record search (Ctrl+K), notices, account |
| Page canvas | The work of the area, on a quiet textured floor |
| Right panels | Record detail and forms, stacked |

Desktop: sidebar open from 1200px, collapsible to a 56px rail.  
Phone: sidebar is a left panel; the list stays usable.

### Pages

Operational pages are built around **work, not decoration**:

- **Overview** leads with what needs the signed-in person, then risks, then recent activity — from live permissions, not a generic dashboard.
- **Lists** are compact tables: one line per row, sticky header, **View** pinned right. A row click opens the panel.
- **Records** do not jump to a new page. They open over the list so context is not lost.
- **Forms** keep the primary action in a footer, with validation visible there so errors are not off-screen.
- **Intake** stays short: identity, reading, condition. Detail and follow-on actions live on the record, not a second full page.
- **Empty, loading, and error** states stay in the same chrome. A failed page still shows the sidebar and top bar.

---

## 4. Design principles

| Principle | Practice |
|---|---|
| One house | This palette only. No page-local colours. |
| Compact, not cramped | Tight padding; 44px touch targets on phones; 36px nav items on desktop. |
| Square chrome | Corners 0–4px. Avatars and status dots may be circular. |
| Borderless actions | State is fill and type colour, not a drawn outline. Focus rings are the exception. |
| Colour has a job | Navy = brand chrome. Gold = active. Status colours = outcome. |
| Type is Inter | Body and headings. A monospace face only for plates, IDs, and money. |
| Lists stay; work slides in | Panels, not extra pages, for a record and its actions. |
| Human copy | Name the thing done. Never expose internals. |
| Accessible by default | Contrast, labels, keyboard, reduced motion, no colour-only status. |

---

## 5. Colour — complete house palette

This is the full colour template. Copy these values. Do not add a sixth navy or a second gold.

**How to read it**

- **Navy** = brand chrome (sidebar, mark, headings on white).
- **Gold** = this is current, selected, or the primary action.
- **Orange** = this needs attention (pending, due, low stock).
- **Green / red / rose / teal** = outcome, never decoration.

---

### 5.1 Master swatches

#### Navy (brand)

| Name | Hex | Role |
|---|---|---|
| Deep navy | `#001A42` | Shadows, overlays, pressed chrome |
| **Primary navy** | `#012D6E` | Brand. Sidebar, sign-in rail, mark, headings on white, type on gold |
| Raised navy | `#1B3654` | Second navy: raised plates, hover on the sidebar |
| Navy line | `#2B4A75` | Lines and edges on navy |
| Soft navy | `#D6E0EF` | Rare wash |
| Navy tint | `#EAF0F8` | Soft navy on light surfaces |

#### Gold (active)

| Name | Hex | Role |
|---|---|---|
| Gold text | `#8A7300` | Gold **as text** on white (readable). Outlined and text buttons |
| **Active gold** | `#BF9F00` | Current nav item, primary button, selected row, focus on navy |
| Gold on navy | `#D8A83C` | Titles **on navy**; primary button hover |
| Light gold | `#F3E7B0` | Hover on rows, cards, quiet chrome |
| Soft gold | `#FAF5DC` | Softest gold wash |

Active gold (`#BF9F00`) is too faint as **text** on white. Use gold text (`#8A7300`) for labels, links, and outlined buttons.

#### Neutrals (cool, navy-tinted — not pure grey)

| Name | Hex | Role |
|---|---|---|
| White | `#FFFFFF` | Cards, tables, top bar, dialogs, type on navy |
| Canvas | `#F3F5F9` | Page floor |
| Mist | `#E8EDF4` | Table headers, quiet fills |
| Quiet fill | `#E4E9F1` | Extra quiet fill |
| Disabled fill | `#DBE2EC` | Disabled background |
| Sidebar text | `#CFD9E6` | Idle menu items on navy |
| Sidebar muted | `#9CADC4` | Section labels, role, email on navy |
| Disabled text | `#5F6D82` | Disabled on white (still readable) |
| Border | `#D9E0EA` | Essential dividers |
| Strong border | `#B6C2D3` | Stronger edges, disabled border |
| Ink | `#0E1D33` | Body text on light |
| Ink soft | `#3C4A5F` | Secondary text, breadcrumbs |
| Ink muted | `#5A677B` | Metadata; **lightest body text allowed on white** |

#### Status (outcome only)

| Intent | Fill | Text on light | Wash | Meaning |
|---|---|---|---|---|
| Success | `#15803D` | `#166534` | `#DCFCE7` | Done, approved, in stock |
| Warning | `#C2410C` | `#9A3412` | `#FFEDD5` | Pending, due, low stock — **not gold** |
| Error / danger | `#DC2626` | `#991B1B` | `#FEE2E2` | Rejected, overdue, delete |
| Failed | `#BE123C` | `#9F1239` | `#FFE4E6` | Attempted and did not succeed |
| Info | `#0369A1` | `#075985` | `#E0F2FE` | In progress, notices |

On a light surface, put the **text colour** on the **wash**. Do not set a sentence in the bright fill on white.

**Danger** and **error** share `#DC2626`. Use danger for delete and unsafe actions; error for a failed field or a failed save; failed when work was attempted and did not succeed.

---

### 5.2 Where each colour goes

#### Brand and page chrome

| Role | Hex | Put it on |
|---|---|---|
| Primary navy | `#012D6E` | Brand, headings, mark, type on gold |
| Raised navy | `#1B3654` | Dark hover, raised plates |
| Deep navy | `#001A42` | Pressed chrome, deepest overlay |
| White | `#FFFFFF` | Type and bars on the navy mark |
| Light gold | `#F3E7B0` | Light hover tint |
| Canvas | `#F3F5F9` | Page floor |
| Surface | `#FFFFFF` | Cards, tables, panels, dialogs |
| Mist | `#E8EDF4` | Table header, search field, quiet strip |
| Border | `#D9E0EA` | Default divider |
| Strong border | `#B6C2D3` | Hover outline, stronger edge |
| Overlay | `#001A42` at 55% | Panel and dialog backdrop |
| Focus on light | `#012D6E` | Keyboard ring on white |
| Focus on navy | `#BF9F00` | Keyboard ring on the sidebar |

#### Text on light pages

| Role | Hex | Put it on |
|---|---|---|
| Heading | `#012D6E` | Page and card titles on white |
| Body | `#0E1D33` | Sentences, table cells |
| Secondary | `#3C4A5F` | Support, breadcrumbs |
| Muted | `#5A677B` | Dates, hints, empty-state support |
| On dark | `#FFFFFF` | Type on navy (sign-in rail, overlays) |
| Top bar | `#FFFFFF` | Header bar fill |
| Page name | `#012D6E` | Current page in the top bar |

**Never** use gold as a heading on white. Gold titles exist only on navy (sidebar).

#### Buttons, active, selection

| Role | Hex | Put it on |
|---|---|---|
| Active | `#BF9F00` | Current tab, current filter, “this is on” |
| Active text on white | `#8A7300` | Active label sitting on a white page |
| Primary button fill | `#BF9F00` | Main action |
| Primary button type | `#012D6E` | Text **on** the gold button (must stay navy; white fails contrast) |
| Primary button hover | `#D8A83C` | Lighter gold |
| Text / outlined button | `#8A7300` | Secondary actions on white |
| Quiet gold chip | `#F3E7B0` | Soft gold fill |
| Softest gold | `#FAF5DC` | Quiet wash |
| Selected row | `#BF9F00` | Same as the current sidebar item |
| Selected type | `#012D6E` | Type on the selected gold row |
| Selected marker | `#012D6E` | 3px bar on a gold row |
| Row hover | `#F3E7B0` | Hover on lists, cards, tiles |

#### Sidebar

| Role | Hex | Put it on |
|---|---|---|
| Rail | `#012D6E` | Sidebar fill |
| Raised / hover | `#1B3654` | Top wash, item hover |
| Idle item | `#CFD9E6` | Menu labels at rest |
| Strong | `#FFFFFF` | Brand, account name, hover type |
| Muted | `#9CADC4` | Section labels, role, email |
| Heading on navy | `#D8A83C` | Gold titles on the rail only |
| Line | `#2B4A75` | Dividers on the rail |
| Current item | `#BF9F00` | Fill of the open page |
| Current type | `#012D6E` | Type on that gold item |
| Current marker | `#012D6E` | 3px bar on gold (navy so it still reads) |
| Focus | `#BF9F00` | Keyboard ring on the rail |

Sidebar text is a **solid** colour. Do not fade white over the atmosphere — contrast would change with the background.

#### Disabled

| Role | Hex | Put it on |
|---|---|---|
| Disabled text | `#5F6D82` | Label and control |
| Disabled fill | `#DBE2EC` | Background |
| Disabled border | `#B6C2D3` | Edge |

---

### 5.3 Ready pairings — paint from these

These combinations are the template. If a new screen needs colour, pick a row. Do not remix.

| Surface | Background | Type | Accent / edge |
|---|---|---|---|
| **Page** | `#F3F5F9` | Heading `#012D6E`, body `#0E1D33` | Dividers `#D9E0EA` |
| **Card, table, panel** | `#FFFFFF` | Same as page | Border `#D9E0EA`, navy-tinted shadow |
| **Table header** | `#E8EDF4` | `#012D6E` / `#3C4A5F` | — |
| **Row hover** | `#F3E7B0` | `#0E1D33` | — |
| **Row selected** | `#BF9F00` | `#012D6E` | Marker `#012D6E` |
| **Top bar** | `#FFFFFF` | Title `#012D6E`, crumbs `#3C4A5F` | Soft navy shadow |
| **Sidebar idle** | `#012D6E` | Item `#CFD9E6`, label `#9CADC4` | Line `#2B4A75` |
| **Sidebar hover** | `#1B3654` | `#FFFFFF` | — |
| **Sidebar current** | `#BF9F00` | `#012D6E` | Marker `#012D6E` |
| **Sidebar heading** | `#012D6E` | `#D8A83C` | — |
| **Primary button** | `#BF9F00` | `#012D6E` | Hover `#D8A83C` |
| **Secondary / text button** | transparent / white | `#8A7300` | Hover wash `#F3E7B0` |
| **Sign-in rail** | `#012D6E` | White + gold heading | Overlay `#001A42` at 55% on the photograph |
| **Focus on light** | — | — | 2px `#012D6E` |
| **Focus on navy** | — | — | 2px `#BF9F00` |
| **Success badge** | `#DCFCE7` | `#166534` | — |
| **Warning badge** | `#FFEDD5` | `#9A3412` | — |
| **Danger badge / delete** | `#FEE2E2` | `#991B1B` | Button `#DC2626` with white type |
| **Failed badge** | `#FFE4E6` | `#9F1239` | — |
| **Info badge** | `#E0F2FE` | `#075985` | — |
| **Disabled** | `#DBE2EC` | `#5F6D82` | Border `#B6C2D3` |

#### Shadows (navy, not black)

| Use | Recipe |
|---|---|
| Card | 0 1px 2px, `#001A42` at 8% |
| Raised | 0 2px 6px, `#001A42` at 10% |
| Sidebar edge | 1px 0 0, `#001A42` at 14% |
| Top bar | 0 6px 14px −12px, `#001A42` at 45% |
| Dialog | 0 8px 24px, `#001A42` at 18% |

To fade a colour, only reduce its opacity. Example: overlay is deep navy `#001A42` at 55%.

---

### 5.4 Colour rules

1. Use this palette. Do not introduce a new hex on a page.
2. **Gold = active. Orange = warning.** A pending job is orange; the open menu item is gold.
3. Headings on white are navy `#012D6E`. Headings on navy are gold `#D8A83C`.
4. Type on a gold fill is navy `#012D6E`, never white (white on `#BF9F00` fails contrast).
5. Gold text on white is `#8A7300`, never `#BF9F00`.
6. Selected rows copy the sidebar: gold fill, navy type, navy marker.
7. Navy is not a page floor. Light work sits on `#F3F5F9` and `#FFFFFF`.
8. Sidebar text is solid (`#CFD9E6`, `#9CADC4`, `#FFFFFF`).
9. Status is never colour alone — pair it with a label or an icon.
10. `#5A677B` is the lightest body text on white. Do not go paler.

---

## 6. Typography

**Family:** Inter, with the system interface face as fallback.  
**Monospace:** JetBrains Mono (or the system mono) for plates, IDs, codes, and money.

Type is 10% smaller than the design sizes below. Right-hand panels may be 15% smaller still. Do not invent a third scale.

| Role | Design size | Weight |
|---|---|---|
| Page title | 16–18px | 600 |
| Sidebar brand | 15px | 600 |
| Section / card heading | 15–16px | 600 |
| Body / table | 12–14px | 400–500 |
| Sidebar item | 12px | 400; current item 500 |
| Sidebar section label | 12px | 600, uppercase, wide tracking |
| Metadata | 12px | 400 |

Sentence case in the interface. Do not shout in capitals except the sidebar section labels.

---

## 7. Space, corners, motion, depth

| Measure | Values | Use |
|---|---|---|
| Space | 4 / 8 / 12 / 16 / 24px | Padding and gaps |
| Corners | 0–4px | Chrome. Even “full” round is 4px — not a pill |
| Motion | 150 / 200 / 250 ms | State changes |
| Stacking | Sidebar under top bar; dialogs above; notices highest | Keep the order |

**Reduced motion:** when the person has asked the system to reduce motion, freeze the page floor and the sidebar atmosphere. Navigation must not rely on animation to be understood.

---

## 8. Layout measures

| Part | Size |
|---|---|
| Sidebar open | 256px |
| Sidebar collapsed | 56px |
| Top bar | 52px |
| Nav item (desktop) | 36px |
| Nav item (touch) | 44px |
| Panels | 420 / 520 / 760 / 1040px |
| Panel maximum | 80% of the window |
| List still visible (tablet and up) | 160px to the left of a panel |
| Nested panel | 72px narrower than the one beneath it |

---

## 9. Sidebar — structure, behaviour, accessibility

The sidebar is the operator’s map of the system. It is dark navy chrome, with a large menu that remains findable and safe to use with a keyboard.

### 9.1 Anatomy (top to bottom)

1. **Brand** — navy mark, product name, short role line. Click goes to Overview. Collapsed: mark only, with the name on hover.
2. **Find a page** — sticky filter, outside the scrolling list. Placeholder “Find a page”. Collapsed: a search icon opens the same field.
3. **Groups** — only pages the account may use. Labels uppercase. Groups with more than one item collapse; the group that contains the current page stays open. Expansion is remembered for the session.
4. **Items** — 12px Inter, 16px icon, slight indent inside a group. Current page: gold fill, navy type, 3px navy marker on the left. Hover: raised navy.
5. **Account** — transparent strip on the same navy as the rail. Dark-tone avatar. Name plus role, or email if the name and the role are the same. Height about 52–56px. Sign out asks for confirmation.

The light page floor does **not** sit on the sidebar. The rail has its own navy wash and quiet geometry.

### 9.2 Background

- Base: primary navy, washing from raised navy at the top into the rail.
- Quiet navy and gold pools, light geometry — decorative only, never in the way of labels or clicks.
- Account strip: **transparent**. The rail colour shows through. No extra slab.
- Inter is used for the nav so another system face does not replace it.

### 9.3 Large menu

The system has many areas. Find a page is required.

| Behaviour | Detail |
|---|---|
| Match | Ignores case. If a **group** name matches, every item in that group is shown. |
| While typing | Groups stay open; empty groups hide. |
| Count | “1 page” / “N pages”. |
| Empty filter | “No pages match “{query}”. Try a page name such as Requests or Overview.” Announced politely to assistive technology. |
| No permissions | “No pages for this account. Ask an administrator if you need access.” |
| Enter | Opens the first match. |
| Escape | Clears the query, then leaves the field. |
| `/` | Focuses Find a page when the person is not already typing in a field. Does **not** take over Ctrl+K (record search). |
| After navigate | Query clears so the full map returns. |

Find a page is **navigation**. Global search in the top bar is **records**. They must stay separate.

### 9.4 Collapsed rail (56px)

- Group icon; a group with one item navigates immediately.
- A group with several items opens a flyout to the right.
- Search icon opens the same filter.
- Names appear as tooltips on the right, with a short delay.

### 9.5 Accessibility (sidebar)

| Requirement | How it is met |
|---|---|
| Landmark | The rail is the main navigation, named for assistive technology |
| Current page | The open item is marked as the current page |
| Groups | Open / closed state is announced |
| Flyouts | Named by the group; behave as menus |
| Find | The field is labelled “Find a page”; clearing it is labelled |
| Empty results | Announced without interrupting typing |
| Focus | Gold ring, visible on navy and on gold |
| Icons | Decorative; every item still has a unique icon |
| Touch | 44px rows on small screens |
| Keyboard | Tab through items; Enter opens; `/` finds; Escape clears |
| Motion | Atmosphere and stagger stop when reduced motion is set |
| Contrast | Solid sidebar text from §5 (not faded white) |
| Account | Named “Account: {name}”; Sign out labelled; confirm before leaving |
| Phone | Close control labelled; choosing a page closes the drawer |

### 9.6 What the sidebar must never do

- Change who is allowed to see a page.
- Duplicate record search. Find a page is navigation only.
- Use gold as a warning.
- Repeat the person’s name on two lines when it is also the role name — show the email instead.
- Put decoration on top of labels.

---

## 10. Top bar

White, 52px, one divider, soft navy shadow.

- Menu control opens or collapses the sidebar.
- Breadcrumbs: secondary text; the current page is 15px, strong, navy.
- Search field is borderless mist (`#E8EDF4`). It opens **record** search (Ctrl+K / ⌘K), not page find.
- Notices and account. The account menu shows name, role, email, My account, and Sign out.

---

## 11. Page floor

Light pages sit on canvas `#F3F5F9` with a quiet, hand-made floor: uneven light, a light sketch, and a faint grain. It is atmosphere only. It does not catch clicks and is ignored by assistive technology.

| Setting | Values | When |
|---|---|---|
| Tone | Canvas or dark | Staff pages use canvas; dark is for dark panels |
| Density | Quiet, normal, or vivid | Lists use quiet |

Hidden for print, high contrast, and forced colours. Motion is only fade and shift, and it stops when reduced motion is requested.

Do not place this floor on the sidebar.

---

## 12. How pages are built

### 12.1 Pattern: list + panel

1. The list (table or board) stays.
2. **View** or a row click opens a right-hand panel. The record stays in the address so refresh and share still work.
3. Create, edit, and commands open a second panel on top of the record. Cancel returns to the record.
4. Never more than: list + one detail + one action.

Where an older full-page record still exists, it should follow this pattern.

### 12.2 Tables

- One line per row; overflow ellipsis; full text on hover.
- Header 12px semibold, sentence case, sticky.
- Body about 13px, row about 40px, no zebra stripes.
- Actions column last and sticky. Always a **View**.
- Keyboard: Tab to the row, Enter opens.

### 12.3 Forms

- Title in the panel header; optional one-line explanation.
- Fields in the body; **Cancel** and the primary action fixed in the footer.
- Enter submits. The footer shows validation so errors are not off-screen.
- Short forms use the small panel (420px); more than eight fields use the medium (520px).

### 12.4 Feedback

- Notices: top centre, white, coloured left edge, four seconds, dismissible. They must not cover panel buttons.
- Confirm success in a sentence that names the thing: “Role assigned.”
- Keep service errors in the open form.

### 12.5 Intake (example)

Intake is identity, reading, and condition — not a long checklist. Opening a job does not add a second full-page form. Follow-on actions live on the record. Panels stack; the list remains.

### 12.6 Page frame

Each page has consistent padding and a short entry motion. It does **not** paint a second floor — the shell already provides one.

---

## 13. Sign-in and identity

- Photograph of the workplace, navy overlay, one card.
- Left rail (from tablet up): product mark, product name, short role line, quiet illustration, one-line purpose.
- Right: Sign in / Forgot password / Set password / Activate.
- Forgot password never reveals whether an email exists.
- After a password reset, other sessions are signed out.
- Extra verification dialogs stay separate from this card.

---

## 14. Accessibility

Aim: **WCAG 2.2 AA**.

- Contrast: at least 4.5:1 for text; 3:1 for large text and controls.
- Visible focus: navy ring on light (`#012D6E`); gold ring on navy (`#BF9F00`).
- Structure: a main region, a navigation region, headings, labels, current page marked.
- Status is never colour alone (icon plus text, or text).
- Touch: 40–44px on small screens.
- Reduced motion and high contrast are respected on the page floor.
- Confirm destructive actions (sign out, delete) in a dialog with a clear title.

---

## 15. Responsive behaviour

| Width | Shell |
|---|---|
| Phone | Sidebar in a modal drawer; full-width panels; stacked page title and actions |
| Tablet | Panel leaves 160px of the list; sidebar collapsible |
| Desktop (1200px and up) | Sidebar open at 256px |

Prevent horizontal overflow of the whole app. Wide tables scroll inside the panel or the page.

---

## 16. Pieces of the house

| Piece | What it is |
|---|---|
| Colour house | The palette in §5 — the only colours allowed |
| Shell | Sidebar + top bar + page floor + request panels |
| Sidebar | Map of the system; see §9 |
| Product mark | Geometric letter on a navy square |
| Page floor | Quiet textured atmosphere on light pages |
| Top bar | Title, record search, account |
| Record panel | Opens a record over the list |
| Form panel | Create, edit, and commands |
| Page frame | Padding and entry motion |
| Tables | Compact rows, sticky **View** |
| Avatars | Dark tone on navy; light tone on white |

When adding a destination: unique icon, real permission, sentence-case label.

---

## 17. Do and do not

**Do**

- Paint from §5.3.
- Keep lists; open work in panels.
- Write operator copy.
- Keep gold for active, orange for warning.
- Test keyboard and a collapsed sidebar.

**Do not**

- Call the product a prototype, demo, or mock.
- Put internal phase names in the interface.
- Invent a hex that is not in this document.
- Use navy as a page floor (sidebar and sign-in rail only).
- Use gold headings on white.
- Build a second page-find that fights Ctrl+K.
- Round chrome past 4px or restore pill badges.
- Hide form errors above a sticky footer.

---

## 18. Using this template on the next page

1. Give the page the standard frame (title and primary action on one row).
2. Load real work the signed-in person is allowed to see.
3. Open a row in a record panel; put edits in a form panel on top.
4. Colour only from **§5**. Paint from the pairings in **§5.3**.
5. Check empty, error, loading, and a narrow viewport.
6. Tab through; confirm the focus ring; confirm reduced motion does not hide meaning.

**Default page recipe (copy this):**

- Canvas `#F3F5F9` · card `#FFFFFF` · heading `#012D6E` · body `#0E1D33` · muted `#5A677B` · border `#D9E0EA`
- Primary action: fill `#BF9F00`, type `#012D6E`, hover `#D8A83C`
- Selected row: fill `#BF9F00`, type `#012D6E`
- Hover row: `#F3E7B0`
- Success / warning / danger / info: washes and text from §5.1
- Focus: `#012D6E` on light, `#BF9F00` on navy

New work should look as if it has always been in this house.
