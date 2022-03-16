const Realm = require('realm');

const realmApp = new Realm.App({ id: "versiont-realm-jhmof" });


//define object schem for user

const m_user = {
    "title": "m_user",
    "properties": {
      "Range": {
        "bsonType": "int"
      },
      "__v": {
        "jsonType": "int"
      },
      "_id": {
        "bsonType": "objectId"
      },
      "email_id": {
        "bsonType": "string"
      },
      "first_name": {
        "bsonType": "string"
      },
      "img": {
        "bsonType": "string"
      },
      "last_name": {
        "bsonType": "string"
      },
      "location": {
        "bsonType": "object",
        "properties": {}
      },
      "password": {
        "bsonType": "string"
      }
    }
  }

  async function handleLogin() {
    // Create a Credentials object to identify the user.
    // Anonymous credentials don't have any identifying information, but other
    // authentication providers accept additional data, like a user's email and
    // password.
    const credentials = Realm.Credentials.anonymous();
    // You can log in with any set of credentials using `app.logIn()`
    const user = await app.logIn(credentials);
    console.log(`Logged in with the user id: ${user.id}`);
  };
  handleLogin().catch(err => {
    console.error("Failed to log in:", err)
  });

  async function run() {
    await app.logIn(new Realm.Credentials.anonymous());
    // When you open a synced realm, the SDK automatically automatically
    // creates the realm on the device (if it didn't exist already) and
    // syncs pending remote changes as well as any unsynced changes made
    // to the realm on the device.
    const realm = await Realm.open({
      schema: [TaskSchema],
      sync: {
        user: app.currentUser,
        partitionValue: "myPartition",
      },
    });
    // The myPartition realm is now synced to the device. You can
    // access it through the `realm` object returned by `Realm.open()`
  }
  run().catch(err => {
    console.error("Failed to open realm:", err)
  });