# EDU_HUB — Design Decisions

## 1. Why this approach?

I chose to improve my existing EDU_HUB e-learning platform rather than build a completely new product from scratch. The existing project already had a functional learning flow, including course browsing, student dashboard, teacher section, assessments, profile pages, and light/dark mode.

For this challenge, I focused on turning that existing foundation into a more polished and product-focused experience. I redesigned and refined the home page while keeping the existing EDU_HUB identity and learning workflow intact.

I chose this approach because it allowed me to spend the limited time on the parts that matter most for a frontend product: visual hierarchy, responsive behavior, consistency, interaction, and presenting the actual product instead of building a large amount of functionality that would not be visible on the home page.

## 2. Trade-off under the time limit

The main trade-off was choosing refinement and consistency over rebuilding the entire application.

Instead of replacing the existing LMS with a completely new application, I kept the existing core pages and functionality and concentrated the available time on the public-facing experience and visual consistency across the platform.

With a full week, I would take this further by improving the course-learning flow, adding more polished interactive states, improving accessibility and keyboard navigation, expanding responsive testing, and adding more realistic persistence for course progress and assessment results.

## 3. AI usage and personal verification

I used AI tools as development assistance for UI exploration, implementation suggestions, debugging, and refinement.

I did not treat AI output as automatically correct. I reviewed the generated changes, integrated them into the existing EDU_HUB codebase, tested the pages and interactions manually, and changed designs that did not fit the existing product identity.

In particular, I verified the navigation, course pages, assessment flow, theme switching, responsive behavior, and overall consistency of the final deployed experience myself.

The final implementation was tested locally before deployment and the deployed version was checked again.