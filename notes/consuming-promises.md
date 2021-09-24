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
4. A single catch added at the end of the chain will catch any error from the beginning till that catch.
```
export function chainCatch(){
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        // axios.my is undefined.
        return axios.my.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({data}) => {
        // data.my is undefined.
        setText(`City: ${data.my.city}`);
    })
    .catch(err => setText(err));
}
```
We can add more catch sections in the chain. Each catch will catch all errors starting from (and including) the previous catch and upto that catch. If we use mutiple catch, we should make the catch handle all errors thoroughly - make sure to return appropriate object for the next then if needed or throw errors if needed or just appropriately handle the error. Returning an undefined from a catch can lead to additional errors in code.
```
export function chainCatch(){
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
        throw new Error("Error!");
    })
    .catch(err => {
        if (err.includes("abc")) {
            throw new Error("abc error");
        } else {
            return {data: {}};
        }
    })
    .then(({data}) => {
        setText(`City: ${data.my.city}`);
    })
    .catch(err => setText(err));
}
```