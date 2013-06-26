// Generated by CoffeeScript 1.6.3
(function() {
  var _this = this;

  jQuery(function() {
    var $, goOffline, goOnline,
      _this = this;
    $ = jQuery;
    $.ajaxSetup({
      cache: false
    });
    goOnline = function() {
      return $('body').addClass('online').removeClass('offline');
    };
    goOffline = function() {
      return $('body').addClass('offline').removeClass('online');
    };
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    if (ashtag.extra.online) {
      goOnline();
    } else {
      goOffline();
    }
    if (window.applicationCache) {
      return applicationCache.addEventListener('updateready', function() {
        return $('#updatesready').show();
      });
    }
  });

  $(window).on('pagechange', function(event, obj) {
    if (obj.toPage.attr('id') === 'login-page') {
      $('.login-page label[for=id_username]').text('Email');
    }
    return $('form').each(function(i, el) {
      var $el;
      $el = $(el);
      if (!$el.attr('action')) {
        return $el.attr('action', $.mobile.activePage.data('url'));
      }
    });
  });

}).call(this);
