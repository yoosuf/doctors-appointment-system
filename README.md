# Doctors Appointment System

## Overview

The Doctors Appointment System is a web application designed to streamline the process of scheduling and managing doctor appointments. Built using Express, MongoDB, and Next.js 12, this system provides an efficient and user-friendly platform for patients and doctors alike.

## Features

- User authentication and authorization
- Schedule and manage appointments
- View medical history and records
- Manage doctor profiles and availability
- Secure and organized data storage

## Prerequisites

Make sure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Yarn](https://yarnpkg.com/) (version 1.x or later)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yoosuf/doctors-appointment-system.git
    cd doctors-appointment-system
    ```

2. **Bootstrap the project:**

    ```bash
    yarn bootstrap
    ```

3. **Environment variables:**

    Create a `.env` file in the root directory and add the necessary environment variables:

    ```bash
    # .env
    MONGODB_URI=mongodb://localhost:27017/doctors-appointment-system
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    JWT_SECRET=your_jwt_secret
    ```

## Running the Application

1. **Start the development server:**

    ```bash
    yarn dev
    ```

    This will start the Next.js development server and the Express server.

2. **Open the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server.
- `yarn lint`: Runs ESLint to check for code quality issues.
- `yarn test`: Runs tests.



## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes you'd like to make.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [Yoosuf](mailto:mayoosuf@gmail.com).
