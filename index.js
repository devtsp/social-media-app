require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }), // forward req from express to context,
});

mongoose
	.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
	.then(res => {
		console.log('MongoDB Connected:');
		return server.listen({ port: 5000 });
	})
	.then(res => {
		console.log(`Server running at ${res.url}`);
	});
