import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CatList extends Component {
    state = {
        categories: [
            {categoryID: 1, categoryName: "Beverages"},
            {categoryID: 2, categoryName: "Condiments"}
        ],
    };

    render() {
        return (
            <div>
                <h3>{ this.props.info.title }</h3>
                <ListGroup>
                    {
                        this.state.categories.map(category => (
                            <ListGroupItem key={ category.categoryID } onClick={ () => this.props.changeCat(category) }> 
                                { category.categoryName }
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
        )
    }
}
