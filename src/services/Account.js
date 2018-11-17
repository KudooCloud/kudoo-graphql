import graphqlRequest from "./index";
import * as AccountQuery from "typedefs/account.gql";

class Account {
  static async me() {
    return graphqlRequest.call(AccountQuery.me);
  }
}

export default Account;