import React from 'react';
import Item from './Item';

export default class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            itemData: [{
                name: 'toothpaste',
                quantity: '1'
            }, {
                name: 'onion',
                quantity: '2'
            }, {
                name: 'milk',
                quantity: '1L'
            }, {
                name: 'shampoo',
                quantity: '1'
            }]
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    render() {
        const items = this.state.itemData;
        const item_list = items.map((item, i) => {
            return (<Item item={item} key={i}/>);
        });

        return (
            <div>
                <h1>Shopping List</h1>
                <input name="keyword"
                       placeholder="Search"
                       value={this.state.keyword}
                       onChange={this.handleChange}/>
                <div>{item_list}</div>
            </div>
        );
    }
}
