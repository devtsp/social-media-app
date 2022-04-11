import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard.js';

const Home = () => {
	const {
		loading,
		data: { getPosts: posts },
	} = useQuery(FETCH_POSTS_QUERY);

	// if (posts) console.log(posts);

	return (
		<Grid columns={3}>
			<Grid.Row>
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<h1>Loading Posts..</h1>
				) : (
					posts &&
					posts.map(post => (
						<Grid.Column key={post.id}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};

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

export default Home;
