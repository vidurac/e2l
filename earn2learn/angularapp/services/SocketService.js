(function() {'use strict';
    app.factory('SocketService', ['socketFactory', '_URLS', function (socketFactory, _URLS) {

        var IOSocket = io.connect(_URLS.SOCKET_SERVER, {
            'reconnect': true,
            'reconnection delay': 500,
            'max reconnection attempts': 10
        });

        var socket = socketFactory({

            ioSocket: IOSocket

        });

        return socket;


    }]);
})();