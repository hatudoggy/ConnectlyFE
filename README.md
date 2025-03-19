# Connectly Frontend

## Project Setup

Follow these steps to set up the project on your local machine.

### 1. Install mkcert and Replace Certificates in Django Backend

If your project requires local HTTPS, install `mkcert` and generate certificates:

```sh
choco install mkcert -y
mkcert -install
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1
```

Place the generated `key.pem` and `cert.pem` files in the appropriate directory in your Django backend.

### 2. Prepare Required Configuration Files

Rename the following files by removing the `.template` extension:

```sh
mv .vscode/settings.json.template .vscode/settings.json
mv .vscode/tasks.json.template .vscode/tasks.json
mv .env.template .env
```

### 3. Install Dependencies

Run the following command to install the required dependencies:

```sh
npm install
```

### 4. Start Development Server and Storybook

Run the following commands to start both the development server and Storybook:

```sh
npm run dev & npm run storybook
```

If you have removed the `.template` from `.vscode/tasks.json`, VSCode will automatically open both the development server and Storybook when starting the workspace.

### 5. Change Auto-Open Behavior

If you prefer to manually run the tasks instead of automatically starting them when opening VSCode, remove the following section from each task in `.vscode/tasks.json`:

```json
  "runOptions": {
    "runOn": "folderOpen"
  }
```

You can then manually start the tasks in VSCode by opening the **Command Palette** (`Ctrl+Shift+P`), selecting **Tasks: Run Task**, and choosing the desired task.

---
