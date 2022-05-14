import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Card, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { timePassed } from '../utils/time-passed';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const SinglePost = () => {
	const navigate = useNavigate();
	const { postId } = useParams();
	const { user } = React.useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	function deletePostCallback() {
		navigate('/');
	}

	let postMarkup;

	if (loading) {
		postMarkup = <p>Loading Post..</p>;
	} else {
		const { id, body, createdAt, username, comments, likes } = data.getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
							float="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{timePassed(createdAt)}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likes }} />
								<Button
									as="div"
									labelPosition="right"
									onClick={() => console.log('asdas')}
								>
									<Button basic color="blue">
										<Icon name="comments"> </Icon>
									</Button>
									<Label basic color="blue" pointing="left">
										{comments.length}
									</Label>
								</Button>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return postMarkup;
};

const FETCH_POST_QUERY = gql`
	query ($postId: ID!) {
		getPost(postId: $postId) {
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

export default SinglePost;
