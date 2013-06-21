jQuery ->
    $ = jQuery

    $.ajaxSetup
        cache: false

    # Set the online/offline class
    goOnline = =>
        $('body').addClass('online').removeClass('offline')

    goOffline = =>
        $('body').addClass('offline').removeClass('online')

    window.addEventListener 'online', goOnline
    window.addEventListener 'offline', goOffline
    if ashtag.extra.online
        goOnline()
    else
        goOffline()