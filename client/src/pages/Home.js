import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth.js';
import PostCard from '../components/PostCard.js';
import PostForm from '../components/PostForm';

const Home = () => {
	const { user } = React.useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	// if (data) console.log(data);

	return (
		<Grid columns={3}>
			<Grid.Row className="page-title">
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<h1>Loading Posts..</h1>
				) : (
					data.getPosts &&
					data.getPosts.map(post => (
						<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
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
