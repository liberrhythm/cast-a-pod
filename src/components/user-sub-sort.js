import React, { Component } from "react"
import UserSubResult from "./user-sub-result"

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";
var parseString = require('xml2js').parseString;
var moment = require('moment');

// display list of ordered podcasts by episode gap
function SortedList(props) {
    let results = props.results;
    if (results.length == 13) {
        let resultsList = results.map((item, index) =>
            <UserSubResult key={index} number={index} diff={item.diff} result={item.data} />
        );

        return (
            <div style={{ height: '60vh', overflowY: 'auto' }}>
                <ul>{resultsList}</ul>
            </div>
        );
    }
    else {
        return (
            <div style={{ height: '60vh', overflowY: 'auto' }}>

            </div>
        );
    }
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

    componentDidMount() {
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
        axios.get(url)
            .then((response) => {
                let data = response.request.responseXML.children[0].children[0].children;
                let counter = 0;
                let podcast = "";
                //var arr = Array.prototype.slice.call(data);

                for (let i = 0; i < data.length; i++) {
                    if (data[i].nodeName == "title") {
                        var xml = new XMLSerializer().serializeToString(data[i]);
                        parseString(xml, (err, result) => {
                            podcast = result.title;
                            this.episodeData.push([{ podcast: podcast }]);
                        });
                    }
                    else if (data[i].nodeName == "item" && counter == 1) {
                        var xml = new XMLSerializer().serializeToString(data[i]);
                        parseString(xml, (err, result) => {
                            let item = result.item;
                            this.episodeData[this.episodeData.length - 1].push({ title: item.title[0], pubDate: item.pubDate[0], link: item.link[0] })
                        });
                        break;
                    }
                    else if (data[i].nodeName == "item") {
                        counter++;
                        var xml = new XMLSerializer().serializeToString(data[i]);
                        parseString(xml, (err, result) => {
                            let item = result.item;
                            this.episodeData[this.episodeData.length - 1].push({ title: item.title[0], pubDate: item.pubDate[0], link: item.link[0] })
                        });
                    }
                }
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
            if (this.episodeData[i].length == 3) {
                let date1 = moment(this.episodeData[i][1].pubDate);
                let date2 = moment(this.episodeData[i][2].pubDate);
                sortedData.push({ diff: date1.diff(date2, 'days'), data: this.episodeData[i] });
            }
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