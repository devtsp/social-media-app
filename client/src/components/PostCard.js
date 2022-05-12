import React from 'react';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { timePassed } from '../utils/time-passed';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

const PostCard = ({
	post: { body, createdAt, id, username, likes, comments },
}) => {
	const { user } = React.useContext(AuthContext);

	return (
		<Card>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{timePassed(createdAt)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ id, likes }} />
				<Button labelPosition="right" as={Link} to={`/posts/${id}`}>
					<Button color="blue" basic>
						<Icon name="comments" />
					</Button>
					<Label basic color="blue" pointing="left">
						{comments.length}
					</Label>
				</Button>
				{user && user.username === username && (
					<Button
						as="div"
						color="red"
						floated="right"
						onClick={() => console.log('Delete Post')}
					>
						<Icon name="trash" style={{ margin: 0 }}></Icon>
					</Button>
				)}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
