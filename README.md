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

### 2.1 Create a new database on MongoDB Atlas

https://www.mongodb.com/docs/atlas/getting-started/

### 2.2 Connect to MongoDB Atlas

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

## Step 3: User registration

### 3.1 Create UserSchema

```javascript
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    name: { type: String, required: true },
    roles: {
      type: [
        {
          type: String,
          enum: ["patient", "admin", "doctor"],
        },
      ],
      default: "patient",
    },
  },
  { timestamps: true }
);

// export model
const User = model("User", UserSchema);
module.exports = User;
```

### 3.2 Create Patient Schema

```javascript
const { Schema, model } = require("mongoose");

const PatientSchema = new Schema(
  {
    city: { type: String, required: true, default: "NY" },
  },
  { timestamps: true }
);

const Patient = model("Patient", PatientSchema);

module.exports = Patient;
```

### 3.3 Add registration route

#### auth.js

```javascript
// @route   POST/api/auth/register
// @desc    Create a new user
// @access  Public
// @route   POST/api/auth/register
// @desc    Create a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    // Hash PASSWORD
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      name: req.body.name,
    });

    // Save user to database
    const savedUser = await newUser.save();

    //Add user to patients database
    const newPatient = new Patient({
      _id: savedUser._id,
    });

    const savedPatient = await newPatient.save();

    return res.json(savedUser);
  } catch (error) {
    console.log("[*] Error: " + error);

    res.status(500).send(error.message);
  }
});
```

## Step 4: Add user validation

Adds the following files:

- registerValidation.js
- isEmpty.js

```javascript

router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check for existing user
    const existingEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ erros: "There is already a user with this email" });
    }

    // Hash PASSWORD
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
```

## Step 5: Add cookies

## Step 6: Authorize only authenticated users

Adds middleware/permission.js to check if the user is authenticated.
