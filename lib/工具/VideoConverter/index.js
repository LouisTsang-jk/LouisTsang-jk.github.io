const fs = require("fs").promises;
const child_process = require("child_process");

// transform all mkv files to mp4
function main () {
  fs.readdir("./video")
    .then(files => files.filter(file => file.endsWith(".mkv")))
    .then(files => files.map(file => convert(`./video/${file}`)));
}

// mkv to mp4
async function convert(file) {
  console.log(`Converting ${file}`);
  const output = file.replace(/\.mkv$/, ".mp4");
  const command = `ffmpeg -i "${file}" -vf subtitles="${file}" -c:v libx264 -crf 23 -c:a aac -strict -2 -movflags +faststart "${output}"`;
  console.log(command);
  child_process.execSync(command);
  fs.unlink(file);
}
main();