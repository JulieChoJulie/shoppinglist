import React from 'react';
import Item from './Item';
import ItemDetails from './ItemDetails';

export default class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
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
        this.handleClick = this.handleClick.bind(this);

    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        })
    };

    handleClick(key) {
        this.setState({
            selectedIndex: key
        });
        console.log(key, 'is selected');
    };

    render() {
        const items = this.state.itemData;
        const filter_item = (items) => {
            items.sort();
            items = items.filter((item)=>{
                return item.name.toLowerCase()
                    .indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return items.map((item, i) => {
                return(<Item item={item}
                             key={i}
                             onClick={()=>this.handleClick(i)} />);
            });
        };

        return (
            <div>
                <h1>Shopping List</h1>
                <input name="keyword"
                       placeholder="Search"
                       value={this.state.keyword}
                       onChange={this.handleChange}/>

                <div>{filter_item(this.state.itemData)}</div>

                <ItemDetails
                    item={this.state.itemData[this.state.selectedIndex]}
                    isSelected={this.state.selectedIndex!=-1}/>
            </div>
        );
    }
}
