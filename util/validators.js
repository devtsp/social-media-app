module.exports.validateRegisterInput = (
	username,
	email,
	password,
	confirmPassword
) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}
	if (email.trim() === '') {
		errors.email = 'Email must not be empty';
	} else {
		const validEmailRegEx =
			/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/;
		if (!email.match(validEmailRegEx)) {
			errors.email = 'Email must be a valid email adress';
		}
	}
	if (password === '') {
		errors.password = 'Password must not be empty';
	} else {
		if (password !== confirmPassword) {
			errors.confirmPassword = 'Passwords must match';
		}
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validateLoginInput = (username, password) => {
	const errors = {};
	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}
	if (password.trim() === '') {
		errors.username = 'Password must not be empty';
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
