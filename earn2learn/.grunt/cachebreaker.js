module.exports = {
    cachebreaker: {
            options: {
                match: [
                    "angularapp.js",
                    "vendors.js",
                    "styles.css",
                    "cus.css",
                ],
            },
            files: {
                src: ['./resources/views/angularjs/application_production.php']
            }
    }
};
