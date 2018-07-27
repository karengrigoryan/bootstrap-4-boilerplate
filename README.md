# Bootstrap 4 Boilerplate

 **Bootstrap 4** and **Gulp** based easy-to-use boilerplate, which compiles and minifies `.scss` (autoprefixing) and `.js` (ES6, 7 to ES5) files to production ready assets. Also it optimizes all images in your project.

## Dependencies
- Node.js, npm  

- _**gulp-image** package uses **libjpeg** and **libpng** libraries for image optimization. They are usually installed on your system by default. But If they aren't, you need to install them using one of the following commands:_  
`brew install libjpeg libpng` _macOS_  
`apt-get install -y libjpeg libpng` _Ubuntu_

## How to use
- Install all packages by running `npm install` or `npm update` if you want to use latest versions of dependencies.

- Set the source and assets **paths** to match your project structure by editing `path` object in **gulpfile.js** file.

- Run `gulp watch` to watch for changes and compile `.scss` and `.js` files to production ready assets.

- Run `gulp build` to compile `.scss`, `.js` and optimize `images`.

### Notes
- You can update **Bootstrap** by running `npm update`. *Also don't forget to update* `bootstrap.min.js` *link in your project*.

- You can define **minimal** and **maximal** values for **font sizes** generatation by editing values of `$fontSizesMin` and `$fontSizesMax` variables in `scss/styles.scss`.

- Edit `scss/bootstrap.scss` in order to remove unnecessary **Bootstrap** components.

- You can optimize images without running build task by using `gulp image` command.

- Place updated `Font Awesome` CDN link if the version provided is outdated.

- After compiling you will get `styles.min.css` and `main.min.js` files by default, which you can use in your development and production.

- Update `README.md` and `package.json` per your requirements :)

###### K. Grigoryan © 2018
