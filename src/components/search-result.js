import React, { Component } from "react";
import styles from './search-result.module.css'
import { Button, Modal } from 'react-bootstrap'

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";
var parseString = require('xml2js').parseString;
var rp = require('request-promise');

// attempt at displaying episodes
function Episode(props) {
    let results = props.results;
    return (
        <div className={styles.ep}>
            <h4>{results.title[0]}</h4>
            <h5>{results.pubDate[0]}</h5>
            <a href={results.enclosure[0].$.url}>episode media link</a>
        </div>
    );
}

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getEpisodeData = this.getEpisodeData.bind(this);

        this.state = {
            show: false,
            episodeData: [],
            description: this.props.result.description,
            subChanges: this.props.result.subscribers - this.props.result.subscribers_last_week
        };

        // this.episodeData = [];
        // this.getEpisodeData(this.props.result.url);
    }

    componentDidMount() {
        this.modifyDescription();
    }

    // create shortened description for podcast card
    // full description is placed in modal on "show more data"
    modifyDescription() {
        if (this.state.description.length > 250) {
            this.setState({
                description: this.state.description.substring(0, 250) + "..."
            });
        }
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    // getting episode data by parsing xml data, not async
    getEpisodeData(podcast) {
        rp(podcast)
            .then((response) => {
                parseString(response, (err, result) => {
                    let data = result.rss.channel[0];
                    this.setState({
                        episodeData: {
                            podcast: data.title[0],
                            link: data.link[0],
                            ep1: data.item[0],
                            ep2: data.item[1],
                            ep3: data.item[3]
                        }
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // original api call, now have episode data from xml parsing
    /*
    getEpisodeData(podcast) {
        axios.get(baseUrl + "/api/2/data/episode.json", {
            params: {
                podcast: podcast,
                url: url
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    */

    render() {
        return (
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.cardImage}>
                        <img src={this.props.result.logo_url} />
                    </div>
                    <div className={styles.cardInfo}>
                        <h3 className={styles.cardTitle}>{this.props.result.title}</h3>
                        <h5 className={styles.cardSubtitle}>Subscribers: {this.props.result.subscribers}</h5>
                        <p className={styles.cardText}>{this.state.description}</p>
                        <a href={this.props.result.url} className={styles.cardLink}>link to podcast</a>
                        <Button bsStyle="default" onClick={this.handleShow}>show more data</Button>
                    </div>

                    <Modal style={{ margin: '0 auto' }} show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.result.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Full Description:</h4>
                            <p>{this.props.result.description}</p>
                            <h4>Podcast Website:</h4>
                            <a src={this.props.result.website}>{this.props.result.website}</a>
                            <h4>Feed URL:</h4>
                            <a src={this.props.result.url}>{this.props.result.url}</a>
                            <h4>gPodder Link:</h4>
                            <a src={this.props.result.mygpo_link}>{this.props.result.mygpo_link}</a>
                            <h4>Change in Subscribers:</h4>
                            <p>{this.state.subChanges}</p>
                        </Modal.Body>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default SearchResult
