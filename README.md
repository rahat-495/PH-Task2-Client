# Product Mart

This project is a full-stack, single-page application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to search, filter, and sort products efficiently, with features like pagination, multi-criteria filtering, and sorting by price or date added. The application also includes Google and email/password authentication via Firebase and is designed with a mobile-first responsive UI.

# To use locally

- Clone the Repository: Start by cloning the Git repository to your local machine.
- Install Dependencies: Run npm install to install all the necessary dependencies.
- Firebase Setup: Add your Firebase SDK configuration to the .env file to ensure proper integration.
- Install Additional Packages: Install essential packages like react-toastify, react-lottie, and others as needed.
- Run the Project: Execute npm run dev to start the development server and view the website locally.

### Fronten Setup Instructions

- **Clone the repository**: 
  - Clone the repository to your local machine using the command:  
    ```bash
    git clone <repository-url>
    ```

- **Install Dependencies**: 
  - Navigate to the project directory and install the necessary npm packages:
    ```bash
    npm install mongodb cors dotenv express
    npm install react-toastify swiper react-icons @material-tailwind/react
    npm install -D tailwindcss postcss autoprefixer
    npm install -D daisyui@latest
    npm install axios @tanstack/react-query react-router-dom
    npm install localforage match-sorter sort-by
    ```

- **Configure Environment Variables**:
  - Create a `.env` file in the root directory and add your MongoDB user and password like this:
    ```env
    VITE_apiKey
    VITE_authDomain
    VITE_projectId
    VITE_storageBucket
    VITE_messagingSenderId
    VITE_appId
    ```

- **Run the Server**:
  - Start the App using the following command:
    ```bash
    npm run dev
    ```

These instructions will help you set up the frontend of your project locally.
