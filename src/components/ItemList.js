import React from 'react';
import Item from './Item';
import ItemDetails from './ItemDetails';
import ItemCreate from './ItemCreate';
import update from 'react-addons-update';

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
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);


    }

    componentWillMount() {
        const itemData = localStorage.itemData;

        if(itemData) {
            this.setState({
                itemData: JSON.parse(itemData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.itemData) != JSON.stringify(this.state.itemData)) {
            localStorage.itemData = JSON.stringify(this.state.itemData);
        }
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

    handleCreate(item) {
        this.setState({
            itemData: update(
                this.state.itemData,
                { $push: [item]}
            )
        });
    }

    handleRemove() {
        if (this.state.selectedIndex < 0 ) {
            return;
        }
        this.setState({
            itemData: update(
                this.state.itemData,
                {$splice: [[this.state.selectedIndex, 1]]}
            ),
            selectedIndex: -1
        });
    }

    handleEdit(name, quantity) {
        this.setState({
            itemData: update(
                this.state.itemData, {
                    [this.state.selectedIndex]: {
                        name: {$set: name},
                        quantity: {$set: quantity}
                    }
                }
            )
        });
    }

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
                    isSelected={this.state.selectedIndex!=-1}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}/>
                <ItemCreate onCreate={this.handleCreate}/>
            </div>
        );
    }
}
