const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
hbs.registerHelper('needs_left_menu', (path, options) => {
    if (path.includes('/songs')  || path.includes('/artists')) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('actions_button_menu', (path, options) => {
    console.log(path);
    return path.includes('/artists') ? options.fn(this) : options.inverse(this);
});
