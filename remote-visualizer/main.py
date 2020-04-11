import argparse

from wslink import server

from protocols.remote_visualizer_server_protocol import RemoteVisualizerServerProtocol


def start_remote_visualizer_server():
    parser = argparse.ArgumentParser(description="MedLightWeight Remote Visualizer")
    server.add_arguments(parser)
    args = parser.parse_args()

    RemoteVisualizerServerProtocol.authKey = args.authKey

    server.start_webserver(options=args, protocol=RemoteVisualizerServerProtocol)


if __name__ == "__main__":
    start_remote_visualizer_server()
