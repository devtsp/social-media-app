import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';

const PostForm = () => {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: '',
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			console.log(result);
			values.body = '';
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<Form onSubmit={onSubmit}>
			<h2>Create a post:</h2>
			<Form.Field>
				<Form.Input
					placeholder="Hi World!"
					name="body"
					onChange={onChange}
					value={values.body}
				/>
				<Button type="submit" color="teal">
					Submit
				</Button>
			</Form.Field>
		</Form>
	);
};

const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			comments {
				id
				body
				username
				createdAt
			}
		}
	}
`;

export default PostForm;
