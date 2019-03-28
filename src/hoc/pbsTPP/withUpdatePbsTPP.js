import * as pbsTPPQuery from "typedefs/pbsTPP.gql";
import withMutation from "../withMutation";

export default config => {
  return withMutation({
    config,
    mutation: pbsTPPQuery.updatePbsTPP,
    mutationName: "updatePbsTPP",
    defaultPropName: "updatePbsTPP"
  });
};
