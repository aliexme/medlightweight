import os
from urlparse import urlparse

from wslink import register as exportRpc

from managers.dicom_render_manager import DICOMRenderManager
from protocols.render_manager_protocol import RenderManagerProtocol
from utils.decorators import debounce


class DICOMRenderManagerProtocol(RenderManagerProtocol):
    @exportRpc('renderer.dicom.render')
    def render_dicom(self, options):
        # TODO do ok
        directory_url = urlparse(options['path'])
        directory_media_path = directory_url.path
        dicom_directory_path = '{}/../api-server{}'.format(os.getcwd(), directory_media_path)

        render_manager = DICOMRenderManager(directory_path=dicom_directory_path)
        render_manager.render()

        view_id = render_manager.view.GetGlobalIDAsString()
        debounce_destroy_renderer = debounce(self.renderer_destroy_timeout)(self.debounce_destroy_renderer)
        self.render_managers_map[view_id] = render_manager
        self.debounce_destroy_renderer_map[view_id] = debounce_destroy_renderer
        debounce_destroy_renderer(view_id)

        resp = {
            'view': view_id,
        }

        return resp
