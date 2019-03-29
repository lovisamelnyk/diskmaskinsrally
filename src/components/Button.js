import React, { Component } from "react";
import firebase from "firebase";
import { withFirestore } from "./Firebase";

import "../scss/modules/button.scss";

class Button extends Component {
  handleCount = e => {
    e.preventDefault();
    const {
      dutyName,
      dutyScore,
      game: { id: gameId },
      user: { id: userId },
      firestore
    } = this.props;

    const dutyPath = "users." + userId + ".duty_score." + dutyName;
    const dutyPath2 = `users.${userId}.duty_score.${dutyName}`;
    console.log("dutyPath:", dutyPath, "dutyPath2:", dutyPath2);
    console.log(
      "dutyPath:",
      firestore
        .collection("games")
        .doc(gameId)
        .update({
          [`users.${userId}.duty_score.${dutyName}`]: dutyScore + 1
        })
    );

    firestore
      .collection("games")
      .doc(gameId)
      .update({
        [`users.${userId}.duty_score.${dutyName}`]: dutyScore + 1
      });
  };

  render() {
    const { dutyName } = this.props;
    return (
      <div className="container_scoreboard">
        <div style={{ padding: "50px" }}>
          <span style={{ display: "block" }}>{dutyName}</span>
          <a
            onClick={this.handleCount}
            id={dutyName}
            className="gobutton"
            href="#"
          >
            +
          </a>
        </div>
      </div>
    );
  }
}

export default withFirestore(Button);
