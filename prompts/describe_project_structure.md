I need to describe the structure of this project to an LLM. Please, understand the folder structure of this project and document it. Read files you consider relevant to add more context. Output only the rules in markdown format. Here is an example of the desired output that describes other project's strucutre:

```markdown
This project is a backoffice implemented with Angular 17. It is tructured using Angular modules and components. It utilizes SCSS for styling and has distinct configurations for different environments (dev, pre, pro, local).

# Folder Structure

- **Root Directory**: Contains configuration files for Angular (`angular.json`), TypeScript (`tsconfig.*.json`), linting (`.eslintrc.json`), formatting (`.prettierrc`), git (`.gitignore`), and package management (`package.json`).
- `src/`: The main source code directory.
  - `index.html`: The main HTML entry point.
  - `main.ts`: The main TypeScript entry point, bootstrapping the Angular application.
  - `styles.scss`: Global application styles.
  - `assets/`: Static assets like images, fonts, and icons.
  - `environments/`: Environment-specific configuration files.
  - `app/`: Contains the core application logic, modules, and components.
    - `app.component.*`: The root application component.
    - `app.module.ts`: The root application module.
    - `app-routing.module.ts`: Defines the main application routes.
    - `auth/`: Contains components related to authentication (e.g., `login`, `restore-password`). This seems to be the public part of the application.
    - `private/`: Contains components and modules accessible only after authentication, protected by `AuthGuard`.
      - `private.component.*`: The main layout component for the private section.
      - `private.guard.ts`: The route guard protecting private routes.
      - `private.module.ts`: The main module for the private section.
      - `layout/`: Shared layout components for the private section (e.g., `header`, `sidebar`).
      - `services/`: Shared services used within the private section (e.g., `auth.service`, `configuration.service`).
      - `models/`: Shared data models for the private section.
      - `interceptors/`: HTTP interceptors for the private section.
      - **Feature Modules** (e.g., `dashboard/`, `events/`, `users/`, `transactions/`, etc.): Each represents a distinct section/feature of the private application. Typically contains:
        - `*.component.*`: The main component for the feature.
        - `*.module.ts`: The Angular module for the feature.
        - `services/`: Feature-specific services.
        - `resolvers/`: Route resolvers to fetch data before activating the route.
        - `models/`: Feature-specific data models.
        - `modals/`: Components used as modals within the feature.
    - `not-found/`: Component displayed for invalid routes.
  - `styles/`: Contains partial SCSS files for more organized styling (_colors.scss, _modals.scss, etc.).
```

IMPORTANT: The output should be clear and concise because it will be provided to an LLM on start a new task.
