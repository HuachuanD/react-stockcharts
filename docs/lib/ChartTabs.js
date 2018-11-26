import {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChartRapper from './ChartRapper';

class ChartTabs extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.stock !== this.props.stock;
    }

    __renderTabs() {
        const { stock } = this.props;
        const tabs = [];
        this.props.functions.forEach((func) => {
            tabs.push(
                <Tab>{`${stock}: ${func.toLowerCase().replace('_', ' ')}`}</Tab>
            );
        });
        return tabs
    }
    __renderTabPanel() {
        const {stock} = this.props
        const tabPanels = [];
        this.props.functions.forEach((func) => {
            tabPanels.push(
                <TabPanel>
                    <ChartRapper stock={stock} stockFunc={func} />
                </TabPanel>
            );
        });
        return tabPanels
    }
    render() {
        return (
        <Tabs>
            <TabList>
              {this.__renderTabs()}
            </TabList>
        
        { this.__renderTabPanel()}
      </Tabs>);
    }
}

export default ChartTabs;