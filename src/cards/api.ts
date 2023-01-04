import axios from 'axios';

import {CardCollection, Deck} from './types';

axios.defaults.baseURL = 'https://deckofcardsapi.com/api/deck/';

const getDecks = async (id?: string, count?: number) => {
  try {
    const deckId = id || 'new';
    const deckCount = count || 1;
    const {data} = await axios.get(
      `${deckId}/shuffle/?deck_count=${deckCount}`,
    );

    const result = Deck.safeParse(data);
    if (!result.success) {
      throw Error('Failed to parse Deck.');
    }

    if (!result.data.success) {
      throw Error('Failed to get Deck.');
    }

    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getHand = async (deckId: string, count?: number) => {
  try {
    const cardCount = count || 5;
    const {data} = await axios.get(`${deckId}/draw/?count=${cardCount}`);

    const result = CardCollection.safeParse(data);
    if (!result.success) {
      throw Error('Failed to parse CardCollection.');
    }

    if (!result.data.success) {
      throw Error('Failed to get Hand.');
    }

    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const returnHand = async (deckId: string) => {
  try {
    const {data} = await axios.get(`${deckId}/return/`);

    if (!data.success) {
      throw Error('Failed to return Hand.');
    }

    // Currently no use of the return object here.
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getDecks,
  getHand,
  returnHand,
};
