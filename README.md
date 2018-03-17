# mdi-svg

Contains a flat folder of camel cased, [material-design-icons][0] svg files.

## Install

npm:

```sh
npm i @lokua/mdi-svg --save
```

yarn:

```sh
yarn add @lokua/mdi-svg --save
```

## Example

Assuming you have svg loading support in webpack or similar, you can make
a simple icon component with React:

```js
export default ({ name }) => (
  <div
    dangerouslySetInnerHTML={{ __html: require(`mdi-svg/svg/${name}.svg`) }}
  />
)
```

## Demo

Open `demo/index.html` to see all icons and their names in your default browser.
Clicking an icon thumbnail will copy it to your clipboard.

##### TIP:

Add the following to your project package.json scripts section:

```json
"scripts": {
  "icons": "open ./node_modules/mdi-svg/demo/index.html"
}
```

[0]: https://github.com/google/material-design-icons
