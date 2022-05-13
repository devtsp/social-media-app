import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';

const DeleteButton = ({ postId }) => {
	const [confirmOpen, setConfirmOpen] = React.useState(false);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update(proxy, result) {
			setConfirmOpen(false);
			// TODO: remove post from cache
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
				onConfirm={() => {
					console.log(postId);
					deletePost();
				}}
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
