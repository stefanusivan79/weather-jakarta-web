import React from "react";
import './index.css';

import {Row, Col} from 'antd';

const Header = () => (
    <Row className="header-container" align="middle">
        <Col>
            <h1 style={{textAlign: "center", fontSize: "5rem"}}>React Weather Jakarta</h1>
        </Col>
    </Row>
);

export default Header;