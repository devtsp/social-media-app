require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }), // forward req from express to context,
	cors: { origin: 'https://social-media-client-zeta.vercel.app' },
});

mongoose
	.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
	.then(res => {
		console.log('>> MongoDB connected');
		return server.listen({ port: PORT });
	})
	.then(res => {
		console.log(`>> Server running at ${res.url}`);
	})
	.catch(error => console.error(error));
