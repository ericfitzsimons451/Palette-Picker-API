# Palette Picker
### A web-based application for choosing and saving color palettes.

## NOTE: This is only the back-end repository for this application.  To clone the front-end repository, please visit: 
## https://github.com/DevelopingDavid/palette-picker-ui.git

## Installation Steps
```git clone https://github.com/ericfitzsimons451/Palette-Picker-API.git```

```npm install```

```npm start```

## Background/About

### This project tasked our 3 person team to build a full-stack application in 10 days. We set-up a Postgres database and used Knex to create our tables, migrate, and seed our data into multiple environments: development, production, CI, and testing.  Our team enjoyed developing our understanding of the request/response cycle, backend testing, and what goes into building out a robust back-end.  
### For the front-end we chose to work with Material-UI, despite it not being in the project spec, as a way of challenging ourselves to work with some form of new technology.  Pre-styled components come with their own challenges, but maintaining a healthy interest in using new technology is an important skill to have at one's fingertips.
### This project also saw us implementing co-authored commits in our pull requests when we were coding as a group.  When separated, we were diligent abouut keeping each other abreast of changes made through PRs on Github and rebasing our local code.

## Tech Stack

- Material-UI
- React JS
- Redux
- Redux Thunk
- Node.js
- Express
- Knex
- PostgresQL
- Jest/Enzyme/Supertest
- Sass
- Travis-CI

## Deployed Site
### https://palette-picker-turing.herokuapp.com/

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
- Add more query params
- Add Sign-in
- Incorporate OAuth 

## Screenshots
### Home View
<img width="1179" alt="Screen Shot 2019-05-15 at 7 41 25 PM" src="https://user-images.githubusercontent.com/39415039/57820488-3d39e380-774a-11e9-9118-64fe97418343.png">
### Save Project View
<img width="1166" alt="Screen Shot 2019-05-15 at 7 42 34 PM" src="https://user-images.githubusercontent.com/39415039/57820508-55a9fe00-774a-11e9-9a66-b701f2e4fd44.png">
### Save Existing Project Dropdown View
<img width="1159" alt="Screen Shot 2019-05-15 at 7 42 42 PM" src="https://user-images.githubusercontent.com/39415039/57820516-5e023900-774a-11e9-8af1-ee806d6efa41.png">
### Drawer Open View
<img width="1185" alt="Screen Shot 2019-05-15 at 7 42 53 PM" src="https://user-images.githubusercontent.com/39415039/57820521-635f8380-774a-11e9-896c-d520373c9e05.png">
### Drawer Open & Display Palette View
<img width="1198" alt="Screen Shot 2019-05-15 at 7 44 47 PM" src="https://user-images.githubusercontent.com/39415039/57820531-6fe3dc00-774a-11e9-952b-641bf02b47f2.png">

### Wireframe


## Contributors
[Eric Fitzsimons](https://github.com/ericfitzsimons451) \
[Justin Torrance](https://github.com/justintorrance) \
[David Cisneros](https://github.com/developingdavid)
