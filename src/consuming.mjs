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
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    // my understanding - anonymous function throws an error.
    // Promise.then wraps the error into
    // a new rejected promise and returns the promise.
    .then(({data}) => {
        setText(`City: ${data.my.city}`);
    })
    // my understanding - rejection handler is attached. So it is called when the promise is rejected.
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