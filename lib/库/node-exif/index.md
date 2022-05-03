# node-exif

- loadImage
加载图像
- processImage
处理图像，这里会判断图像是否以JPG格式存储。(判断SOI是否为`0xFFDB`)
- extractExifData
  - 判断存储方式isBigEndian。(大端：`0x4949`；小端：`0x4D4D`)
  - 判断exif信息是否合法。(从`0xffe0`开始往后6位，16进制转字符串应该是`Exif`)
  ```
  let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

  let u8arr = new Uint8Array([0x45, 0x78, 0x69, 0x66, 0x00, 0x00]);

  const s1 = utf8decoder.decode(u8arr)
  const s2 = 'Exif'
  const s3 = 'Exif\0\0'
  ```
  - getShort    
  用途就是获取一个16进制的数，因为buff存储的时候会使用两个字节去存，例如buff是<Buffer 4D 4D>，buff[0]就是4D，通过getShort方法可以获取`0x4D4D`。
- extractExifEntry(data, entryOffset, tiffOffset, isBigEndian, tags)
  - data.slice(entryOffset, entryOffset + 2)
  - entry.value = data.getString(entry.valueOffset, entry.components);

## [JPG](https://zhuanlan.zhihu.com/p/163502463)
