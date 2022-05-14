import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

const DeleteButton = ({ postId, callback }) => {
	const [confirmOpen, setConfirmOpen] = React.useState(false);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update(proxy, result) {
			setConfirmOpen(false);
			const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
			const newData = JSON.parse(JSON.stringify(data));
			newData.getPosts = newData.getPosts.filter(p => p.id !== postId);
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: newData });
			if (callback) callback(); // In PostCard callback is not provided
		},
		variables: { postId },
	});

	return (
		<>
			<Button
				as="div"
				color="red"
				floated="right"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash" style={{ margin: 0 }}></Icon>
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => deletePost()}
			/>
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export default DeleteButton;
