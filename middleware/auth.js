var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// Controller untuk register
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  var selectQuery = "SELECT email FROM user WHERE email = ?";
  var insertQuery = "INSERT INTO user SET ?";

  connection.query(selectQuery, [post.email], function (error, rows) {
    if (error) {
      console.log(error);
      // Tangani kesalahan
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat memeriksa email." });
    } else {
      if (rows.length == 0) {
        connection.query(insertQuery, post, function (error, result) {
          if (error) {
            console.log(error);
            // Tangani kesalahan
            res.status(500).json({
              error: "Terjadi kesalahan saat menambahkan data user baru.",
            });
          } else {
            response.ok("Berhasil menambahkan data user baru", res);
          }
        });
      } else {
        response.ok("Email sudah terdaftar!", res);
      }
    }
  });
};

// //Controller untuk register
// exports.registrasi = function (req, res) {
//   var post = {
//     username: req.body.username,
//     email: req.body.email,
//     password: md5(req.body.password),
//     role: req.body.role,
//     tanggal_daftar: new Date(),
//   };

//   var query = "SELECT email FROM ?? WHERE ??";
//   var table = ["user", "email", post.email];

//   query = mysql.format(query, table);

//   connection.query(query, function (error, rows) {
//     if (error) {
//       console.log(error);
//     } else {
//       if (rows.length == 0) {
//         var query = "INSERT INTO ?? SET ?";
//         var table = ["user"];

//         query = mysql.format(query, table);
//         connection.query(query, post, function (error, rows) {
//           if (error) {
//             console.log(error);
//           } else {
//             response.ok("Berhasil menambahkan data user baru", res);
//           }
//         });
//       } else {
//         response.ok("Email sudah terdaftar!");
//       }
//     }
//   });
// };
