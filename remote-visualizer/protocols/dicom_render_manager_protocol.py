import os
from urlparse import urlparse

from wslink import register as exportRpc

from managers.dicom_render_manager import DICOMRenderManager
from protocols.render_manager_protocol import RenderManagerProtocol
from utils.decorators import debounce


class DICOMRenderManagerProtocol(RenderManagerProtocol):
    def __init__(self):
        super(DICOMRenderManagerProtocol, self).__init__()
        self.opacity_middle_point = ()

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

    @exportRpc('renderer.dicom.opacity.interaction')
    def dicom_opacity_interaction(self, options):
        view_id = options['view']
        action = options['action']
        point_delta = options['pointDelta']
        opacity_delta = options['opacityDelta']

        render_manager = self.get_render_manager(view_id)
        scale_min, scale_max = render_manager.scale_range

        if action == 'down':
            self.opacity_middle_point = render_manager.get_opacity_middle_point()

        normalize_point_delta = point_delta * (scale_max - scale_min)
        normalize_point = max(min(self.opacity_middle_point[0] + normalize_point_delta, scale_max), scale_min)
        normalize_opacity = max(min(self.opacity_middle_point[1] + opacity_delta, 1), 0)

        render_manager.set_opacity_middle_point(normalize_point, normalize_opacity)

        return True

    @exportRpc('renderer.dicom.representation.set')
    def set_dicom_representation_mode(self, options):
        view_id = options['view']
        representation_mode = options['mode']

        render_manager = self.get_render_manager(view_id)
        render_manager.set_representation_mode(representation_mode)

        return True

    @exportRpc('renderer.dicom.slicemode.set')
    def set_dicom_slice_mode(self, options):
        view_id = options['view']
        slice_mode = options['mode']

        render_manager = self.get_render_manager(view_id)
        render_manager.set_slice_mode(slice_mode)

        return True

    @exportRpc('renderer.dicom.currentslice.get')
    def get_dicom_current_slice(self, options):
        view_id = options['view']
        render_manager = self.get_render_manager(view_id)
        return render_manager.current_slice

    @exportRpc('renderer.dicom.currentslice.set')
    def set_dicom_current_slice(self, options):
        view_id = options['view']
        slice_number = options['slice']

        render_manager = self.get_render_manager(view_id)
        render_manager.set_current_slice_number(slice_number)

        return True
