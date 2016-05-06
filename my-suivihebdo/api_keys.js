/**
 * Tiny AngularJS app whose sole purpose is to store API Keys.
 */
(function () {
  'use strict';

    angular.module('api_keys', [])

    	// To connect to kinvey datastore "cra" : https://console.kinvey.com/environments/kid_Z13U8i_XMb
		//.constant('KINVEY_APP_KEY', 'kid_Z13U8i_XMb')
		//.constant('KINVEY_APP_SECRET', '80aad81e32ba438597bd447bff4de563');

		.constant('KINVEY_CONFIG', {
    		appKey: 'kid_Z13U8i_XMb',
    		appSecret: '80aad81e32ba438597bd447bff4de563'
		});

})();

