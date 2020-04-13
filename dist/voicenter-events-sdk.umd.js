!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("socket.io-client/socket.io")):"function"==typeof define&&define.amd?define(["socket.io-client/socket.io"],t):(e=e||self).VoicenterEventsSDK=t(e.io)}(this,function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e=e&&e.hasOwnProperty("default")?e.default:e;var s={LOGIN_STATUS:"loginStatus",LOGIN:"login",LOGIN_USER:"loginUser",LOGIN_CODE:"loginUserCode",LOGIN_ACCOUNT:"loginAccount",LOGIN_RESPONSE:"loginResponse",QUEUE_EVENT:"QueueEvent",QUEUES_UPDATED:"QueuesUpdated",DIALERS_UPDATED:"DialersUpdated",EXTENSION_EVENT:"ExtensionEvent",EXTENSION_UPDATED:"ExtensionsUpdated",ALL_EXTENSION_STATUS:"AllExtensionsStatus",CONNECT_ERROR:"connect_error",CONNECT_TIMEOUT:"connect_timeout",DISCONNECT:"disconnect",PONG:"pong",RECONNECT:"reconnect",RECONNECT_ATTEMPT:"reconnect_attempt",RESYNC:"resync",RECONNECTING:"reconnecting",RECONNECT_ERROR:"reconnect_error",RECONNECT_FAILED:"reconnect_failed",KEEP_ALIVE:"keepalive",KEEP_ALIVE_RESPONSE:"keepaliveResponse",CLOSE:"closeme",ERROR:"error"},c=[{URLID:59,Priority:5,Version:2,Domain:"monitor1.voicenter.co"},{URLID:3,Priority:4,Version:2,Domain:"monitor3.voicenter.co.il"},{URLID:4,Priority:3,Version:2,Domain:"monitor4.voicenter.co.il"},{URLID:11,Priority:2,Version:2,Domain:"monitor11.voicenter.co"},{URLID:5,Priority:0,Version:2,Domain:"monitor5.voicenter.co.il"}],a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,e),this.debug=t.debug}return o(e,[{key:"_log",value:function(e,t){var n=t?"".concat(e,", %c Data -> ").concat(JSON.stringify(t)):"".concat(e),i=(new Date).toUTCString();console.log("%c ".concat(i,": %c ").concat(n),"color: #276749;","color: #4299e1;","color: #2c3e50;")}},{key:"_error",value:function(e,t){var n=t?"".concat(e,", Data -> ").concat(JSON.stringify(t)):"".concat(e),i=(new Date).toUTCString();console.error("".concat(i,": ").concat(n))}},{key:"log",value:function(e,t){this.debug&&(e&&!t?this._log(e):this._log(e,t))}},{key:"error",value:function(e,t){this.debug&&(e&&!t?this._error(e):this._error(e,t))}}]),e}();var l=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)},u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},h="object"==typeof u&&u&&u.Object===Object&&u,v="object"==typeof self&&self&&self.Object===Object&&self,f=h||v||Function("return this")(),E=function(){return f.Date.now()},p=f.Symbol,g=Object.prototype,y=g.hasOwnProperty,d=g.toString,_=p?p.toStringTag:void 0;var m=function(e){var t=y.call(e,_),n=e[_];try{e[_]=void 0;var i=!0}catch(e){}var o=d.call(e);return i&&(t?e[_]=n:delete e[_]),o},T=Object.prototype.toString;var O=function(e){return T.call(e)},N="[object Null]",S="[object Undefined]",C=p?p.toStringTag:void 0;var k=function(e){return null==e?void 0===e?S:N:C&&C in Object(e)?m(e):O(e)};var R=function(e){return null!=e&&"object"==typeof e},D="[object Symbol]";var I=function(e){return"symbol"==typeof e||R(e)&&k(e)==D},L=NaN,b=/^\s+|\s+$/g,A=/^[-+]0x[0-9a-f]+$/i,x=/^0b[01]+$/i,w=/^0o[0-7]+$/i,P=parseInt;var U=function(e){if("number"==typeof e)return e;if(I(e))return L;if(l(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=l(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(b,"");var n=x.test(e);return n||w.test(e)?P(e.slice(2),n?2:8):A.test(e)?L:+e},M="Expected a function",j=Math.max,F=Math.min;var G=function(e,t,n){var i,o,r,s,c,a,u=0,h=!1,v=!1,f=!0;if("function"!=typeof e)throw new TypeError(M);function p(t){var n=i,r=o;return i=o=void 0,u=t,s=e.apply(r,n)}function g(e){var n=e-a;return void 0===a||n>=t||n<0||v&&e-u>=r}function y(){var e=E();if(g(e))return d(e);c=setTimeout(y,function(e){var n=t-(e-a);return v?F(n,r-(e-u)):n}(e))}function d(e){return c=void 0,f&&i?p(e):(i=o=void 0,s)}function _(){var e=E(),n=g(e);if(i=arguments,o=this,a=e,n){if(void 0===c)return function(e){return u=e,c=setTimeout(y,t),h?p(e):s}(a);if(v)return clearTimeout(c),c=setTimeout(y,t),p(a)}return void 0===c&&(c=setTimeout(y,t)),s}return t=U(t)||0,l(n)&&(h=!!n.leading,r=(v="maxWait"in n)?j(U(n.maxWait)||0,t):r,f="trailing"in n?!!n.trailing:f),_.cancel=function(){void 0!==c&&clearTimeout(c),u=0,i=a=o=c=void 0},_.flush=function(){return void 0===c?s:d(E())},_},K=[s.CONNECT_ERROR,s.CONNECT_TIMEOUT,s.DISCONNECT,s.RECONNECT_ATTEMPT,s.RECONNECTING,s.RECONNECT_ERROR,s.RECONNECT_FAILED,{NEWCALL:"NEWCALL",ANSWER:"ANSWER",HANGUP:"HANGUP"}.CLOSE];function V(e){var t=e.eventData,n=e.store,i=e.extensionsModuleName,o=t.name,r=t.data;switch(n.commit("extensions/SET_IS_SOCKET_OFFLINE",function(e){var t=e.name;return K.includes(t)}(t)),o){case s.ALL_EXTENSION_STATUS:n.dispatch("extensions/setExtensions",r.extensions);break;case s.EXTENSION_EVENT:var c=r.data;c.lastEvent={reason:r.reason,ivrid:r.ivruniqueid};var a=n.state[i].extensions.findIndex(function(e){return e.userID===c.userID});-1!==a&&n.dispatch("extensions/updateExtension",{index:a,extension:c});break;case s.LOGIN:n.commit("extensions/SET_SERVER_TIME",r)}}var W,X=100,Q=101,$="SET_EXTENSIONS",q="UPDATE_EXTENSIONS",H="SET_SERVER_TIME",J="SET_IS_SOCKET_OFFLINE",Y={namespaced:!0,state:{extensions:[],serverTime:null,serverDelta:0,serverOffset:0,isSocketOffline:!1,offlineSocketTimestamp:null},mutations:(r(W={},$,function(e,t){e.extensions=t}),r(W,q,function(e,t){var n=t.index,i=t.extension;e.extensions.splice(n,1,i)}),r(W,H,function(e,t){e.serverOffset=60*t.servertimeoffset*1e3||108e5,e.serverTime=1e3*t.servertime-e.serverOffset,e.serverDelta=(new Date).getTime()-e.serverTime}),r(W,J,function(e,t){e.isSocketOffline=t,e.offlineSocketTimestamp=t?(new Date).getTime():null}),W),actions:{setExtensions:async function(e,t){(0,e.commit)($,t)},updateExtension:async function(e,t){(0,e.commit)(q,t)}},getters:{isSocketOffline:function(e){if(!e.offlineSocketTimestamp||isNaN(e.offlineSocketTimestamp))return!1;var t=(new Date).getTime();return e.isSocketOffline&&t-e.offlineSocketTimestamp>6e4},extensionsWithCalls:function(e){return function(t){var n=[];return e.extensions.forEach(function(e){e.calls.length>0&&(e.calls.filter(function(e){return e.answered&&"hold"===e.callstatus}).length?e.representativeStatus=Q:e.representativeStatus=X),n.push(e)}),t?n.filter(function(e){return 2!==e.representativeStatus}):n}},extensionCountByStatus:function(e,t){return function(e){return t.extensionWithCalls.filter(function(t){return t.representativeStatus===e}).length||0}}}};var z={url:"https://monitorapi.voicenter.co.il/monitorAPI/getMonitorUrls",servers:c,token:null,forceNew:!0,reconnectionDelay:1e4,reconnectionDelayMax:1e4,maxReconnectAttempts:2,timeout:1e4,keepAliveTimeout:6e4,idleTimeout:3e5,protocol:"https",transports:["websocket"],upgrade:!1,store:null,extensionsModuleName:"sdkExtensions",serverFetchStrategy:"remote",serverType:null},B=[],Z=new Map,ee=function(){function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(n(this,i),this.options=Object.assign({},z,{},e),this.argumentOptions=Object.assign({},e),!this.options.token)throw new Error("A token property should be provided");this.Logger=new a(this.options),this.servers=[],this.server=null,this.socket=null,this.connected=!1,this.connectionEstablished=!1,this.lastKeepAliveTimestamp=(new Date).getTime(),this._initReconnectOptions(),this._listenersMap=Z,this._retryConnection=G(this._connect.bind(this),this.reconnectOptions.reconnectionDelay,{leading:!0,trailing:!1}),this._loginEventTriggered=!1,this._lastLoginTimestamp=null,this._lastPong=null,this._handleLocalEvents=!1,this._registerExtensionsModule()}return o(i,[{key:"_registerExtensionsModule",value:function(){var e=this.options.store;if(e){var t=this.options.extensionsModuleName||"sdkExtensions";e.registerModule(t,Y),this._handleLocalEvents=!0}}},{key:"_initReconnectOptions",value:function(){this.reconnectOptions={retryCount:1,maxReconnectAttempts:this.options.maxReconnectAttempts,reconnectionDelay:this.options.reconnectionDelay,minReconnectionDelay:this.options.reconnectionDelay,maxReconnectionDelay:3e5}}},{key:"_onConnect",value:function(){this._initReconnectDelays(),this.connected=!0,this.Logger.log(s.CONNECT,this.reconnectOptions)}},{key:"_initReconnectDelays",value:function(){this.reconnectOptions.retryCount=1;var e=this.reconnectOptions.minReconnectionDelay;this.reconnectOptions.reconnectionDelay=e,this.socket.io.reconnectionDelay(e),this.socket.io.reconnectionDelayMax(e)}},{key:"_onConnectError",value:function(e){this._retryConnection("next"),this.connected=!1,this.Logger.log(s.CONNECT_ERROR,e)}},{key:"_onError",value:function(e){this.Logger.log(s.ERROR,e)}},{key:"_onReconnectFailed",value:function(){this._retryConnection("next"),this.Logger.log(s.RECONNECT_FAILED,this.reconnectOptions)}},{key:"_onConnectTimeout",value:function(){this._retryConnection("next"),this.Logger.log(s.CONNECT_TIMEOUT,this.reconnectOptions)}},{key:"_onReconnectAttempt",value:function(){if(this.reconnectOptions.retryCount>=this.reconnectOptions.maxReconnectAttempts)this._retryConnection("next");else{if(this.reconnectOptions.reconnectionDelay<this.reconnectOptions.maxReconnectionDelay){var e=this.reconnectOptions.minReconnectionDelay*this.reconnectOptions.retryCount;this.reconnectOptions.reconnectionDelay=e,this.socket.io.reconnectionDelay(e),this.socket.io.reconnectionDelayMax(e)}this.reconnectOptions.retryCount++,this.Logger.log(s.RECONNECT_ATTEMPT,this.reconnectOptions)}}},{key:"_onDisconnect",value:function(e){this.connected=!1,this.Logger.log(s.DISCONNECT,e),this._connect("next")}},{key:"_onKeepAlive",value:function(e){("object"!==t(e)||0===e.errorCode)&&e&&this.connected?(this.Logger.log(s.KEEP_ALIVE_RESPONSE),this.lastKeepAliveTimestamp=(new Date).getTime()):this._initSocketConnection()}},{key:"_onLoginResponse",value:function(e){0===e.ErrorCode&&e.Token&&!this.options.token&&(this.options.token=e.Token)}},{key:"_onPong",value:function(){this._lastPong=(new Date).getTime()}},{key:"_parsePacket",value:function(e){return e.data?{name:e.data[0],data:e.data[1]}:{}}},{key:"_connect",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default",t=null;if("default"===e)t=this._findCurrentServer();else if("next"===e)t=this._findNextAvailableServer();else{if("prev"!==e)throw new Error("Incorrect 'server' parameter passed to connect function ".concat(e,". Should be 'default' or 'next'"));t=this._findMaxPriorityServer()}t||(this.server=this._findCurrentServer()),this._initSocketConnection(),this._initSocketEvents(),this._initKeepAlive(),this._initReconnectDelays(),this.login()}},{key:"_checkInit",value:function(){if(!this.connectionEstablished)throw new Error('Make sure you call "sdk.init()" before doing other operations.')}},{key:"_initSocketConnection",value:function(){var t=this.server.Domain,n=this.options.protocol,i="".concat(n,"://").concat(t);this.Logger.log("Connecting to..",i),this.closeAllConnections(),this.socket=e(i,Object.assign({},this.options,{query:{token:this.options.token},debug:!1})),B.push(this.socket),this.connectionEstablished=!0,this._loginEventTriggered=!1}},{key:"_initSocketEvents",value:function(){this.socket.onevent=this._onEvent.bind(this)}},{key:"_initKeepAlive",value:function(){var e=this;this.keepAliveInterval&&clearInterval(this.keepAliveInterval),this.idleInterval&&clearInterval(this.idleInterval),this.keepAliveInterval=setInterval(function(){var t=(new Date).getTime(),n=3*e.options.keepAliveTimeout;t>e.lastKeepAliveTimestamp+n&&e._connect("next"),e.socket?e.emit(s.KEEP_ALIVE,e.options.token):e._initSocketConnection()},this.options.keepAliveTimeout),this.idleInterval=setInterval(function(){e.reSync(!1),e._lastPong+3*e.options.idleTimeout>(new Date).getTime()&&e._connect("next")},this.options.idleTimeout)}},{key:"_findCurrentServer",value:function(){var e=null;if(this.servers.length&&(e=this.servers[0]),this.server=e,!this.server)throw new Error("Could not find any server to establish connection with");return this.server}},{key:"_findNextAvailableServer",value:function(){var e=this.server.Priority;if(this.Logger.log("Failover -> Trying to find another server"),e>0){var t=e-1,n=this.servers.find(function(e){return e.Priority===t});if(!n&&!(n=this._findMaxPriorityServer()))return;if(this.server.Domain!==n.Domain)return this.server=n,this.server;this.Logger.log("Failover -> Found new server. Connecting to it...",this.server)}return null}},{key:"_findMaxPriorityServer",value:function(){this.Logger.log("Fallback -> Trying to find previous server","_findMaxPriorityServer");var e,t,n,i=(e=this.servers,t=null,n=-1,e.forEach(function(e){e.Priority>n&&(n=e.Priority,t=e)}),t);return this.server&&i.Domain!==this.server.Domain?(this.server=i,this.Logger.log("Fallback -> Trying to find previous server",this.server),this.server):null}},{key:"_getServers",value:async function(){if("static"===this.options.serverFetchStrategy&&this.argumentOptions.servers&&Array.isArray(this.argumentOptions.servers)&&this.argumentOptions.servers.length>1)this.servers=this.argumentOptions.servers;else try{var e={};this.options.serverType&&(e.type=this.options.serverType);var t=await fetch("".concat(this.options.url,"/").concat(this.options.token),e);this.servers=await t.json()}catch(e){this.servers=this.argumentOptions.servers||c}}},{key:"_onEvent",value:function(e){var t,n=this;if(e.data){var i=this._parsePacket(e);this.Logger.log("New event -> ".concat(i.name),i),this._listenersMap.forEach(function(e,t){"*"===t?e(i):i.name===t&&e(i)});var o=(r(t={},s.RECONNECT_ATTEMPT,this._onReconnectAttempt),r(t,s.RECONNECT_FAILED,this._onReconnectFailed),r(t,s.CONNECT,this._onConnect),r(t,s.DISCONNECT,this._onDisconnect),r(t,s.ERROR,this._onError),r(t,s.CONNECT_ERROR,this._onConnectError),r(t,s.CONNECT_TIMEOUT,this._onConnectTimeout),r(t,s.KEEP_ALIVE_RESPONSE,this._onKeepAlive),r(t,s.LOGIN_RESPONSE,this._onLoginResponse),r(t,s.PONG,this._onPong),r(t,s.EXTENSION_UPDATED,this._retryConnection),r(t,s.QUEUES_UPDATED,this._retryConnection),r(t,s.DIALERS_UPDATED,this._retryConnection),r(t,s.LOGIN_STATUS,function(){n.connected||n._onConnect()}),t)[i.name];o&&"function"==typeof o&&o.call(this,i.data),this._handleLocalEvents&&V(Object.assign({eventData:i},this))}}},{key:"init",value:async function(){return!!this.connectionEstablished||(this.socket&&this.emit(s.CLOSE),await this._getServers(),this._connect(),this._initReconnectDelays(),!0)}},{key:"setToken",value:async function(e){this.options.token=e,this.disconnect(),await this.init()}},{key:"closeAllConnections",value:function(){B.forEach(function(e){e.close(),e.disconnect()}),B=[],this.socket&&(this.socket.disconnect(),this.socket=null)}},{key:"disconnect",value:function(){this._listenersMap=new Map,this.closeAllConnections()}},{key:"on",value:function(e,t){this._listenersMap.set(e,t),this._checkInit()}},{key:"emit",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._checkInit(),this.Logger.log("EMIT -> ".concat(e),t),this.socket.emit(e,t)}},{key:"reSync",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.emit(s.RESYNC,{cache:e})}},{key:"setMonitorUrl",value:async function(e){var t=this.options.url,n=this.options.serverFetchStrategy;try{if(!e)return;this.options.url=e,this.options.serverFetchStrategy="remote",await this.init()}catch(e){this._onError(e),this.options.url=t,this.options.serverFetchStrategy=n,await this.init()}}},{key:"login",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"login";if(this._lastLoginTimestamp+1e3>(new Date).getTime())return Promise.resolve();var n=this;this._checkInit();var i=!1;return this._lastLoginTimestamp=(new Date).getTime(),new Promise(function(o,r){e.on(s.LOGIN_STATUS,function(e){n.onLogin&&n.onLogin(e),i=!0,o(e)}),e.socket.on(s.ERROR,function(e){n.onError&&n.onError(e),!1===i&&r(e)}),"login"===t?e.emit(s.LOGIN,{token:e.options.token}):"user"===t?e.emit(s.LOGIN_USER,{user:e.options.user,password:e.options.password}):"code"===t?e.emit(s.LOGIN_CODE,{code:e.options.code,orgCode:e.options.organizationCode}):"account"===t&&e.emit(s.LOGIN_USER,{user:e.options.user,password:e.options.password})})}}]),i}();return"undefined"!=typeof window&&(window.EventsSDK=ee),ee});
//# sourceMappingURL=voicenter-events-sdk.umd.js.map
