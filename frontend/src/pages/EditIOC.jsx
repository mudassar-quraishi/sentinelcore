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

function EditIOC() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [ioc, setIOC] = useState({

        type: "",
        value: "",
        riskLevel: "",
        source: "",
        status: "",

    });

    useEffect(() => {

        loadIOC();

    }, []);

    const loadIOC = async () => {

        try {

            const response = await api.get(`/ioc/${id}`);

            setIOC(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to Load IOC");

        }

    };

    const updateIOC = async () => {

        try {

            await api.put(`/ioc/${id}`, ioc);

            alert("IOC Updated Successfully");

            navigate("/ioc-list");

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
                title="Edit IOC"
                subtitle="Update Indicator of Compromise"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <GlassCard className="max-w-5xl mx-auto p-10">

                    <FormSection>

                        <ModernSelect
                            label="IOC Type"
                            value={ioc.type}
                            onChange={(e) =>
                                setIOC({
                                    ...ioc,
                                    type: e.target.value,
                                })
                            }
                            options={[
                                "IP Address",
                                "Domain",
                                "URL",
                                "Email Address",
                                "MD5 Hash",
                                "SHA1 Hash",
                                "SHA256 Hash",
                                "Registry Key",
                                "Mutex",
                                "File Path",
                                "Process Name",
                            ]}
                        />

                        <ModernSelect
                            label="Risk Level"
                            value={ioc.riskLevel}
                            onChange={(e) =>
                                setIOC({
                                    ...ioc,
                                    riskLevel: e.target.value,
                                })
                            }
                            options={[
                                "Critical",
                                "High",
                                "Medium",
                                "Low",
                            ]}
                        />

                        <div className="md:col-span-2">

                            <ModernInput
                                label="IOC Value"
                                value={ioc.value}
                                onChange={(e) =>
                                    setIOC({
                                        ...ioc,
                                        value: e.target.value,
                                    })
                                }
                            />

                        </div>

                        <ModernSelect
                            label="Source"
                            value={ioc.source}
                            onChange={(e) =>
                                setIOC({
                                    ...ioc,
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

                        <ModernSelect
                            label="Status"
                            value={ioc.status}
                            onChange={(e) =>
                                setIOC({
                                    ...ioc,
                                    status: e.target.value,
                                })
                            }
                            options={[
                                "Active",
                                "Blocked",
                                "Investigating",
                            ]}
                        />

                    </FormSection>

                    <div className="flex justify-end gap-4 mt-10">

                        <PrimaryButton
                            onClick={() => navigate("/ioc-list")}
                            className="
                                bg-slate-700
                                hover:bg-slate-600
                                text-white
                            "
                        >
                            Cancel
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={updateIOC}
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
                            💾 Update IOC
                        </PrimaryButton>

                    </div>

                </GlassCard>

            </motion.div>

        </div>

    </main>

</>
);

}

export default EditIOC;