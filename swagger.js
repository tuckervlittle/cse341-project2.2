const { updateMovie } = require('./controllers/movieController');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie Watchlist API',
    description: 'A simple API to manage a movie watchlist and genres',
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: [(process.env.SWAGGER_SCHEME || 'http')],
  definitions: {
    Movie: {
      title: "Interstellar",
      director: "Chris Columbus",
      releaseYear: 2015,
      runTime: 169,
      genre: "68dabda1046c79066df0eee7",
      description: "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home.",
      watched: true
    },
    Genre: {
      name: "Romance",
      description: "Fun science fiction movies"
    },
    UpdatedMovie: {
      title: "Interstellar",
      director: "Christopher Nolan",
      releaseYear: 2014,
      runTime: 169,
      genre: "68dabda1046c79066df0eee6",
      description: "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home.",
      watched: false
    },
    UpdatedGenre: {
      name: "Romance",
      description: ""
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);