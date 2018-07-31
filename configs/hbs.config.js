const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
hbs.registerHelper('needs_left_menu', (path, options) => {
    console.log(path);
    if (path.includes('/songs')  || path.includes('/artists')) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})