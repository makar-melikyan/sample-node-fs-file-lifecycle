# sb--node-fs-file-lifecycle
Little SandBox experiment with CRUD file operations

My Notes

1) All fs. operations are made synchronous so as they were made BEFORE the text file is rendered, so I would not have the latest version of the file displayed. Assync fs. operations finish BEFORE the fs.readFileSync takes in file's content. The documentation advises to put one assync fs. inside the other fs. in order to preserve the right order.

2) Other advanced assync methods of reading files are stream and pipe. If I were to make sandbox exambles of those, I would either output the results in the console only, or make a React app.

3) All guides say I need to use "router.use(express.urlencoded());" and "router.use(express.json());" to receive JSON data via post requests. However, disabling both in this project had no effect on data transfer. Moreover, node tells me body-parser is deprecated without an extended option, when uncomment "router.use(express.urlencoded());"

4) HOW to get the FILE NAME and PATH:

  1. path.basename(__filename) returns File NAME only

  2. __dirname returns PATH only

  3. __filename returns PATH + File NAME

5) How to assemble a PATH: "const variable = path.join(__dirname, 'aaa', 'bbb', 'ccc');"