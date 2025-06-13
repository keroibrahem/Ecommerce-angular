# 🛒 Ecommerce Angular Application

An advanced e-commerce web application built with **Angular** as part of the **ITI Open Source Track**.

This project simulates a full online shopping experience including product listings, authentication, cart management, and a responsive modern UI.

---

## 🎬 Demo Video

[![Watch the Demo](https://drive.google.com/file/d/1kPISPJ0sq9tPfOuyUMRTrF94xoI0DTJ0/view?usp=sharing)](https://drive.google.com/file/d/1kPISPJ0sq9tPfOuyUMRTrF94xoI0DTJ0/view?usp=sharing)

> Click the image above to watch a demo of the project in action.

---

## 🔥 Features

- 🔐 User Registration and Login
- 🛍️ Browse Products by Categories & Brands
- 🔎 Product Details Page
- 🛒 Cart System with Quantity Management
- 👤 User Profile Page
- 🚫 Auth Guards to protect routes
- 🌐 Fully Responsive Design
- ⚙️ Integration with `json-server` as a mock backend

---

## 📦 Tech Stack

| Frontend        | Backend (Mock)   | Styling        |
|-----------------|------------------|----------------|
| Angular 17      | JSON Server       | SCSS / Angular Material |
| TypeScript      | RESTful API       | Responsive Design |

---

## 📂 Project Structure

```bash
src/
 ┣ app/
 ┃ ┣ Components/          # Feature components (Home, Cart, Login, Register, etc.)
 ┃ ┣ layouts/             # Layout components
 ┃ ┣ models/              # TypeScript models
 ┃ ┣ services/            # Application services
 ┃ ┗ core/                # Guards, interfaces, shared services
 ┣ db/
 ┃ ┗ db.json              # Mock database for json-server


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
