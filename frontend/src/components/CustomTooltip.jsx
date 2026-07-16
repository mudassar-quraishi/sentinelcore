function CustomTooltip({ active, payload, label }) {

    if (active && payload && payload.length) {

        return (

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">

                <h3 className="text-sky-400 font-bold text-lg">
                    {label}
                </h3>

                <p className="text-white mt-2 text-base">
                    Threat Count :
                    <span className="ml-2 font-bold text-cyan-400">
                        {payload[0].value}
                    </span>
                </p>

            </div>

        );

    }

    return null;

}

export default CustomTooltip;