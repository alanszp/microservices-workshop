'use strict';
/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

var NEW_RELIC_ENVIRONMENT=(process.env['NODE_ENV']||"").toLowerCase();

var appNameMap = {
    'development': 'dev-invoice-service',
    'staging': 'stg-invoice-service',
    'production': 'prd-invoice-service',
    'test': 'test-invoice-service'
};

var appName = appNameMap[NEW_RELIC_ENVIRONMENT];

exports.config = {
    /**
     * Array of application names.
     */
    app_name: [appName],
    /**
     * Your New Relic license key.
     */
    license_key: '0b91028c07b40f8bd578a4cf9435b712e45bdbd4',
    logging: {
        /**
         * Level at which to log. 'trace' is most useful to New Relic when diagnosing
         * issues with the agent, 'info' and higher will impose the least overhead on
         * production applications.
         */
        level: 'info'
    }
};
