Create responsive HTML webpages using raw custom CSS with the following requirements:

1. **CSS**: Use only custom CSS for styling leveraging classes and ids. Do not use any CSS proprocessor or .
2. **Placeholder for Images**: Use placeholder images from https://picsum.photos/.
2. **Placeholder for Icons**: Replace icons with a `<span>` element that has a red background (`bg-red-500`) to act as a placeholder.
3. **Background Simplification**: Ignore any gradients in the design's background. Use a white background (`bg-white`) instead.
4. **Hardcoded Data**: Hardcode all text, numbers, dates, and other data directly into the HTML.
5. **Component Identification**: Identify reusable components and repeat them as needed. Clearly mark the start and end of each component with comments. For example:
```html
<!-- ==========START EVENT_CARD COMPONENT========== -->
<div class="event-card">
  <p class="event-title">VS. Tigers</p>
  <p>
    <span>Mon Mar 24</span> · <span>6:45 PM</span>
  </p>
  <p class="event-tickets">10 Tickets Available</p>
  <p>
    <span>From</span>
    <span>$10</span>
    <span>to</span>
    <span>$100</span>
  </p>
  <span class="event-card-placeholder-image"></span>
</div>
<!-- ==========END EVENT_CARD COMPONENT========== -->
```
6. **CSS variables and theming**: Use the provided theme configurations and CSS variables:
```css
:root {
  /* 
  ===================
  COLOR SYSTEM
  ===================
  */
  
  /* Neutral Colors */
  --color-neutral-50: #ffffff;  /* White backgrounds */
  --color-neutral-100: #f8f9fa; /* Light gray backgrounds */
  --color-neutral-200: #e9ecef; /* Divider lines */
  --color-neutral-300: #dee2e6; /* Icons backgrounds */
  --color-neutral-400: #ced4da; /* Disabled text */
  --color-neutral-500: #adb5bd; /* Secondary text */
  --color-neutral-600: #6c757d; /* Body text */
  --color-neutral-700: #495057; /* Headings */
  --color-neutral-800: #343a40; /* Dark text */
  --color-neutral-900: #212529; /* Main text color */
  --color-neutral-950: #131722; /* Footer background */
  
  /* Primary Colors */
  --color-primary: #1e2a4a;      /* Primary dark blue */
  --color-primary-hover: #141d33; /* Darker blue for hover */
  --color-primary-active: #0b101d; /* Even darker for active state */
  
  /* Secondary Colors */
  --color-secondary: #00c2d9;      /* Accent teal/cyan */
  --color-secondary-hover: #00adc2; /* Darker teal for hover */
  --color-secondary-active: #0095a8; /* Even darker for active state */
  
  /* Success Colors */
  --color-success: #198754;      /* Green */
  --color-success-hover: #157347; /* Darker green for hover */
  --color-success-active: #126c43; /* Even darker for active state */
  
  /* Warning Colors */
  --color-warning: #ffc107;      /* Yellow */
  --color-warning-hover: #e0a800; /* Darker yellow for hover */
  --color-warning-active: #cc9a00; /* Even darker for active state */
  
  /* Danger Colors */
  --color-danger: #dc3545;      /* Red */
  --color-danger-hover: #c82333; /* Darker red for hover */
  --color-danger-active: #bd2130; /* Even darker for active state */
  
  /* Alternative Colors */
  --color-alternative-background: #121212; /* Dark mode background */
  --color-alternative-text: #e0e0e0;       /* Light text for dark mode */
  
  /* 
  ===================
  TYPOGRAPHY SYSTEM
  ===================
  */
  
  /* Font Families */
  --font-primary: "Inter", sans-serif; /* Main body text and UI */
  --font-secondary: "Helvetica Neue", "Arial", sans-serif; /* Alternative font */
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px - Small captions, footnotes */
  --text-sm: 0.875rem;     /* 14px - Secondary text, labels */
  --text-base: 1rem;       /* 16px - Body text */
  --text-lg: 1.125rem;     /* 18px - Subheadings */
  --text-xl: 1.25rem;      /* 20px - Small headings */
  --text-2xl: 1.5rem;      /* 24px - Section headers */
  --text-3xl: 1.875rem;    /* 30px - Page titles */
  --text-4xl: 2.25rem;     /* 36px - Main headings */
  --text-5xl: 3rem;        /* 48px - Hero headings */
  --text-6xl: 3.75rem;     /* 60px - Display text */
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-none: 1;        /* For headings */
  --leading-tight: 1.25;    /* For compact text */
  --leading-snug: 1.375;    /* For subheadings */
  --leading-normal: 1.5;    /* For body text */
  --leading-relaxed: 1.625; /* For comfortable reading */
  --leading-loose: 2;       /* For spacious text */
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em; /* Tightened headings */
  --tracking-tight: -0.025em;  /* Slightly tightened text */
  --tracking-normal: 0;        /* Normal spacing */
  --tracking-wide: 0.025em;    /* Slightly expanded text */
  --tracking-wider: 0.05em;    /* Expanded small caps */
  --tracking-widest: 0.1em;    /* Maximum expansion for emphasis */
  
  /* 
  ===================
  SPACING SYSTEM
  ===================
  */
  
  /* Base Spacing Units */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
  --space-32: 8rem;    /* 128px */
  --space-40: 10rem;   /* 160px */
  --space-48: 12rem;   /* 192px */
  --space-56: 14rem;   /* 224px */
  --space-64: 16rem;   /* 256px */
  
  /* 
  ===================
  LAYOUT SYSTEM
  ===================
  */
  
  /* Containers */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;   /* Small devices */
  --breakpoint-md: 768px;   /* Medium devices */
  --breakpoint-lg: 1024px;  /* Large devices */
  --breakpoint-xl: 1280px;  /* Extra large devices */
  --breakpoint-2xl: 1536px; /* 2X Extra large devices */
  
  /* 
  ===================
  EFFECT SYSTEM
  ===================
  */
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.25rem;    /* 4px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;   /* Fully rounded (circles) */
  
  /* Box Shadows */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  
  /* Border Widths */
  --border-none: 0;
  --border-thin: 1px;
  --border-normal: 2px;
  --border-thick: 4px;
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
  --transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --transition-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --transition-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-Index Scale */
  --z-0: 0;
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-auto: auto;
}
```

### Development Process (Mobile First Design):
1. **Evaluate Designs**: Review both mobile and desktop designs to understand the component styles for each.
2. **Mobile Design Implementation**: Write the HTML code for the mobile design first.
3. **Desktop Design Implementation**: After refining the mobile design, write the HTML code for the desktop design.

### Example Output:
```html
<body class="bg-white">
  <main class="cards-grid">
    <!-- ==========START EVENT_CARD COMPONENT========== -->
    <div class="event-card">
      <p class="event-title">VS. Tigers</p>
      <p>
        <span>Mon Mar 24</span> · <span>6:45 PM</span>
      </p>
      <p class="event-tickets">10 Tickets Available</p>
      <p>
        <span>From</span>
        <span>$10</span>
        <span>to</span>
        <span>$100</span>
      </p>
      <span class="event-card-placeholder-image"></span> <!-- Placeholder for image -->
    </div>
    <!-- ==========END EVENT_CARD COMPONENT========== -->

    <!-- ==========START EVENT_CARD COMPONENT========== -->
    <div class="event-card">
      <p class="event-title">VS. Tigers</p>
      <p>
        <span>Mon Mar 24</span> · <span>6:45 PM</span>
      </p>
      <p class="event-tickets">10 Tickets Available</p>
      <p>
        <span>From</span>
        <span>$10</span>
        <span>to</span>
        <span>$100</span>
      </p>
      <span class="event-card-placeholder-image"></span> <!-- Placeholder for image -->
    </div>
    <!-- ==========END EVENT_CARD COMPONENT========== -->
  </main>
</body>
```

**NOTES**:
- Ensure all components are responsive and adapt to different screen sizes using Tailwind's responsive utilities (e.g., sm:, md:, lg:).
- Use the provided CSS theme configurations and variables for consistent styling across the project.
- Pay attention to all the details that change between mobile and desktop designs: text, font size, font weight, spaces, etc.

**IMPORTANT**: The output must be one HTML file per view/page and only one CSS file with all the styles shared across all the views/pages.

