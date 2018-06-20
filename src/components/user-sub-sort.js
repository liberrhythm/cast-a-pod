import React, { Component } from "react"
import UserSubResult from "./user-sub-result"

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";
var parseString = require('xml2js').parseString;
var moment = require('moment');
var rp = require('request-promise');

// display list of ordered podcasts by episode gap
function SortedList(props) {
    let results = props.results;
    console.log(results);

    if (results.length == 18) {
        let resultsList = results.map(function (item, index) {
            return <UserSubResult key={index} number={index} diff={item.diff} result={item.data} />;
        });
        return (
            <div style={{ height: '60vh', overflowY: 'auto' }}>
                <ul>{resultsList}</ul>
            </div>
        );
    }
    return (
        <div style={{ height: '60vh', overflowY: 'auto' }}>
            loading...
        </div>
    );
}

class UserSort extends Component {
    constructor(props) {
        super(props);
        this.state = { episodeData: [], sortedData: [] };
        this.episodeData = [];

        this.search = this.search.bind(this);
        this.getEpisodeData = this.getEpisodeData.bind(this);
        this.sortData = this.sortData.bind(this);
        this.compare = this.compare.bind(this);
    }

    componentWillMount() {
        this.search();
    }

    // assume user is subscribed to top 25 podcases
    search() {
        axios.get(baseUrl + "/toplist/25.json")
            .then((response) => {
                let arr = response.data;
                for (let i = 0; i < arr.length; i++) {
                    this.getEpisodeData(arr[i].url);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // parse feed url XML file to get episode data
    getEpisodeData(url) {
        let newUrl = "https" + url.substr(4, url.length);
        rp(url)
            .then((response) => {
                parseString(response, (err, result) => {
                    let data = result.rss.channel[0];
                    this.episodeData.push({
                        podcast: data.title[0],
                        link: data.link[0],
                        ep1: data.item[0],
                        ep2: data.item[1]
                    });
                });
                this.sortData();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // calculate difference in time between episode releases and sort
    sortData() {
        let sortedData = [];
        for (let i = 0; i < this.episodeData.length; i++) {
            let date1 = moment(this.episodeData[i].ep1.pubDate[0]);
            let date2 = moment(this.episodeData[i].ep2.pubDate[0]);
            sortedData.push({ diff: date1.diff(date2, 'days'), data: this.episodeData[i] });
        }
        sortedData.sort(this.compare);
        this.setState({ sortedData: sortedData });
    }

    // sorting function for time difference (small to large)
    compare(a, b) {
        if (a.diff < b.diff)
            return -1;
        if (a.diff > b.diff)
            return 1;
        return 0;
    }

    render() {
        return (
            <div style={{ display: 'flex', alignContents: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h4>ordered podcast list based on frequency of episode releases</h4>
                <SortedList results={this.state.sortedData}></SortedList>
            </div>
        );
    }
}

export default UserSort;