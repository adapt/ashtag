module "ashtag.extra"

ashtag.extra.track = (o) ->
	if window._gat
		for tracker in window._gat._getTrackers()
			tracker._trackEvent(o.category, o.action, o.label, o.value, o.nonInteraction)
	else if window._gaq
		window._gaq.push ['_trackEvent', o.category, o.action, o.label, o.value, o.nonInteraction]

# This is a simple utility for running a callback after a certain number of
# tries. This can be useful when a callback needs to be run once operations
# within a loop have been completed, and were those operations only return
# following a callback.
#
# Example:
#
#     var fn = ashtag.extra.callAfter(myList.length, theCallback).go;
#     for(i in myList) {
#         doSomethingWithCallbackOnCompletion(fn)
#     }

ashtag.extra.callAfter = (count, callback) ->
    callCount = 0

    return (args...) ->
        callCount += 1
        if callCount == count
            callback args...