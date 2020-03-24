import argparse

from wslink import server

from src.protocols.remote_vizualizer_server_protocol import RemoteVizualizerServerProtocol


def start_remote_vizualizer_server():
    parser = argparse.ArgumentParser(description="MedLightWeight Remote Vizualizer")
    server.add_arguments(parser)
    args = parser.parse_args()

    RemoteVizualizerServerProtocol.authKey = args.authKey

    server.start_webserver(options=args, protocol=RemoteVizualizerServerProtocol)


if __name__ == "__main__":
    start_remote_vizualizer_server()
