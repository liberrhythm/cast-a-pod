import React from 'react'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import DescSearch from '../components/advanced-search'
import UserSort from '../components/user-sub-sort'

const AdvancedSearchPage = () => (
  <div className="container" style={{width: '100%', textAlign: 'center'}}>
    <h3>dive deep into podcasts</h3>
    <Tab.Container id="search-type" defaultActiveKey="first">
      <div>
        <Row className="clearfix" key="type">
          <Col sm={12}>
            <Nav bsStyle="pills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NavItem eventKey="desc">deep search by term</NavItem>
              <NavItem eventKey="user">user subscription sorting</NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className="clearfix" key="content">
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="desc">
                <DescSearch></DescSearch>
              </Tab.Pane>
              <Tab.Pane user="desc">
                <UserSort></UserSort>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  </div>
)

export default AdvancedSearchPage
