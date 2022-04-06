const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const {
	validateRegisterInput,
	validateLoginInput,
} = require('../../util/validators');

const generateToken = user =>
	jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '1h' }
	);

module.exports = {
	Mutation: {
		async login(parent, args, context, info) {
			const { username, password } = args;
			const { errors, valid } = validateLoginInput(username, password);
			const user = await User.findOne({ username }); // GET from DB
			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'User not found';
				throw new UserInputError('Wrong credentials', { errors });
			}
			const token = generateToken(user);
			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		async register(parent, args, context, info) {
			const {
				registerInput: { username, email, password, confirmPassword },
			} = args;
			// USER UNIQUENESS
			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						// Payload to display on front
						username: 'This username is taken',
					},
				});
			}
			// DATA VALIDATION
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			// HASH PASS AND CREATEA TOKEN
			const encryptedPassword = await bcrypt.hash(password, 12);
			const newUser = new User({
				email,
				username,
				encryptedPassword,
				createdAt: new Date().toISOString(),
			});
			const result = await newUser.save(); // .save() to DB returns document entry at result._doc
			const token = generateToken(result);
			return {
				...result._doc,
				id: result._id, // Id not present in document by default
				token,
			};
		},
	},
};

module.exports.validateLoginInput = (username, password) => {
	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}
	if (password.trim() === '') {
		errors.username = 'Username must not be empty';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
