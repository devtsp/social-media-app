import React from 'react';
import { useQuery, gql } from '@apollo/client';

const FETCH_POSTS_QUERY = gql`
	query {
		getPosts {
			id
			body
			createdAt
			username
			likes {
				username
			}
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

const Home = () => {
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	if (data) {
		console.log(data);
	}

	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

export default Home;
