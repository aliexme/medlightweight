from paraview import simple as paraview


class RenderManager(object):
    def __init__(self):
        self.view = None
        self.source = None
        self.display = None

    def __del__(self):
        self.destroy()

    def destroy(self):
        if self.source is not None:
            paraview.Delete(self.source)

        if self.display is not None:
            paraview.Delete(self.display)

        if self.view is not None:
            paraview.Delete(self.view)

        del self.source
        del self.display
        del self.view

        self.source = None
        self.display = None
        self.view = None

    def set_interaction_mode(self, interaction_mode):
        self.view.InteractionMode = str(interaction_mode)
        paraview.Render(self.view)

    def reset_camera_to_xy_plane(self):
        paraview.ResetCamera(self.view)
        self.view.CameraPosition = [39.75, 39.75, -194.1]
        self.view.CameraViewUp = [0.0, 1.0, 0.0]

    def reset_camera_to_xz_plane(self):
        paraview.ResetCamera(self.view)
        self.view.CameraPosition = [39.75, 256.26, 29.85]
        self.view.CameraViewUp = [0.0, 0.0, -1.0]

    def reset_camera_to_yz_plane(self):
        paraview.ResetCamera(self.view)
        self.view.CameraPosition = [285.67, 39.75, 29.85]
        self.view.CameraViewUp = [0.0, 0.0, -1.0]
