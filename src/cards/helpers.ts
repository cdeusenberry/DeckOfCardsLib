import {Card, FaceCard, SuitFlag, Suit} from './types';

export const suitsFlagToString = (suit: SuitFlag) => {
  switch (suit) {
    case SuitFlag.Hearts:
      return 'Hearts';
    case SuitFlag.Clubs:
      return 'Clubs';
    case SuitFlag.Diamonds:
      return 'Diamonds';
    case SuitFlag.Spades:
      return 'Spades';
    default:
      return 'Unknown';
  }
};

export const suitsEnumToString = (suit: Suit) => {
  switch (suit) {
    case Suit.Enum.HEARTS:
      return 'Hearts';
    case Suit.Enum.CLUBS:
      return 'Clubs';
    case Suit.Enum.DIAMONDS:
      return 'Diamonds';
    case Suit.Enum.SPADES:
      return 'Spades';
    default:
      return 'Unknown';
  }
};

export const filterCardsBySuits = (cards: Card[], suits: SuitFlag) => {
  if (suits === SuitFlag.All) {
    return cards;
  }

  const validSuits: string[] = [];
  if (suits & SuitFlag.Hearts) {
    validSuits.push(Suit.Enum.HEARTS);
  }

  if (suits & SuitFlag.Clubs) {
    validSuits.push(Suit.Enum.CLUBS);
  }

  if (suits & SuitFlag.Diamonds) {
    validSuits.push(Suit.Enum.DIAMONDS);
  }

  if (suits & SuitFlag.Spades) {
    validSuits.push(Suit.Enum.SPADES);
  }

  return cards.filter(card => validSuits.includes(card.suit));
};

// Order used here:
// Hearts A-K, Clubs A-K, Diamonds A-K, Spades A-K
export const sortCards = (cards: Card[]) => {
  cards.sort(compareCards);
};

const compareCards = (a: Card, b: Card) => {
  const value = compareSuits(a, b);

  if (value !== 0) {
    return value;
  }

  return compareValues(a, b);
};

const compareSuits = (a: Card, b: Card) => {
  if (a.suit === b.suit) {
    return 0;
  }

  if (a.suit === Suit.Enum.HEARTS) {
    return -1;
  }

  if (b.suit === Suit.Enum.HEARTS) {
    return 1;
  }

  // After Hearts it is alphabetical order
  return a.suit.localeCompare(b.suit);
};

const compareValues = (a: Card, b: Card) => {
  const aNumber = convertValueToNumber(a);
  const bNumber = convertValueToNumber(b);

  return aNumber - bNumber;
};

const convertValueToNumber = (a: Card) => {
  // Going with Ace as 1, could also be 14.
  if (a.value === FaceCard.Enum.ACE) {
    return 1;
  }

  if (a.value === FaceCard.Enum.JACK) {
    return 11;
  }

  if (a.value === FaceCard.Enum.QUEEN) {
    return 12;
  }

  if (a.value === FaceCard.Enum.KING) {
    return 13;
  }

  return Number(a.value);
};
