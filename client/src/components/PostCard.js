import React from 'react';
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';

import { timePassed } from '../utils/time-passed';

const PostCard = ({ post: { body, createdAt, id, username, likes } }) => {
	return (
		<Card>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{timePassed(createdAt)}</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<p>Buttons</p>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
