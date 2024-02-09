# Chat App

Welcome to the Chat App! This full-stack application enables real-time messaging using React, Formik, Chakra UI, PostgreSQL, Express, Redis, and Socket.IO. Whether you're chatting one-on-one, this app has you covered!

## Features

- **Real-time Messaging:** Instant message delivery with WebSocket technology.
- **Private Chats:** Engage in private conversations effortlessly.
- **User-friendly Interface:** Intuitive UI powered by React and Chakra UI.
- **Secure Backend:** Utilizes PostgreSQL, Express, and Redis for a reliable backend infrastructure.

## Screenshots


## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. For Client:
   1. Navigate to client directory: `cd client`
   2. Install dependencies: `npm install`
   3. Start client: `npm run dev`
4. For Server:
   1. Navigate to client direvtory: `cd server`
   2. Make sure that you have Postgres and Redis installed:
      ```
        psql --version
      ```
      ```
        redis-server --version
      ```

   4. Install dependencies: `npm install`
   5. Create a `.env` file
   6. Add your PostgreSQL database connection details and your cookie secret to the `.env` file in the following format
      ```
         DATABASE_NAME=YOUR_DB_NAME
         DATABASE_HOST=YOUR_DB_HOST
         DATABASE_USER=YOUR_DB_USER
         DATABASE_PASSWORD=YOUR_DB_PASSWORD
         DATABASE_PORT=YOUR_DB_PORT
         COOKIE_SECRET=YOUR_SECRET_STRING
   7. Start server using `npm start`
5. Open your browser and visit `http://localhost:5173` to view the app. 
