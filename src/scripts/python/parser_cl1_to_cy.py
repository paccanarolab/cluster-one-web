import sys
from libs.lib_manejo_csv import lee_csv, lee_txt
import json
import random


def parse_cl1_to_cy(cl1_file_path: str, cy_file_output_path: str):
    """
    Parsea un archivo de CL1 a formato de Cytoscape.
    :param cl1_file_path: Ruta del archivo de CL1.
    :param cy_file_output_path: Ruta del archivo de salida.
    :return: None
    """
    # Lee el archivo de CL1
    cl1 = lee_csv(cl1_file_path)
    # Crea el archivo de salida en formato JSON
    cy = open(cy_file_output_path, 'w')
    
    _net = []

    for row in cl1:
        breakpoint()


def parse_dataset_to_cy(dataset_file_path: str, cy_file_output_path: str):
    """
    Parsea un archivo TXT a formato de Cytoscape.
    :param dataset_file_path: Ruta del archivo TXT.
    :param cy_file_output_path: Ruta del archivo de salida.
    :return: None
    """
    # Lee el archivo TXT
    dataset = lee_txt(dataset_file_path)
    # Crea el archivo de salida en formato JSON
    cy = open(cy_file_output_path, 'w')

    _net = []
    _list_nodes = []
    _edges = []
    for row in dataset:
        _row = row.split("\t")
        try:
            _origen = _row[0]
            _destino = _row[1]
            _peso = _row[2]
        except IndexError:
            breakpoint()

        _origen_node = {
            "data": {
                "id": _origen,
                "name": _origen,
                "protein": "true"
            },
            "position": {
                "x": random.randint(800, 1000),
                "y": random.randint(0, 100)
            },
            "selected": False,
            "selectable": True,
            "locked": False,
            "grabbable": True,
            "group": "nodes",
            "classes": "fn10273 fn6931 fn9632 fn7950 fn9188 fn6944 fn9471 fn6284 fn9180 fn6956 fn6935 fn6219 fn8147 fn6939 fn7338 fn6936 fn6949 fn7952 fn6957 fn8786 fn6676 fn10713 fn7453 fn7451 fn10024 fn7456 fn7454 fn7469 fn7467 fn10022 fn7463 fn7464 fn6279 fn6278 fn8569 fn7641 fn8568"
        }
        _destino_node = {
            "data": {
                "id": _destino,
                "name": _destino,
                "protein": "true"
            },
            "position": {
                "x": random.randint(800, 1000),
                "y": random.randint(0, 100)
            },
            "selected": False,
            "selectable": True,
            "locked": False,
            "grabbable": True,
            "group": "nodes",
            "classes": "fn7921"
        }
        if _origen not in _list_nodes:
            # TODO: Generar el nodo en el formato de Cytoscape
            _list_nodes.append(_origen_node)
        if _destino not in _list_nodes:
            # TODO: Generar el nodo en el formato de Cytoscape
            _list_nodes.append(_destino_node)

        _edge = {
            "data": {
                "source": _origen,
                "target": _destino,
                "weight": _peso,
                "interaction": "pp",
                "id": _origen + "_" + _destino
            },
            "position": {},
            "selected": False,
            "selectable": True,
            "locked": False,
            "grabbable": True,
            "group": "edges",
            "classes": "pp"
        }
        _edges.append(_edge)

    _net = _list_nodes + _edges
    cy.write(json.dumps(_net))
    cy.close()

# parse_cl1_to_cy(sys.argv[1], sys.argv[2])


parse_dataset_to_cy(sys.argv[1], sys.argv[2])
