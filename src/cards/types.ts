import {z} from 'zod';

export const Suit = z.enum(['HEARTS', 'CLUBS', 'DIAMONDS', 'SPADES']);
export type Suit = z.infer<typeof Suit>;

export const FaceCard = z.enum(['ACE', 'JACK', 'QUEEN', 'KING']);
export type FaceCard = z.infer<typeof FaceCard>;

const Card = z.object({
  code: z.string(),
  image: z.string(),
  images: z.object({
    svg: z.string(),
    png: z.string(),
  }),
  value: z.string(),
  suit: Suit,
});

export type Card = z.infer<typeof Card>;

export const CardCollection = z.object({
  success: z.boolean(),
  deck_id: z.string(),
  cards: Card.array(),
  remaining: z.number(),
});

export const Deck = CardCollection.omit({cards: true}).extend({
  shuffled: z.boolean(),
});

export enum SuitFlag {
  None = 0,
  Hearts = 1,
  Clubs = 2,
  Diamonds = 4,
  Spades = 8,
  All = 15,
}
