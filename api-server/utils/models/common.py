from typing import Tuple, List


def enum_to_model_choices(enum) -> List[Tuple[str, str]]:
    return [(tag.value, tag.name) for tag in enum]
