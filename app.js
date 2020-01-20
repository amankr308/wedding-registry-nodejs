const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://aman:aman@mywedding-fqiqy.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "mywedding";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

var database, collection;

app.get("/api/wedding/registries", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if(error) {
        return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.post("/api/wedding/registries", (request, response) => {
  collection.insert(request.body, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.put("/api/wedding/registries", function(request, response) {
  collection.updateOne({ "_id": Number(request.body._id) }, {$set: {"status": request.body.status, "orderId": request.body.orderId}}, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    } else {
      response.send(result);
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("mywedding");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});