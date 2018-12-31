import { ApolloLink, Observable} from 'apollo-link';

const DEFAULT_TIMEOUT  = 15000;

/**
 * Aborts the request if the timeout expires before the response is received.
 */
export default class TimeoutLink extends ApolloLink {
  timeout;

  constructor(timeout) {
    super();
    this.timeout = timeout || DEFAULT_TIMEOUT;
  }

  request(operation, forward ) {
    let controller ;
    let ctxTimeout;
    let retryCB;

    // override timeout from query context
    ctxTimeout = operation.getContext().timeout || null;
    if(ctxTimeout <= 0) {
      ctxTimeout = null;
    }

    retryCB = operation.getContext().retryCB;

    // add abort controller and signal object to fetchOptions if they don't already exist
    if (typeof AbortController !== 'undefined') {
      const context = operation.getContext();
      let fetchOptions = context.fetchOptions || {};

      controller = fetchOptions.controller || new AbortController();

      fetchOptions = { ...fetchOptions, controller, signal: controller.signal };
      operation.setContext({ fetchOptions });
    }

    const chainObservable = forward(operation); // observable for remaining link chain

    const operationType = (operation.query.definitions).find(
      (def) => def.kind === 'OperationDefinition').operation;

    if (this.timeout <= 0 || operationType === 'subscription') {
      return chainObservable; // skip this link if timeout is zero or it's a subscription request
    }

    // create local observable with timeout functionality (unsubscibe from chain observable and
    // return an error if the timeout expires before chain observable resolves)
    const localObservable = new Observable(observer => {
      let timer;

      // listen to chainObservable for result and pass to localObservable if received before timeout
      const subscription = chainObservable.subscribe(
        result => {
          console.log('got data');
          retryCB(false)
          clearTimeout(timer);
          observer.next(result);
          observer.complete();
        },
        error => {
          clearTimeout(timer);
          observer.error(error);
          observer.complete();
        }
      );

      const abortRequest = (cancel) => {
        if (controller) {
          controller.abort(); // abort fetch operation
        }

        observer.error(cancel ? new Error('Canceled') : new Error('Timeout exceeded'));
        subscription.unsubscribe();
      }

      // if timeout expires before observable completes, abort call, unsubscribe, and return error

      const start = new Date();
      timer = setTimeout(() => {
        if ( retryCB) {
          console.log('timed out')
          
          retryCB(true, abortRequest, (new Date().getTime() - start.getTime()));
        }
        else
          abortRequest();
      }, ctxTimeout || this.timeout);

      // this function is called when a client unsubscribes from localObservable
      return () => {
        console.log('end')
        clearTimeout(timer);
        subscription.unsubscribe();
        retryCB(false);
      };
    });

    return localObservable;
  }
}