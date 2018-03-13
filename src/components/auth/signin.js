import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signInUser({email, password});
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
        const { handleSubmit, fields: { email, password } } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input {...email} className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input type="password" {...password} className="form-control" />
                </fieldset>
                {this.renderError()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);