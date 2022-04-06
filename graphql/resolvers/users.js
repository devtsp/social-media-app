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
	Query: {
		async getUsers() {
			const users = await User.find({});
			return [...users];
		},
	},
	Mutation: {
		async login(parent, args, context, info) {
			const { username, password } = args;
			const { errors, valid } = validateLoginInput(username, password);
			const user = await User.findOne({ username });
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
			// PASS AND TOKEN
			const encryptedPassword = await bcrypt.hash(password, 12);
			const newUser = new User({
				email,
				username,
				password: encryptedPassword,
				createdAt: new Date().toISOString(),
			});
			const result = await newUser.save();
			const token = generateToken(result);
			return {
				...result._doc,
				id: result._id,
				token,
			};
		},
	},
};
