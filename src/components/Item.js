import React from 'react';
export default class Item extends React.Component {
    render() {
        return (
            <div>{this.props.item.quantity} {this.props.item.name}</div>
        );
    }
}