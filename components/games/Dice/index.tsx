import App from "./App";

const game = {
  name: "Dice",
  short_name: "dice",
  id: "dice",
  description: `
    Use the slider to pick a number, then roll below that number to win. Lower numbers will increase your potential payout, while higher ones are safer.
  `,
  image: "/images/play/dice.png",
  app: () => <App />,
};

export default game;
