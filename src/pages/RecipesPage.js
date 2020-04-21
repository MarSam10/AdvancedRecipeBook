import React from 'react'
import RecipeNavbar from '../components/RecipeNavbar'
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import emailjs from 'emailjs-com';


class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            newRecipeImg: {
                file: null,
                URL: ""
            },
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.imgChange = this.imgChange.bind(this);

        this.nameInput = React.createRef();
        this.descInput = React.createRef();
        this.imgInput = React.createRef();
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


    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    createRecipe() {
        const {activeUser} = this.props;


        const newRecipe = {
            name: this.nameInput.current.value,
            desc: this.descInput.current.value,
            img: this.state.newRecipeImg.URL,
        }

        this.props.addRecipe(newRecipe);

        // send email...
        var template_params = {
            "user_email": activeUser[3],
            "recipe_name": newRecipe[1],
            "user_name": activeUser[1],
            "recipe_url": "no url for now"
         }

         var service_id = "default_service";
         var template_id = "new_recipe";
         emailjs.send(service_id, template_id, template_params).then(() => {
             console.log("email sent");
         });

        this.closeModal();
    }

    render() {
        const { activeUser, recipes } = this.props;
        const { showModal, newRecipeImg } = this.state;
        //const showModal = this.state.showModal;
        if (!activeUser) {
            return <Redirect to="/" />
        }

        const recipesCards = recipes.map(recipe => <Col key={recipe.id} lg="3" md="6"><RecipeCard recipe={recipe} /></Col>)

        return (
            <div>
                <RecipeNavbar activeUser={activeUser}/>
                <Container>
                    <div className="recipes-header">
                        <h1>{activeUser[1]}'s Recipes</h1>
                        <Button variant="primary" href="#/add" /*onClick={this.openModal}*/>New Recipe</Button>
                    </div>
                    <Row>
                        {recipesCards}
                    </Row>
                </Container>


                <Modal show={showModal} onHide={this.closeModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>New Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                    <Image src={newRecipeImg.URL} fluid/>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.createRecipe}>
                            Create Recipe
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default RecipesPage;
