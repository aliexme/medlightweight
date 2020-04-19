from twisted.internet import reactor


def debounce(delay):
    def decorator(func):
        def wrapped(*args, **kwargs):
            def call_func():
                del wrapped._timer
                func(*args, **kwargs)

            try:
                wrapped._timer
            except AttributeError:
                wrapped._timer = reactor.callLater(delay, call_func)
            else:
                wrapped._timer.reset(delay)

        return wrapped

    return decorator
