from paraview.web import pv_wslink
from paraview.web import protocols as pv_protocols

from protocols.remote_render_protocol import RemoteRenderProtocol


class RemoteVisualizerServerProtocol(pv_wslink.PVServerProtocol):
    authKey = "wslink-secret"

    def initialize(self):
        self.registerVtkWebProtocol(pv_protocols.ParaViewWebMouseHandler())
        self.registerVtkWebProtocol(pv_protocols.ParaViewWebViewPort())
        self.registerVtkWebProtocol(pv_protocols.ParaViewWebViewPortImageDelivery())
        self.registerVtkWebProtocol(RemoteRenderProtocol())
        self.updateSecret(RemoteVisualizerServerProtocol.authKey)
