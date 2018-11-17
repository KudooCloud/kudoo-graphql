import fetch from "cross-fetch";
import { createHttpLink } from "apollo-link-http";
import get from "lodash/get";
import { execute, makePromise, ApolloLink } from "apollo-link";

class GraphQLRequest {
  constructor() {
    const httpLink = createHttpLink({
      uri: process.env.GRAPHQL_API_URL,
      fetch
    });
    const middlewareLink = new ApolloLink((operation, forward) => {
      const token = this.userToken;
      const companyId = this.companyToken;
      let headers = {};
      if (token) {
        headers.UserAuth = `Menshen ${token}`;
      }
      if (companyId) {
        headers.CompanyAuth = `Menshen ${companyId}`;
      }
      operation.setContext({
        headers
      });
      return forward(operation);
    });

    this.link = ApolloLink.from([middlewareLink, httpLink]);
  }

  get userToken() {
    return this._userToken;
  }

  set userToken(token) {
    this._userToken = token;
  }

  get companyToken() {
    return this._companyToken;
  }

  set companyToken(token) {
    this._companyToken = token;
  }

  call(query, variables) {
    return makePromise(execute(this.link, { query, variables }));
  }

  async getNode(query, id) {
    try {
      const res = await this.call(query, { id });
      if (get(res, "errors")) {
        return {
          errors: get(res, "errors")
        };
      } else {
        return get(res, "data.node");
      }
    } catch (error) {
      return {
        errors: error
      };
    }
  }

  async getAll(name, query, variables) {
    try {
      const res = await this.call(query, variables);
      if (get(res, "errors")) {
        return {
          errors: get(res, "errors")
        };
      } else {
        const edges = get(res, `data.${name}.edges`, []);
        const nodes = edges.map(({ node }) => node);
        return {
          nodes,
          pageInfo: get(res, `data.${name}.pageInfo`, {})
        };
      }
    } catch (error) {
      return {
        errors: error
      };
    }
  }
}

export default new GraphQLRequest();
