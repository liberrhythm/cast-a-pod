import React, { Component } from "react";
import Link from 'gatsby-link'
import SearchResult from "./search-result"
import { Form, FormGroup, FormControl, ControlLabel, Button, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";

function SearchList(props) {
    const results = props.results;
    const resultsList = results.map((item, index) =>
        <SearchResult key={index} result={item} />
    );
    return (
        <div style={{height: '70vh', overflowY: 'auto'}}>
            <ul>{resultsList}</ul>
        </div>
    );
}

class PopularitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] };
        this.search = this.search.bind(this);

        this.search();
    }

    search() {
        axios.get(baseUrl + "/toplist/50.json")
            .then((response) => {
                console.log(response.data);
                this.setState({ results: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SearchList results={this.state.results}></SearchList>
            </div>

        );
    }
}

export default PopularitySearch;