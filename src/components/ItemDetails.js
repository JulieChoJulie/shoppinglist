import React from 'react';
import PropTypes from 'prop-types';


export default class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name:'',
            quantity: ''
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        if(!this.state.isEdit){
            this.setState({
                name: this.props.item.name,
                quantity: this.props.item.quantity
            })
        } else {
            this.handleEdit();
        }
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    // Handle various inputs
    handleChange(e) {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.quantity);
    }

    handleKeyPress(e) {
        if(e.charCode === 13) {
            this.handleToggle();
        }
    }

    render() {
        // Details shown when the item is clicked
        const details = (
            <div>
                <p>{ this.props.item.quantity }</p>
                <p>{ this.props.item.name }</p>
            </div>
        );

        const input_edit = (
            <div>
                <p><input
                    type="text"
                    name="quantity"
                    placeholder="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}/></p>
                <p><input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}/></p>
            </div>
        )

        const edit = this.state.isEdit ? (input_edit) : details;


        // When none is clicked
        const blank = (
            <div> Not Selected </div>
        );

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? edit : blank}
                <p>
                    <button onClick={this.props.onRemove}>Remove</button>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ? 'Okay' : 'Edit'}
                    </button>
                </p>
            </div>
        )
    }
}

ItemDetails.propTypes = {
    item: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit : PropTypes.func,
};

ItemDetails.defaultProps = {
    item: {
        name: "",
        quantity: "",
    },
    onRemove: () => {console.error('onRemove is missing');},
    onEdit: () => {console.error('onEdit is missing');},
};