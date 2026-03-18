"use client";

import { useState, useEffect, useCallback } from "react";

interface BrainStats {
  intelligence: number;
  processingSpeed: number;
  memory: number;
  creativity: number;
  learningRate: number;
  currentTier: number;
  totalUpgrades: number;
  neurons: number;
  synapses: number;
}

interface Workflow {
  id: string;
  name: string;
  status: "active" | "paused" | "running";
  lastRun: string;
  executions: number;
  autoMode: boolean;
}

interface UpgradeTier {
  tier: number;
  name: string;
  cost: number;
  benefits: string[];
  requiredLevel: number;
}

const upgradeTiers: UpgradeTier[] = [
  {
    tier: 1,
    name: "Neural Basic",
    cost: 0,
    benefits: ["Base processing", "5K neurons", "Basic learning"],
    requiredLevel: 0,
  },
  {
    tier: 2,
    name: "Neural Plus",
    cost: 500,
    benefits: ["Enhanced speed", "50K neurons", "Advanced learning", "Priority processing"],
    requiredLevel: 1,
  },
  {
    tier: 3,
    name: "Neural Pro",
    cost: 1500,
    benefits: ["Super fast", "500K neurons", "Deep learning", "Custom workflows", "API access"],
    requiredLevel: 2,
  },
  {
    tier: 4,
    name: "Neural Elite",
    cost: 5000,
    benefits: ["Maximum speed", "5M neurons", "Quantum learning", "Unlimited workflows", "Full API", "24/7 support"],
    requiredLevel: 3,
  },
];

const initialWorkflows: Workflow[] = [
  { id: "1", name: "Data Processing", status: "active", lastRun: "2 min ago", executions: 1247, autoMode: true },
  { id: "2", name: "Content Generation", status: "active", lastRun: "5 min ago", executions: 892, autoMode: true },
  { id: "3", name: "Code Analysis", status: "running", lastRun: "Now", executions: 456, autoMode: true },
  { id: "4", name: "Research Synthesis", status: "paused", lastRun: "1 hour ago", executions: 234, autoMode: false },
  { id: "5", name: "Image Recognition", status: "active", lastRun: "1 min ago", executions: 1823, autoMode: true },
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-mono text-white">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState<BrainStats>({
    intelligence: 87,
    processingSpeed: 92,
    memory: 78,
    creativity: 85,
    learningRate: 90,
    currentTier: 1,
    totalUpgrades: 0,
    neurons: 5000,
    synapses: 25000,
  });
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);
  const [credits, setCredits] = useState(2500);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeProgress, setUpgradeProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"dashboard" | "upgrades" | "workflows">("dashboard");

  const simulateBrainActivity = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      intelligence: Math.min(100, prev.intelligence + (Math.random() * 0.5 - 0.1)),
      processingSpeed: Math.min(100, prev.processingSpeed + (Math.random() * 0.3 - 0.1)),
      memory: Math.min(100, prev.memory + (Math.random() * 0.2)),
      neurons: prev.neurons + Math.floor(Math.random() * 10),
      synapses: prev.synapses + Math.floor(Math.random() * 50),
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(simulateBrainActivity, 2000);
    return () => clearInterval(interval);
  }, [simulateBrainActivity]);

  const handleUpgrade = (tier: UpgradeTier) => {
    if (credits >= tier.cost && stats.currentTier < tier.tier) {
      setIsUpgrading(true);
      setUpgradeProgress(0);
      
      const interval = setInterval(() => {
        setUpgradeProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStats((s) => ({
              ...s,
              currentTier: tier.tier,
              totalUpgrades: s.totalUpgrades + 1,
              intelligence: Math.min(100, s.intelligence + 15),
              processingSpeed: Math.min(100, s.processingSpeed + 20),
              memory: Math.min(100, s.memory + 10),
              creativity: Math.min(100, s.creativity + 12),
              learningRate: Math.min(100, s.learningRate + 18),
              neurons: tier.tier === 2 ? 50000 : tier.tier === 3 ? 500000 : tier.tier === 4 ? 5000000 : 5000,
              synapses: tier.tier === 2 ? 250000 : tier.tier === 3 ? 2500000 : tier.tier === 4 ? 25000000 : 25000,
            }));
            setCredits((c) => c - tier.cost);
            setIsUpgrading(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === "active" ? "paused" : "active", autoMode: !w.autoMode } : w
      )
    );
  };

  const runWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "running", lastRun: "Now", executions: w.executions + 1 } : w))
    );
    setTimeout(() => {
      setWorkflows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, status: "active" } : w))
      );
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI Brain Upgrade
            </h1>
            <p className="text-gray-400 mt-1">Neural Intelligence System v2.0</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">System Online</span>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl px-4 py-2">
              <span className="text-sm font-bold">{credits.toLocaleString()} Credits</span>
            </div>
          </div>
        </header>

        <nav className="flex gap-2 mb-8 border-b border-gray-800 pb-4">
          {(["dashboard", "upgrades", "workflows"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
                  Neural Activity
                </h2>
                <StatBar label="Intelligence" value={stats.intelligence} color="bg-gradient-to-r from-blue-500 to-cyan-400" />
                <StatBar label="Processing Speed" value={stats.processingSpeed} color="bg-gradient-to-r from-green-500 to-emerald-400" />
                <StatBar label="Memory Capacity" value={stats.memory} color="bg-gradient-to-r from-purple-500 to-pink-400" />
                <StatBar label="Creativity Index" value={stats.creativity} color="bg-gradient-to-r from-orange-500 to-amber-400" />
                <StatBar label="Learning Rate" value={stats.learningRate} color="bg-gradient-to-r from-cyan-500 to-blue-400" />
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6">Brain Architecture</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 rounded-xl p-4 border border-gray-800">
                    <div className="text-3xl font-bold text-cyan-400">{stats.neurons.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-1">Active Neurons</div>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-gray-800">
                    <div className="text-3xl font-bold text-purple-400">{stats.synapses.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 mt-1">Synaptic Connections</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-800/50 rounded-2xl p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
                    <span className="text-3xl font-bold">{stats.currentTier}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tier {stats.currentTier}</h3>
                  <p className="text-cyan-400">{upgradeTiers[stats.currentTier]?.name || "Neural Basic"}</p>
                  <div className="mt-4 text-sm text-gray-400">
                    {stats.totalUpgrades} upgrades completed
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-3 rounded-xl font-medium transition-all border border-cyan-500/30">
                    Run Diagnostics
                  </button>
                  <button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-3 rounded-xl font-medium transition-all border border-purple-500/30">
                    Optimize Brain
                  </button>
                  <button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 py-3 rounded-xl font-medium transition-all border border-green-500/30">
                    Sync Neural Net
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "upgrades" && (
          <div className="space-y-6">
            {isUpgrading && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <div>
                    <div className="text-lg font-semibold text-cyan-400">Upgrading Neural Architecture...</div>
                    <div className="text-sm text-gray-400">Please wait while your brain is being enhanced</div>
                  </div>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    style={{ width: `${upgradeProgress}%` }}
                  />
                </div>
                <div className="text-right text-sm text-cyan-400 mt-2">{upgradeProgress}%</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upgradeTiers.map((tier) => (
                <div
                  key={tier.tier}
                  className={`relative bg-gray-900/50 border rounded-2xl p-6 transition-all ${
                    stats.currentTier === tier.tier
                      ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                      : stats.currentTier > tier.tier
                      ? "border-gray-700 opacity-50"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {stats.currentTier === tier.tier && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      CURRENT
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-white mb-1">Tier {tier.tier}</div>
                    <div className="text-lg text-cyan-400">{tier.name}</div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-amber-400">
                      {tier.cost === 0 ? "FREE" : `${tier.cost.toLocaleString()} CR`}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleUpgrade(tier)}
                    disabled={stats.currentTier >= tier.tier || isUpgrading || credits < tier.cost}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      stats.currentTier >= tier.tier
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : credits < tier.cost
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400"
                    }`}
                  >
                    {stats.currentTier >= tier.tier ? "Unlocked" : credits < tier.cost ? "Insufficient Credits" : "Upgrade"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "workflows" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Automated Workflows</h2>
                <p className="text-gray-400 text-sm">Manage and monitor your AI workflows</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  {workflows.filter((w) => w.autoMode).length} / {workflows.length} Auto
                </span>
                <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-xl font-medium border border-green-500/30 transition-all">
                  + New Workflow
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        workflow.status === "running"
                          ? "bg-green-500 animate-pulse"
                          : workflow.status === "active"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-white">{workflow.name}</div>
                      <div className="text-sm text-gray-500">
                        Last run: {workflow.lastRun} • {workflow.executions.toLocaleString()} executions
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        workflow.status === "running"
                          ? "bg-green-500/20 text-green-400"
                          : workflow.status === "active"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {workflow.status.toUpperCase()}
                    </div>
                    <button
                      onClick={() => toggleWorkflow(workflow.id)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        workflow.autoMode ? "bg-cyan-500" : "bg-gray-700"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-all ${
                          workflow.autoMode ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => runWorkflow(workflow.id)}
                      disabled={workflow.status === "running"}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      Run Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
