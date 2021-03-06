import React, { Component } from "react";
import { firestore } from "../Firebase";

export const withGames = ComponentToWrap => {
  return class withGames extends Component {
    constructor(props) {
      super(props);

      this.state = {
        games: []
      };
    }

    componentDidMount() {
      firestore.collection("games").onSnapshot(querySnapshot => {
        const games = querySnapshot.docs.map(doc => {
          doc.data();
          return {
            id: doc.id,
            ...doc.data()
          };
        });

        this.setState({
          games
        });
      });
    }

    render() {
      const { games } = this.state;
      console.log("WITH GAMES:", games);

      const days_passed = stopDate => {
        const current = new Date().getTime();
        return Math.ceil((stopDate - current) / 86400000);
      };

      games.map(game => {
        // Game active if days to end is less than 0
        const endDate = game.day_end.seconds;
        const startDate = game.day_start.seconds;
        const totalDaysOfGame = Math.ceil((endDate - startDate) / 86400);

        const daysToEnd = days_passed(endDate * 1000);

        game.daysToEnd = daysToEnd;
        return game.daysToEnd < 0
          ? (game.active = false)
          : (game.active = true);
      });

      return <ComponentToWrap {...this.props} games={games} />;
    }
  };
};
