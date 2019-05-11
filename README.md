
# Palette Picker
### A web-based application for choosing and saving color palettes.

## Installation Steps

### Clone the backend repo
```git clone https://github.com/ericfitzsimons451/Palette-Picker-API.git```

```npm install```

```npm start```

## Background/About

### This 10-day project asked teams of 3 people to create a backend for our application.  This project was a chance for us to 

## Tech Stack

- React JS
- Redux
- Redux Thunk
- Node.js
- Express
- Jest/Enzyme
- Sass

## API Documentation

### No API key is necessary to use our API and no areas of the API are restricted.
### Base URL: http://localhost:3001
### Base URL on Heroku:
- - - -

### GET All Projects
#### Endpoint
```GET /api/v1/projects```

#### Successful Response Example:
```
[
    {
        "id": 1,
        "project_name": "Project 1",
        "created_at": "2019-05-09T01:10:24.209Z",
        "updated_at": "2019-05-09T01:10:24.209Z"
    },
    {
        "id": 2,
        "project_name": "Project 2",
        "created_at": "2019-05-09T01:10:24.219Z",
        "updated_at": "2019-05-09T01:10:24.219Z"
    },
    {
        "id": 3,
        "project_name": "Project 3",
        "created_at": "2019-05-09T01:10:24.220Z",
        "updated_at": "2019-05-09T01:10:24.220Z"
    }
]
```

### GET Project By ID
#### Endpoint
```GET /api/v1/projects/:id```

#### Successful Response Example:
```
[
    {
        "id": 1,
        "project_name": "Project 1",
        "created_at": "2019-05-09T01:10:24.209Z",
        "updated_at": "2019-05-09T01:10:24.209Z"
    }
]
```

### GET All Palettes in a Project
#### Endpoint
```GET /api/v1/projects/:id/palettes```

#### Successful Response Example:
```
[
    {
        "id": 1,
        "project_id": 1,
        "color_one": "#00FF00",
        "color_two": "#008000",
        "color_three": "#00FFFF",
        "color_four": "#3374FF",
        "color_five": "#FF335E",
        "created_at": "2019-05-09T01:10:24.224Z",
        "updated_at": "2019-05-09T01:10:24.224Z"
    },
    {
        "id": 2,
        "project_id": 1,
        "color_one": "#00FF00",
        "color_two": "#008000",
        "color_three": "#00FFFF",
        "color_four": "#3374FF",
        "color_five": "#FF335E",
        "created_at": "2019-05-09T01:10:24.228Z",
        "updated_at": "2019-05-09T01:10:24.228Z"
    }
]
```

### GET a Palette in a Project by ID
#### Endpoint
```GET /api/v1/projects/:id/palettes/:id```

#### Successful Response Example:
```
[
    {
        "id": 1,
        "project_id": 1,
        "color_one": "#00FF00",
        "color_two": "#008000",
        "color_three": "#00FFFF",
        "color_four": "#3374FF",
        "color_five": "#FF335E",
        "created_at": "2019-05-09T01:10:24.224Z",
        "updated_at": "2019-05-09T01:10:24.224Z"
    }
]
```

### POST a new Project
#### Endpoint
``` POST /api/v1/projects```

#### Required Parameters
``` 
{
    project_name: <String>
}
```

#### Successful Response Example:
- Status 201
``` 
{
    "id": 25
}
```

### POST a new Palette
#### Endpoint
``` POST /api/v1/projects/:id/palettes ```
#### Required Parameters
```
{
    "color_one": <String>,
    "color_two": <String>,
    "color_three": <String>,
    "color_four": <String>,
    "color_five": <String>
}
```

#### Successful Response Example:
- Status 201
```
{
    "id": 13
}
```

###  Update a Project
#### Endpoint
``` PUT /api/v1/projects/:id```
#### Reqired Parameters
```
{
    "project_name": <String>
}
```
#### Successful Response Example:
- Status 200

### Update a Palette
#### Endpoint
``` PUT /api/v1/projects/:id/palettes/:id```
#### Reqired Parameters
```
{
    "color_one": <String>,
    "color_two": <String>,
    "color_three": <String>,
    "color_four": <String>,
    "color_five": <String>
}
```

#### Successful Response Example:
- Status 200

### DELETE a Project
#### Endpoint
``` DELETE /api/v1/projects/:id```
#### Reqired Parameters
```
{
    "id": <Integer>
}
```
#### Successful Response Example:
- Status 200

### DELETE a Palette 
#### Endpoint
``` DELETE /api/v1/projects/:id/palettes/:id```
#### Reqired Parameters
```
{
    "id": <Integer>
}
```
#### Successful Response Example:
- Status 200

## Future Iterations

## Screenshots


### Wireframe


## Contributors
[Eric Fitzsimons](https://github.com/ericfitzsimons451) \
[Justin Torrance](https://github.com/justintorrance) \
[David Cisneros](https://github.com/developingdavid)
