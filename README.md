## Check before Click - Scan before you click – Stay safe online

Idea:
A browser extension and dashboard that scans web pages in real-time to detect potentially unsafe links or buttons. It informs the user about the safety level of elements before interacting with them, using a combination of screen scanning and AI analysis.

Goal:
Prevent users from clicking on risky or malicious elements, reducing phishing, malware exposure, and unsafe online behavior.
## Problem Statements

1. Unaware User Actions
Users often click links, buttons, or interactive elements without knowing if they are safe, risking phishing, malware, or unwanted tracking.

2. Lack of Real-time Element Safety Feedback
Existing solutions only detect unsafe websites, not individual clickable elements. Users cannot know the safety of each button or link before interaction.

3. Complex Technical Tools
Most online security tools are too technical, showing raw OSINT data or alerts without actionable guidance.

4. Need for a Unified Dashboard
Users have no easy way to track unsafe interactions over time across websites.

5. Privacy and Security Challenges
Scanning content in real-time and routing through a proxy without leaking user data is complex.
## Objectives

- Provide real-time scanning of page elements for safety.

- Show instant feedback with a percentage-based risk indicator:

1. Safe: 0–30%

2. Risky: 31–70%

3. Blocked: 71–100%

- Enable element-level hover analysis, showing risk score next to buttons/links.

- Maintain a dashboard with:

1. Start/Stop extension

2. Summary of detection results (Safe, Risky, Blocked)

- Include logout functionality from the extension to redirect users to the dashboard.

## Key Features



| Feature                  | Description                            | Implementation                           |
| ------------------------ | -------------------------------------- | ---------------------------------------- |
| **Hover Risk Detection** | Show element-level risk score on hover | JS content scripts + backend API         |
| **Full Page Scan**       | Evaluate all page elements             | Extension scan + backend analysis        |
| **Risk Categories**      | Safe, Risky, Blocked                   | Score-based classification               |
| **Dashboard**            | Visual summary & start/stop extension  | Web dashboard with charts & buttons      |
| **Logout**               | Redirect from extension to dashboard   | Extension pop-up button event            |
| **Percentage Display**   | Show granular risk (0,0.1,0.2...)      | Backend returns float values             |

## Technologies

1. Frontend (Extension & Dashboard)

- Chrome/Firefox extension APIs

- HTML, CSS, JavaScript

- React/Vue for dashboard (optional)

2. Backend

- Node.js / Python Flask API

- AI/ML module for risk detection

3. Database: PostgreSQL

- Ensures privacy & anonymity

- Organized data storage



