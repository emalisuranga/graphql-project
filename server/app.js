const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const port = 3000;

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true // Enable GraphiQL for easy testing
}));

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
