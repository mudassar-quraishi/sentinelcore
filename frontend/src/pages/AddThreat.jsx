import { useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnimatedBackground from "../components/AnimatedBackground";

import GlassCard from "../components/ui/GlassCard";
import PageHeader from "../components/ui/PageHeader";
import PrimaryButton from "../components/ui/PrimaryButton";

function AddThreat() {

    const [title, setTitle] = useState("");
    const [severity, setSeverity] = useState("");
    const [source, setSource] = useState("");
    const [status, setStatus] = useState("");

    const saveThreat = async () => {

        try {

            await api.post("/threats", {
                title,
                severity,
                source,
                status
            });

            alert("Threat Added Successfully");

            setTitle("");
            setSeverity("");
            setSource("");
            setStatus("");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Threat");

        }

    };

    return (

        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 min-h-screen bg-slate-950 relative overflow-hidden">

                <AnimatedBackground />

                <div className="relative z-10 p-8">

                    <PageHeader
                        title="Add Threat"
                        subtitle="Create a new cyber threat record"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <GlassCard className="max-w-4xl mx-auto p-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Threat Title */}

                                <div className="relative md:col-span-2">

                                    <select
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
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

                                        <option value="">Select Threat</option>

                                        <option>SQL Injection</option>
                                        <option>XSS Attack</option>
                                        <option>Ransomware</option>
                                        <option>DDoS Attack</option>
                                        <option>Malware</option>
                                        <option>Phishing</option>
                                        <option>Brute Force</option>
                                        <option>Zero-Day Exploit</option>
                                        <option>Privilege Escalation</option>

                                    </select>

                                    <label className="absolute left-5 top-2 text-xs font-medium text-cyan-400">

                                        Threat Title

                                    </label>

                                </div>

                                {/* Severity */}

                                <div className="relative">

                                    <select
                                        value={severity}
                                        onChange={(e) => setSeverity(e.target.value)}
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

                                        <option value="">Select Severity</option>

                                        <option>Critical</option>
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>

                                    </select>

                                    <label className="absolute left-5 top-2 text-xs font-medium text-cyan-400">

                                        Severity

                                    </label>

                                </div>                                {/* Status */}

                                <div className="relative">

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
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

                                        <option value="">Select Status</option>

                                        <option>Open</option>
                                        <option>In Progress</option>
                                        <option>Resolved</option>

                                    </select>

                                    <label className="absolute left-5 top-2 text-xs font-medium text-cyan-400">

                                        Status

                                    </label>

                                </div>

                                {/* Source */}

                                <div className="relative md:col-span-2">

                                    <select
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
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

                                        <option value="">Select Source</option>

                                        <option>Firewall</option>
                                        <option>IDS</option>
                                        <option>IPS</option>
                                        <option>SIEM</option>
                                        <option>Antivirus</option>
                                        <option>Endpoint Security</option>
                                        <option>Email Gateway</option>
                                        <option>Threat Intelligence Feed</option>
                                        <option>Cloud Security</option>
                                        <option>Manual Investigation</option>

                                    </select>

                                    <label className="absolute left-5 top-2 text-xs font-medium text-cyan-400">

                                        Threat Source

                                    </label>

                                </div>

                            </div>

                            {/* Action Buttons */}

                            <div className="flex justify-end gap-4 mt-10">

                                <PrimaryButton
                                    onClick={() => {
                                        setTitle("");
                                        setSeverity("");
                                        setSource("");
                                        setStatus("");
                                    }}
                                    className="
                                        bg-slate-700
                                        hover:bg-slate-600
                                        text-white
                                    "
                                >
                                    Reset
                                </PrimaryButton>

                                <PrimaryButton
                                    onClick={saveThreat}
                                    className="
                                        bg-gradient-to-r
                                        from-cyan-600
                                        to-blue-600
                                        hover:from-cyan-500
                                        hover:to-blue-500
                                        text-white
                                        shadow-xl
                                    "
                                >
                                    🚀 Add Threat
                                </PrimaryButton>

                            </div>

                        </GlassCard>

                    </motion.div>

                </div>

            </main>

        </>

    );

}

export default AddThreat;