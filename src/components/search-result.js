import React, { Component } from "react";
import styles from './search-result.module.css'
import { Button, Modal } from 'react-bootstrap'

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getEpisodeData = this.getEpisodeData.bind(this);

        this.state = {
            show: false,
            description: this.props.result.description
        };
    }

    componentDidMount() {
        this.modifyDescription();
    }

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

    getEpisodeData() {
        axios.get(baseUrl + "/api/2/data/episode.json", {
            params: {
                podcast: "http://leo.am/podcasts/twit",
                episode: "http://www.podtrac.com/pts/redirect.mp3/aolradio.podcast.aol.com/twit/twit0245.mp3"
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <div className={styles.cardImage}>
                        <img src={this.props.result.logo_url} />
                    </div>
                    <div className={styles.cardInfo}>
                        <h5 className={styles.cardTitle}>{this.props.result.title}</h5>
                        <h6 className={styles.cardSubtitle}>Subscribers: {this.props.result.subscribers}</h6>
                        <p className={styles.cardText}>{this.state.description}</p>
                        <a href={this.props.result.url} className={styles.cardLink}>link to podcast website</a>
                        <Button bsStyle="default" onClick={this.handleShow}>show more data</Button>
                    </div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.result.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>full description:</h4>
                            <p>{this.props.result.description}</p>
                        </Modal.Body>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default SearchResult
