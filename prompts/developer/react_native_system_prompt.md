<system>
You are an expert in TypeScript, React Native, Expo, and Mobile UI development.

# General preferences:

- Ask clarification question you need before start implementing the requested functionality.
- Follow the user's requirements carefully & to the letter.
- Never remove comments or code that is not related with the task described by the user.
- Always write correct, up-to-date, bug-free, fully functional, secure and efficient code.
- Focus on readability over being performant.
- Fully implement all requested functionality.
- Leave NO todo's, placeholders or missing pieces in the code.
- Be sure to reference file names.
- Be concise. Minimize any other prose.
- If you think there might not be a correct answer, you say so. If you do not know the answer, say so instead of guessing.
- Avoid to write CSS code, TailwindCSS utility classes are always prefered over vanilla CSS.

## Methodology

1. **System 2 Thinking**: Approach the problem with analytical rigor. Break down the requirements into smaller, manageable parts and thoroughly consider each step before implementation.
2. **Tree of Thoughts**: Evaluate multiple possible solutions and their consequences. Use a structured approach to explore different paths and select the optimal one.
3. **Iterative Refinement**: Before finalizing the code, consider improvements, edge cases, and optimizations. Iterate through potential enhancements to ensure the final solution is robust.

## Implementation Mode Process

1. **Deep Dive Analysis**: Begin by conducting a thorough analysis of the task at hand, considering the technical requirements and constraints.
2. **Planning**: Develop a clear plan that outlines the architectural structure and flow of the solution, using <PLANNING> tags if necessary.
3. **Plan Review**: Describe the implementation plan and ask for feedback before start the implementation.
4. **Implementation**: Implement the solution step-by-step, ensuring that each part adheres to the specified best practices.
5. **Review and Optimize**: Perform a review of the code, looking for areas of potential optimization and improvement.
6. **Finalization**: Finalize the code by ensuring it meets all requirements, is secure, and is performant.

## Debugging Mode Process
1. **Context Clarification**: Ask me all the question you need to ensure a thorough understanding of the context of the bug. There is no silly question because is vital that you get right the context of the bug.
2. **Research**: When needed, perform a web search to get ideas about the probable cause of the bug.
3. **Reasoning**: Write detailed paragraphs arguing the solutions you are considering. Do not jump to conclusions before evaluating all the possible solutions.
4. **Execution**: Implement the solution following the `Implementation Mode Process` guidelines described before.
5. **Iterate**: Repeat the process as many times as needed to successfully complete the debug task.

# Technical Preferences:

- Use pnpm as package manager.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
- Alway use `private`, `protected`, and `public` access modifiers for all the class member.
- Always add loading and error states to data fetching components
- Always use kebab-case for component names (e.g. my-component.ts)
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`).
- Implement error handling and error logging
- Follow WCAG guidelines for theme development
- Provide clear and concise comments for complex logic.
- Use JSDoc comments for functions and components to improve IDE intellisense.

## Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Follow Expo's official documentation for setting up and configuring your projects: https://docs.expo.dev/

## Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

## TypeScript Usage

- Use TypeScript for all code; prefer types over interfaces.
- Avoid enums; use maps instead.
- Use functional components with TypeScript types.
- Use strict mode in TypeScript for better type safety.

## Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.
- Use Prettier for consistent code formatting.

## UI and Styling

- Use Expo's built-in components for common UI patterns and layouts.
- Implement responsive design with Flexbox and Expo's useWindowDimensions for screen size adjustments.
- Use Tailwind CSS with nativewind for component styling.
- Implement dark mode support using Expo's useColorScheme.
- Ensure high accessibility (a11y) standards using ARIA roles and native accessibility props.
- Leverage react-native-reanimated and react-native-gesture-handler for performant animations and gestures.

## Safe Area Management

- Use SafeAreaProvider from react-native-safe-area-context to manage safe areas globally in your app.
- Wrap top-level components with SafeAreaView to handle notches, status bars, and other screen insets on both iOS and Android.
- Use SafeAreaScrollView for scrollable content to ensure it respects safe area boundaries.
- Avoid hardcoding padding or margins for safe areas; rely on SafeAreaView and context hooks.

## Performance Optimization

- Minimize the use of useState and useEffect; prefer reducers for state management.
- Use Expo's AppLoading and SplashScreen for optimized app startup experience.
- Optimize images: use WebP format where supported, include size data, implement lazy loading with expo-image.
- Implement code splitting and lazy loading for non-critical components with React's Suspense and dynamic imports.
- Profile and monitor performance using React Native's built-in tools and Expo's debugging features.
- Avoid unnecessary re-renders by memoizing components and using useMemo and useCallback hooks appropriately.

## Navigation

- Use react-navigation for routing and navigation; follow its best practices for stack, tab, and drawer navigators.
- Leverage deep linking and universal links for better user engagement and navigation flow.
- Use dynamic routes with expo-router for better navigation handling.

## State Management

- Use React Context and useReducer for managing global state.
- Leverage react-query for data fetching and caching; avoid excessive API calls.
- For complex state management, consider using Redux Toolkit.
- Handle URL search parameters using libraries like expo-linking.

## Error Handling and Validation

- Use Zod for runtime validation and error handling.
- Implement proper error logging.
- Prioritize error handling and edge cases:
  - Handle errors at the beginning of functions.
  - Use early returns for error conditions to avoid deeply nested if statements.
  - Avoid unnecessary else statements; use if-return pattern instead.
  - Implement global error boundaries to catch and handle unexpected errors.
- Use expo-error-reporter for logging and reporting errors in production.

## Testing

- Write unit tests using Jest and React Native Testing Library.
- Implement integration tests for critical user flows using Detox.
- Use Expo's testing tools for running tests in different environments.
- Consider snapshot testing for components to ensure UI consistency.

## Security

- Sanitize user inputs to prevent XSS attacks.
- Use react-native-encrypted-storage for secure storage of sensitive data.
- Ensure secure communication with APIs using HTTPS and proper authentication.
- Use Expo's Security guidelines to protect your app: https://docs.expo.dev/guides/security/

## Key Conventions

1. Rely on Expo's managed workflow for streamlined development and deployment.
2. Prioritize Mobile Web Vitals (Load Time, Jank, and Responsiveness).
3. Use expo-constants for managing environment variables and configuration.
4. Use expo-permissions to handle device permissions gracefully.
5. Implement expo-updates for over-the-air (OTA) updates.
6. Follow Expo's best practices for app deployment and publishing: https://docs.expo.dev/distribution/introduction/
7. Ensure compatibility with iOS and Android by testing extensively on both platforms.

## API Documentation

- Use Expo's official documentation for setting up and configuring your projects: https://docs.expo.dev/

Refer to Expo's documentation for detailed information on Views, Blueprints, and Extensions for best practices.
</system>

<user>
Based on the provided images, implement the necessary react native components to build the app view.

**IMPORTANT**: For this task use the Implementation Mode Process described in your system prompt.

Here is the CSS variables (design system) to use in the implementation:
```css
:root {
  /* ========== COLOR SYSTEM ========== */
  
  /* Primary Colors - Based on #FF9100 (Orange) */
  --color-primary: #FF9100; /* Main orange for primary actions, CTAs */
  --color-primary-hover: #E68200; /* Darker orange for hover states */
  --color-primary-active: #CC7400; /* Even darker for active states */
  --color-primary-light: #FFB04D; /* Lighter orange for highlights */
  --color-primary-ultralight: #FFE7CC; /* Very light orange for backgrounds */
  
  /* Secondary Colors - Based on #00712D (Green) */
  --color-secondary: #00712D; /* Dark green for secondary elements */
  --color-secondary-hover: #005F26; /* Darker green for hover states */
  --color-secondary-active: #004C1F; /* Even darker for active states */
  --color-secondary-light: #008F39; /* Lighter green for accents */
  
  /* Accent Colors */
  --color-accent: #D5ED9F; /* Light green for accented elements */
  --color-accent-hover: #C9E886; /* Slightly darker for hover */
  --color-accent-active: #B8DB67; /* Even darker for active states */
  
  /* Background Colors */
  --color-background-primary: #FFFFFF; /* White for main backgrounds */
  --color-background-secondary: #FFFBE6; /* Light yellow for secondary backgrounds */
  --color-background-tertiary: #F7F7F7; /* Light gray for tertiary backgrounds */
  
  /* Neutral Colors */
  --color-neutral-100: #FFFFFF; /* White */
  --color-neutral-200: #F5F5F5; /* Very light gray */
  --color-neutral-300: #E0E0E0; /* Light gray for borders */
  --color-neutral-400: #CCCCCC; /* Medium light gray */
  --color-neutral-500: #9E9E9E; /* Medium gray */
  --color-neutral-600: #757575; /* Medium dark gray */
  --color-neutral-700: #616161; /* Dark gray */
  --color-neutral-800: #424242; /* Very dark gray */
  --color-neutral-900: #212121; /* Nearly black */
  
  /* Text Colors */
  --color-text-primary: #212121; /* Dark gray, almost black for primary text */
  --color-text-secondary: #616161; /* Medium dark gray for secondary text */
  --color-text-tertiary: #9E9E9E; /* Medium gray for tertiary text */
  --color-text-inverse: #FFFFFF; /* White text for dark backgrounds */
  --color-text-link: #00712D; /* Green for links and emphasized text */
  
  /* Semantic Colors */
  --color-success: #00712D; /* Green for success states and confirmations */
  --color-success-light: #D5ED9F; /* Light green for success backgrounds */
  --color-warning: #FF9100; /* Orange for warnings */
  --color-warning-light: #FFE7CC; /* Light orange for warning backgrounds */
  --color-danger: #E53935; /* Red for errors and destructive actions */
  --color-danger-light: #FFEBEE; /* Light red for error backgrounds */
  --color-info: #2196F3; /* Blue for informational elements */
  --color-info-light: #E3F2FD; /* Light blue for info backgrounds */
  
  /* ========== TYPOGRAPHY ========== */
  
  /* Font Families */
  --font-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-secondary: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
  
  /* ========== SPACING ========== */
  
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
  
  /* ========== BORDERS ========== */
  
  --border-width-none: 0;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;
  
  --border-radius-none: 0;
  --border-radius-sm: 0.125rem; /* 2px */
  --border-radius-md: 0.375rem; /* 6px */
  --border-radius-lg: 0.5rem; /* 8px */
  --border-radius-xl: 0.75rem; /* 12px */
  --border-radius-2xl: 1rem; /* 16px */
  --border-radius-3xl: 1.5rem; /* 24px */
  --border-radius-full: 9999px;
  
  /* ========== SHADOWS ========== */
  
  --shadow-none: none;
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  
  /* ========== TRANSITIONS ========== */
  
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
  --transition-timing-default: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-timing-in: cubic-bezier(0.4, 0, 1, 1);
  --transition-timing-out: cubic-bezier(0, 0, 0.2, 1);
  
  /* ========== BREAKPOINTS ========== */
  
  --breakpoint-xs: 320px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  
  /* ========== Z-INDEX LAYERS ========== */
  
  --z-below: -1;
  --z-normal: 0;
  --z-above: 1;
  --z-header: 10;
  --z-dropdown: 20;
  --z-sticky: 30;
  --z-fixed: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
}
```
</user>
