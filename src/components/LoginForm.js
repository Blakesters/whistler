import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {loading} from '../actions/auth';
import {ResizeSpinLoader} from 'react-css-loaders';
import './LoginForm.css';

export class LoginForm extends Component {
	onSubmit(values) {
		this.props.dispatch(login(values));
		this.props.dispatch(loading());
	}
	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className="login-error">
					{this.props.error}
				</div>
			);
		}
		if (this.props.currentUser !== null) {
				return <Redirect to="/"/>;
			}
		else if (this.props.loading === true) {
			return <ResizeSpinLoader />;
		}
		else {	
			return (
				<form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					{error}
					<label htmlFor="login-username">Username</label>
					<Field className="login-input" name="username" id="login-username" type="text" component="input" required />
					<label htmlFor="login-password">Password</label>
					<Field className="login-input" name="password" id="login-password" type="password" component="input" required />
					<button className="login-button" type="submit">Login</button>
					<p className="account-status"><Link to="/signup">Need to signup?</Link></p>
				</form>
			);
		}
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser,
	error: state.auth.error,
	loading: state.auth.loading
});

let ConnectedLoginForm = connect(mapStateToProps)(LoginForm);

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(ConnectedLoginForm);




