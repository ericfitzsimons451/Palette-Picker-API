
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
    "project_name": "Justin's Project"
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
### Welcome View
<img width="1377" alt="Screen Shot 2019-04-10 at 6 28 01 AM" src="https://user-images.githubusercontent.com/39415039/55887448-c3bb3e00-5b6a-11e9-94a6-6df7b8776970.png">

### Card Edit View
<img width="1382" alt="Screen Shot 2019-04-10 at 8 20 44 AM" src="https://user-images.githubusercontent.com/39415039/55887808-74294200-5b6b-11e9-9e6b-8fb8ff9cdedf.png">

### Card Display View
<img width="1390" alt="Screen Shot 2019-04-10 at 8 25 51 AM" src="https://user-images.githubusercontent.com/39415039/55887222-5d362000-5b6a-11e9-9ab2-2206be1747b6.png">

### Error 404 View
<img width="1387" alt="Screen Shot 2019-04-10 at 8 27 39 AM" src="https://user-images.githubusercontent.com/39415039/55887322-8e165500-5b6a-11e9-965c-fe842b7ace6d.png">

### Wireframe
<img width="799" alt="Screen Shot 2019-04-01 at 2 59 15 PM" src="https://user-images.githubusercontent.com/39415039/55359304-c1802200-548e-11e9-93a6-69ae1b766e44.png">

## Contributors
[Eric Fitzsimons](https://github.com/ericfitzsimons451) \
[Gabe Inzurriaga](https://github.com/inzurriaga) \
[Tom Wilhoit](https://github.com/tomwilhoit)
