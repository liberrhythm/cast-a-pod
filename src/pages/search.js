import React from 'react'
import GenSearch from '../components/gen-search'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import GenreSearch from '../components/genre-search'

const SearchPage = () => (
  <div className="container" style={{width: '100%', textAlign: 'center'}}>
    <h3>query for podcasts by data</h3>
    <Tab.Container id="search-type" defaultActiveKey="first">
      <div>
        <Row className="clearfix" key="type">
          <Col sm={12}>
            <Nav bsStyle="pills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NavItem eventKey="term">by term</NavItem>
              <NavItem eventKey="genre">by genre</NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className="clearfix" key="content">
          <Col sm={12}>
            <Tab.Content animation>
              <Tab.Pane eventKey="term">
                <GenSearch></GenSearch>
              </Tab.Pane>
              <Tab.Pane eventKey="genre">
                <GenreSearch></GenreSearch>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  </div>
)

export default SearchPage
