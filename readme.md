# Okupon

Job progress API.

### Requirements
* Node.js v9 or newer (nvm recommended).

### Running
* Create a `.env` file and set values as described in `.env.example`
* Run `npm install` to install dependencies
* After dependencies are installed `npm start` will run the server

### Running tests
* Run `npm test`

### Deploying
* TODO - run docker image



## API

Jobs that are not updated before the configured time (default: 1minute) are considered stale and will be removed from the active list.

### `GET /jobs`

Returns a list of currently active jobs.

Response:
```javascript
[
    {
        "id": "f86cae75-469f-4c0a-b38b-ed80283697d0",
        "progress": 45,
        "total": 100
    },
    {
        "id": "dbbbcdfb-aff4-4721-be18-eb0d68039922",
        "progress": 9,
        "total": 90
    }
]
```

### `GET /jobs/:id`
Returns the details of the job with the given id.

Response:
```javascript
{
    "id": "f86cae75-469f-4c0a-b38b-ed80283697d0",
    "progress": 0,
    "total": 100
}
```

### `POST /jobs/`

Creates a new job with a total progress value.

Request Body:

```javascript
{ "total": 100 }
```

Response:
```javascript
{
    "id": "f86cae75-469f-4c0a-b38b-ed80283697d0"
}
```

#### `PATCH /jobs/:id`

Updates a job's progress with the given amount

Request Body:
```javascript
{ "amount": 100 }
```

Response:
```javascript
{ "progress": 100 }
```

#### `PATCH /jobs/:id/increment`
Increments a job's progress by a given amount

Request Body:
```javascript
{ "amount": 10 }
```

Response:
```javascript
{ "progress": 10 }
{ "progress": 30 }
{ "progress": 40 }
```
