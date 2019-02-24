import React from 'react';

export default class ItemCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            quantity: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <h2>Create Item</h2>
                <p>
                    <input type="text" name="name" placeholder="name"/>
                    <input type="text" name="quantity" placeholder="quantity"/>
                </p>
                <button>Create</button>
            </div>
        )
    }
}