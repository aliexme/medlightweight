from wslink import register as exportRpc
from paraview import simple
from paraview.web import protocols


class RemoteRenderProtocol(protocols.ParaViewWebProtocol):
    @exportRpc("renderer.initialize")
    def initialize(self):
        cone = simple.Cone()
        view = simple.CreateRenderView()
        simple.Show(cone, view)
        simple.Render(view)
        return view.GetGlobalIDAsString()
