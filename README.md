# table-component

  Uses - Enhancing fixed-data-table-2 Functionality. Example user faker to generate sample data.

  This component renders given data in table format.
  Functionality available -
    1) Reordering columns
    2) Add/Remove column data from table
    3) Reset columns
    4) Basic alphabetical search Functionality

## Demo & Examples

Live demo: [anjalideshpande.github.io/table-component](http://anjalideshpande.github.io/table-component/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use table-component is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/table-component.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install table-component --save
```

## Usage

```
var TableComponent = require('table-component');

<TableComponent width={500} height={600}
      data={'size':1, _cache: ['firstName': 'Bob']},
      columnTitles={'firstName': 'First Name'},
      columnWidths:{'firstName': 150},
      fixedColumns: ['firstName']
  >
</TableComponent>
```

### Properties



### Notes



## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

Copyright (c) 2017 Anjali Deshpande.
