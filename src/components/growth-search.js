import React, { Component } from "react"
import SearchResult from "./search-result"

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

class GrowthSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] };
        this.search = this.search.bind(this);
        this.compare = this.compare.bind(this);

        this.search();
    }

    // get top 100 podcasts
    // sort by change in subscribers (current - last week)
    search() {
        axios.get(baseUrl + "/toplist/100.json")
            .then((response) => {
                let arr = response.data;
                arr.sort(this.compare);
                this.setState({results: arr});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // sorting function for comparing one-week subscriber changes
    compare(a, b) {
        let a_diff = a.subscribers - a.subscribers_last_week;
        let b_diff = b.subscribers - b.subscribers_last_week;

        if (a_diff > b._diff)
          return 1;
        if (a_diff < b_diff)
          return -1;
        return 0;
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SearchList results={this.state.results}></SearchList>
            </div>

        );
    }
}

export default GrowthSearch;