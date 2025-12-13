# React Admin Panel

This project is a React-based admin panel that includes login and registration features, built with TypeScript and styled using Tailwind CSS. It provides a user-friendly interface for managing data through a CRUD form and displays data fetched from the JSONPlaceholder API.

## Features

- **Login and Registration**: Secure authentication for admin users.
- **Admin Dashboard**: A structured layout with a sidebar for navigation.
- **CRUD Operations**: Create, Read, Update, and Delete functionalities for managing data.
- **Data Display**: A table that lists data fetched from the JSONPlaceholder API.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- JSONPlaceholder API

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd react-admin-panel
   ```

3. Install the dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

or

```
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Building for Production

To create a production build, run:

```
npm run build
```

or

```
yarn build
```

The built files will be available in the `dist` directory.

## Folder Structure

- `src/`: Contains all the source code for the application.
  - `pages/`: Contains the main pages of the application (Login, Register, Dashboard).
  - `components/`: Contains reusable components (layout, auth, CRUD, UI).
  - `hooks/`: Contains custom hooks for managing state.
  - `context/`: Contains context providers for global state management.
  - `services/`: Contains API service functions.
  - `utils/`: Contains utility functions, such as validators.
  - `types/`: Contains TypeScript types and interfaces.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.