import React, { Component } from 'react'
import Link from 'gatsby-link'
import GenSearch from '../components/gen-search'
import { Form, FormGroup, FormControl, ControlLabel, Button, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import GenreSearch from '../components/genre-search';
import PopularitySearch from '../components/popularity-search';


const SearchPage = () => (
  <div className="container" style={{width: '100%', textAlign: 'center'}}>
    <h3>query for podcasts</h3>
    <Tab.Container id="search-type" defaultActiveKey="first">
      <div>
        <Row className="clearfix" key="type">
          <Col sm={12}>
            <Nav bsStyle="pills" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NavItem eventKey="term">By Term</NavItem>
              <NavItem eventKey="genre">By Genre</NavItem>
              <NavItem eventKey="popularity">By Popularity</NavItem>
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
              <Tab.Pane eventKey="popularity">
                <PopularitySearch></PopularitySearch>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </Tab.Container>
  </div>
)

export default SearchPage
