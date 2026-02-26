const PROTO_PATH = './customers.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// load 'customers.proto' file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, // i.e., keeping it case-sensitive
  longs: String, // converting long values to string
  enums: String, // converting enum values to string
  arrays: true, // allowing array values
});

// to load the package definition and get the 'customers' service
const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers = [
    { id: 'asdwd', name: "John Doe", age: 30 , address: "Gurgaon"},
    { id: 'dewcerf', name: "Jane Smith", age: 25 , address: "Noida"},
]

server.addService(customersProto.CustomerService.service, {
    getAll: (call, callback) => {     // here call is acting like "this" in JS
        callback(null, { customers }); // sending the response back to the client with the list of customers and no context that is null 
    },
    get: (call, callback) => {
        let customer = customers.find(c => c.id === call.request.id); // call.request contains the parameters sent by the client, in this case, we are looking for the customer with the id that matches the id sent by the client
        if(customer){
            callback(null, customer); // if the customer is found, we send it back to the client with no error (null)
        } else {
            callback({ code: grpc.status.NOT_FOUND, details: "Customer not found" }); // if the customer is not found, we send an error back to the client with the NOT_FOUND status code and a message
        }
    },
    insert: (call, callback) => {
        let newCustomer = call.request; // call.request contains the parameters sent by the client, in this case, we are expecting a new customer object
        newCustomer.id = Math.random().toString(36).substring(2, 7); // we generate a random id for the new customer
        customers.push(newCustomer); // we add the new customer to our list of customers
        callback(null, newCustomer); // we send the newly added customer back to the client with no error (null)

    },
    update: (call, callback) => {
        let customer = customers.find(c => c.id === call.request.id); // call.request contains the parameters sent by the client, in this case, we are looking for the customer with the id that matches the id sent by the client
        if(customer){
            customer.name = call.request.name || customer.name; 
            customer.age = call.request.age || customer.age;
            customer.address = call.request.address || customer.address;
            callback(null, customer); 
        } else {
            callback({ code: grpc.status.NOT_FOUND, details: "Customer not found" }); 
        }

    },
    remove: (call, callback) => {
        let index = customers.findIndex(c => c.id === call.request.id); // call.request contains the parameters sent by the client, in this case, we are looking for the index of the customer with the id that matches the id sent by the client
        if(index !== -1){
            customers.splice(index, 1); // if the customer is found, we remove it from our list of customers
            callback(null, {}); // we send an empty response back to the client with no error (null)
        } else {
            callback({ code: grpc.status.NOT_FOUND, details: "Customer not found" }); // if the customer is not found, we send an error back to the client with the NOT_FOUND status code and a message
        }
    }
})

// binding the server to the specified address and port, and using insecure credentials for simplicity such that random clients can connect without authentication. In production, you should use secure credentials.
// bindAsync requires a callback as the third argument; the callback receives an error (if any) and the port number.
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Server failed to bind:', err);
        return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
});