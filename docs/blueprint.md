# **App Name**: Blue Screen Simulator

## Core Features:

- Dual OS Simulation: Simulate catastrophic failures on both Windows 11 and macOS Sequoia, switchable via a debug-style tabbed interface.
- The Stall - Update Lock Mode: Implement a full-screen, never-ending update screen that induces boredom. The simulated update process is extremely slow with deceptive progress behavior, including long pauses and small percentage jumps.
- The Eject - Crash Mode: Create an instant and violent transition into a failure state, displaying an authentic BSOD (Windows 11) or Kernel Panic screen (macOS Sequoia).
- Immersion Logic: Implement auto-fullscreen on first click, re-enter fullscreen if exited, hide the cursor, and capture keyboard input. Optionally include subtle system audio like fan hum and glitch ticks to enhance the immersive experience.
- Safety Hatch: Incorporate an invisible triple-tap escape mechanism to instantly exit fullscreen and restore the normal UI.
- Convincing Simulation: Achieve pixel-perfect replication of real OS screens using exact system fonts, spacing, colors, and phrasing to create a visually and psychologically persuasive simulation of an operating system failure.
- Rickroll Integration: Display a fake QR code in the BSOD that redirects to Rick Astley's "Never Gonna Give You Up" on scanning.

## Style Guidelines:

- Primary color: Matrix green (#00FF00) to evoke a dark, industrial, hostile, high-contrast mood.
- Background color: Black (#000000) for a stark, high-contrast aesthetic.
- Accent color: A slightly lighter shade of green (#32CD32) for subtle highlights and details.
- Font: System monospaced font to replicate authentic OS screens; crucial for achieving a pixel-perfect simulation, especially in the BSOD/Kernel Panic screens.
- No iconography; focus on replicating the exact look and feel of the OS failure screens.
- Pixel-perfect replication of actual OS layout elements for the simulated screens. Careful adherence to system fonts, spacing and phrasing of text, to match the OS look and feel as closely as possible. This goal of accuracy also informs spacing of UI elements and typography, to simulate an authentic OS look.
- Implement slow progress bar behavior that hangs at 99% during the "Stall" mode.