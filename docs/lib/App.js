import { Component,  Fragment } from 'react';
import StockSelect from './StockSelect';
import ChartTabs from './ChartTabs'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: 'ZS',
        };
    }
    _selectStock = (val) => {
        this.setState({stock: val});
    }
    
    render() {
        return (
            <Fragment>
                <StockSelect selectStock={this._selectStock} />
                <ChartTabs stock={ this.state.stock } functions={["TIME_SERIES_INTRADAY", "TIME_SERIES_MONTHLY"]} />
            </Fragment>
        );
    }
}

export default App;