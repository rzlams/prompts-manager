As for dark mode interfaces, the same color keys are used. The only difference comes from color scales that are almost reversed and with many grey tokens to provide a good reading experience.


Absolutely! Creating a dark theme based on a light theme (or vice versa) is a common task, and there are established methodologies to ensure consistency and accessibility. Below is a step-by-step framework to help you systematically create a dark theme from a light theme design:

---

### **1. Understand the Purpose of Dark Theme**
A dark theme isn’t just about inverting colors. It should:
- Reduce eye strain in low-light environments.
- Maintain readability and accessibility.
- Preserve the visual hierarchy and brand identity.

---

### **2. Analyze the Light Theme**
Before creating a dark theme, thoroughly analyze the light theme:
- **Primary Colors**: Identify the primary, secondary, and accent colors.
- **Background Colors**: Note the background and surface colors.
- **Text Colors**: Identify text colors for headings, body, and secondary text.
- **Border Colors**: Note border and divider colors.
- **Component Colors**: Analyze colors for buttons, inputs, cards, etc.
- **Shadows and Elevation**: Note how shadows are used to create depth.

---

### **3. Define a Color Mapping Strategy**
Map light theme colors to their dark theme counterparts. Here’s a recommended approach:

#### **Background and Surface Colors**
- Light backgrounds (e.g., white) → Dark backgrounds (e.g., dark gray or black).
- Light surface colors (e.g., light gray) → Dark surface colors (e.g., darker gray).

#### **Text Colors**
- Dark text (e.g., black or dark gray) → Light text (e.g., white or light gray).
- Secondary text (e.g., gray) → Lighter gray or muted colors.

#### **Primary and Accent Colors**
- Primary and accent colors can remain the same or be slightly adjusted for better contrast in dark mode.
- Avoid overly bright colors that may cause eye strain.

#### **Borders and Dividers**
- Light borders (e.g., light gray) → Dark borders (e.g., dark gray).

#### **Shadows and Elevation**
- Replace shadows with lighter or darker overlays to maintain depth without bright shadows.

---

### **4. Use CSS Variables for Theming**
Define your light and dark themes using CSS variables. This makes it easy to switch between themes.

#### Example:
```css
:root {
  /* Light Theme */
  --color-primary: #3498db;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-border: #e9ecef;
  --color-shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  /* Dark Theme */
  --color-primary: #1e90ff;
  --color-background: #121212;
  --color-surface: #1e1e1e;
  --color-text-primary: #ffffff;
  --color-text-secondary: #adb5bd;
  --color-border: #2e2e2e;
  --color-shadow: rgba(255, 255, 255, 0.1);
}
```

---

### **5. Ensure Accessibility**
Use tools to check contrast ratios and ensure readability:
- **Contrast Ratio**: Text should have a contrast ratio of at least 4.5:1 against its background (WCAG guidelines).
- **Color Blindness**: Ensure colors are distinguishable for users with color vision deficiencies.
- **Tools**: Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [Adobe Color](https://color.adobe.com/).

---

### **6. Test Across Components**
Apply the dark theme to all components and test for consistency:
- Buttons, inputs, cards, modals, etc.
- Hover, active, and disabled states.
- Charts, graphs, and data visualizations.

---

### **7. Add a Theme Toggle**
Allow users to switch between light and dark themes. Use JavaScript to toggle a `data-theme` attribute on the `<html>` or `<body>` element.

#### Example:
```html
<button id="theme-toggle">Toggle Theme</button>

<script>
  const toggleButton = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  toggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
  });
</script>
```

---

### **8. Iterate and Refine**
- Gather feedback from users.
- Test in different environments (e.g., low-light, bright-light).
- Continuously refine the dark theme for better usability.

---

### **9. Recommended Tools and Resources**
- **Figma/Adobe XD**: Use design tools to preview dark themes.
- **CSS Preprocessors**: Use SASS or LESS to manage themes.
- **Style Dictionary**: A tool for creating design tokens for multiple themes.
- **Storybook**: Test and document components in both themes.

---

### **Example: Full Light-to-Dark Theme Mapping**
Here’s a complete example of mapping a light theme to a dark theme:

#### Light Theme:
```css
:root {
  --color-primary: #3498db;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-border: #e9ecef;
  --color-shadow: rgba(0, 0, 0, 0.1);
}
```

#### Dark Theme:
```css
[data-theme="dark"] {
  --color-primary: #1e90ff;
  --color-background: #121212;
  --color-surface: #1e1e1e;
  --color-text-primary: #ffffff;
  --color-text-secondary: #adb5bd;
  --color-border: #2e2e2e;
  --color-shadow: rgba(255, 255, 255, 0.1);
}
```

---

By following this methodology, you can create a dark theme that is consistent, accessible, and visually appealing, even when starting with only a light theme design.
