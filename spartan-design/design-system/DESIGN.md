---
name: Molon Labe
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e8bdb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ae8882'
  outline-variant: '#5e3f3a'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#cc0000'
  on-primary-container: '#ffdad4'
  inverse-primary: '#c00000'
  secondary: '#f6be3b'
  on-secondary: '#402d00'
  secondary-container: '#c69302'
  on-secondary-container: '#433000'
  tertiary: '#ffb4a8'
  on-tertiary: '#690000'
  tertiary-container: '#bd2d1f'
  on-tertiary-container: '#ffdad4'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930000'
  secondary-fixed: '#ffdea0'
  secondary-fixed-dim: '#f6be3b'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#920703'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Chivo
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Chivo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.2em
  stat-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: -0.02em
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style

The visual identity of the design system is rooted in the concepts of **Power, Discipline, and War**. It is designed to evoke the raw intensity of a Spartan phalanx, demanding peak performance and unwavering focus from the user. The atmosphere is epic, cinematic, and high-stakes, transforming a fitness routine into a legendary pursuit of excellence.

The design style is a hybrid of **High-Contrast Dark Mode** and **Tactile Skeuomorphism**. It utilizes heavy stone textures, oxidized metal finishes, and parchment-like surfaces to create a sense of ancient permanence. Elements are not merely "on" the screen; they are forged, carved, or cast. Visual cues draw from the "300" aesthetic—high contrast, dramatic lighting, and a relentless focus on strength.

## Colors

The palette is aggressive and authoritative, dominated by the visceral tones of battle and the prestige of ancient victory.

- **Primary (Blood Red):** Used for critical calls to action, active states, and highlighting progress. It represents the "fire" of the workout.
- **Secondary (Ancient Gold):** Used for borders, iconography, and decorative Greek meander patterns. It signifies achievement, hierarchy, and the "spoils of war."
- **Neutral (Deep Black/Stone):** The foundation of the UI. Backgrounds use `#0A0A0A` with subtle stone grain overlays to prevent a flat digital look.
- **Accent (Deep Crimson):** `#8B0000` is used for hover states and secondary buttons to provide depth without losing the aggressive tone.

## Typography

Typography is treated as if carved into stone or printed on thick parchment.

- **Headlines:** Utilize **Libre Caslon Text** for its authoritative, sharp serif qualities that mimic Trajan-style inscriptions. All major headlines should be treated with a slight text-shadow to imply depth.
- **Body:** **Chivo** provides a sharp, modern, and highly legible contrast to the decorative headlines, ensuring that workout data and instructions are easily digestible.
- **Labels & Stats:** **Space Grotesk** is used for technical data (reps, sets, heart rate) to provide a "tactical" feel that balances the ancient aesthetic with modern performance tracking.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy to maintain a structured, "fortress-like" appearance. 

- **Grid:** A 12-column grid on desktop with generous 24px gutters. Elements should feel weighted and deliberate, often centered to create a sense of monumental importance.
- **Rhythm:** Spacing is strictly based on 8px increments. 
- **Dividers:** Horizontal sections are separated by spear-shaped or sword-blade dividers rather than simple lines.
- **Margins:** Desktop margins are wide (64px) to allow the stone textures and background atmospheric effects to frame the content.

## Elevation & Depth

Depth in the design system is achieved through **Tonal Layers and Metallic Accents** rather than traditional soft shadows.

- **Surfaces:** The base layer is a dark stone texture. Secondary surfaces (cards, modals) use a slightly lighter `#1A1A1A` with a "brushed metal" or "weathered parchment" border.
- **Borders:** Instead of shadows, elevation is indicated by **Gold Inlays**. A 1px border of `#DAA520` suggests a raised, etched surface.
- **Inner Shadows:** Used on input fields and containers to create a "carved-in" look, suggesting the UI is etched into a temple wall.
- **Lighting:** Use a subtle top-down radial gradient (low opacity gold/white) to simulate torchlight hitting the UI elements.

## Shapes

The shape language is **Sharp and Angular**. There is no room for soft, friendly curves in a Spartan training camp.

- **Corners:** All primary containers, buttons, and inputs have 0px border radius (Sharp). This reinforces the "cut from stone" and "forged in iron" metaphor.
- **Decorative Clips:** Occasional use of 45-degree clipped corners (dog-ears) on cards to mimic the appearance of armor plates.
- **Icons:** Must be thick-stroked and angular. Shield shapes are used for badges, and spears/swords for directional indicators.

## Components

### Buttons
Primary buttons are high-fidelity "Metallic" slabs. They feature a linear gradient from `#CC0000` to `#8B0000`, a 1px Ancient Gold top border, and uppercase **Space Grotesk** text. On hover, the button should "glow" with a subtle red outer shadow.

### Cards
Cards represent "Orders" or "Feats." They use the `#1A1A1A` background with a Greek meander pattern (greca) subtly embossed in the header or footer. Borders are mandatory—either a weathered stone grey or a thin gold line.

### Input Fields
Inputs are recessed, "carved" into the stone background. Use a dark background with an inner shadow and a gold bottom-border that lights up when focused.

### Progress Bars (The "Phalanx" Bar)
Progress is tracked using a segmented bar. Each segment represents a "shield" in the line. As progress increases, the segments turn from a dull iron to a glowing Blood Red.

### Lists
Lists are separated by horizontal "Spear" dividers—thin lines with a triangular blade head on one side and a gold cap on the other.

### Badges/Achievements
Badges are always circular, mimicking the Spartan *Aspis* (shield). They feature gold metallic textures and high-contrast red iconography.