module.exports = {
    htmlmin: {                                     // Task
        options: {                                 // Target options
            //removeComments: true,
            //collapseWhitespace: true,
            //removeScriptTypeAttributes: true,
            //minifyJS: true
            // collapseBooleanAttributes: true,
            // removeCommentsFromCDATA: true,
            // removeOptionalTags: true
        },
        files: {
            'resources/views/angularjs/application_production.php': 'resources/views/angularjs/application_production.php' // 'destination': 'source'
        }
    }
};