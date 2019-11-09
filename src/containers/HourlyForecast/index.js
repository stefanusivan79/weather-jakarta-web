import React, {Component} from "react";
import {Alert, Button, Col, Collapse, Empty, Icon, Row, Spin} from "antd";
import moment from "moment";
import WeatherService from "../../services/WeatherService";

const {Panel} = Collapse;

// service
const {getHourlyForecasts} = new WeatherService();

const headerPanel = (data) => (
    <Row type="flex" justify="start" align="middle">
        <Col span={2}>
            {moment.unix(data.EpochDateTime).format("h A")}
            <br/>
            {moment.unix(data.EpochDateTime).format("M/D")}
        </Col>
        <Col span={3}>
            <img style={{width: 50}}
                 src={"https://www.accuweather.com/images/weathericons/" + data.WeatherIcon + ".svg"} alt="icon"/>
        </Col>
        <Col span={2}>
            {data.Temperature.Value}&deg;
        </Col>
        <Col span={6}>
            {data.IconPhrase}
        </Col>
        <Col span={6} style={{textAlign: "right"}}>
            Precip: {data.PrecipitationProbability}%
        </Col>
    </Row>
);

class HourlyForecast extends Component {

    state = {
        loading: true,
        data: null,
        error: ""
    };

    loadData = () => {

        this.setState({loading: true});

        getHourlyForecasts()
            .then(result => {
                this.setState({
                    data: result.data,
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                console.error("error: ", error);
                this.setState({
                    error: `${error}`,
                    loading: false
                });
            });
    };

    componentDidMount() {
        this.loadData();
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
            <Collapse
                accordion
                expandIcon={({isActive}) => <Icon type="down" rotate={isActive ? 180 : 0}/>}
                expandIconPosition="right"
                style={{width: "50%", margin: "15px"}}
            >
                {this.state.data.map((data, index) => generatePanel(data, index))}
            </Collapse>
        )
    }

}

function generatePanel(data, index) {
    return (
        <Panel key={index} header={headerPanel(data)}>
            <Row style={{lineHeight: 2.143}}>
                <Col span={12}>RealFeel&reg;: {data.RealFeelTemperature.Value}&deg;</Col>
                <Col span={12}>Cloud Cover: {data.CloudCover}%</Col>
            </Row>

            <Row style={{lineHeight: 2.143}}>
                <Col span={12}>Wind: {data.Wind.Speed.Value} {data.Wind.Speed.Unit} {data.Wind.Direction.English}</Col>
                <Col span={12}>Rain: {data.Rain.Value} {data.Rain.Unit}</Col>
            </Row>

            <Row style={{lineHeight: 2.143}}>
                <Col span={12}>Gusts: {data.WindGust.Speed.Value} {data.WindGust.Speed.Unit}</Col>
                <Col span={12}>Snow: {data.Snow.Value} {data.Snow.Unit}</Col>
            </Row>

            <Row style={{lineHeight: 2.143}}>
                <Col span={12}>Humidity: {data.RelativeHumidity}%</Col>
                <Col span={12}>Ice: {data.Ice.Value} {data.Ice.Unit}</Col>
            </Row>

            <Row style={{lineHeight: 2.143}}>
                <Col span={12}>Dew Point: {data.DewPoint.Value}&deg;</Col>
                <Col span={12}>Visibility: {data.Visibility.Value} {data.Visibility.Unit}</Col>
            </Row>

            <Row style={{lineHeight: 2.143}}>
                <Col span={12}>Max UV Index: {data.UVIndex} ({data.UVIndexText})</Col>
                <Col span={12}>Ceiling: {data.Ceiling.Value} {data.Ceiling.Unit}</Col>
            </Row>
        </Panel>
    )
}

export default HourlyForecast;