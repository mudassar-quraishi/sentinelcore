function ModernInput({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
}) {
    return (
        <div className="relative">

            <input
                type={type}
                value={value}
                placeholder=" "
                onChange={onChange}
                className="
                    peer
                    w-full
                    rounded-xl
                    bg-slate-800
                    border
                    border-slate-700
                    px-5
                    pt-7
                    pb-3
                    text-white
                    placeholder-transparent
                    focus:border-cyan-400
                    focus:ring-2
                    focus:ring-cyan-500/30
                    outline-none
                    transition
                "
            />

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

export default ModernInput;