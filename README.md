# Modular Clean Todo (Expo + React Native)

A sample mobile app that demonstrates **feature-based modules** with **Clean Architecture**, **i18n**, and **multi-theme (Light/Dark/System)** using **Expo Router** and **TypeScript**.

> **Node:** `v22.18.0`  
> **Targets:** iOS · Android · Web

---

## ✨ Features

- **Modular-by-feature**: `modules/<feature>` (todos, shared/i18n, shared/theme)
- **Clean Architecture per feature**: `domain → application (use cases) → data → presentation → di`
- **i18n**: i18next + react-i18next + expo-localization, persisted language
- **Theming**: Light/Dark/System with tokens, persisted choice, Nav + StatusBar in sync
- **Navigation**: Expo Router (React Navigation under the hood)
- **Persistence**: AsyncStorage (swap to SQLite/API without touching use cases)
- **Accessibility**: labeled pressables, contrast-aware status bar

---

## 🚀 Quickstart

```bash
# 0) Ensure Node v22.18.0 (or compatible) is active

# 1) Install dependencies
npm install

# 2) Start Metro
npx expo start

# 3) Open a target
#   - Press "a" (Android), "i" (iOS), or open the web tab
#   - Or scan the QR with Expo Go
```

**Troubleshooting**

```bash
# Reset Metro cache if things act weird
npx expo start -c
```

---

## 📦 Scripts

```jsonc
// package.json (relevant)
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 🗂️ Project Structure

```
app/                              # Expo Router entry points (thin)
  _layout.tsx
  index.tsx                       # Home with themed button → /todos
  todos.tsx                       # Route that renders the Todos screen

modules/
  shared/
    i18n/
      i18n.ts                     # i18next initialization
      languages.ts                # language registry & constants
      components/LanguageSwitcher.tsx
      locales/
        en/common.json
        es/common.json
        pt/common.json
    theme/
      tokens.ts                   # theme tokens (colors, radius, spacing)
      ThemeProvider.tsx           # Theme context (Light/Dark/System + persistence)
      nav.ts                      # map theme → React Navigation theme
      components/ThemeSwitcher.tsx
      index.ts

  todos/                          # Feature module: Todos
    domain/
      entities/Todo.ts
      repositories/TodoRepository.ts
    data/
      sources/local/AsyncStorageTodoDataSource.ts
      repositories/TodoRepositoryImpl.ts
    di/
      repo.ts                     # module-level repo singleton
    features/                     # ✅ Use-case vertical slices
      add-todo/
        application/AddTodo.ts
        presentation/AddTodoForm.tsx
        di.ts
        index.ts
      list-todos/
        application/ListTodos.ts
        presentation/
         components/TodoItem.tsx     # UI part
         TodoList.tsx
        di.ts
        index.ts
      toggle-todo/
        application/ToggleTodo.ts
        di.ts
        index.ts
      delete-todo/
        application/DeleteTodo.ts
        di.ts
        index.ts
    screens/
      TodosScreen.tsx             # composes the slices
    index.ts                      # module barrel

babel.config.js                   # RN bundler aliases
tsconfig.json                     # TS aliases
```

## 🧱 Architecture

### Clean Architecture (per feature)
- **Domain**: business entities + repository **interfaces** only (pure TypeScript)
- **Application (Use Cases)**: orchestrate domain rules; depend on **interfaces**  
  _Examples: `AddTodo`, `ListTodos`, `ToggleTodo`, `DeleteTodo`_
- **Data/Infrastructure**: concrete repository implementations (AsyncStorage now)
- **Presentation**: React Native components; no storage logic; calls use cases
- **DI**: tiny containers wiring implementations into use cases

```
Presentation → Use Cases → Repository Interface ← Repository Impl (Data)
             (application)     (domain)             (infrastructure)
```

### Feature Slices
Each use case is packaged as a **feature** (`modules/todos/features/<use-case>`), with its own UI + DI.  
`TodosScreen` composes the slices and coordinates flow.

## 💡 Notes

- Persisted values live in AsyncStorage: todos, selected theme, language.  
- On Android, if testing persistence, you can “Clear Storage” for Expo Go to reset.  
- If you hit bundling hiccups on Node `v22.18.0`, clear caches as shown above.
