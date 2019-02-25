import React from 'react';
import PropTypes from 'prop-types';

export default class ItemCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            quantity: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // Handle various inputs
    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handleClick(e) {
        const item = {
            name: this.state.name,
            quantity: this.state.quantity,
        };
        this.props.onCreate(item);
        this.setState({
            name: '',
            quantity: '',
        })
        this.nameInput.focus();
    }

    handleKeyPress(e) {
        if(e.charCode === 13) {
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h2>Create Item</h2>
                <p>
                    <input
                    type="text"
                    name="quantity"
                    placeholder="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    ref={(ref)=>{this.nameInput = ref}}/>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}/>
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        )
    }
}

ItemCreate.propTypes = {
    onCreate: PropTypes.func
};

ItemCreate.defaultProps = {
    onCreate: () => {
        console.error('onCreate is not defined');
    }
};