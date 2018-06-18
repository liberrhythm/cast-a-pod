import React, { Component } from "react";
import AdvSearchResult from "./advanced-search-result"
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";
const ke = require("keyword-extractor");

function AdvSearchList(props) {
    const results = props.results;

    let resultsList = results.map((item, index) =>
        <AdvSearchResult key={index} word={item[0]} result={item[1]}></AdvSearchResult>
    );

    return (
        <div style={{ width: '50vh', height: '50vh', overflowY: 'auto' }}>
            <ul>{resultsList}</ul>
        </div>
    );
}

class DescSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { duplicates: [], properNouns: [] };
        this.search = this.search.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.parseDescriptions = this.parseDescriptions.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.search(this.state.value);
        event.preventDefault();
    }

    search(term) {
        axios.get(baseUrl + "/search.json", {
            params: {
                q: term
            }
        })
            .then((response) => {
                this.parseDescriptions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    parseDescriptions(data) {
        let allWords = new Map();
        let allProperNouns = new Map();
        for (let i = 0; i < data.length; i++) {

            let desc = data[i].description;
            var extraction_result = ke.extract(desc, {
                language: "english",
                remove_digits: true,
                return_changed_case: false,
                remove_duplicates: false
            });

            for (let j = 0; j < extraction_result.length; j++) {
                let word = extraction_result[j];
                let char = word.charAt(0);

                if (word.length > 2) {
                    if (char == char.toUpperCase() && typeof (char) != "number") {
                        if (!allProperNouns.has(word)) {
                            allProperNouns.set(word, [data[i]]);
                        }
                        else {
                            allProperNouns.get(word).push(data[i]);
                        }
                    }
                    else {
                        if (!allWords.has(word)) {
                            allWords.set(word, [data[i]]);
                        }
                        else {
                            allWords.get(word).push(data[i]);
                        }
                    }           
                }
            }
        }

        let duplicates = new Map();
        allWords.forEach(function (value, key) {
            if (value.length > 4) {
                duplicates.set(key, value);
            }
        });

        let properNouns = new Map();
        allProperNouns.forEach(function (value, key) {
            if (value.length > 4) {
                properNouns.set(key, value);
            }
        });

        this.setState({ duplicates: Array.from(duplicates), properNouns: Array.from(properNouns) });
    }

    render() {
        return (
            <div style={{ display: 'flex-column', justifyContent: 'center' }}>
                <Form inline onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup controlId="formInlineQuery">
                        <ControlLabel style={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}>term:</ControlLabel>
                        <FormControl style={{ marginTop: '5px', marginBottom: '5px' }} type="text" onChange={this.handleChange} />
                    </FormGroup>{' '}
                    <Button bsStyle="primary" style={{ marginTop: '5px', marginBottom: '5px' }} type="submit">search</Button>
                </Form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{margin: '10px'}}>
                        <h4>most observed description phrases</h4>
                        <AdvSearchList results={this.state.duplicates}></AdvSearchList>
                    </div>
                    <div style={{margin: '10px'}}>
                        <h4>most observed proper nouns</h4>
                        <AdvSearchList results={this.state.properNouns}></AdvSearchList>
                    </div>
                </div>
            </div>
        );
    }
}

export default DescSearch;