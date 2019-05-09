import * as query from "typedefs/apInvoice.gql";
import withMutation from "../withMutation";

export default config => {
  return withMutation({
    config,
    mutation: query.createApInvoice,
    mutationName: "createApInvoice",
    defaultPropName: "createApInvoice"
  });
};
