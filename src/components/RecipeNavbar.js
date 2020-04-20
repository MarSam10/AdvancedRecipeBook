import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class RecipeNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.handleLogout();

        if (window.location.hash !== "#/") {
            this.setState({redirectToHome: true})
        }
    }

    render() {
        const { activeUser } = this.props;
        const { redirectToHome } = this.state;

        if (redirectToHome) {
            return <Redirect to="/"/>
        }

        const signupLink = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link onClick={this.logout}>Logout</Nav.Link> : null;


        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/">Recipe Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#/recipes">Recipes</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {signupLink}
                        {loginLink}
                        {logoutLink}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default RecipeNavbar;
