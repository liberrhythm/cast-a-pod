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
        this.props.chosenTag(tag);
    }

    getTopTags() {
        axios.get(baseUrl + "/api/2/tags/50.json")
            .then((response) => {
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

    const tagsList = tags.map((item, index) =>
        <Button bsStyle="default" id={item.tag} key={index}>{item.tag}</Button>
    );
    return (
        <div id="tagslist" style={{ display: 'none' }}>
            <ul>{tagsList}</ul>
        </div>
    );
}

function SearchList(props) {
    const results = props.results;
    const resultsList = results.map((item, index) =>
        <SearchResult key={index} result={item} />
    );
    return (
        <div id="resultslist" style={{height: '30vh', overflowY: 'auto'}}>
            <ul>{resultsList}</ul>
        </div>
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

    // get the top 20 tags for the user to choose from
    search(tag) {
        axios.get(baseUrl + "/api/2/tag/" + tag + "/20.json")
            .then((response) => {
                this.setState({ results: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // allow showing or hiding of retrieved tags
    toggleGenres() {
        var tagslist = document.getElementById("tagslist");
        var resultslist = document.getElementById("resultslist");
        if (tagslist.style.display === "none") {
            tagslist.style.display = "block";
            resultslist.style.height = "30vh";
        } else {
            tagslist.style.display = "none";
            resultslist.style.height = "60vh";
        }
    }

    render() {
        return (
            <div style={{ display: 'flex-column', justifyContent: 'center' }}>
                <Form inline onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup controlId="formInlineQuery">
                        <ControlLabel style={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}>genre:</ControlLabel>
                        <FormControl style={{ marginTop: '5px', marginBottom: '5px' }}type="text" onChange={this.handleChange} />
                    </FormGroup>{' '}
                    <Button bsStyle="primary" style={{ marginTop: '5px', marginBottom: '5px', marginRight: '5px' }} type="submit">search</Button>
                    <Button bsStyle="primary" style={{ marginTop: '5px', marginBottom: '5px' }} id="showgenresbutton" onClick={this.toggleGenres}>show/hide genres</Button>
                </Form>  
                <TopTags></TopTags>
                <SearchList results={this.state.results}></SearchList>
            </div>

        );
    }
}

export default GenreSearch;