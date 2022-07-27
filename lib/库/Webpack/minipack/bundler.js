const fs = require("fs");
const path = require("path");
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const config = require('./webpack.config');

let ID = 0;

function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = babel.parseSync(content, {
    sourceType: "module"
  })

  const deps = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    }
  })
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  const id = ID++;
  return {
    id,
    filename,
    deps,
    code
  }
}

function createGraph (entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};
    asset.deps.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    })
  }
  return queue
}

function bundle (graph) {
  let modules = '';
  graph.forEach(module => {
    modules += `${module.id}: [
      function (require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ],`
  })
  const result = `
    (function (modules) {
      function require (id) {
        const [fn, mapping] = modules[id];

        function localRequire (name) {
          return require(mapping[name])
        }
        const module = { exports: {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `
  return result
}

const graph = createGraph(config.entry)
const result = bundle(graph);
const { filename, path: filePath } = config.output
fs.writeFileSync(`${filePath}/${filename}`, result, {
  encoding: 'utf-8'
})
console.log(result)