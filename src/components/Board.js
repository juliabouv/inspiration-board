import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      error: '',
    };
  }

  componentDidMount() {
    axios.get(`https://inspiration-board.herokuapp.com/boards/${this.props.boardName}/cards`)
      .then((response) => {
        const allCards = response.data.map((hash) => {
          return hash.card
        })
        this.setState({ cards: allCards });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  deleteCard = (cardId) => {
    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)
      .then((response) => {
        const cardList = this.state.cards.filter((card) => card.id !== cardId);
  
        this.setState({ cards: cardList });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  cardItems = () => {
    return this.state.cards.map((card, i) => {
      return (
      <Card
        key={i}
        deleteCardCallback={this.deleteCard}
        {...card}
      />
      )
    });
  }


  render() {
    return (
      <div>
        <h1>{this.state.error}</h1>
        {console.log(this.state.cards)}
        {this.cardItems()}
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
