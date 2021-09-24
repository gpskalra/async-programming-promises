1. axios is a promise based wrapper over xmlhttprequest. When a promise is fulfilled, then function will be called. We can give a success callback to then function.
```
export function get() {
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        setText(JSON.stringify(data));
    });
}
```