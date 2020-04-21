import React from 'react'
import { Card } from 'react-bootstrap'


class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render() {
        const { recipe } = this.props;
        return (
            <Card className="recipe">
                <Card.Img variant="top" src={recipe[3]} />
                <Card.Body>
                    <Card.Title>{recipe[1]}</Card.Title>
                    <Card.Text>
                        {recipe[2]}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}




export default RecipeCard;