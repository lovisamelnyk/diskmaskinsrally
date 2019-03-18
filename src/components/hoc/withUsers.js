import React, { Component } from "react";
import firestore from "../firestore";

export const withUsers = Component => {
  return class WithUsers extends Component {
    constructor(props) {
      super(props);

      this.state = {
        users: []
      };
    }

    componentDidMount() {
      console.log("WITH USERS DID MOUNT");

      firestore.collection("users").onSnapshot(querySnapshot => {
        const users = querySnapshot.docs.map(doc => doc.data());

        this.setState({
          users
        });

        console.log("Users: ", users);
      });
    }

    render() {
      const { users } = this.state;

      console.log("WITH USERS PROPS", users);

      return (
        <Component {...this.props} ENPROPPAJAKEL="PROPPFAN" users={users} />
      );
    }
  };
};