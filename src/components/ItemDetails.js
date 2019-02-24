import React from 'react';

export default class ItemDetails extends React.Component {
    render() {
        // Details shown when the item is clicked
        const details = (
            <div>
                <p>{ this.props.item.name }</p>
                <p>{ this.props.item.quantity }</p>
            </div>
        );

        // When none is clicked
        const blank = (
            <div> Not Selected </div>
        );

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? details : blank}
                <button onClick={this.props.onRemove}>Remove</button>
            </div>
        )
    }
}

ItemDetails.defaultProps = {
    item: {
        name: "",
        quantity: "",
    },
    onRemove: () => {console.error('onRemove is missing');}
}