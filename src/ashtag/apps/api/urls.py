from django.conf.urls import patterns, include

from tastypie.api import Api

from .api import SightingResource, TreeResource


v1_api = Api(api_name='v1')
v1_api.register(TreeResource())
v1_api.register(SightingResource())

urlpatterns = patterns(
    '',
    (r'', include(v1_api.urls)),
)
