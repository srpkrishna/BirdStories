require.config({
    baseUrl: '/lib',
    paths: {
        util: "../util",
        js: "../js",
        constants:"../js/constants",
        actions:"../js/actions",
        stores: "../js/stores",
        views:"../js/components/views",
        controllers:"../js/components/controllers"
    }
});
require(["jquery-2.2.1.min", "l20n.min","https://apis.google.com/js/api:client.js","https://connect.facebook.net/en_US/sdk.js"], function (jquery,l20n) {
    window.l20n = L20n.getContext ();
    window.getString = function (key) {
        var value = window.l20n.getSync (key);
        if(!value)
          value = key;
        return value;
    };
    window.l20n.registerLocales ('en-US', ['en-US']);
    window.l20n.linkResource (function (locale) {
            $ ("head").append ("<meta http-equiv='Content-Language' content = '" + locale + "'/>");
            return "/locales/" + locale + ".l20n";
        });
    window.l20n.requestLocales();
    window.l20n.ready (function () {
      require(["js/index"]);
    });

});
