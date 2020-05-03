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
