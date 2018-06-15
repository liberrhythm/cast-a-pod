import React, { Component } from "react";
import Link from 'gatsby-link'
import SearchResult from "./search-result"
import { Form, FormGroup, FormControl, ControlLabel, Button, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";

class TopTags extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] };
        this.getTopTags = this.getTopTags.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getTopTags();
    }

    handleClick(tag) {
        console.log(tag);
        this.props.chosenTag(tag);
    }

    getTopTags() {
        axios.get(baseUrl + "/api/2/tags/50.json")
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
                <TopTagsList results={this.state.results}></TopTagsList>
            </div>
        );
    }
}

function TopTagsList(props) {
    const tags = props.results;
    console.log(tags);

    const tagsList = tags.map((item, index) =>
        <Button bsStyle="default" id={item.tag} key={index}>{item.tag}</Button>
    );
    return (
        <ul>{tagsList}</ul>
    );
}

function SearchList(props) {
    const results = props.results;
    const resultsList = results.map((item, index) =>
        <SearchResult key={index} result={item} />
    );
    return (
        <ul>{resultsList}</ul>
    );
}

class GenreSearch extends Component {
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

    search(tag) {
        axios.get(baseUrl + "/api/2/tag/" + tag + "/20.json")
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
            <div style={{ display: 'flex-column', justifyContent: 'center' }}>
                <Form inline onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup controlId="formInlineQuery">
                        <ControlLabel style={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}>genre:</ControlLabel>
                        <FormControl style={{ marginTop: '5px', marginBottom: '5px' }}type="text" onChange={this.handleChange} />
                    </FormGroup>{' '}
                    <Button style={{ marginTop: '5px', marginBottom: '5px' }} type="submit">search</Button>
                </Form>  
                <TopTags></TopTags>
                <SearchList results={this.state.results}></SearchList>
            </div>

        );
    }
}

export default GenreSearch;