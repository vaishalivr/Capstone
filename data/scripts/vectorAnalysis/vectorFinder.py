import ndjson
import sys

def get_x_direction(stroke_x_axis_ticks):
    try:
        first_tick = stroke_x_axis_ticks[0]
        second_tick = stroke_x_axis_ticks[1]

        if second_tick - first_tick > 0:
            return "E"
        elif second_tick - first_tick < 0:
            return "W"
        else:
            return ""
    except Exception:
        return ""


def get_y_direction(stroke_y_axis_ticks):
    try:
        first_tick = stroke_y_axis_ticks[0]
        second_tick = stroke_y_axis_ticks[1]

        if second_tick - first_tick > 0:
            return "N"
        elif second_tick - first_tick < 0:
            return "S"
        else:
            return ""
    except Exception:
        return ""

def get_pattern(drawing):
    pattern = []
    for stroke in drawing:
        pattern.append(get_y_direction(stroke[1]) + get_x_direction(stroke[0]))
    return ":".join(pattern)


if __name__ == '__main__':
    with open(sys.argv[1]) as f:
        full_drawing_data = ndjson.load(f)
        pattern_counts = {}
        for drawing_object in full_drawing_data:
            if(drawing_object["recognized"]):
                drawing_pattern = get_pattern(drawing_object["drawing"])
                if drawing_pattern in pattern_counts.keys():
                    pattern_counts[drawing_pattern]["count"] += 1
                    pattern_counts[drawing_pattern]["key_id"] = drawing_object["key_id"]
                else:
                    pattern_counts[drawing_pattern] = {"count": 1, "key_id": drawing_object["key_id"]}
        print(dict(sorted(pattern_counts.items(), key=lambda x: x[1]["count"], reverse=True)))

