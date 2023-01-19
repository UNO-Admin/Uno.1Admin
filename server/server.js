const express = require("express");
const cors = require("cors");
const firefird = require("node-firebird");

const app = express();

let options = {};

options.host = "localhost";
options.port = 3050;
options.database = "C:\\Development\\11312\\server\\DB.FDB";
options.user = "SYSDBA";
options.password = "masterkey";
options.lowercase_keys = false;
options.role = null;
options.pageSize = 4096;
options.pageSize = 4096;
options.retryConnectionInterval = 1000;
options.blobAsText = false;

app.use(cors());

app.use(express.json());

app.post("/getUsers", (req, res) => {
  var REQ_PARAM = req.body.getCity;

  firefird.attach(options, (err, db) => {
    if (err) {
      res.send(err);
    }
    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/addUser", (req, res) => {
  var REQ_PARAM = req.body.user;

  firefird.attach(options, (err, db) => {
    if (err) {
      res.send(err);
    }

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send("User added");
      db.detach();
    });
  });
});

app.post("/authUser", (req, res) => {
  var REQ_PARAM = req.body.getAuth;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/deleteUser", (req, res) => {
  var { deleteUser, hideUser } = req.body;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(deleteUser, (err, result) => {
      if (err) {
        db.query(hideUser, (err, result) => {
          if (err) throw err;

          res.send(result);
        });
        db.detach();
      } else res.send(result);
      db.detach();
    });
  });
});

app.post("/editUser", (req, res) => {
  var REQ_PARAM = req.body.editedUser;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/getObjects", (req, res) => {
  var REQ_PARAM = req.body.getObjects;

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/getObjectsPrices", (_, res) => {
  const REQ_PARAM = "select id,name,price,price_year from tbitems order by id;";

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM, (err, result) => {
      if (err) throw err;
      res.send(result);
      db.detach();
    });
  });
});

app.post("/setNewPassword", (req, res) => {
  const { pass, newPass, id } = req.body;
  const REQ_PARAM = {
    changePass: `update peoples set pass = hash('${newPass}') where id = ${id};`,
    checkOldPassIsCorrect: `select count(*) as cnt from peoples where id = ${id} and pass = hash('${pass}');`,
  };

  firefird.attach(options, (err, db) => {
    if (err) throw err;

    db.query(REQ_PARAM.checkOldPassIsCorrect, (err, result) => {
      if (err) throw err;

      if(result[0].CNT==1) {
        db.query(REQ_PARAM.changePass, (err, result) => {
          if (err) throw err
          res.send('true')
          db.detach()
        })
        db.detach()
      }
      else {
        res.send()
      }
    });
  });
});

app.listen(4000, () => {
  console.log("Running on port 4000...");
});
