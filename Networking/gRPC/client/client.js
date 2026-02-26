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
const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;

const client = new CustomerService("127.0.0.1:30043", grpc.credentials.createInsecure());

module.exports = client;