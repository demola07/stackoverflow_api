# StackOverFlow Clone API 

> Backend API for a Stackoverflw clone, using Express, mongodb, redis and elasticsearch


## Usage

Rename ".env.example" to ".env" and update the values/settings to your own

## Install Dependencies
```
npm install
```

## Run App
```
# Run in development mode
npm run dev

# Run in Production mode
npm start
```

## Datebase Seeder

To seed the database with questions and answers with data from the "_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo

Extensive documentation with examples [here](https://documenter.getpostman.com/view/6291584/T1DtcaLS?version=latest)

- Version: 1.0.0
- License: MIT