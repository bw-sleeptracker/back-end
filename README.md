# Documentation

## Routes
## /auth Endpoints
### auth/register
#### POST
* Requires an object containing the new users information
* Returns a JSON object  
    `{"message": "User successfully created"}`

|Parameters| Description|
|:-------|:--------------|
|admin|_boolean_, _optional_|
|username|_string_, _required_, must be unique|
|password|_string_, _required_|

### auth/login
#### POST
* Requires an object containing the users information
* Stores a cookie containing the jwt
* Returns a JSON object including the jwt
    
```js
{
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDAwMDgxNjh9.mO0jOjng0nHo8NUVCOBbhleshdcKBDB_KKMMgpeY1ZU",
    message: `Welcome ${username}!`    
}
```

|Parameters| Description|
|:-------|:--------------|
|username|_string_, _required_, must be unique|
|password|_string_, _required_|

### auth/logout
#### GET
* Returns a status code 204 if logout successful 

## /users Endpoints
### users/current-user
#### GET
* Requires a user to be logged in 
* Returns a JSON object containing logged in users information
```js
{
    "id": "c0137caf-69db-4040-8fef-7490ff829d45",
    "username": "JohnDoe",
    "admin": 1
}   
```

### users/current-user
#### PUT
* Requires a user to be logged in
* Requires at least one valid parameter to update in request body
* Returns a status code 204 if update successful 

|Parameters| Description|
|:-------|:--------------|
|admin|_boolean_, _optional_|
|username|_string_, _optional_|
|password|_string_, _optional_|

### users/current-user
#### DELETE
* Requires a user to be logged in 
* Returns a status code of 204 if delete user successful

## /admin Endpoints
### admin/users
#### GET
* Requires an admin user to be logged in 
* Returns a JSON object containing all users information
```js
{
    "id": "c0137caf-69db-4040-8fef-7490ff829d45",
    "username": "JohnDoe",
    "admin": 1
}   
```

### admin/users/:id
#### GET
* Requires an admin user to be logged in 
* Requires a user Id
* Returns a JSON object containing a users information by id
```js
{
    "id": "c0137caf-69db-4040-8fef-7490ff829d45",
    "username": "JohnDoe",
    "admin": 1
}   
```

### admin/users/:id
#### DELETE
* Requires an admin user to be logged in 
* Requires a user Id to delete
* Returns a status code of 204 if delete user successful
