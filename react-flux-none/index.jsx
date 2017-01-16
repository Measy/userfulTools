var React = require('react');
var ReactDOM = require('react-dom');

var MyButton = React.createClass({
    getInitialState: function () {
        return {
            items: []
        };
    },

    createNewItem: function (event) {
        this.state.items.push('new item');
        this.setState(this.state);
    },

    render: function () {
        let items = this.state.items;
        let itemHtml = items.map(function (listItem, i) {
            return <li key={i}>{listItem}</li>;
        });
        return (<div>
            <ul>{itemHtml}</ul>
            <button onClick={this.createNewItem}>New Item</button>
        </div>)
    }
});

ReactDOM.render(
    <MyButton />,
    document.querySelector('#example')
);