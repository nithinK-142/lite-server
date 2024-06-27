# Lite Server

This project demonstrates implementing a lightweight API using SQLite3 and Express.js. It demonstrates basic CRUD operations with a focus on simplicity and efficiency, serving as an example of a minimalist yet functional backend service.

## API Endpoints

1. **GET /api**

   - Retrieves the entire anime list
   - Response: JSON object with an `animelist` array containing anime objects

2. **POST /api**

   - Adds a new anime to the list
   - Request body: `{ anime_name, anime_description, isfavorite }`
   - Response: Confirmation message with the new anime's ID

3. **DELETE /api**
   - Removes an anime from the list
   - Query parameter: `id`
   - Response: Confirmation message
