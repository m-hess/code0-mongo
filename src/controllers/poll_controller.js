import Poll from '../models/poll';


export const getPolls = () => {
  // should return a promise that returns a list of polls
};

export const createPoll = (poll) => {
  // takes in an object with the fields that poll should shave
  // and saves them to the database
  // returns a promise
};

export const vote = (pollID, upvote) => {
  // takes in the poll id to update and a boolean of whether
  // to update or not.
  // returns a promise
}
