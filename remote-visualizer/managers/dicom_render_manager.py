from paraview import simple as paraview

from managers.render_manager import RenderManager


class DICOMRenderManager(RenderManager):
    def __init__(self, directory_path):
        super(DICOMRenderManager, self).__init__()
        self.directory_path = directory_path

    def render(self):
        self.view = paraview.CreateRenderView()
        self.source = paraview.DICOMReaderdirectory(FileName=self.directory_path)
        self.display = paraview.Show(self.source, self.view)

        self.display.Representation = 'Volume'
        self.display.ColorArrayName = 'DICOMImage'
        paraview.ColorBy(self.display, 'DICOMImage')

        # color_map = paraview.GetColorTransferFunction('DICOMImage', display)
        # color_map.RGBPoints = [
        #     -1000, 0.231373, 0.298039, 0.752941,
        #     1000, 0.865003, 0.865003, 0.865003,
        #     3095, 0.705882, 0.0156863, 0.14902,
        # ]
        #
        # opacity_map = paraview.GetOpacityTransferFunction('DICOMImage', display)
        # opacity_map.Points = [
        #     -1000, 0, 0.5, 0,
        #     862.523, 0, 0.5, 0,
        #     1551.4, 0.580357, 0.5, 0,
        #     3095, 1, 0.5, 0,
        # ]

        paraview.ResetCamera()
        camera = paraview.GetActiveCamera()
        self.view.CenterOfRotation = camera.GetFocalPoint()

        paraview.Render(self.view)
