import graphqlRequest from './Request';
import { invoiceHookups } from 'typedefs/invoiceHookup.gql';

class InvoiceHookups {
  static async getAll({ where } = {}) {
    return graphqlRequest.getAll('invoiceHookups', invoiceHookups, {
      where,
    });
  }
}

export default InvoiceHookups;
