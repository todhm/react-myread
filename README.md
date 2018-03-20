# MyReads Project
This is the project to build simple react app which provide

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Composition of main Component
* Two main Component consists app component and there are sub component to help their constitution.  
```bash
├── App
   ├── IndexPage #Component Showing us main page which show us list of Books  in our list
   └── SearchPage #Component Help us search the book we want to Find.
```


Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.
##BookShelfList
In the IndexPage we have to categorize book according to their shelf. Since each category have same UI structure  I make BookShelfList Component to reduce duplication of code. 
##BookShelf

BookShelf Component help us update the status of book between 3 options(Want To Read, Read, Currently Reading) and help us to show based on their status.
## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall) Get All the Books in my list
* [`update`](#update) Update the status of between 3 options
* [`search`](#search) Search the Book you want to find
