import {useMutation, useQuery, useQueryClient} from 'react-query';

import api from './api';

const deckKey = 'deck';
const handKey = 'hand';

export const useDecks = (options?: {enabled: boolean}) => {
  const queryClient = useQueryClient();

  return useQuery(deckKey, () => api.getDecks(), {
    enabled: options?.enabled,
    onSuccess: () => {
      // If there is an existing query for a hand, this will
      // invalidate the hand. This causes react-query to fetch a new hand.
      queryClient.invalidateQueries(handKey);
    },
  });
};

export const useHand = (deckId: string, options?: {enabled: boolean}) =>
  useQuery(handKey, () => api.getHand(deckId), {enabled: options?.enabled});

export const useReturnHand = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (deckId: string) => {
      return api.returnHand(deckId);
    },
    {
      onSuccess: () => {
        // Similar to above, this will cause the useHand query to
        // fetch a new hand.
        queryClient.invalidateQueries(handKey);
      },
    },
  );
};
