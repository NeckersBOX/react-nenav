# react-nenav

**React-Nenav** is a component for your **React** applications. It allow you to show a path and navigate inside it like a folder viewer. You can also open the files and show their contents.
React-Nenav is built with **React**, **Redux** and **React-Redux**. All style and external plugin to do syntax highlight can be included.

## Demo & Examples

Live demo: [NeckersBOX.github.io/react-nenav](http://NeckersBOX.github.io/react-nenav/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-nenav is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-nenav.js` in your page. If you use this, make sure you have already included its dependencies, and they are available as a globals variables.

```
npm install react-nenav --save
```


## Usage

You have to provide to **Nenav component** a files view and a function to call when the user wants to see the content of a file.

An example of a files view structure.

```
{
  /* root dir */
  data:
    /* root dir content */
    "dir_name": {
      type: "dir",
      data: {
        /* root/dir_name content */
        "dir_name": { ... }
        "dir_name": { ... }
        ...
        "file_name": { ... }
      }
    },
    "file_name": {
      type: "file",
      size: "size in byte",
      date: "last modified date, it will be show as is"
    },
    ... /* other files or directories*/
}
```

You can also generate a view like this with this PHP code:

__GET_PATHDATA_FROM_PHP__

You have to provide as well a function to read a request file. This function
will be like this:

```
const getFileData = (file_path, resultFunc) => {
  $.get ('getFile.php', { request: file_path },
    (result) => {
      ...
      resultFunc (result.file_contents);
    }
  );
}
```

This is another example in PHP that do this action:

__GET_FILEDATA_FROM_PHP__

Have done that you can immediatly use the **Nenav** in this way:

```
import Nenav from 'react-nenav';

<Nenav data={file_list} dataFunc={getFileData} />
```

### Notes

Of course, the Nenav's configuration isn't only with `data` and `dataFunc`, you can personalize it much more.

#### Change style
**Nenav** has inside two configuration for its style, one for _Zurb Foundation_ and one for _Twitter Bootstrap_.
You can set them with the property `style='foundation'` or `style='bootstrap'`. You can also build your own style following this example ( the foundation's configuration ):

```
const exampleStyle = {
	main_area: "small-12",
  link: '',
	navbar: {
		area: "small-12",
	  btn: "primary button",
    btn_group: "small button-group"
	},
	folder_view: {
		table: "table-scroll hover",
		name: 'text-left',
		type: 'text-right',
		size: 'text-right',
		date: 'text-center'
	},
  file: {
    main_area: 'callout',
    pre: 'prettyprint',
    date: 'subheader'
  },
  icon: {
    file: 'fi-page',
    folder: 'fi-folder',
    arrow_up: 'fi-arrow-up',
    arrow_down: 'fi-arrow-down',
    back: 'float-right fi-x'
  }
};
```

After you will use it with `style={exampleStyle}`.

#### Change initial path
You can set the initial path with: `path='/my/path/sub_dir'`.

#### Change initial sort
You can set also the initial sort with an object like this: `{ attr: attribute, type: sort_type }`. `attribute` can be one of this _name_, _type_, _size_, _date_ and `sort_type` can be _asc_ or _desc_.

#### Add a function when file is shown
When a user open a file **Nenav** show it instead of the files list. When this action was executed you can specify a function to call ( example to highlight syntax with prettify ) in this way: `fileMountFunc={my_function}`

#### Summary
Inside the demo was used this configuration:

```
const nenav_conf = {
	path: '/src',
	data: path_data,
	data_sort: { attr: 'name', type: 'asc' },
	dataFunc: getFileData,
	fileMountFunc: PR.prettyPrint,
	style: 'foundation'
};
```

You can pass it to **Nenav Component** with: `<Nenav {...nenav_conf} />`.

#### Default configuration

```
const initState = {
  path: '/',
  style: foundationStyle,
  data: { data: {} },
  data_sort: {
    attr: 'type',
    type: 'asc'
  },
  dataFunc: console.log,
  list_type: 'dir',
  file_info: null,
  onMount: null
};
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

Copyright (c) 2016 Davide Francesco Merico.
