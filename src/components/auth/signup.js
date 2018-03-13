import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
    handleFormSubmit(formProps) {
        this.props.signUpUser(formProps);
    }

    renderError() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" {...email} />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" {...password} type="password" />
                    {password.touched && password.error && <div className="text-danger">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Repeat password:</label>
                    <input className="form-control" {...passwordConfirm} type="password" />
                </fieldset>
                {this.renderError()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(SignUp);