import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { timePassed } from '../utils/time-passed';
import LikeButton from '../components/LikeButton';

const SinglePost = props => {
	const postId = props.match.params.postId;
	console.log(postId);
	const { user } = React.useContext(AuthContext);
	const {
		data: { getPost },
	} = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});
	let postMarkup;

	if (!getPost) {
		postMarkup = <p>Loading Post..</p>;
	} else {
		const { id, body, createdAt, username, comments, likes } = getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
							float="right"
						/>
					</Grid.Column>
					<Grid.Column>
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
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return <div>SinglePost</div>;
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
				craetedAt
				body
			}
		}
	}
`;

export default SinglePost;
