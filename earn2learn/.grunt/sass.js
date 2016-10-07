module.exports = {
    sass: {
        options: {
            sourceMap: false,
            /* output style:
             * default: nested
             * options:  nested, compact, compressed, expanded
             */
            outputStyle: 'compressed'
        },
        files: {
            'assets/css/main.css': 'assets/css/main.scss',
        }
    }
};