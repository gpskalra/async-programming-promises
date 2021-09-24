import setText, {appendText, showWaiting, hideWaiting} from './results.mjs';

export function get() {
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        setText(JSON.stringify(data));
    });
}

export function getCatch(){
    axios.get("http://localhost:3000/orders/123")
    .then((result) => {
        setText(JSON.stringify(result.data));
    })
    .catch(err => {setText(err);});
}

export function chain(){
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    });
}

export function chainCatch(){
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        // my understanding - anonymous function throws an error.
        // Promise.then wraps the error into
        // a new rejected promise and returns the promise.
        return axios.my.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    // my understanding - this then is not called since the promise is rejected.
    .then(({data}) => {
        setText(`City: ${data.city}`);
    })
    // my understanding - this catch is also a rejection handler for this rejected promise.
    // so it is called.
    .catch(err => setText(err));
}
export function final(){
}

export function onunhandledrejection(event){
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
}

export function onrejectionhandled(e) {
    console.info(`Promise rejection handled: ${e.reason}`);
}