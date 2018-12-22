# Bootstrap 4 Boilerplate

 **Bootstrap 4** and **Gulp** based easy-to-use boilerplate, which compiles and minifies `.scss` (autoprefixing) and 
 `.js` (ES6+ to ES5) files to production ready assets. Also it optimizes all images in your project and adds hot 
 reloading using Browser Sync.

## Dependencies
- Node.js, npm, gulp

- _**gulp-image** package uses **libjpeg** and **libpng** libraries for image optimization. They are usually installed 
on your system by default. But If they aren't, you need to install them using one of the following commands:_  
`brew install libjpeg libpng` _macOS_  
`apt-get install -y libjpeg libpng` _Ubuntu_

## How to use
- Install all packages by running `npm install`.

- Set sources & assets **paths** and configure Browser Sync to match your project by editing `config` object in **gulpfile.js** file.

- Run `npm start` to watch for changes and compile `.scss` and `.js` files with live reload.

- Run `npm run start-no-reload` to watch for changes and compile `.scss` and `.js` files without live reload.

- Run `npm run build` to compile `.scss`, `.js` files and optimize `images`.

### Notes
- Install Gulp globally if you see any corresponding error. You can install it by running `npm install --global gulp`

- You can update **Bootstrap** and other dependencies by running `npm update`. *Also don't forget to update* 
`bootstrap.min.js` *CDN link in your project*.

- You can define **minimal** and **maximal** values for **font sizes** generation by editing values of `$fontSizesMin` 
and `$fontSizesMax` variables in `scss/styles.scss`.

- Edit `scss/bootstrap.scss` in order to remove unnecessary **Bootstrap** parts.

- Place updated `Font Awesome` CDN link if the version provided is outdated.

- After compiling you will get `styles.min.css` and `app.min.js` files by default, which you can use in your 
development and production.

- Update `README.md` and `package.json` per your requirements :)

###### K. Grigoryan 2018
