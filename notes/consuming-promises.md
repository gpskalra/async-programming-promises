1. axios is a promise based wrapper over xmlhttprequest. When a promise is fulfilled, then function will be called. We can give a success callback to then function.
```
export function get() {
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        setText(JSON.stringify(data));
    });
}
```
2. Use catch to handle rejection. Not using catch here would lead to a "unhandled rejection" event and also bubble up an uncaught error to the console.
```
export function getCatch(){
    axios.get("http://localhost:3000/orders/123")
    .then((result) => {
        setText(JSON.stringify(result.data));
    })
    .catch(err => {setText(err);});
}
```
3. then and catch return promises. Use chained thens to perform a second async operation using the results from the first. Make sure to return a promise from the first then.
```
export function chain(){
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        setText(`City: ${data.city}`);
    })
}
```