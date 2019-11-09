import React, {Component} from "react";
import {Col, Row} from "antd";
import DayNightInfo from "../../components/DayNightInfo";
import SunMoonInfo from "../../components/SunMoonInfo";

class CurrentForecast extends Component {

    render() {
        return (
            <div>
                <Row style={{padding: 30}} gutter={[48, 8]}>
                    <Col span={12}>
                        <DayNightInfo title="Day" epochDate={this.props.forecast.EpochDate}
                                      airAndPollen={this.props.forecast.AirAndPollen} data={this.props.forecast.Day}
                                      temperature={this.props.forecast.Temperature.Maximum}
                                      realfeel={this.props.forecast.RealFeelTemperature.Maximum} />
                    </Col>
                    <Col span={12}>
                        <DayNightInfo title="Night" epochDate={this.props.forecast.EpochDate}
                                      airAndPollen={this.props.forecast.AirAndPollen} data={this.props.forecast.Night}
                                      temperature={this.props.forecast.Temperature.Minimum}
                                      realfeel={this.props.forecast.RealFeelTemperature.Minimum} />
                    </Col>
                </Row>
                <Row style={{padding: 30}} gutter={[48, 8]}>
                    <Col span={12}>
                        <SunMoonInfo type="SUN" data={this.props.forecast.Sun} />
                    </Col>
                    <Col span={12}>
                        <SunMoonInfo type="MOON" data={this.props.forecast.Moon} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CurrentForecast;