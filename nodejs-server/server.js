const express = require('express')
const app = express()
const ReactDOMServer = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const makePath = file => `../react-components/built-components/${file}`

app.get('/:component', function (req, res) {
	var responseHtml = ReactDOMServer.renderToStaticMarkup(
		require(makePath(req.params.component)).default()
	)

	fs.readFile(path.resolve(makePath(`style.css`)), (err, data) => {
		responseHtml += `<style>${data}</style>`  || ``

		res.send(responseHtml)
	})
})

app.listen(3030, function () {
	console.log('Node.js React server-side-rendering app listening on port 3030')
})