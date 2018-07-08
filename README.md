# Bootstrap 4 Boilerplate

 **Bootstrap 4** and **Gulp** based easy-to-use boilerplate, which compiles and minifies `.scss` (autoprefixing) and `.js` (ES6, 7 to ES5) files to production ready assets. Also it optimizes all images in your project.

## Dependencies
- Node.js, npm  

- _**gulp-image** package uses **libjpeg** and **libpng** libraries for image optimization. They are usually installed on your system by default. But If they aren't, you need to install them using one of the following commands:_  
`brew install libjpeg libpng`  _macOS_  
`apt-get install -y libjpeg libpng` _Ubuntu_

## How to use
- Install all packages by running `npm i`.

- Set the source and assets **paths** to match your project structure by editing `path` object in **gulpfile.js** file.

- Run `gulp watch` to watch for changes and compile `.scss` and `.js` files to production ready assets.

- Run `gulp build` to compile `.scss`, `.js` and optimize `images`.

### Notes
After compiling you will get `styles.min.css` and `main.min.js` files by default, which you can use in your development and production. 

###### K. Grigoryan © 2018
