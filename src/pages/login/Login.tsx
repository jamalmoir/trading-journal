import { GoBack, push, Push } from 'connected-react-router';
import React, { ChangeEvent, Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Types from 'Types';
import { Heading } from '../../components/Heading';
import { TextInput } from '../../components/TextInput';
import { authenticateUser } from '../../redux/actions/auth';
import { validate } from '../../utils/validation';
import './login.scss';


interface LoginState {
	isAuthing: boolean;
	controls : {
		[key: string]: {
			value: string
			errors: string[],
			touched: boolean,
			validationRules: {
				[key: string]: any,
			}
		}
	}
}

interface LoginProps {
	firebase: any;
	onLogin: (authData: {email: string, password: string}) => null;
	goBack: GoBack;
	push: Push;
}

class LoginPage extends Component<LoginProps> {
	state: LoginState = {
		isAuthing: false,
		controls: {
			email: {
				value: '',
				errors: [],
				touched: false,
				validationRules: {
					isEmail: true,
				}
			},
			password: {
				value: '',
				errors: [],
				touched: false,
				validationRules: {
					minLength: 6,
				}
			}
		}
	}

	updateInputState(key: string, event: ChangeEvent<HTMLInputElement>) {
		let text = event.target.value;
		let connectedValue = {};

		// equalTo rule requires a connectedValue to be compared to.
		if (this.state.controls[key].validationRules.equalTo) {
			const equalControl = this.state.controls[key].validationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;

			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			};
		}

		this.setState((prevState: LoginState) => {
			return {
				controls: {
					...prevState.controls,
					[key]: {
						...prevState.controls[key],
						value: text,
						errors: validate(text, this.state.controls[key].validationRules, connectedValue),
						touched: true
					}
				}
			}
		})
	}

	loginHandler = () => {
		const credentials = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		}

		this.setState((prevState: LoginState) => ({...prevState, isAuthing: true}));
		this.props.onLogin(credentials);
	}

	render() {
		if (this.props.firebase.auth.uid) {
			return (
				<Redirect to={ {pathname: '/', state: {from: '/login'}} } />
			)
		}
		if (!this.props.firebase.authError && this.state.isAuthing) {
			return <div>Loading...</div>
		}
		return (
			<div className='login'>
				<div className='login-form'>
					<Heading text='Login' />
					<form className='inputs'>
						<TextInput type="email"
											 placeholder="email"
											 value={ this.state.controls.email.value }
											 errors={ this.state.controls.email.errors }
											 touched={ this.state.controls.email.touched }
											 onChange={ (event: ChangeEvent<HTMLInputElement>) => this.updateInputState('email', event) } />
						<TextInput type="password"
											 placeholder="password"
											 value={ this.state.controls.password.value }
											 errors={ this.state.controls.password.errors }
											 touched={ this.state.controls.password.touched }
											 onChange ={(event: ChangeEvent<HTMLInputElement>) => this.updateInputState('password', event) } />
						<Link to="/">
							<button className="btn btn-primary" onClick={ this.loginHandler }>Login</button>
						</Link>
						<span className='failure-text'>{ this.props.firebase.authError ? this.props.firebase.authError.message : '' } </span>
					</form>
					{/*<div className='register-text'>
						Don't have an account? <Link to="">Register</Link>
					</div>*/}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: Types.RootState) => {
	return {
		firebase: state.firebase,
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => {
	return {
		// @ts-ignore
		onLogin: (authData: {email: string, password: string}) => dispatch(authenticateUser(authData)),
		goBack: () => dispatch(push('/')) // TODO: get goBack() working
	}
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage);