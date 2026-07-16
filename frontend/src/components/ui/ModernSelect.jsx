function ModernSelect({
    label,
    value,
    onChange,
    options,
}) {
    return (
        <div className="relative">

            <select
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-xl
                    bg-slate-800
                    border
                    border-slate-700
                    px-5
                    pt-7
                    pb-3
                    text-white
                    focus:border-cyan-400
                    focus:ring-2
                    focus:ring-cyan-500/30
                    outline-none
                "
            >

                {options.map((option) => (
                    <option
                        key={typeof option === "object" ? option.value : option}
                        value={typeof option === "object" ? option.value : option}
                    >
                        {typeof option === "object" ? option.label : option}
                    </option>
                ))}

            </select>

            <label
                className="
                    absolute
                    left-5
                    top-2
                    text-xs
                    font-medium
                    text-cyan-400
                "
            >
                {label}
            </label>

        </div>
    );
}

export default ModernSelect;