import React from 'react';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { timePassed } from '../utils/time-passed';

const PostCard = ({ post: { body, createdAt, id, username, likes, comments } }) => {
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
				<Button as='div' labelPosition='right'>
					<Button color='red' basic>
						<Icon name='heart' />
					</Button>
					<Label as='a' basic color='red' pointing='left'>
						{likes.length}
					</Label>
				</Button>
				<Button as='div' labelPosition='right'>
					<Button color='blue' basic>
						<Icon name='comments' />
					</Button>
					<Label basic color='blue' pointing='left'>
						{comments.length}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
