import React, {Component} from "react";
import {Alert, Button, Empty, message, Spin, Tabs} from 'antd';
import WeatherService from "../../services/WeatherService";
import CurrentForecast from "../CurrentForecast";
import HourlyForecast from "../HourlyForecast";
import DailyForecast from "../DailyForecast";

const {TabPane} = Tabs;

// service
const {getCurrentForecast} = new WeatherService();

class Weathers extends Component {

    state = {
        loading: true,
        error: "",
        data: null
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true});

        getCurrentForecast()
            .then(result => {
                this.setState({
                    forecast: result.data.DailyForecasts[0],
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                this.setState({
                    error: `${error}`,
                    loading: false
                });
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {error, loading} = this.state;

        if (error && !loading) message.error(this.state.error);
    }

    render() {
        const {loading, error} = this.state;

        if (loading) {
            return (
                <Spin tip="Loading..." delay={500}>
                    <Alert
                        message="Fetching data"
                        description="Please wait a minute."
                        type="info"
                        showIcon
                    />
                </Spin>
            )
        }

        if (error) {
            return (
                <Empty style={{paddingTop: 20}}>
                    <Button onClick={this.loadData}>Try again</Button>
                </Empty>
            );
        }

        return (

            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="NOW" key="1">
                    <CurrentForecast forecast={this.state.forecast}/>
                </TabPane>
                <TabPane tab="HOURLY" key="2">
                    <HourlyForecast/>
                </TabPane>
                <TabPane tab="DAILY" key="3">
                    <DailyForecast/>
                </TabPane>
            </Tabs>
        );
    }

}

export default Weathers;