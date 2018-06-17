import React from 'react'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import PopularitySearch from '../components/popularity-search';
import GrowthSearch from '../components/growth-search'

const DiscoverPage = () => (
  <div className="container" style={{width: '100%', textAlign: 'center'}}>
    <h3>discover podcasts</h3>
    <Tab.Container id="search-type" defaultActiveKey="first">
      <div>
        <Row className="clearfix" key="type">
          <Col sm={12}>
            <Nav bsStyle="pills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NavItem eventKey="popularity">by popularity</NavItem>
              <NavItem eventKey="growth">by growth</NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className="clearfix" key="content">
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="popularity">
                <PopularitySearch></PopularitySearch>
              </Tab.Pane>
              <Tab.Pane eventKey="growth">
                <GrowthSearch></GrowthSearch>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  </div>
)

export default DiscoverPage
