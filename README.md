# medicalApp

## Step 1: Setup Node server

```bash
mkdir medicalApp
cd medicalApp

npm init --yes
npm i express dotenv

npm i --save-dev nodemon concurrently
```

To start the server:

```bash
npm run server
```

## Step 2: Connect server to MongoDB Atlas

## 2.1 Create a new database on MongoDB Atlas

https://www.mongodb.com/docs/atlas/getting-started/

## 2.2 Connect to MongoDB Atlas

```bash
npm i mongoose
```

```javascript
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("[*] Connected to database");

    app.listen(process.env.PORT, (req, res) => {
      console.log("[*] Server started on port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("[*] Error: " + err);
  });
```
