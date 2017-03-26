const express = require('express')
const app = express()
const axios = require('axios')
const ReactDOMServer = require('react-dom/server')

app.get('/:package/:submodule?', (req, res) => {
	var packageName = req.params.package
	var subModule = req.params.submodule || false

	// todo: cache already fetched results in memory

	// todo: add flag to not inject css
	//      - accept option to return JSON { html: '...', css: '...' }

	Promise.all([
			axios.get(`https://unpkg.com/${packageName}/dist/main.js`),
			axios.get(`https://unpkg.com/${packageName}/dist/style.css`),
		])
		.then(results => {
			if (!results.length) {
				return res.status(500).send(`no package "${packageName}" results from unpkg.com`)
			}

			// use node's module
			var Module = module.constructor;
			// instantiate a module
			var mod = new Module();
			// compile js text into the module
			mod._compile(results[0].data, '')

			return {
				module: mod,
				css: results[1] && results[1].data || false
			}
		})
		.then(data =>{

			var module = data.module
			module = subModule
				? module.exports[subModule]()
				: module.exports.default
					? module.exports.default()
					: module.exports()

			const css = data.css

			try {
				var responseHtml = ReactDOMServer.renderToString(
					module
				)

				if (css) {
					responseHtml += `<style>${css}</style>`
				}

				res.send(responseHtml)
			} catch (e) {
				res.status(500)
					.send({
						error: `Error trying to render react component.`,
						meta: {
							targetPackage: packageName,
							targetPackageType: typeof module,
							targetPackageReactComponent: typeof module === 'object' && module.hasOwnProperty('ref'),
							targetPackageSubModule: subModule,
							targetPackageSubModuleType: module && (typeof module[subModule]),
						},
						trace: JSON.stringify(e),
					})
			}
		})
		.catch(err => {
			if (err && err.response) {
				return res.send(`Package name: "${packageName}" error'd - ${err.response.status} - ${err.response.statusText}`)
			}

			res.status(500)

			return res.send(err)
		})
})

app.listen(3030, function () {
	console.log('Node.js React server-side-rendering app listening on port 3030')
})