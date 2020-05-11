from paraview import simple as paraview

from managers.render_manager import RenderManager


class DICOMRenderManager(RenderManager):
    def __init__(self, directory_path):
        super(DICOMRenderManager, self).__init__()
        self.directory_path = directory_path
        self.array_name = 'DICOMImage'
        self.representation = 'Volume'
        self.slice_mode = 'XY Plane'
        self.current_slice = 0
        self.scale_range = ()

    def render(self):
        self.view = paraview.CreateRenderView()
        self.source = paraview.DICOMReaderdirectory(FileName=self.directory_path)
        self.display = paraview.Show(self.source, self.view)

        paraview.ResetCamera()
        camera = paraview.GetActiveCamera()
        self.view.CenterOfRotation = camera.GetFocalPoint()
        self.view.CameraParallelProjection = 1
        self.view.Background = [0, 0, 0]

        self.current_slice = self.display.Slice
        self.display.Representation = self.representation
        self.display.ColorArrayName = self.array_name
        paraview.ColorBy(self.display, self.array_name)

        color_map = paraview.GetColorTransferFunction(self.array_name, self.display)
        opacity_map = paraview.GetOpacityTransferFunction(self.array_name, self.display)

        scale_min = color_map.RGBPoints[0]
        scale_max = color_map.RGBPoints[-4]
        scale_middle = (scale_max - scale_min) / 2
        self.scale_range = (scale_min, scale_max)

        color_map.RGBPoints = [
            scale_min, 0.0, 0.0, 0.0,
            scale_max, 1.0, 1.0, 1.0,
        ]

        opacity_map.Points = [
            scale_min, 0.0, 0.5, 0.0,
            scale_middle, 0.5, 0.5, 0.0,
            scale_max, 1.0, 0.5, 0.0,
        ]

        paraview.Render(self.view)

    def get_opacity_middle_point(self):
        opacity_map = paraview.GetOpacityTransferFunction(self.array_name, self.display)
        return opacity_map.Points[4], opacity_map.Points[5]

    def set_opacity_middle_point(self, point, opacity):
        opacity_map = paraview.GetOpacityTransferFunction(self.array_name, self.display)
        opacity_points = []

        opacity_points.extend(opacity_map.Points[:4])
        opacity_points.extend([point, opacity, 0.5, 0.0])
        opacity_points.extend(opacity_map.Points[-4:])

        opacity_map.Points = opacity_points

        paraview.Render(self.view)

    def set_representation_mode(self, representation_mode):
        self.representation = str(representation_mode)
        self.display.Representation = self.representation

        self.reset_camera_by_slice_mode(self.slice_mode)
        paraview.Render(self.view)

    def set_slice_mode(self, slice_mode):
        self.slice_mode = str(slice_mode)
        self.display.SliceMode = self.slice_mode

        self.reset_camera_by_slice_mode(self.slice_mode)
        paraview.Render(self.view)

    def set_current_slice_number(self, slice_number):
        self.current_slice = slice_number
        self.display.Slice = self.current_slice

        paraview.Render(self.view)

    def reset_camera_by_slice_mode(self, slice_mode):
        if slice_mode == 'XY Plane':
            self.reset_camera_to_xy_plane()
        elif slice_mode == 'XZ Plane':
            self.reset_camera_to_xz_plane()
        elif slice_mode == 'YZ Plane':
            self.reset_camera_to_yz_plane()
