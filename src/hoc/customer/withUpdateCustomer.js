import * as customerQuery from "typedefs/customer.gql";
import withMutation from "../withMutation";

export default config => {
  return withMutation({
    config,
    mutation: customerQuery.updateCustomer,
    mutationName: "updateCustomer",
    defaultPropName: "updateCustomer"
  });
};
