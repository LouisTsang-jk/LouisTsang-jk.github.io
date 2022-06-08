# jssm

## 使用
```
const TLWA = sm`Red 'next' -> Green 'next' -> Yellow 'next' -> Red;`;  // TLWA = Traffic Light With Actions

log( TLWA.state() );  // 'Red'

TLWA.action('next');  // true
log( TLWA.state() );  // 'Green'

TLWA.action('next');  // true
log( TLWA.state() );  // 'Yellow'

TLWA.action('next');  // true
log( TLWA.state() );  // 'Red'
```

其中 sm\`\` 这个用法是模版字符串中的原始字符串。
```
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
```