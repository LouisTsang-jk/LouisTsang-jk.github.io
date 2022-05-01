const fs = require("fs").promises;
const child_process = require("child_process");

// transform all mkv files to mp4
async function main() {
  const videoDirPath = './video'
  const dir = await fs.readdir(videoDirPath);
  const mkvFiles = dir.filter((fileName) => fileName.endsWith(".mkv")).map(fileName => convert(`${videoDirPath}/${fileName}`));
  await Promise.all(mkvFiles);
  console.log('done');
}

// mkv to mp4
function convert(file) {
  return new Promise((resolve, reject) => {
    console.log('begin convert', file);
    child_process.execSync(
      `ffmpeg -i ${file} -vf subtitles=${file}:force_style='FontName=PingFangSC-Regular' -c:v libx264 -crf 23 -preset veryfast -c:a aac -b:a 192k -strict -2 -movflags +faststart ${file.replace(
        ".mkv",
        ".mp4"
      )}`,
      (err, stdout, stderr) => {
        if (err) {
          console.warn(err);
          reject(err);
        }
        resolve(stdout);
      }
    );
  });
}

main();
// convert('./video/FA27.mkv');
