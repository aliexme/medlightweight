from wslink import register as exportRpc
from paraview.web import protocols


class RenderManagerProtocol(protocols.ParaViewWebProtocol):
    renderer_destroy_timeout = 60

    def __init__(self):
        super(RenderManagerProtocol, self).__init__()
        self.render_managers_map = {}
        self.debounce_destroy_renderer_map = {}

    @exportRpc('renderer.destroy')
    def destroy_renderer(self, options):
        view_id = options['view']

        try:
            del self.render_managers_map[view_id]
            del self.debounce_destroy_renderer_map[view_id]
        except KeyError:
            pass

        return True

    @exportRpc('renderer.ping')
    def ping_renderer(self, options):
        view_id = options['view']
        debounce_destroy_renderer = self.get_debounce_destroy_renderer_function(view_id)
        debounce_destroy_renderer(view_id)
        return True

    def debounce_destroy_renderer(self, view_id):
        self.destroy_renderer({'view': view_id})

    def get_render_manager(self, view_id):
        return self.render_managers_map[view_id]

    def get_debounce_destroy_renderer_function(self, view_id):
        return self.debounce_destroy_renderer_map[view_id]
