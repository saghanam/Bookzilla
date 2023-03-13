# Bookzilla


Bookzilla is an inventory system for multiple bookstores containing the same copies of the same book and that updates or notifies the status of the book if it goes out of stock.
This project is built with Node JS and uses Knex ORM for database querying. 

Steps to run the project. 
1. Setup database - This project uses a postgresQL database. The role,name and password can be modified in the configuration file of knex.
2. Index.js serves as the entry point of the project. The project can be run by command "npm start" or "node index.js"
3. The api's for the project can be found here - [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/10858310-7c86049a-28be-4908-a82d-bc1dd21b8ad1?action=collection%2Ffork&collection-url=entityId%3D10858310-7c86049a-28be-4908-a82d-bc1dd21b8ad1%26entityType%3Dcollection%26workspaceId%3Dfc81b666-47e8-4145-8f64-7c3f2f5be886)


API Definitions
1. /store/add - Adds new bookstores to the inventory. Requires store name and location.
2. /store/:id - Fetches all the books from the specific bookstore.
3. /book/addToStore - Adds new books to the bookstore. This API returns a message if book already exists in the bookstore.
4. /book/edit/:id - Edits the quantity of the book and updates the status to be out_of_stock if quantity is set to 0. Requires store ID
5. /book/editBooks - Edits multiple books of a specific bookstore with quantity
6. /book/delete/:id - Deletes a book from the database and removes from bookstore. Uses book id for deletion.
7. /book/deleteBooks - Deletes multiple books from book database and removes from bookstore.
8. /book/updateStatus - Updates the status of the book based on quantity.
9. /book/ - Fetches all the books from all bookstores.



