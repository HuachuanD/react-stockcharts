import { Component } from 'react';


class StockSelect extends Component {
    state = {
        inputVal: '',
    }

    _handleChaneg = (e) => {
        const inputVal = e.target.value;
        this.setState({inputVal});
    }

    _handleSubmit = (e) => {
        e.preventDefault();
       this.props.selectStock(this.state.inputVal);
    }

    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <input 
                        id='stockSymbol' 
                        type="text" 
                        onChange={this._handleChaneg}
                        placeholder="input the stock code" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default StockSelect;