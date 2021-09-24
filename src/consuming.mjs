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
        if (result.status === 200) {
            setText(JSON.stringify(result.data));
        } else {
            setText("Error");
        }
    });
}

export function chain(){
}

export function chainCatch(){
}
export function final(){
}

export function onunhandledrejection(event){
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
}