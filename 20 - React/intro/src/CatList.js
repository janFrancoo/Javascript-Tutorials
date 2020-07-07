import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CatList extends Component {
    state = {
        categories: []
    };

    getCats = () => {
        fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => this.setState({
            categories: data
        }));
    }

    componentDidMount() {
        this.getCats();
    }

    render() {
        return (
            <div>
                <h3>{ this.props.info.title }</h3>
                <ListGroup>
                    {
                        this.state.categories.map(category => (
                            <ListGroupItem  active={category.categoryName===this.props.currentCat ? true : false}
                                            key={ category.id } 
                                            onClick={ () => this.props.changeCat(category) }> 
                                { category.categoryName }
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        )
    }
}
