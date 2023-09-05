import React from "react";

const Layout = ({classname}) => {
    const [layout, setLayout] = React.useState('');

    const handleLayoutChange = (event) => {
        setLayout(event.target.value);
    }

    return (
        <div>
            <select value={layout} onChange={handleLayoutChange} className={classname}>
                <option value="layout1">Layout 1</option>
                <option value="layout2">Layout 2</option>
                <option value="layout3">Layout 3</option>
                <option value="layout4">Layout 4</option>
                {/* Puedes agregar más opciones si lo necesitas */}
            </select>
        </div>
    );
}

export { Layout };
