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
        this.state = { results: [], sortedResults: [] };
        this.search = this.search.bind(this);

        this.search();
    }

    // get top 100 podcasts
    // sort by change in subscribers (current - last week)
    search() {
        axios.get(baseUrl + "/toplist/100.json")
            .then((response) => {
                let arr = response.data;
                console.log(arr);
                this.setState({ results: response.data });
                for (var i = 0; i < arr.length; i++) {
                    let data = arr[i];
                    if (data.subscribers - data.subscribers_last_week > 0) {
                        console.log(data.title);
                    }
                    else {
                        console.log("psyccchhh");
                    }
                }
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

export default GrowthSearch;