class FileListPlugin {
  static defaultOptions = {
    outputFile: `filename.md`,
  };
  constructor(options = {}) {
    this.options = { ...FileListPlugin.defaultOptions, ...options };
  }
  apply(compiler) {
    const pluginName = FileListPlugin.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    // [thiscompilation](https://webpack.js.org/api/compiler-hooks/#thiscompilation)
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          // [stage](https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages)
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const content =
            `# In this build: \n\n` +
            Object.keys(assets)
              .map((name) => `- ${name}`)
              .join("\n");
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          );
        }
      );
    });
  }
}

module.exports = FileListPlugin;
