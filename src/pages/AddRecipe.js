import React from 'react'
import {Jumbotron, Button, Container, Modal, Form, Row, Col, Image} from 'react-bootstrap'
import RecipeNavbar from '../components/RecipeNavbar';

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRecipeImg: {
                file: null,
                URL: ""
            },}

    }

    imgChange(ev) {

        let newRecipeImg = {};
        newRecipeImg.file = ev.target.files[0];
        if (newRecipeImg.file) {
            newRecipeImg.URL = URL.createObjectURL(newRecipeImg.file);
        } else {
            newRecipeImg.URL = "";
        }

        this.setState({newRecipeImg});
    }

    render() {
        const { showModal, newRecipeImg } = this.state;
        const {activeUser} = this.props;

        return (
            <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Name
            </Form.Label>
        <Col sm={10}>
            <Form.Control ref={this.nameInput} type="text" placeholder="Recipe name" />
        </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
                Description
            </Form.Label>
            <Col sm={10}>
                <Form.Control ref={this.descInput} type="text" placeholder="Recipe description" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
            Image
            </Form.Label>
        <Col sm={6}>
            <Form.Control type="file" placeholder="Recipe image URL" accept="image/*" onChange={this.imgChange}/>
        </Col>
        <Col sm={4}>
            <Image src={this.newRecipeImg.URL} fluid/>
        </Col>
    </Form.Group>
    </Form>
        );
    }
}

export default AddRecipe;
