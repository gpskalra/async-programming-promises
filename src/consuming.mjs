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
    // rejected promise returned.
    .then(({data}) => {
        axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
        throw new Error("Error!");
    })
    // rejection handler returns a new rejected promise.
    .catch(err => {
        console.log(`error: ${err}`);
        setText(err);
        throw new Error("Second error");
    })
    // then not called.
    .then(({data}) => {
        console.log(`2nd then called.`);
        setText(`City: ${data.my.city}`);
    })
    // catch called on rejected promise.
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