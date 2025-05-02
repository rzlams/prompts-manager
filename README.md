# Prompts Manager

A powerful tool for organizing and managing LLM prompts and related development tasks using a file-based system.

## Features

- File-based prompt management system
- Markdown support for prompt definitions
- Tag-based organization
- Example management for each prompt
- Real-time search and filtering
- Automatic synchronization between filesystem and configuration

## Project Structure

```
prompts-manager/
├── api/           # Backend API server
├── app/           # Frontend Expo application
├── prompts/       # Prompt definition files
└── tasks/         # Project management documents
```

## Prerequisites

- Node.js >= 18
- Expo CLI
- Yarn (recommended) or npm

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd prompts-manager
   ```

2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd api
   yarn install

   # Install frontend dependencies
   cd ../app
   yarn install
   ```

3. Start the development servers:

   ```bash
   # Start backend server
   cd api
   yarn dev

   # Start Expo development server
   cd ../app
   yarn start
   ```

## Development

### Backend (API)

The backend is built with:

- Node.js
- Express
- TypeScript
- File-based storage system

### Frontend (App)

The frontend is built with:

- React Native
- Expo
- TypeScript
- React Navigation

## Testing

```bash
# Run backend tests
cd api
yarn test

# Run frontend tests
cd app
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
