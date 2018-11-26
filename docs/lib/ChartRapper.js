import {Component} from 'react';
import { timeParse } from "d3-time-format";
import Chart from "./charts/CandleStickChartWithDarkTheme";
import { csvParse } from  "d3-dsv";


class ChartRapper extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        let format;
        switch(this.props.stockFunc) {
            case 'TIME_SERIES_INTRADAY':
                format = '%Y-%m-%d %H:%M:%S';
                break;
            case 'TIME_SERIES_MONTHLY':
                format = '%Y-%m-%d';
                break;
        }
        const parseDate = timeParse(format);
        fetch(`https://www.alphavantage.co/query?function=${this.props.stockFunc}&symbol=${this.props.stock}&interval=5min&apikey=WHEX26IXZ9ZTOYZT&datatype=csv`)
        .then(response => response.text())
        .then(data => csvParse(data, (d)=>{
            d.date = new Date(parseDate(d.timestamp).getTime());
			d.open = +d.open;
			d.high = +d.high;
			d.low = +d.low;
			d.close = +d.close;
			d.volume = +d.volume;
			return d;
        }))
        .then(newData => {
            this.setState({data: newData.reverse()});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    }

    componentDidUpdate(nextProps) {
        if (this.props.stock !== nextProps.stock || this.props.stockFunc !== nextProps.stockFunc) {
            let format
            switch(nextProps.stockFunc) {
                case 'TIME_SERIES_INTRADAY':
                    format = '%Y-%m-%d %H:%M:%S';
                    break;
                case 'TIME_SERIES_MONTHLY':
                    format = '%Y-%m-%d';
                    break;
            }
            const parseDate = timeParse(format);
            fetch(`https://www.alphavantage.co/query?function=${this.props.stockFunc}&symbol=${this.props.stock}&interval=5min&apikey=WHEX26IXZ9ZTOYZT&datatype=csv`)
            .then(response => response.text())
            .then(data => csvParse(data, (d)=>{
                d.date = new Date(parseDate(d.timestamp).getTime());
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
                return d;
            }))
            .then(newData => {
                this.setState({data: newData.reverse()});
            });
        }
    }

    render() {
        if(!Array.isArray(this.state.data)) {
            return (
            <div>
                <h1>Load data failed</h1>
            </div>
            );
        }
        if(this.state.data.length) {
            return (<Chart data={this.state.data} type="hybrid"/>);
        }
        else {
            return (<div>
                <h1>Data is loading</h1>
            </div>);
        }
    }

}

export default ChartRapper;