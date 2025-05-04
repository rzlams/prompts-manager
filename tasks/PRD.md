# Prompt Manager - Product Requirements Document

**Version:** 1.0
**Date:** 2025-05-02

## 1. Overview

This document outlines the requirements for the **Prompt Manager**, a web application designed for personal use to efficiently store, manage, tag, and retrieve prompts and their associated usage examples.

The primary goal is to provide a simple, intuitive interface for organizing prompts while leveraging a file-based storage system that is inherently compatible with Git for version control (managed manually by the user). The application aims to solve the problem of scattered prompts and examples by centralizing them in a structured, searchable format.

**Target User:** Individuals (developers, prompt engineers, writers, etc.) who regularly create and reuse prompts and need a personal system to organize them effectively.

**Value Proposition:** A dedicated, easy-to-use tool for personal prompt organization that keeps data in a user-controlled, Git-friendly format.

## 2. Core Features

### 2.1. Prompt Storage & File Structure

- **Filesystem-Based:** Prompts and examples are stored directly on the user's filesystem within a designated root directory.
- **Directory Structure:**

  - A main `prompts/` directory holds all prompt data.
  - Each prompt resides in its own subdirectory within `prompts/`, named using the prompt's unique name in `snake_case` format (e.g., `prompts/create_summary/`).
  - Inside each prompt's directory:

    - `prompt.md`: A Markdown file containing the main text of the prompt, with the following structure:

      ```markdown
      description: a prompt description
      tags: tag1, tag2, tag3

      ---

      the content of the prompt
      ```

      - All lines before the first `---` are considered the file header (metadata).
      - Each header line must be in the format `key: value` (case-insensitive key, e.g., `description`, `tags`).
      - The content of the prompt is everything after the first `---`.
      - The prompt name is the name of the folder containing the markdown file.

    - `example_N.md`: Markdown files containing individual usage examples, where `N` is a sequential integer (e.g., `example_1.md`, `example_2.md`).

  - Subdirectories _within_ a prompt's folder (e.g., `prompts/create_summary/images/`) are ignored by the application's scanning logic.

- **Source of Truth:** The existence of folders and `.md` files within the `prompts/` directory structure, and the content/metadata of each markdown file, is the definitive **source of truth** for which prompts and examples exist.

### 2.2. Metadata Management (`config.json`)

- **Central Index:** A JSON file (named `config.json`, located adjacent to the `prompts/` directory) serves as an index and metadata store.
- **Structure:** See Section 4.2 Data Models for the detailed JSON structure.
- **Content:** Stores:
  - A global list of defined tags.
  - Metadata for each prompt and example file found in the filesystem (description, assigned tags).
  - A top-level `updatedAt` timestamp (ISO 8601 format) indicating the last modification time of the `config.json` file.
- **Derivation:** The `prompts` section of `config.json` is derived and updated based on scanning the `prompts/` directory and parsing the header of each markdown file (see 2.6 Data Synchronization).

### 2.3. Tagging System

- **Tag Definition:** Tags are simple strings, constrained to `snake_case` format (lowercase letters, numbers, underscores) with no spaces. Tags are case-insensitive for uniqueness checks but stored in the case they were created.
- **Global Tag List:** The `config.json` file maintains a global array (`tags`) of all unique tags defined in the system.
- **Tag Management UI:**
  - A dedicated "Manage Tags" modal allows users to:
    - View all existing tags.
    - Create new tags (validating uniqueness and format).
    - Delete existing tags (with a confirmation prompt).
- **Tag Assignment:** Users assign tags to prompts and examples via a multi-select dropdown interface within the Create/Edit Prompt modal.
- **Tag Deletion Cascade:** Deleting a tag via the management modal must remove the tag string from the global `tags` list _and_ from the `tags` array of any prompt or example entries using it within the `prompts` section of `config.json`.

### 2.4. Example Management

- **Creation:** Examples are created alongside prompts within the Create/Edit Prompt modal.
- **Storage:** Each example's content is stored in its dedicated `example_N.md` file.
- **Metadata:** Description and assigned tags for each example are stored in `config.json`.
- **Naming:** Example filenames (`example_N.md`) are generated automatically by the application, using the next available sequential integer within that prompt's folder.
- **Association:** Examples are inherently linked to their parent prompt via the folder structure.

### 2.5. Search Functionality

- **Scope:** Search operates on the metadata stored within the `config.json` file only. It does _not_ search the content of `.md` files.
- **Targets:** Users can search for prompts based on:
  - Prompt Name (keys in the `prompts` object, e.g., `create_summary`).
  - Prompt Description.
  - Example Descriptions.
  - Assigned Tags (matching prompts/examples that have the tag).
- **UI:** A search bar is provided at the top of the sidebar for initiating searches. Results filter the list of prompts displayed in the sidebar.

### 2.6. Data Synchronization

- **Trigger:** Synchronization occurs automatically on application startup and can be triggered manually via a "Sync" button in the UI.
- **Process:**
  1.  Scan the `prompts/` directory structure to identify all prompt folders and their contained `prompt.md` and `example_N.md` files.
  2.  For each markdown file, parse the header (metadata) and content as described in 2.1.
  3.  Compare the discovered file structure and parsed metadata against the `prompts` object in `config.json`.
  4.  **Additions:** If a prompt folder or example file exists on the filesystem but not in `config.json`, add a default entry for it in the `prompts` object (using the parsed metadata and content).
  5.  **Deletions:** If an entry exists in the `config.json` `prompts` object but its corresponding folder/file is missing from the filesystem, remove the entry from the JSON.
  6.  **Tag Consistency:** Scan the `tags` arrays within the updated `prompts` object. Any tags found here that are not present in the global `tags` array should be added to the global `tags` array.
  7.  Update the `updatedAt` timestamp in `config.json`.
- **Goal:** Ensure `config.json` accurately reflects the file structure reality and maintains consistent metadata, but the filesystem and markdown file content remain the source of truth.

### 2.7. User Interface

- **Layout:** A two-column layout:
  - **Left Sidebar:** Displays controls and the list of available prompts.
  - **Main Content Area:** Displays the content of the selected prompt.
- **Sidebar Components:**
  - Header: Search Bar, "New Prompt" button (+ icon), "Manage Tags" button, "Sync" button (sync icon).
  - Prompt List: Scrollable list of available prompts (derived from `config.json` after sync). Each item displays the prompt name and has an "Edit" button (pencil icon). Clicking an item selects it.
- **Main Content Area:**
  - Displays the content of the `prompt.md` file for the currently selected prompt. Read-only view.
  - Includes a non-functional chat input box at the bottom (visual placeholder, potentially for future expansion).
- **Modals:**
  - **Create/Edit Prompt Modal:**
    - Fields: Prompt Name (`snake_case`, required), Prompt Description (text area), Prompt Content (text area for `prompt.md`), Tags (multi-select dropdown).
    - Section for adding/editing examples:
      - "+" button to add a new example area.
      - Each example area has: Description (input), Content (text area for `example_N.md`), Tags (multi-select dropdown). Example filename (`example_N`) is auto-assigned.
    - Save/Cancel buttons. Saving triggers updates to filesystem and `config.json`.
  - **Manage Tags Modal:**
    - Input field + "Create" button to add new tags.
    - List of existing tags, each with a "Delete" button (trash icon) requiring confirmation.

## 3. User Experience

### 3.1. User Persona

- **Alex:** A software developer who frequently uses LLMs. Alex needs to store, reuse, and iterate on various prompts for coding assistance, text generation, and summarization. They prefer tools that keep data local and under their control, ideally in a format easily versioned with Git. They value simplicity and efficiency in organizing their personal knowledge base.

### 3.2. Key User Flows

1.  **Creating a New Prompt:**
    1.  Click "New Prompt" (+) button in the sidebar.
    2.  Modal opens. Fill in Name, Description, Content. Select Tags.
    3.  Optionally, click "Add Example", fill in Description, Content, select Tags for the example. Repeat for multiple examples.
    4.  Click "Save".
    5.  App creates the folder (`prompts/prompt_name/`), `prompt.md`, `example_N.md` files, and updates `config.json` (`prompts` section, `tags` list if new tags were created/used, `updatedAt`).
    6.  New prompt appears in the sidebar list.
2.  **Viewing a Prompt:**
    1.  Click on a prompt name in the sidebar list.
    2.  The main content area displays the text from the corresponding `prompt.md` file.
3.  **Editing a Prompt/Examples:**
    1.  Click the "Edit" (pencil) icon next to a prompt in the sidebar.
    2.  Modal opens, pre-filled with existing data.
    3.  Modify Name (caution: renames folder), Description, Content, Tags, or Add/Edit/Remove examples.
    4.  Click "Save".
    5.  App updates relevant files (`.md`, potentially renaming folder/files) and `config.json`.
4.  **Searching for a Prompt:**
    1.  Type search terms into the search bar in the sidebar.
    2.  The prompt list in the sidebar filters dynamically based on matches in prompt names, descriptions, example descriptions, or tags (from `config.json`).
5.  **Managing Tags:**
    1.  Click the "Manage Tags" button.
    2.  Modal opens.
    3.  Create new tags using the input and "Create" button.
    4.  Delete tags using the trash icon (confirm deletion).
    5.  Closing the modal saves changes to the `tags` array in `config.json` (and potentially triggers tag removal from prompt/example entries).
6.  **Manual Synchronization:**
    1.  Click the "Sync" button.
    2.  App performs the synchronization process (Section 2.6) and updates the UI if needed.

### 3.3. UI/UX Considerations

- **Simplicity:** The interface should be clean and intuitive, prioritizing core functionality.
- **Responsiveness:** The UI should update promptly after actions like saving, searching, or syncing.
- **Clarity:** Clearly indicate the selected prompt. Provide feedback on actions (e.g., successful save, sync completion, deletion confirmation).
- **Consistency:** Maintain consistent layout and interaction patterns across modals and views.
- **Readability:** Ensure prompt content displayed in the main area is easy to read (e.g., respecting Markdown formatting).

## 4. Technical Architecture

### 4.1. System Components

- **Frontend Web Application:** Single Page Application (SPA) responsible for rendering the UI, handling user interactions, and managing application state. Technology stack: React with Tailwind CSS. (`app` folder)
- **Filesystem Interaction Layer:** Module/service responsible for reading directories, reading/writing `.md` files, creating/deleting files and folders based on application logic. Traditional web server app accessing local files with the following technology stack: NodeJS with Express. (`api` folder)
- **JSON Handler:** Module for reading, parsing, manipulating, and writing the `config.json` file. Includes validation logic.
- **Synchronization Service:** Implements the logic described in Section 2.6 for reconciling the filesystem and `config.json`.
- **Search Service:** Implements the search logic operating solely on the parsed `config.json` data.

### 4.2. Data Models

#### 4.2.1. Filesystem Structure

```json
<root_directory>/
├── prompts/
│   ├── <prompt_name_snake_case>/
│   │   ├── prompt.md
│   │   ├── example_1.md
│   │   └── example_2.md
│   │   └── ...
│   └── <another_prompt_name>/
│       ├── prompt.md
│       └── ...
└── config.json
```

#### 4.2.2. `config.json` Structure

```json
{
  "updatedAt": "2025-05-02T01:25:04.000Z", // ISO 8601 Format - Example updated to current time
  "tags": [
    "tagA",
    "tagB",
    "summarization",
    "code_generation"
    // List of all unique tags defined in the system
  ],
  "prompts": {
    "create_summary": {
      // Key matches folder name
      "prompt": {
        // Key matches base filename "prompt"
        "description": "Generates a brief summary of the input text.",
        "tags": ["summarization", "tagA"]
      },
      "example_1": {
        // Key matches base filename "example_1"
        "description": "Example summarizing a news article.",
        "tags": ["tagA"]
      },
      "example_2": {
        "description": "Example summarizing technical documentation.",
        "tags": ["tagB"]
      }
      // ... entries for other example_N.md files
    },
    "generate_python_code": {
      "prompt": {
        "description": "Generates Python code based on requirements.",
        "tags": ["code_generation", "python"]
      }
      // ... potentially example entries
    }
    // ... entries for other prompt folders
  }
}
```

### 4.3. APIs and Integrations

- **Internal:** APIs between the UI components and the backend/service layers handling file I/O, JSON manipulation, sync, and search.
- **External:** Primarily Filesystem APIs (Node.js fs module, browser File System Access API, or equivalent depending on architecture). No other external service integrations are required for V1.

### 4.4. Infrastructure Requirements

- **Runtime:** A modern web browser. If using Node.js for backend/file access (e.g., Electron or local web server), a recent Node.js version is required.
- **Deployment:** Can be run locally. Deployment mechanism depends on the chosen architecture (e.g., simple static file serving, running a local Node.js server, packaged Electron app).

## 5. Data Synchronization Logic (Summary)

- **Source:** Filesystem structure under prompts/ directory.
- **Target:** config.json file.
- **Actions:** Add missing entries to JSON, Remove stale entries from JSON, Add newly discovered tags (from prompts usage) to global tags list.
- **Triggers:** App startup, Manual user action.
- **Timestamp:** updatedAt field in config.json updated after every sync/modification.

## 6. Risks and Mitigations

- **Risk:** Filesystem I/O errors (permissions, disk full).
  - **Mitigation:** Implement robust error handling for all file operations. Provide clear feedback to the user on failure.
- **Risk:** config.json becomes corrupted or unparsable.
  - **Mitigation:** Validate JSON on read/write. Consider creating backups of config.json periodically or before major updates. Allow sync to rebuild a basic JSON from the filesystem if corruption is detected.
- **Risk:** Inconsistent state if app closes unexpectedly during file/JSON updates.
  - **Mitigation:** Design operations to be as atomic as possible. Rely on the sync process on next startup to correct inconsistencies.
- **Risk:** User manually edits files/folders or config.json outside the app, causing confusion.
  - **Mitigation:** Clearly document that the app relies on the sync process. The sync logic (FS as truth) handles most external changes gracefully, but manual JSON edits conflicting with FS will be overwritten by sync.
