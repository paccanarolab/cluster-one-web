import React from "react";

const Layout = () => {
    const [layout, setLayout] = React.useState('');

    const handleLayoutChange = (event) => {
        setLayout(event.target.value);
    }

    return (
        <div className="cluster-layout" id="layout">
            <select value={layout} onChange={handleLayoutChange}>
                <option value="layout1">Layout 1</option>
                <option value="layout2">Layout 2</option>
                <option value="layout3">Layout 3</option>
                <option value="layout4">Layout 4</option>
                {/* Puedes agregar más opciones si lo necesitas */}
            </select>

            {/* Si deseas mostrar el layout seleccionado: */}
            <p>Layout seleccionado: {layout}</p>
        </div>
    );
}

export { Layout };
