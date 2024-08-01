# vue-store-portfolio

You can see it here: https://makukhin.dev

## Description

This is a small sneaker store web application developed for my web developer portfolio. I fully developed the frontend using Vue.js 3 with the Options API, employing enterprise development patterns and effectively decomposing the main components.

Key features of the application:

- **CRUD Functionality:** The application supports a complete set of CRUD operations (create, read, update, and delete data).
- **Backend:** Mokky.dev service is used as the backend to create a test REST API. There are plans to migrate to a custom backend in the future.
- **Databases:** The design and modeling of the databases were done independently.
- **Authorization and Authentication:** A comprehensive user authorization and authentication system is implemented.
- **Navigation:** Vue Router is used for route management.
- **Global State Management:** Pinia is used for managing the global state.
- **Styling:** The application is styled using Tailwind CSS.

To ensure proper functionality, the application requires a `.env` file with the `VITE_APP_MYAPI_URL` variable.

This project showcases my skills in frontend development, working with REST APIs, and using modern web development technologies and tools.

## Tech Stack

- Vue 3
- Vue Router
- Pinia store
- TailwindCSS
- Axios
- AutoAnimate
- Options API
- ESLint
- Prettier

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vue-store-portfolio.git
   
2. Navigate to the project directory:
   
   ```bash
   cd vue-store-portfolio
   
4. Install dependencies:
   
   ```bash
   npm i
   
4. Create a .env file in the root directory with the following content:
   ```bash
   VITE_APP_MYAPI_URL=your_api_url

5. Start the development server:
   ```bash
   npm run dev

## Usage

To use the application, open your browser and navigate to http://localhost:5173. You can then explore the sneaker store and use all the features, including CRUD operations, user authentication, and more.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
