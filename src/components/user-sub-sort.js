import React, { Component } from "react"
import SearchResult from "./search-result"

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";
var parseString = require('xml2js').parseString;
var moment = require('moment');

/*
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
*/

class UserSort extends Component {
    constructor(props) {
        super(props);
        this.state = { episodeData: [] };
        this.episodeData = [];

        this.search = this.search.bind(this);
        this.getPodcastData = this.getPodcastData.bind(this);
        this.sortData = this.sortData.bind(this);

        this.search();
    }

    search() {
        axios.get(baseUrl + "/toplist/25.json")
            .then((response) => {
                let arr = response.data;
                for (let i = 0; i < arr.length; i++) {
                    this.getPodcastData(arr[i].url);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    sortData() {
        let sortedData = [];
        console.log(this.episodeData);
        console.log("BLKELAKSJFLDJLKJFLA;KFS");
        for (let i = 0; i < this.episodeData.length; i+2) {
            let date1 = this.episodeData[i].pubDate;
            let date2 = this.episodeData[i+1].pubDate;
            console.log(moment(date1));
            console.log(moment(date2));
        }
    }

    getPodcastData(url) {
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
                            this.episodeData.push([{podcast: podcast}]);
                        });
                    }
                    else if (data[i].nodeName == "item" && counter == 1) {
                        var xml = new XMLSerializer().serializeToString(data[i]);
                        parseString(xml, (err, result) => {
                            let item = result.item;
                            this.episodeData[this.episodeData.length-1].push({title: item.title[0], pubDate: item.pubDate[0], link: item.link[0]})
                        });
                        break;
                    }
                    else if (data[i].nodeName == "item") {
                        counter++;
                        var xml = new XMLSerializer().serializeToString(data[i]);
                        parseString(xml, (err, result) => {
                            let item = result.item;
                            this.episodeData[this.episodeData.length-1].push({title: item.title[0], pubDate: item.pubDate[0], link: item.link[0]})
                        });
                    }
                }
                this.sortData();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                
            </div>

        );
    }
}

export default UserSort;