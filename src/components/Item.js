import React from 'react';
export default class Item extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.item.name}</div>
        );
    }
}