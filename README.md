# Sleep Tracker API Documentation
### API link
<https://sleep-tracker-backend.herokuapp.com/>

## Routes
## /auth Endpoints
### auth/register
#### POST
* Requires an object containing the new users information
* Returns a JSON object  
    `{"message": "User successfully created"}`

|Parameters| Description|
|:-------|:--------------|
|username|_string_, _required_, must be unique|
|email|_string_, _required_, must be unique| 
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
    "email": "email@email.com",
    "recommended_hours": 8,
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
* Returns an array containing all users information
```js
{
    "id": "c0137caf-69db-4040-8fef-7490ff829d45",
    "username": "JohnDoe",
    "email": "email@email.com",
    "recommended_hours": 8,
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
    "email": "email@email.com",
    "recommended_hours": 8,
    "admin": 1
}   
```

### admin/users/:id
#### DELETE
* Requires an admin user to be logged in 
* Requires a user Id to delete
* Returns a status code of 204 if delete user successful

## sleep Endpoints 
### day/current-user
#### POST
#### creates a new sleep log for current day
* Requires user to be logged in
* Returns a JSON object containing newly created sleep log data

|Parameters| Description|
|:-------|:--------------|
|bedtime|_string_, _required_, format: "23:00:00"|
```js
{
    "id": "12b43ec0-3d08-4b6d-9cdd-94efabdc1d63",
    "bedtime": "23:00:00",
    "date": "2020-09-20T04:00:00.000Z",
    "wake_time": null,
    "total_hours_slept": null,
    "average_quality": 0
}   
```
### day/:id
#### PUT
#### updates a sleep day log by day log id
* Requires user to be logged in
* Requires a valid sleep log id for endpoint :id
* Returns a JSON object containing updated sleep log data

|Parameters| Description|
|:-------|:--------------|
|wake_time|_string_, _required_, format: "06:00:00"|
|wake_score|_integer (between 1-4)_, _optional_|
|day_score|_integer (between 1-4)_, _optional_|
|bedtime_score|_integer (between 1-4)_, _optional_|

```js
{
    "id": "12b43ec0-3d08-4b6d-9cdd-94efabdc1d63",
    "date": "2020-09-20T04:00:00.000Z",
    "bedtime": "23:00:00",
    "wake_time": "06:00:00",
    "total_hours_slept": null,
    "average_quality": 2,
    "wake_score": 2,
    "day_score": 1,
    "bedtime_score": 3,
    "weekly_average_hours_slept": 0,
    "weekly_average_quality": 0
}
```

### day/current-user
#### GET

* Requires user to be logged in
* Returns an array containing all sleep day logs for a user by user Id
 ordered by newest first

```js
[
    {
        "id": "12b43ec0-3d08-4b6d-9cdd-94efabdc1d63",
        "date": "2020-09-20T04:00:00.000Z",
        "bedtime": "23:00:00",
        "wake_time": "06:00:00",
        "total_hours_slept": null,
        "average_quality": 2,
        "wake_score": 2,
        "day_score": 1,
        "bedtime_score": 3
    },
    {
        "id": "8e9ab192-50bf-43fa-832a-f2139e664a8f",
        "date": "2020-08-30T04:00:00.000Z",
        "bedtime": "23:00:00",
        "wake_time": "06:00:00",
        "total_hours_slept": 7,
        "average_quality": 3,
        "wake_score": 3,
        "day_score": 3,
        "bedtime_score": 3
    },
]
```

### day/current-user/search/?date={date}
#### GET
* Requires user to be logged in
* Requires a date string in the format 2020-08-20
* Returns a JSON object containing sleep day log data for a user by
  date query

```js

    {
    "id": "b1a07ba8-b5f9-4a84-9c49-39b70cd17e87",
    "date": "2020-08-20T04:00:00.000Z",
    "bedtime": "23:00:00",
    "wake_time": "06:00:00",
    "total_hours_slept": 7,
    "average_quality": 3,
    "wake_score": 3,
    "day_score": 3,
    "bedtime_score": 3
}

```
### day/:id
#### DELETE
* Requires user to be logged in
* Requires a valid sleep log id for endpoint :id
* Returns a status code of 204 if sleep day log deleted successfully

### week/current-user
#### GET

* Requires user to be logged in
* Returns an array containing all sleep week logs for a user by
 user Id
 ordered by date

```js
[
     {
        "id": "6023a295-69df-4f66-864d-b93fc6090fa7",
        "week_of_year": "39/2020",
        "average_hours_slept": 0,
        "average_quality": 0,
        "users_id": "655b3e68-2d9b-4041-a197-705b393baec1"
    },
    {
        "id": "f08ca2c0-2d5e-4598-b607-17d0d0397f08",
        "week_of_year": "36/2020",
        "average_hours_slept": 7,
        "average_quality": 3,
        "users_id": "655b3e68-2d9b-4041-a197-705b393baec1"
    }
]
```

### /week/current-user/search/?date={date}
#### GET
* Requires user to be logged in
* Requires a date string in the format 8-19-2020
* Returns a JSON object containing sleep week log data for a user by
  date query
  
```js
[
     {
        "id": "13787c97-dae9-4438-864e-67346fdb19ee",
        "week_of_year": "34/2020",
        "average_hours_slept": 7,
        "average_quality": 3
    }
]
```

### month/current-user
#### GET

* Requires user to be logged in
* Returns an array containing all sleep month logs for a user by
 user Id
 ordered by date

```js
[
     {
        "id": "16567638-4651-409c-9b39-66badd175e2d",
        "month_of_year": "8/2020",
        "average_hours_slept": 7,
        "average_quality": 3,
        "users_id": "655b3e68-2d9b-4041-a197-705b393baec1"
    },
    {
        "id": "35440c37-edfb-4026-8314-9bf866eff4d8",
        "month_of_year": "7/2020",
        "average_hours_slept": 7,
        "average_quality": 3,
        "users_id": "655b3e68-2d9b-4041-a197-705b393baec1"
    }
]
```

### month/current-user/average
#### GET

* Requires user to be logged in
* Returns an object containing total sleep quality for all months  
{  
"qualityTotal":<Total of all reported quality for all months>,  
"totalMonths":<Total months user has records for>,  
"averageQuality":<Average Quality of sleep for all months>  
}  


```js
[
     {
  "qualityTotal": 6,
  "totalMonths": 2,
  "averageQuality": 3
    }
]
```

### /month/current-user/search/?date={date}
#### GET
* Requires user to be logged in
* Requires a date string in the format 09-19-2020
* Returns a JSON object containing sleep month log data for a user by
  date query
  
```js
[
     {
        "id": "16567638-4651-409c-9b39-66badd175e2d",
        "month_of_year": "8/2020",
        "average_hours_slept": 7,
        "average_quality": 3
    }
]
```
