// file: proxy.meta.jss
const target = { message: "Hello" };

const handler = {
  get(obj, prop) {
    console.log(`Accessing property: ${prop}`);
    return prop in obj ? obj[prop] : "Not Found";
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message); // Logs: Accessing property: message → Hello
console.log(proxy.other);   // Logs: Accessing property: other → Not Found
