import { salesOrders } from 'typedefs/salesOrder.gql';
import withPaginationQuery from '../withPaginationQuery';

export default (config, responseFun) => {
  return withPaginationQuery({
    config,
    responseFun,
    defaultPropName: 'salesOrders',
    query: salesOrders,
    queryName: 'salesOrders',
  });
};
