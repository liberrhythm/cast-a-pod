import React from 'react'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import DescSearch from '../components/advanced-search';

const AdvancedSearchPage = () => (
  <div className="container" style={{width: '100%', textAlign: 'center'}}>
    <h3>deep search for podcasts by term</h3>
    <Tab.Container id="search-type" defaultActiveKey="first">
      <div>
        <Row className="clearfix" key="type">
          <Col sm={12}>
            <Nav bsStyle="pills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NavItem eventKey="desc">by description</NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className="clearfix" key="content">
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="desc">
                <DescSearch></DescSearch>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  </div>
)

export default AdvancedSearchPage
