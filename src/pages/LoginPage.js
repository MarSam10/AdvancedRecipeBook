import React, { Component } from 'react';
import './LoginPage.css'
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "nir@nir.com",
            pwd: "123",
            showInvalidLoginError: false,
            redirectToRecipesPage: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    login() {
        const { allUsers, handleLogin } = this.props;
        const { email, pwd } = this.state;
        let isUser = false;
        let newActiveUser;
        for (var i = 0; i < this.props.users.length; i++) {
            if(this.props.users[i][3]==this.state.email && this.props.users[i][4]==this.state.pwd){
                isUser = true;
                newActiveUser = this.props.users[i];
                break;
            }
        }
        

        if (isUser) {
            // 1) Updating App component on the new active user
            handleLogin(newActiveUser);

            // 2) navigate to recipes page
            this.setState({
                redirectToRecipesPage: true
            });
        } else {
            this.setState({
                showInvalidLoginError: true
            });
        }

    }

    render() {
        const { email, pwd, showInvalidLoginError, redirectToRecipesPage } = this.state;

        if (redirectToRecipesPage) {
            return <Redirect to="/recipes"/>
        }

        const errorAlert = showInvalidLoginError ? <Alert variant="danger">Invalid email or password!</Alert> : null;

        return (
            <div className="p-login">
                <div className="main">
                    <h1>Login to Recipe Book</h1>
                    <p>or <Link to="/signup">create a new account</Link></p>
                    {errorAlert}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={email}
                                type="email" placeholder="Enter email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="pwd" value={pwd}
                                type="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="success" type="button" block onClick={this.login}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
