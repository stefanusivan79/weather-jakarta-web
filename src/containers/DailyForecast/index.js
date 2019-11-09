import React, {Component} from "react";
import {Alert, Button, Card, Col, Empty, List, Row, Spin} from "antd";
import WeatherService from "../../services/WeatherService";
import moment from "moment";

// service
const {getFiveDaysDailyForecasts} = new WeatherService();

class DailyForecast extends Component {

    state = {
        loading: true,
        data: null,
        error: ""
    };

    loadData = () => {

        this.setState({loading: true});

        getFiveDaysDailyForecasts()
            .then(result => {
                this.setState({
                    data: result.data.DailyForecasts,
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
            <List
                dataSource={this.state.data}
                style={{width: "50%"}}
                renderItem={data => (
                    <List.Item style={{margin: "0px 15px", border: "none"}}>
                        <Card style={{width: "100%"}}>
                            <Row type="flex" align="middle">
                                <Col span={2}>
                                    {moment.unix(data.EpochDate).format("ddd")}
                                    <br/>
                                    {moment.unix(data.EpochDate).format("M/D")}
                                </Col>
                                <Col span={3}>
                                    <img
                                        src={'https://www.accuweather.com/images/weathericons/' + data.Day.Icon + '.svg'}
                                        width={40} alt="icon-weather" />
                                </Col>
                                <Col span={5}>
                                    <span style={{
                                        fontSize: "26px",
                                        lineHeight: 1
                                    }}>{data.Temperature.Maximum.Value}&deg;</span>
                                    <span style={{
                                        fontSize: "16px",
                                        lineHeight: 1.33,
                                        color: "#878787"
                                    }}>/ {data.Temperature.Minimum.Value}&deg;</span>
                                </Col>
                                <Col span={8}>
                                    {data.Day.ShortPhrase}
                                </Col>
                                <Col span={6} style={{textAlign: "right"}}>
                                    Precip
                                    <br/>
                                    {data.Day.PrecipitationProbability}%
                                </Col>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        )
    }

}

export default DailyForecast;