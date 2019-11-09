import React, {Component} from "react";

import {Card, Col, Divider, Row} from 'antd';
import moment from "moment";

const TitleCard = (title, epochDate) => (
    <div>
        <Row>{title}</Row>
        <Row>{moment.unix(epochDate).format("M/D")}</Row>
    </div>
);

class DayNightInfo extends Component {

    render() {
        return (
            <Card title={TitleCard(this.props.title, this.props.epochDate)}>
                <Row>
                    <Col span={12}>
                        <img src={'https://www.accuweather.com/images/weathericons/' + this.props.data.Icon + '.svg'}
                             width={100} alt="icon-weather" />
                    </Col>
                    <Col span={12}>
                        <Row><span
                            style={{fontSize: 50}}>{this.props.temperature.Value}&deg;{this.props.temperature.Unit}</span></Row>
                        <Row>RealFeel&reg; {this.props.realfeel.Value}&deg;{this.props.realfeel.Unit}</Row>
                    </Col>
                </Row>
                <Row style={{paddingTop: 10}}>{this.props.data.LongPhrase}</Row>

                <Divider/>

                <Row>
                    <Col span={12}>
                        <Row>Precipitation: {this.props.data.PrecipitationProbability}%</Row>
                        {this.props.airAndPollen.map(obj => {
                            if (obj.Name === 'UVIndex' && this.props.title === 'Day') {
                                return (
                                    <Row>
                                        Max UV Index: {obj.Value} ({obj.Category})
                                    </Row>
                                )
                            }
                        })}
                        <Row>Thunderstorms: {this.props.data.ThunderstormProbability}%</Row>
                        <Row>Precipitation: {this.props.data.TotalLiquid.Value} {this.props.data.TotalLiquid.Unit}</Row>
                        <Row>Rain: {this.props.data.Rain.Value} {this.props.data.Rain.Unit}</Row>
                        <Row>Snow: {this.props.data.Snow.Value} {this.props.data.Snow.Unit}</Row>
                        <Row>Ice: {this.props.data.Ice.Value} {this.props.data.Ice.Unit}</Row>
                        <Row>Hours of Precipitation: {this.props.data.HoursOfPrecipitation}</Row>
                        <Row>Hours of Rain: {this.props.data.HoursOfRain}</Row>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default DayNightInfo;