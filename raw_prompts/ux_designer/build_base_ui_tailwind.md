Create a responsive HTML webpage using Tailwind CSS utility classes with the following requirements:

1. **Tailwind CSS Utility Classes**: Use only Tailwind CSS utility classes for styling. Do not write custom CSS.
2. **Placeholder for Images**: Use placeholder images from https://picsum.photos/.
2. **Placeholder for Icons**: Replace icons with a `<span>` element that has a red background (`bg-red-500`) to act as a placeholder.
3. **Background Simplification**: Ignore any gradients in the design's background. Use a white background (`bg-white`) instead.
4. **Hardcoded Data**: Hardcode all text, numbers, dates, and other data directly into the HTML.
5. **Component Identification**: Identify reusable components and repeat them as needed. Clearly mark the start and end of each component with comments. For example:
```html
<!-- ==========START EVENT_CARD COMPONENT========== -->
<div class="text-xs">
    <p class="font-bold">VS. Tigers</p>
    <p>
    <span>Mon Mar 24</span> · <span>6:45 PM</span>
    </p>
    <p class="font-bold">10 Tickets Available</p>
    <p>
    <span>From</span>
    <span class="font-bold">$10</span>
    <span>to</span>
    <span class="font-bold">$100</span>
    </p>
</div>
<!-- ==========END EVENT_CARD COMPONENT========== -->
```
6. **Tailwind CSS v4 Configuration**: Use the provided Tailwind CSS v4 configuration:
```css
@import 'tailwindcss';
@import 'tailwindcss-animated';

@theme inline {
  /* Color System */
  
  /* Neutral Colors */
  --color-neutral-100: #FFFFFF; /* White background */
  --color-neutral-200: #F5F7FA; /* Light gray background */
  --color-neutral-300: #E6E8EB; /* Border color, dividers */
  --color-neutral-400: #A0A8B0; /* Placeholder text */
  --color-neutral-500: #6C7680; /* Secondary text */
  --color-neutral-900: #1A1A1A; /* Primary text */
  
  /* Primary Colors - Orange Theme */
  --color-primary: #FF5B14; /* Main orange */
  --color-primary-hover: #E94F0C; /* Darker orange for hover */
  --color-primary-active: #D3470B; /* Even darker for active state */
  --color-primary-light: #FFF1EB; /* Light orange background */
  
  /* Secondary Colors */
  --color-secondary: #5C93D8; /* Blue accent */
  --color-secondary-hover: #4A7FBE; /* Darker blue for hover */
  --color-secondary-light: #EBF2FA; /* Light blue background */
  
  /* Semantic Colors */
  --color-success: #3D9A50; /* Green for secure checkout */
  --color-success-light: #EAFAEC; /* Light green background */
  --color-info: #5C93D8; /* Blue for information */
  --color-info-light: #EBF2FA; /* Light blue background */
  --color-warning: #F5AD41; /* Amber for warnings */
  --color-warning-light: #FFF8EB; /* Light amber background */
  --color-danger: #E53E3E; /* Red for errors */
  --color-danger-light: #FDEAEA; /* Light red background */
  
  /* Typography */
  --font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Spacing */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;  /* 4px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 1rem;     /* 16px */
  --radius-xl: 1.5rem;   /* 24px */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}
```

### Development Process (Mobile First Design):
1. **Evaluate Designs**: Review both mobile and desktop designs to understand the component styles for each.
2. **Mobile Design Implementation**: Write the HTML code for the mobile design first.
3. **Desktop Design Implementation**: After refining the mobile design, write the HTML code for the desktop design.

### Example Output:
```html
<body class="bg-white">
  <main class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
    <!-- ==========START EVENT_CARD COMPONENT========== -->
    <div class="text-xs border border-gray-200 p-4 rounded-lg">
      <p class="font-bold">VS. Tigers</p>
      <p>
        <span>Mon Mar 24</span> · <span>6:45 PM</span>
      </p>
      <p class="font-bold">10 Tickets Available</p>
      <p>
        <span>From</span>
        <span class="font-bold">$10</span>
        <span>to</span>
        <span class="font-bold">$100</span>
      </p>
      <span class="block bg-red-500 h-20 w-full mt-2"></span> <!-- Placeholder for image -->
    </div>
    <!-- ==========END EVENT_CARD COMPONENT========== -->

    <!-- ==========START EVENT_CARD COMPONENT========== -->
    <div class="text-xs border border-gray-200 p-4 rounded-lg">
      <p class="font-bold">VS. Tigers</p>
      <p>
        <span>Mon Mar 24</span> · <span>6:45 PM</span>
      </p>
      <p class="font-bold">10 Tickets Available</p>
      <p>
        <span>From</span>
        <span class="font-bold">$10</span>
        <span>to</span>
        <span class="font-bold">$100</span>
      </p>
      <span class="block bg-red-500 h-20 w-full mt-2"></span> <!-- Placeholder for image -->
    </div>
    <!-- ==========END EVENT_CARD COMPONENT========== -->
  </main>
</body>
```

**NOTES**:
- Ensure all components are responsive and adapt to different screen sizes using Tailwind's responsive utilities (e.g., sm:, md:, lg:).
- Use the provided Tailwind CSS configuration for consistent styling across the project.
- Pay attention to all the details that change between mobile and desktop designs: text, font size, font weight, spaces, etc.

**IMPORTANT**: The output must be one file with the UI HTML code with Tailwind CSS V4 variables in the `style` tag.

