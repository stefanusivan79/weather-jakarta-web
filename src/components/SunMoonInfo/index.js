import React from "react";

import {Card, Col, Row} from 'antd';
import moment from "moment";

const SunMoonInfo = ({type, data}) => (
    <Card title={type === 'SUN' ? 'SUNRISE/SUNSET' : 'MOONRISE/MOONSET'}>
        <Row style={{paddingBottom: 20}}>
            <Col span={12}>
                <img width={100} src={type === 'SUN' ? "https://www.accuweather.com/images/weathericons/1.svg"
                    : "https://www.accuweather.com/images/weathericons/33.svg"} alt={type}/>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <span style={{fontSize: 25}}>{type === 'SUN' ? 'Sunrise' : 'Moonrise'}</span>
                <br/>
                <span style={{fontFamily: 'initial', fontSize: "xx-large"}}>
                    {moment.unix(data.EpochRise).format("hh:mm A")}
                </span>
            </Col>
            <Col span={12}>
                <span style={{fontSize: 25}}>{type === 'SUN' ? 'Sunset' : 'Moonset'}</span>
                <br/>
                <span style={{fontFamily: 'initial', fontSize: "xx-large"}}>
                    {moment.unix(data.EpochSet).format("hh:mm A")}
                </span>
            </Col>
        </Row>
    </Card>
);

export default SunMoonInfo;