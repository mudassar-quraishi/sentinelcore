import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AnimatedBackground from "../components/AnimatedBackground";

import GlassCard from "../components/ui/GlassCard";
import PageHeader from "../components/ui/PageHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import ModernInput from "../components/ui/ModernInput";
import ModernSelect from "../components/ui/ModernSelect";
import FormSection from "../components/ui/FormSection";

function EditThreat() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [threat, setThreat] = useState({
        title: "",
        severity: "",
        source: "",
        status: "",
    });

    useEffect(() => {
        loadThreat();
    }, []);

    const loadThreat = async () => {

        try {

            const response = await api.get(`/threats/${id}`);

            setThreat(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to Load Threat");

        }

    };

    const updateThreat = async () => {

        try {

            await api.put(`/threats/${id}`, threat);

            alert("Threat Updated Successfully");

            navigate("/threat-list");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (<>
    <Navbar />
    <Sidebar />

    <main className="ml-64 mt-16 min-h-screen bg-slate-950 relative overflow-hidden">

        <AnimatedBackground />

        <div className="relative z-10 p-8">

            <PageHeader
                title="Edit Threat"
                subtitle="Update Cyber Threat Information"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <GlassCard className="max-w-5xl mx-auto p-10">

                    <FormSection>

                        {/* Threat Title */}

                        <ModernSelect
                            label="Threat Title"
                            value={threat.title}
                            onChange={(e) =>
                                setThreat({
                                    ...threat,
                                    title: e.target.value,
                                })
                            }
                            options={[
                                "SQL Injection",
                                "XSS Attack",
                                "Ransomware",
                                "DDoS Attack",
                                "Malware",
                                "Phishing",
                                "Brute Force",
                                "Zero-Day Exploit",
                                "Privilege Escalation",
                            ]}
                        />

                        {/* Severity */}

                        <ModernSelect
                            label="Severity"
                            value={threat.severity}
                            onChange={(e) =>
                                setThreat({
                                    ...threat,
                                    severity: e.target.value,
                                })
                            }
                            options={[
                                "Critical",
                                "High",
                                "Medium",
                                "Low",
                            ]}
                        />

                        {/* Source */}

                        <ModernSelect
                            label="Source"
                            value={threat.source}
                            onChange={(e) =>
                                setThreat({
                                    ...threat,
                                    source: e.target.value,
                                })
                            }
                            options={[
                                "Firewall",
                                "IDS",
                                "IPS",
                                "SIEM",
                                "EDR",
                                "XDR",
                                "Antivirus",
                                "Threat Intelligence Feed",
                                "Cloud Security",
                                "Manual Investigation",
                            ]}
                        />

                        {/* Status */}

                        <ModernSelect
                            label="Status"
                            value={threat.status}
                            onChange={(e) =>
                                setThreat({
                                    ...threat,
                                    status: e.target.value,
                                })
                            }
                            options={[
                                "Open",
                                "In Progress",
                                "Resolved",
                            ]}
                        />

                    </FormSection>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 mt-10">

                        <PrimaryButton
                            onClick={() => navigate("/threat-list")}
                            className="
                                bg-slate-700
                                hover:bg-slate-600
                                text-white
                            "
                        >
                            Cancel
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={updateThreat}
                            className="
                                bg-gradient-to-r
                                from-emerald-600
                                to-cyan-600
                                hover:from-emerald-500
                                hover:to-cyan-500
                                text-white
                                shadow-xl
                            "
                        >
                            💾 Update Threat
                        </PrimaryButton>

                    </div>

                </GlassCard>

            </motion.div>

        </div>

    </main>

</>
);

}

export default EditThreat;