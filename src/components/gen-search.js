import React, { Component } from "react"
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
        <div style={{height: '60vh', overflowY: 'auto'}}>
            <ul>{resultsList}</ul>
        </div>
    );
}

class GenSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', results: [] };
        this.search = this.search.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.search(this.state.value);
        event.preventDefault();
    }

    // general gpodder search with term parameter
    search(term) {
        axios.get(baseUrl + "/search.json", {
            params: {
                q: term
            }
        })
            .then((response) => {
                this.setState({ results: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ display: 'flex-column', justifyContent: 'center' }}>
                <Form inline onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup controlId="formInlineQuery">
                        <ControlLabel style={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}>term:</ControlLabel>
                        <FormControl style={{ marginTop: '5px', marginBottom: '5px' }}type="text" onChange={this.handleChange} />
                    </FormGroup>{' '}
                    <Button bsStyle="primary" style={{ marginTop: '5px', marginBottom: '5px' }} type="submit">search</Button>
                </Form>
                <SearchList results={this.state.results}></SearchList>
            </div>

        );
    }
}

export default GenSearch;