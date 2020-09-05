var express = require('express');
var router = express.Router();
var fs = require('fs');

// Parse URL-encoded bodies (as sent by HTML forms)
// router.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
// router.use(express.json());


let myFileContentPath = 'test-fs-directory/test-file.txt';
let myFileContent = '';
let myFileRenderer = () => {
  if (fs.existsSync(myFileContentPath)) {
    myFileContent = fs.readFileSync(myFileContentPath, 'utf8');
  }
  else {
    myFileContent = "FILE DOES NOT EXIST YET";
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {

  myFileRenderer();

  res.render('index', { title: 'File Lifecycle with FS and Express Modules', myFileContent });
});

router.post('/', function (req, res, next) {

  let fromPOST = req.body;
  
  switch (fromPOST.request_type) {
    case "create_file":
      
      fs.writeFileSync(myFileContentPath, "");
      break;

    case "delete_file":

      fs.unlinkSync(myFileContentPath, err => {
        if (err) { throw err; }
      });
      break;

    case "update_file":

      fs.writeFileSync(myFileContentPath, fromPOST.new_text, err => {
        if (err) { throw err; }
      });
      break;

    case "append_file":

      fs.appendFileSync(myFileContentPath, `\r\n ${fromPOST.new_text}`, err => {
        if (err) { throw err; }
      });
      break;
  }

  myFileRenderer();

  res.render('index', { title: `Changes have just been made of type: ${req.body.request_type}`, myFileContent });
});

module.exports = router;
