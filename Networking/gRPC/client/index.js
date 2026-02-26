const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const e = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    client.getAll(null, (err, data) => { // null is passed as the first argument because there are no parameters to send to the getAll method. The second argument is a callback function that will be called when the response is received from the gRPC server. If there is an error, it will be passed as the first argument (err) to the callback function. If the request is successful, the data will be passed as the second argument (data) to the callback function.
        if(!err){
            res.send(data.customers);
        }
    })
})

app.post('/create', (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    client.insert(newCustomer, (err, data) => {
      if(err)  throw err;      
        
      console.log("Customer created successfully", data);
      res.send({ message: "Customer created successfully"  });
    })
})

app.post('/update', (req, res) => {

    let updatedCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    client.update(updatedCustomer, (err, data) => {
        if(err) throw err;

        console.log("Customer updated successfully", data);
        res.send({ message: "Customer updated successfully" });
    })
})

app.post('/remove', (req, res) => {
    client.remove({ id: req.body.id }, (err, _) => {
        if(err) throw err;

        console.log("Customer removed successfully");
        res.send({ message: "Customer removed successfully" });
    })

})





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port %d ${PORT}`);
});

