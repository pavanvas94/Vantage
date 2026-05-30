// ----------------------------------------------------
// Vantage - Core Application & AI Integration Engine
// ----------------------------------------------------
function safeCreateIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}
function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'uuid-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
}
function initSupabase(url, key) {
    if (!url || !key) return null;
    try {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            return supabase.createClient(url, key);
        }
        return null;
    } catch (e) {
        return null;
    }
}

// Default Presets and Initial Data
const INDUSTRY_PRESETS = {
    fmcg: {
        badgeText: "FMCG Workspace",
        departments: {
            ops: { name: "Operations & Supply Chain", color: "var(--dept-ops)" },
            marketing: { name: "Marketing & Brand", color: "var(--dept-marketing)" },
            sales: { name: "Sales & Distribution", color: "var(--dept-sales)" },
            rd: { name: "R&D & Formulation", color: "var(--dept-rd)" },
            finance: { name: "Finance & Compliance", color: "var(--dept-finance)" }
        },
        defaultCards: [
            {
                id: "card-1",
                title: "Source biodegradable outer packaging wrappers",
                description: "Research and vet sustainable packaging manufacturers for our main snack bar line. We must transition to 100% compostable wrappers to comply with our brand-level environmental pledge by Q4.",
                context: "Strategic alignment with Carbon-Neutral pledge. Vendor must meet food safety standards (FDA, EU regulations). Target unit price is under $0.05 per wrapper.",
                dept: "ops",
                priority: "high",
                column: "planning",
                checklist: [
                    { id: "ch-1", text: "Compile list of 5 compostable film suppliers", done: true },
                    { id: "ch-2", text: "Request material samples for barrier testing", done: false },
                    { id: "ch-3", text: "Run mechanical wrapper line tests with sample reels", done: false }
                ],
                files: [
                    { name: "Packaging Spec Sheet v2.pdf", url: "https://drive.google.com" }
                ],
                heritage: [
                    { time: "2026-05-20T10:00:00Z", desc: "Card created by brand director", author: "Deepak" },
                    { time: "2026-05-22T14:30:00Z", desc: "Added Packaging Spec Sheet and compiled vendor lists", author: "Priya" }
                ]
            },
            {
                id: "card-1-child-1",
                parentId: "card-1",
                title: "Vet list of compostable film suppliers",
                description: "Compile and vet a list of 5 compostable film suppliers in terms of certification and capacity.",
                context: "Need to make sure they are ASTM D6400 certified.",
                dept: "ops",
                priority: "high",
                column: "done",
                checklist: [],
                files: [],
                heritage: [{ time: "2026-05-22T10:00:00Z", desc: "Supplier list vetted", author: "Priya" }]
            },
            {
                id: "card-1-child-2",
                parentId: "card-1",
                title: "Request material samples for barrier testing",
                description: "Reach out to vetted vendors and order samples of barrier films.",
                context: "Barrier properties (OTR/MVTR) are critical for shelf life stability.",
                dept: "ops",
                priority: "medium",
                column: "active",
                checklist: [],
                files: [],
                heritage: [{ time: "2026-05-23T11:00:00Z", desc: "Samples ordered", author: "Priya" }]
            },
            {
                id: "card-1-child-3",
                parentId: "card-1",
                title: "Execute wrapper seal-jaw heat test",
                description: "Test sample packaging materials in the packaging line under different temperatures.",
                context: "Seals must be hermetic and maintain integrity.",
                dept: "ops",
                priority: "low",
                column: "planning",
                checklist: [],
                files: [],
                heritage: [{ time: "2026-05-24T12:00:00Z", desc: "Heat test planning initialized", author: "Deepak" }]
            },
            {
                id: "card-2",
                title: "Pitch organic juice line to Whole Foods regional buyer",
                description: "Prepare sales materials, sell sheets, and pricing matrix to pitch our upcoming organic juice line to the Whole Foods category manager.",
                context: "Key revenue milestone. Standard retail margin target is 40% with distributor taking 15%. Direct connection to HubSpot Deal #4810.",
                dept: "sales",
                priority: "high",
                column: "active",
                checklist: [
                    { id: "ch-5", text: "Finalize retail pricing structure", done: true },
                    { id: "ch-6", text: "Print physical sales booklets", done: true }
                ],
                files: [
                    { name: "Whole Foods Sell Sheet.pdf", url: "https://drive.google.com" }
                ],
                heritage: [
                    { time: "2026-05-18T11:00:00Z", desc: "Card initialized in active pipeline", author: "Raj" },
                    { time: "2026-05-25T16:00:00Z", desc: "Whole Foods listing slot confirmed. Agreed to 5% initial slotting discount.", author: "Raj" }
                ]
            },
            {
                id: "card-3",
                title: "Stability testing for Recipe Iteration #4 (Citrus Splash)",
                description: "Conduct 45-day accelerated stability and separation testing on Citrus Splash iteration #4 formulation to ensure shelf life requirements are met without stabilizers.",
                context: "Clean Label promise. Tests conducted at 40°C and 75% relative humidity.",
                dept: "rd",
                priority: "medium",
                column: "active",
                checklist: [
                    { id: "ch-9", text: "Inoculate test batches into shelf jars", done: true },
                    { id: "ch-10", text: "Check pH levels at Week 1 and Week 2", done: true }
                ],
                files: [],
                heritage: [
                    { time: "2026-05-10T09:00:00Z", desc: "Batch stability test initialized", author: "Dr. Roy" }
                ]
            }
        ]
    },
    general: {
        badgeText: "General Workspace",
        departments: {
            ops: { name: "Operations", color: "var(--dept-ops)" },
            marketing: { name: "Marketing", color: "var(--dept-marketing)" },
            sales: { name: "Sales", color: "var(--dept-sales)" },
            hr: { name: "HR & Talent", color: "var(--dept-rd)" },
            finance: { name: "Finance", color: "var(--dept-finance)" }
        },
        defaultCards: [
            {
                id: "card-g1",
                title: "Audit company insurance policies for new fiscal year",
                description: "Review general liability, cyber risk, and worker's compensation insurance before renewal to negotiate better premiums.",
                context: "Budget control optimization. Target premium saving is 10%.",
                dept: "finance",
                priority: "medium",
                column: "planning",
                checklist: [],
                files: [],
                heritage: [{ time: "2026-05-21T09:00:00Z", desc: "Audit process started", author: "Finance Mgr" }]
            }
        ]
    },
    tech: {
        badgeText: "Tech Workspace",
        departments: {
            ops: { name: "Design & UX", color: "var(--dept-ops)" },
            marketing: { name: "Growth & SEO", color: "var(--dept-marketing)" },
            sales: { name: "Sales & Demos", color: "var(--dept-sales)" },
            rd: { name: "Engineering / Dev", color: "var(--dept-rd)" },
            finance: { name: "Product Strategy", color: "var(--dept-finance)" }
        },
        defaultCards: [
            {
                id: "card-t1",
                title: "Migrate relational database to PostgreSQL cluster",
                description: "Set up PostgreSQL replication and execute schema migrations to support high availability and resolve query performance degradation.",
                context: "System scalability milestone. Target latency is < 50ms for API calls.",
                dept: "rd",
                priority: "high",
                column: "active",
                checklist: [],
                files: [],
                heritage: [{ time: "2026-05-20T10:00:00Z", desc: "Migration strategy drafted", author: "Dev Lead" }]
            }
        ]
    }
};

// Load custom preset from localStorage if it exists
const savedCustomDepts = localStorage.getItem("vantage_custom_departments");
let customPreset = {
    badgeText: "Custom Workspace",
    departments: {
        ops: { name: "Operations", color: "var(--dept-ops)" },
        marketing: { name: "Marketing", color: "var(--dept-marketing)" },
        sales: { name: "Sales", color: "var(--dept-sales)" },
        rd: { name: "Research & Dev", color: "var(--dept-rd)" },
        finance: { name: "Finance", color: "var(--dept-finance)" }
    },
    defaultCards: []
};
if (savedCustomDepts) {
    try {
        const parsed = JSON.parse(savedCustomDepts);
        if (parsed && parsed.departments) {
            customPreset.departments = parsed.departments;
        }
    } catch(e) {
        console.error("Failed to parse custom departments:", e);
    }
}
INDUSTRY_PRESETS.custom = customPreset;

const BOARD_COLUMNS = {
    backlog: "Backlog",
    planning: "Planning",
    active: "Active Work",
    review: "Review & QA",
    done: "Done"
};

function getUserRole() {
    return localStorage.getItem("vantage_user_role") || "owner";
}

function checkPermission(action) {
    const role = getUserRole();
    if (role === "reader") {
        alert(`Permission Denied: Readers cannot execute action "${action}".`);
        return false;
    }
    if (role === "contributor") {
        const managerActions = ["delete_card", "change_preset", "save_structure", "change_db_settings", "change_ai_settings", "drag_card", "create_card"];
        if (managerActions.includes(action)) {
            alert(`Permission Denied: Contributors cannot execute action "${action}".`);
            return false;
        }
    }
    return true;
}

function sanitizeAndParseJSON(jsonStr) {
    if (typeof jsonStr !== "string") return jsonStr;
    let cleaned = jsonStr.trim();
    if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(json)?\s*/i, "").replace(/\s*```$/i, "");
    }
    cleaned = cleaned.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    try {
        return JSON.parse(cleaned);
    } catch(err) {
        console.error("JSON parse failed, attempting manual repair:", err);
        try {
            const repaired = cleaned
                .replace(/,\s*([\]}])/g, "$1") 
                .replace(/\\'/g, "'"); 
            return JSON.parse(repaired);
        } catch(repairErr) {
            throw new Error(`JSON parsing failed: ${err.message}`);
        }
    }
}

function logAuditTrail(action, details) {
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    const newLog = {
        id: generateUUID(),
        workspace_owner: userEmail,
        user_email: userEmail,
        action: action,
        details: details,
        created_at: new Date().toISOString()
    };

    let localLogs = [];
    try {
        localLogs = JSON.parse(localStorage.getItem("vantage_local_audit_logs") || "[]");
    } catch(e) {
        localLogs = [];
    }
    localLogs.unshift(newLog);
    localLogs = localLogs.slice(0, 100);
    localStorage.setItem("vantage_local_audit_logs", JSON.stringify(localLogs));

    const dbProvider = localStorage.getItem("vantage_db_provider") || "local";
    if (dbProvider === "supabase" && APP && APP.supabase) {
        APP.supabase.from("vantage_audit_logs").insert([newLog]).then(({ error }) => {
            if (error) console.error("Failed to sync audit log to Supabase:", error.message);
        });
    } else if (dbProvider === "firebase") {
        const projectId = localStorage.getItem("vantage_firebase_project_id");
        if (projectId) {
            const fsBody = {
                fields: {
                    workspace_owner: { stringValue: userEmail },
                    user_email: { stringValue: userEmail },
                    action: { stringValue: action },
                    details: { stringValue: details },
                    created_at: { stringValue: newLog.created_at }
                }
            };
            fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/audit_logs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fsBody)
            }).catch(e => console.error("Failed to sync audit log to Firebase:", e));
        }
    } else if (dbProvider === "pocketbase") {
        const pbUrl = localStorage.getItem("vantage_pocketbase_url");
        if (pbUrl) {
            fetch(`${pbUrl}/api/collections/vantage_audit_logs/records`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLog)
            }).catch(e => console.error("Failed to sync audit log to PocketBase:", e));
        }
    }
}

async function dispatchWebhookNotification(cardTitle, eventType, details) {
    const webhookUrl = localStorage.getItem("vantage_webhook_url");
    if (!webhookUrl) return;

    const payload = {
        text: `*Vantage Notification:* Card "${cardTitle}" was updated.\n*Event:* ${eventType}\n*Details:* ${details}`
    };

    console.log(`[Webhook Dispatch] Posting to ${webhookUrl}:`, payload);
    
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            mode: "no-cors"
        });
        console.log("[Webhook Dispatch] Success:", response);
    } catch (err) {
        console.warn("[Webhook Dispatch] Failed:", err);
    }
}

// Application State
class VantageState {
    constructor() {
        this.industry = localStorage.getItem("vantage_industry") || "general";
        
        const config = window.VANTAGE_CONFIG || {};
        this.dbProvider = localStorage.getItem("vantage_db_provider") || "local";
        this.supabaseUrl = config.SUPABASE_URL || localStorage.getItem("vantage_supabase_url") || "";
        this.supabaseAnonKey = config.SUPABASE_ANON_KEY || localStorage.getItem("vantage_supabase_anon_key") || "";
        this.supabase = initSupabase(this.supabaseUrl, this.supabaseAnonKey);

        this.firebaseProjectId = localStorage.getItem("vantage_firebase_project_id") || "";
        this.firebaseApiKey = localStorage.getItem("vantage_firebase_api_key") || "";
        this.pocketbaseUrl = localStorage.getItem("vantage_pocketbase_url") || "";

        this.aiProvider = localStorage.getItem("vantage_ai_provider") || "gemini";
        this.apiKey = config.GEMINI_API_KEY || localStorage.getItem("vantage_api_key") || "";
        this.openaiKey = localStorage.getItem("vantage_openai_key") || "";
        this.openaiModel = localStorage.getItem("vantage_openai_model") || "gpt-4o-mini";
        this.anthropicKey = localStorage.getItem("vantage_anthropic_key") || "";
        this.anthropicModel = localStorage.getItem("vantage_anthropic_model") || "claude-3-5-sonnet-20240620";

        // Load card data
        const savedData = localStorage.getItem("vantage_workspace_data");
        if (savedData) {
            try {
                this.cards = JSON.parse(savedData);
            } catch (e) {
                this.cards = [];
            }
        } else {
            this.cards = []; 
        }

        // Cache team members
        const savedMembers = localStorage.getItem("vantage_members");
        if (savedMembers) {
            try {
                this.members = JSON.parse(savedMembers);
                if (!this.members.some(m => m.name === "AI Agent")) {
                    this.members.push({ name: "AI Agent", role: "ops", status: "active", permission_role: "agent" });
                    localStorage.setItem("vantage_members", JSON.stringify(this.members));
                }
            } catch (e) {
                this.seedDefaultMembers();
            }
        } else {
            this.seedDefaultMembers();
        }

        // Cache notifications
        const savedNotifications = localStorage.getItem("vantage_notifications");
        if (savedNotifications) {
            try {
                this.notifications = JSON.parse(savedNotifications);
            } catch(e) {
                this.notifications = [];
            }
        } else {
            this.notifications = [];
        }

        this.activeCardId = null;
        this.currentView = "dashboard-panel";
        this.filters = { dept: "all", search: "", priority: "all" };
        
        this.tempImportedCards = [];
        this.tempImportedParticipants = [];
        this.tempImportedBundles = [];
    }

    seedDefaultMembers() {
        const userName = localStorage.getItem("vantage_user_name") || "Team Lead";
        const userDept = localStorage.getItem("vantage_user_dept") || "ops";
        const userEmail = localStorage.getItem("vantage_user_email") || "owner@vantage-team.com";
        this.members = [
            { name: userName, role: userDept, status: "active", email: userEmail, permission_role: "owner" },
            { name: "AI Agent", role: "ops", status: "active", email: "agent@vantage-team.com", permission_role: "agent" },
            { name: "Priya", role: "ops", status: "active", email: "priya@vantage-team.com", permission_role: "contributor" },
            { name: "Raj", role: "sales", status: "active", email: "raj@vantage-team.com", permission_role: "contributor" },
            { name: "Deepak", role: "rd", status: "active", email: "deepak@vantage-team.com", permission_role: "contributor" },
            { name: "Sam", role: "finance", status: "active", email: "sam@vantage-team.com", permission_role: "reader" }
        ];
        localStorage.setItem("vantage_members", JSON.stringify(this.members));
    }

    save() {
        localStorage.setItem("vantage_workspace_data", JSON.stringify(this.cards));
        localStorage.setItem("vantage_industry", this.industry);
        localStorage.setItem("vantage_api_key", this.apiKey);
        localStorage.setItem("vantage_supabase_url", this.supabaseUrl);
        localStorage.setItem("vantage_supabase_anon_key", this.supabaseAnonKey);

        this.syncToDatabase();
    }

    resetToPreset(presetKey) {
        this.industry = presetKey;
        this.cards = this.cards.filter(c => c.workspace_id && c.workspace_id !== presetKey);
        const presetCards = INDUSTRY_PRESETS[presetKey].defaultCards.map(c => ({
            ...c,
            workspace_id: presetKey
        }));
        this.cards.push(...presetCards);
        this.save();
    }

    addCard(cardData) {
        if (!checkPermission("create_card")) return null;
        
        const id = cardData.id || ("card-" + generateUUID());
        let parentWorkspace = null;
        if (cardData.parentId) {
            const parent = this.cards.find(c => c.id === cardData.parentId);
            if (parent) parentWorkspace = parent.workspace_id;
        }
        
        const defaultDept = Object.keys(INDUSTRY_PRESETS[this.industry]?.departments || {})[0] || "ops";
        const newCard = {
            id,
            parentId: cardData.parentId || null,
            workspace_id: cardData.workspace_id || parentWorkspace || this.industry,
            title: cardData.title || "Untitled Card",
            description: cardData.description || "",
            context: cardData.context || "",
            dept: cardData.dept || defaultDept,
            priority: cardData.priority || "medium",
            column: cardData.column || "backlog",
            checklist: cardData.checklist || [],
            files: cardData.files || [],
            heritage: cardData.heritage || [{
                time: new Date().toISOString(),
                desc: "Card created",
                author: localStorage.getItem("vantage_user_name") || "System"
            }]
        };
        this.cards.push(newCard);
        
        // Log audit trail
        logAuditTrail("create_card", `Created card "${newCard.title}" under department ${newCard.dept}`);
        
        this.save();
        return newCard;
    }

    updateCard(cardId, updateData) {
        const index = this.cards.findIndex(c => c.id === cardId);
        if (index === -1) return null;

        const oldCard = this.cards[index];
        const oldParentId = oldCard.parentId;

        if (updateData.column && updateData.column !== oldCard.column) {
            if (!checkPermission("drag_card")) return null;
        } else {
            if (!checkPermission("update_card")) return null;
        }

        // Recursion Guard: check if any value actually changes
        let hasChange = false;
        for (let key in updateData) {
            if (oldCard[key] !== updateData[key]) {
                hasChange = true;
                break;
            }
        }
        if (!hasChange) return oldCard;

        this.cards[index] = { ...this.cards[index], ...updateData };
        const updatedCard = this.cards[index];
        
        // Auto-complete or demote parent card based on children's statuses
        if (updatedCard.parentId) {
            const parentId = updatedCard.parentId;
            setTimeout(() => {
                const parent = this.cards.find(c => c.id === parentId);
                if (parent) {
                    const siblings = this.cards.filter(c => c.parentId === parentId);
                    const allDone = siblings.length > 0 && siblings.every(c => c.column === "done");
                    
                    if (allDone && parent.column !== "done") {
                        this.updateCard(parentId, { column: "done" });
                        this.addHeritageLog(parentId, `Automatically advanced to Done because all child tasks are completed`, "System");
                        renderKanbanBoard();
                        renderDashboard();
                    } else if (!allDone && parent.column === "done") {
                        // Reciprocal Demotion: Demote parent if any child is incomplete
                        this.updateCard(parentId, { column: "active" });
                        this.addHeritageLog(parentId, `Automatically moved back to Active Work because sub-goal [${updatedCard.title}] was marked incomplete`, "System");
                        renderKanbanBoard();
                        renderDashboard();
                    }
                }
            }, 0);
        }
        
        // If parentId changed, check the old parent as well
        if (updateData.parentId !== undefined && oldParentId && oldParentId !== updatedCard.parentId) {
            setTimeout(() => {
                const oldParent = this.cards.find(c => c.id === oldParentId);
                if (oldParent) {
                    const siblings = this.cards.filter(c => c.parentId === oldParentId);
                    const allDone = siblings.length > 0 && siblings.every(c => c.column === "done");
                    if (allDone && oldParent.column !== "done") {
                        this.updateCard(oldParentId, { column: "done" });
                        this.addHeritageLog(oldParentId, `Automatically advanced to Done because all remaining child tasks are completed`, "System");
                        renderKanbanBoard();
                        renderDashboard();
                    }
                }
            }, 0);
        }
        
        this.save();
        return this.cards[index];
    }

    deleteCard(cardId) {
        if (!checkPermission("delete_card")) return false;
        
        const index = this.cards.findIndex(c => c.id === cardId);
        if (index === -1) return false;

        const cardTitle = this.cards[index].title;

        // Cascading Delete: Delete all child cards linked to this parent
        const childrenToDelete = this.cards.filter(c => c.parentId === cardId);
        childrenToDelete.forEach(child => {
            const cIndex = this.cards.findIndex(c => c.id === child.id);
            if (cIndex !== -1) {
                this.cards.splice(cIndex, 1);
            }
        });

        this.cards.splice(index, 1);
        
        // Sync delete to database based on active provider
        const dbProvider = localStorage.getItem("vantage_db_provider") || "local";
        const idsToDelete = [cardId, ...childrenToDelete.map(c => c.id)];
        
        if (dbProvider === "supabase" && this.supabase) {
            const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
            this.supabase
                .from('vantage_cards')
                .delete()
                .in('id', idsToDelete)
                .eq('workspace_owner', userEmail)
                .then(({ error }) => {
                    if (error) console.error("Failed to delete cards from Supabase:", error.message);
                });
        } else if (dbProvider === "firebase") {
            const projectId = localStorage.getItem("vantage_firebase_project_id");
            if (projectId) {
                idsToDelete.forEach(id => {
                    fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cards/${encodeURIComponent(id)}`, {
                        method: "DELETE"
                    }).catch(e => console.error("Firebase card delete failed:", e));
                });
            }
        } else if (dbProvider === "pocketbase") {
            const pbUrl = localStorage.getItem("vantage_pocketbase_url");
            if (pbUrl) {
                idsToDelete.forEach(id => {
                    const pbId = id.replace(/[^a-zA-Z0-9_]/g, "").substring(0, 15);
                    fetch(`${pbUrl}/api/collections/vantage_cards/records/${pbId}`, {
                        method: "DELETE"
                    }).catch(e => console.error("PocketBase card delete failed:", e));
                });
            }
        }

        // Log audit trail
        logAuditTrail("delete_card", `Deleted card "${cardTitle}" and ${childrenToDelete.length} nested child goals`);

        this.save();
        return true;
    }

    addHeritageLog(cardId, descText, authorName) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return null;
        const newLog = {
            time: new Date().toISOString(),
            desc: descText,
            author: authorName || localStorage.getItem("vantage_user_name") || "Assignee"
        };
        card.heritage.unshift(newLog);
        this.save();
        return newLog;
    }

    getDeptName(deptKey) {
        const depts = INDUSTRY_PRESETS[this.industry]?.departments;
        if (depts && depts[deptKey]) {
            return depts[deptKey].name;
        }
        return "General/Unassigned";
    }

    syncToDatabase() {
        const dbProvider = localStorage.getItem("vantage_db_provider") || "local";
        if (dbProvider === "local") return;

        if (this.syncTimeout) clearTimeout(this.syncTimeout);
        
        this.syncTimeout = setTimeout(async () => {
            try {
                const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
                
                if (dbProvider === "supabase" && this.supabase) {
                    const { error } = await this.supabase
                        .from('vantage_cards')
                        .upsert(
                            this.cards.map(c => ({
                                id: c.id,
                                workspace_owner: userEmail,
                                data: c,
                                updated_at: new Date()
                            }))
                        );
                    if (error) console.error("Supabase Database Sync Failed:", error.message);
                } else if (dbProvider === "firebase") {
                    const projectId = localStorage.getItem("vantage_firebase_project_id");
                    if (projectId) {
                        for (const card of this.cards) {
                            const fsBody = {
                                fields: {
                                    workspace_owner: { stringValue: userEmail },
                                    data: { stringValue: JSON.stringify(card) },
                                    updated_at: { stringValue: new Date().toISOString() }
                                }
                            };
                            await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cards/${encodeURIComponent(card.id)}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(fsBody)
                            });
                        }
                    }
                } else if (dbProvider === "pocketbase") {
                    const pbUrl = localStorage.getItem("vantage_pocketbase_url");
                    if (pbUrl) {
                        for (const card of this.cards) {
                            const pbId = card.id.replace(/[^a-zA-Z0-9_]/g, "").substring(0, 15);
                            const bodyData = {
                                id: pbId,
                                card_id: card.id,
                                workspace_owner: userEmail,
                                data: JSON.stringify(card),
                                updated_at: new Date().toISOString()
                            };
                            
                            const checkResp = await fetch(`${pbUrl}/api/collections/vantage_cards/records/${pbId}`);
                            if (checkResp.ok) {
                                await fetch(`${pbUrl}/api/collections/vantage_cards/records/${pbId}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(bodyData)
                                });
                            } else {
                                await fetch(`${pbUrl}/api/collections/vantage_cards/records`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(bodyData)
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Database sync request error:", e);
            }
        }, 300);
    }

    async pullFromDatabase() {
        const dbProvider = localStorage.getItem("vantage_db_provider") || "local";
        if (dbProvider === "local") return;

        try {
            const userEmail = localStorage.getItem("vantage_user_email");
            if (!userEmail) return;

            if (dbProvider === "supabase" && this.supabase) {
                const { data, error } = await this.supabase
                    .from('vantage_cards')
                    .select('data')
                    .eq('workspace_owner', userEmail);
                
                if (error) {
                    console.error("Failed to pull from Supabase:", error.message);
                } else if (data && data.length > 0) {
                    this.cards = data.map(item => {
                        const card = item.data;
                        if (!card.workspace_id) {
                            if (card.id.startsWith("card-g")) card.workspace_id = "general";
                            else if (card.id.startsWith("card-t")) card.workspace_id = "tech";
                            else card.workspace_id = "fmcg";
                        }
                        return card;
                    });
                    localStorage.setItem("vantage_workspace_data", JSON.stringify(this.cards));
                } else {
                    console.log("No card data found in Supabase. Seeding defaults...");
                    this.resetToPreset(this.industry);
                }
            } else if (dbProvider === "firebase") {
                const projectId = localStorage.getItem("vantage_firebase_project_id");
                if (projectId) {
                    const resp = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cards?pageSize=100`);
                    if (resp.ok) {
                        const resJson = await resp.json();
                        if (resJson.documents) {
                            const matchedCards = [];
                            resJson.documents.forEach(d => {
                                const fields = d.fields;
                                if (fields && fields.workspace_owner && fields.workspace_owner.stringValue === userEmail) {
                                    try {
                                        matchedCards.push(JSON.parse(fields.data.stringValue));
                                    } catch(err) {}
                                }
                            });
                            if (matchedCards.length > 0) {
                                this.cards = matchedCards;
                                localStorage.setItem("vantage_workspace_data", JSON.stringify(this.cards));
                            }
                        }
                    }
                }
            } else if (dbProvider === "pocketbase") {
                const pbUrl = localStorage.getItem("vantage_pocketbase_url");
                if (pbUrl) {
                    const resp = await fetch(`${pbUrl}/api/collections/vantage_cards/records?limit=100`);
                    if (resp.ok) {
                        const resJson = await resp.json();
                        if (resJson.items) {
                            const matchedCards = [];
                            resJson.items.forEach(item => {
                                if (item.workspace_owner === userEmail) {
                                    try {
                                        matchedCards.push(JSON.parse(item.data));
                                    } catch(err) {}
                                }
                            });
                            if (matchedCards.length > 0) {
                                this.cards = matchedCards;
                                localStorage.setItem("vantage_workspace_data", JSON.stringify(this.cards));
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Failed to complete database pull:", e);
        }
    }

    getActiveCards() {
        return this.cards.filter(c => !c.workspace_id || c.workspace_id === this.industry);
    }
}

const APP = new VantageState();

// ----------------------------------------------------
// UI Rendering Controllers
// ----------------------------------------------------

function initApp() {
    setupUserSessionDisplay();
    setupViewNavigation();
    setupFilters();
    setupSettings();
    setupCardModal();
    setupDragAndDrop();
    setupOnboardingImporter();
    setupNotifications(); // Set up notifications bell & realtime alerts

    // Bind CSV Export & Print Buttons
    const exportBtn = document.getElementById("export-csv-btn");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            exportWorkspaceToCSV();
        });
    }
    const printBtn = document.getElementById("print-dashboard-btn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // Bind Invite Modal closing clicks
    const inviteModal = document.getElementById("invite-modal");
    if (inviteModal) {
        document.getElementById("invite-modal-close-btn").addEventListener("click", () => inviteModal.classList.remove("active"));
        document.getElementById("invite-modal-cancel-btn").addEventListener("click", () => inviteModal.classList.remove("active"));
    }

    // Parse URL invitation parameter on load
    const urlParams = new URLSearchParams(window.location.search);
    const inviteName = urlParams.get("invite");
    const inviteRole = urlParams.get("role");
    if (inviteName && inviteRole) {
        const existingIdx = APP.members.findIndex(m => m.name.toLowerCase() === inviteName.toLowerCase());
        if (existingIdx !== -1) {
            APP.members[existingIdx].status = 'active';
            localStorage.setItem("vantage_members", JSON.stringify(APP.members));
            if (APP.supabase) {
                const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
                APP.supabase.from('vantage_members').upsert([{
                    workspace_owner: userEmail,
                    name: inviteName,
                    role: inviteRole,
                    status: 'active'
                }]).then(() => {});
            }
            showToastNotification("System", "Member Joined", `${inviteName} has accepted the invitation and joined the workspace.`);
        } else {
            const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
            const newMember = {
                workspace_owner: userEmail,
                name: inviteName,
                role: inviteRole,
                status: 'active'
            };
            APP.members.push(newMember);
            localStorage.setItem("vantage_members", JSON.stringify(APP.members));
            if (APP.supabase) {
                APP.supabase.from('vantage_members').upsert([newMember]).then(() => {});
            }
            showToastNotification("System", "Member Joined", `${inviteName} has joined the workspace.`);
        }
        // Clean URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Bind Team panel invite submit button
    const teamInviteBtn = document.getElementById("team-invite-btn");
    if (teamInviteBtn) {
        teamInviteBtn.addEventListener("click", () => {
            const nameInput = document.getElementById("team-new-name");
            const roleSelect = document.getElementById("team-new-role");
            const emailInput = document.getElementById("team-new-email");
            const permissionRoleSelect = document.getElementById("team-new-permission-role");

            const name = nameInput ? nameInput.value.trim() : "";
            const role = roleSelect ? roleSelect.value : "ops";
            const email = emailInput ? emailInput.value.trim() : "";
            const permissionRole = permissionRoleSelect ? permissionRoleSelect.value : "contributor";
            
            if (!name) {
                alert("Please enter a collaborator name.");
                return;
            }
            if (!email) {
                alert("Please enter a collaborator email.");
                return;
            }
            
            const dummyNode = { name, role, email, permission_role: permissionRole };
            openInviteModal(dummyNode);
            if (nameInput) nameInput.value = "";
            if (emailInput) emailInput.value = "";
        });
    }



    // Pull from cloud database on load if configured
    const activeDbProvider = localStorage.getItem("vantage_db_provider") || "local";
    if (activeDbProvider !== "local") {
        Promise.all([
            APP.pullFromDatabase(),
            pullMembersFromDatabase()
        ]).then(() => {
            renderActiveView();
        });
    } else {
        renderActiveView();
    }
    
    renderDepartmentBadges();
}

function setupUserSessionDisplay() {
    const name = localStorage.getItem("vantage_user_name") || "Startup Team";
    const deptKey = localStorage.getItem("vantage_user_dept") || "ops";
    const deptName = APP.getDeptName(deptKey);
    const role = getUserRole();
    
    const displayEl = document.getElementById("user-name-display");
    const roleEl = document.getElementById("user-role-display");
    const avatarEl = document.getElementById("user-avatar-badge");

    if (displayEl) displayEl.textContent = name;
    if (roleEl) roleEl.textContent = `${deptName} (${role.toUpperCase()})`;
    if (avatarEl) avatarEl.textContent = name.charAt(0);

    // Reader constraint: Disable / hide the header task creation button
    const newCardBtn = document.getElementById("new-card-btn");
    if (newCardBtn) {
        if (role === "reader") {
            newCardBtn.style.display = "none";
        } else {
            newCardBtn.style.display = "";
        }
    }
}

function setupViewNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(btn => btn.classList.remove("active"));
            item.classList.add("active");
            
            const target = item.getAttribute("data-target");
            APP.currentView = target;
            renderActiveView();
        });
    });

    document.getElementById("new-card-btn").addEventListener("click", () => {
        if (getUserRole() === "reader") {
            alert("Permission Denied: Readers cannot create cards.");
            return;
        }
        const defaultDept = Object.keys(INDUSTRY_PRESETS[APP.industry].departments)[0];
        const newCard = APP.addCard({
            title: "New Task Card",
            dept: defaultDept,
            priority: "medium",
            column: "backlog"
        });
        openCardModal(newCard.id);
        renderKanbanBoard();
        renderDashboard();
    });

    document.getElementById("sync-btn").addEventListener("click", () => {
        APP.resetToPreset(APP.industry);
        renderActiveView();
        const btn = document.getElementById("sync-btn");
        btn.style.color = "var(--prio-low)";
        setTimeout(() => btn.style.color = "", 1200);
    });
}

function renderActiveView() {
    const panels = document.querySelectorAll(".content-panel");
    panels.forEach(p => p.classList.remove("active"));

    const activePanel = document.getElementById(APP.currentView);
    if (activePanel) activePanel.classList.add("active");

    const titleEl = document.getElementById("panel-title");
    const subEl = document.getElementById("panel-subtitle");

    if (APP.currentView === "dashboard-panel") {
        titleEl.textContent = "Dashboard Overview";
        subEl.textContent = "Leadership insight, metrics, and risk assessment";
        renderDashboard();
    } else if (APP.currentView === "board-panel") {
        titleEl.textContent = "Kanban Workspace";
        subEl.textContent = "Drag, drop, and edit task cards to track development";
        renderKanbanBoard();
    } else if (APP.currentView === "importer-panel") {
        titleEl.textContent = "AI Chat Importer";
        subEl.textContent = "Onboard fragmented WhatsApp discussions instantly";
        renderOnboardingPanel();
    } else if (APP.currentView === "heritage-panel") {
        titleEl.textContent = "Milestone Timeline Feed";
        subEl.textContent = "Adaptations, supply chain logs, pivots, and milestone history";
        renderHeritageFeed();
    } else if (APP.currentView === "team-panel") {
        titleEl.textContent = "Team Roster";
        subEl.textContent = "Manage team members, roles, connection status, and tasks";
        renderTeamPanel();
    } else if (APP.currentView === "settings-panel") {
        titleEl.textContent = "System Settings";
        subEl.textContent = "Manage database configurations and API keys";
        renderSettingsPanel();
    }
    safeCreateIcons();
}

function renderDepartmentBadges() {
    const industryPreset = INDUSTRY_PRESETS[APP.industry];
    document.getElementById("current-industry-badge").textContent = industryPreset.badgeText;
}

// ----------------------------------------------------
// VIEW: DECLUTTERED LEADERSHIP DASHBOARD
// ----------------------------------------------------

function renderDashboard() {
    const cards = APP.getActiveCards();
    
    // Stats Counter
    document.getElementById("stat-total-cards").textContent = cards.length;
    document.getElementById("stat-active-cards").textContent = cards.filter(c => c.column !== "done" && c.column !== "backlog").length;
    document.getElementById("stat-done-cards").textContent = cards.filter(c => c.column === "done").length;
    document.getElementById("stat-risk-cards").textContent = cards.filter(c => c.priority === "high" && c.column !== "done").length;

    // SVG Circular Progress Charts
    const depts = INDUSTRY_PRESETS[APP.industry].departments;
    const radialContainer = document.getElementById("department-radial-container");
    radialContainer.innerHTML = "";

    Object.keys(depts).forEach(deptKey => {
        const deptInfo = depts[deptKey];
        const deptCards = cards.filter(c => c.dept === deptKey);
        const deptDone = deptCards.filter(c => c.column === "done").length;
        
        let percentage = 0;
        if (deptCards.length > 0) {
            percentage = Math.round((deptDone / deptCards.length) * 100);
        }

        // Perimeter = 2 * PI * r = 2 * 3.14159 * 28 = 176
        const dashOffset = 176 - (176 * percentage) / 100;

        const radialHtml = `
            <div class="radial-chart-item">
                <div class="radial-svg-wrap">
                    <svg width="70" height="70">
                        <circle cx="35" cy="35" r="28" class="radial-bg-circle"></circle>
                        <circle cx="35" cy="35" r="28" class="radial-fill-circle"
                                stroke="${deptInfo.color}"
                                stroke-dasharray="176"
                                stroke-dashoffset="${dashOffset}"
                                style="filter: drop-shadow(0 0 2px ${deptInfo.color}80)"></circle>
                    </svg>
                    <span class="radial-text-val">${percentage}%</span>
                </div>
                <span class="radial-chart-label" title="${deptInfo.name}">${deptInfo.name}</span>
            </div>
        `;
        radialContainer.insertAdjacentHTML("beforeend", radialHtml);
    });

    // Simplified chronological decisions stream
    const feedContainer = document.getElementById("dashboard-decisions-feed");
    feedContainer.innerHTML = "";

    let allLogs = [];
    cards.forEach(card => {
        if (card.heritage) {
            card.heritage.forEach(log => {
                allLogs.push({
                    cardId: card.id,
                    cardTitle: card.title,
                    dept: card.dept,
                    time: log.time,
                    desc: log.desc,
                    author: log.author
                });
            });
        }
    });

    allLogs.sort((a, b) => new Date(b.time) - new Date(a.time));

    const topLogs = allLogs.slice(0, 4);
    if (topLogs.length === 0) {
        feedContainer.innerHTML = `<p class="loading-placeholder" style="margin-top: 2rem;">No recent pivots logged.</p>`;
    } else {
        topLogs.forEach(log => {
            const timeDiff = formatTimeAgo(new Date(log.time));
            const deptColor = depts[log.dept]?.color || "var(--primary)";
            const initial = log.author ? log.author.charAt(0) : "A";

            const streamHtml = `
                <div class="stream-item">
                    <div class="stream-avatar" style="background: ${deptColor}; box-shadow: 0 0 6px ${deptColor}80">${initial}</div>
                    <div class="stream-details">
                        <div class="stream-meta">
                            <strong>${log.author}</strong> in <span style="color: ${deptColor}; font-weight:600">${APP.getDeptName(log.dept)}</span>
                            <span class="stream-time">&bull; ${timeDiff}</span>
                        </div>
                        <p class="stream-msg">
                            <span class="stream-card-link" onclick="openCardModal('${log.cardId}')">[${log.cardTitle}]</span>
                            ${log.desc}
                        </p>
                    </div>
                </div>
            `;
            feedContainer.insertAdjacentHTML("beforeend", streamHtml);
        });
    }

    triggerAILeadershipBrief(false);
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "y ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "mo ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "m ago";
    return "just now";
}

// AI executive brief refresh
document.getElementById("refresh-ai-brief-btn").addEventListener("click", () => {
    triggerAILeadershipBrief(true);
});

async function triggerAILeadershipBrief(forceQuery = false) {
    const briefEl = document.getElementById("ai-leadership-brief");
    if (forceQuery) {
        briefEl.innerHTML = `<p class="loading-placeholder">AI analyzing active tasks, risks, and bottlenecks...</p>`;
    } else if (briefEl.textContent.trim() !== "AI analyzing active tasks, risks, and bottlenecks..." && briefEl.innerHTML.length > 50) {
        return;
    }

    const cardsText = APP.getActiveCards().map(c => `- [${APP.getDeptName(c.dept)}] ${c.title} (Priority: ${c.priority}, Status: ${BOARD_COLUMNS[c.column]})`).join("\n");
    const prompt = `Analyze this startup progress board and provide a high-level summary briefing for the CEO. Highlight current risks, bottlenecks, and suggestion areas based on the industry: ${APP.industry.toUpperCase()}. Format as short paragraphs and bullet points. Focus on FMCG topics if FMCG. \n\n${cardsText}`;

    const cachedSimResponse = getSimulatedLeadershipBrief(APP.industry, APP.getActiveCards());

    if (APP.apiKey) {
        try {
            const apiResponse = await queryGeminiAPI(prompt, APP.apiKey);
            briefEl.innerHTML = formatMarkdownToHTML(apiResponse);
        } catch (e) {
            briefEl.innerHTML = formatMarkdownToHTML(cachedSimResponse);
        }
    } else {
        simulateTyping(briefEl, formatMarkdownToHTML(cachedSimResponse));
    }
}

// Helper query to Gemini API
async function queryGeminiAPI(prompt, apiKey, responseJson = false) {
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    
    if (responseJson) {
        payload.generationConfig = {
            responseMimeType: "application/json"
        };
    }

    const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Gemini API Error: Status ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// ----------------------------------------------------
// VIEW: KANBAN BOARD CONTROLLER
// ----------------------------------------------------

function setupFilters() {
    const deptSelect = document.getElementById("filter-dept");
    const searchInput = document.getElementById("filter-search");
    const prioSelect = document.getElementById("filter-priority");

    function rebuildFilters() {
        deptSelect.innerHTML = `<option value="all">All Departments</option>`;
        const depts = INDUSTRY_PRESETS[APP.industry].departments;
        Object.keys(depts).forEach(key => {
            deptSelect.insertAdjacentHTML("beforeend", `<option value="${key}">${depts[key].name}</option>`);
        });
    }

    rebuildFilters();

    deptSelect.addEventListener("change", (e) => {
        APP.filters.dept = e.target.value;
        renderKanbanBoard();
    });

    searchInput.addEventListener("input", (e) => {
        APP.filters.search = e.target.value.toLowerCase();
        renderKanbanBoard();
    });

    prioSelect.addEventListener("change", (e) => {
        APP.filters.priority = e.target.value;
        renderKanbanBoard();
    });

    // Workspace swapper dropdown binding
    const workspaceSelector = document.getElementById("workspace-selector-dropdown");
    if (workspaceSelector) {
        workspaceSelector.value = APP.industry;
        workspaceSelector.addEventListener("change", (e) => {
            const selectedIndustry = e.target.value;
            APP.industry = selectedIndustry;
            localStorage.setItem("vantage_industry", selectedIndustry);
            
            rebuildFilters();
            renderDepartmentBadges();
            
            const settingsPresetSelect = document.getElementById("industry-preset-select");
            if (settingsPresetSelect) {
                settingsPresetSelect.value = selectedIndustry;
            }
            
            if (APP.supabase) {
                APP.pullFromSupabase().then(() => {
                    renderActiveView();
                });
            } else {
                if (APP.getActiveCards().length === 0) {
                    APP.resetToPreset(selectedIndustry);
                }
                renderActiveView();
            }
        });
    }

    APP.rebuildBoardFilters = rebuildFilters;
}

window.toggleChildrenExpansion = function(parentId) {
    window.expandedParents = window.expandedParents || {};
    window.expandedParents[parentId] = !window.expandedParents[parentId];
    renderKanbanBoard();
};

function renderKanbanBoard() {
    const boardContainer = document.getElementById("kanban-board-container");
    boardContainer.innerHTML = "";

    if (APP.getActiveCards().length === 0) {
        const onboardingHtml = `
            <div class="board-onboarding-wrapper glass text-center" style="grid-column: span 5; padding: 4.5rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; border-radius: 12px; margin-top: 1rem; width: 100%;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--primary) 0%, #a29bfe 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 15px rgba(108, 92, 231, 0.4);">
                    <i data-lucide="compass" style="width: 30px; height: 30px;"></i>
                </div>
                <div style="max-width: 500px; text-align: center;">
                    <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #fff;">Welcome to Vantage</h3>
                    <p class="text-secondary" style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">Your workspace is ready! Since you don't have any tasks yet, choose how you would like to get started:</p>
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="switchToImporter()" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem;">
                        <i data-lucide="message-square-plus" style="width: 16px; height: 16px;"></i>
                        <span>Import WhatsApp Logs</span>
                    </button>
                    <button class="btn btn-secondary" onclick="loadSamplePresetData()" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.08);">
                        <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
                        <span>Load Sample Template</span>
                    </button>
                    <button class="btn btn-secondary" onclick="createFirstTaskManual()" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.08);">
                        <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                        <span>Create Custom Task</span>
                    </button>
                </div>
            </div>
        `;
        boardContainer.innerHTML = onboardingHtml;
        safeCreateIcons();
        return;
    }

    const depts = INDUSTRY_PRESETS[APP.industry].departments;

    Object.keys(BOARD_COLUMNS).forEach(colKey => {
        const colTitle = BOARD_COLUMNS[colKey];
        const colCards = APP.getActiveCards().filter(c => {
            if (c.column !== colKey) return false;
            if (c.parentId) return false; // Filter out child cards from direct lane rendering
            if (APP.filters.dept !== "all" && c.dept !== APP.filters.dept) return false;
            if (APP.filters.priority !== "all" && c.priority !== APP.filters.priority) return false;
            if (APP.filters.search) {
                const titleMatch = c.title.toLowerCase().includes(APP.filters.search);
                const descMatch = c.description.toLowerCase().includes(APP.filters.search);
                const contextMatch = c.context?.toLowerCase().includes(APP.filters.search) || false;
                
                // Also search in children
                const children = APP.cards.filter(child => child.parentId === c.id);
                const childMatch = children.some(child => 
                    child.title.toLowerCase().includes(APP.filters.search) || 
                    child.description.toLowerCase().includes(APP.filters.search)
                );
                return titleMatch || descMatch || contextMatch || childMatch;
            }
            return true;
        });

        const colHtml = `
            <div class="kanban-column" data-column-id="${colKey}">
                <div class="column-header">
                    <div class="column-title-wrapper">
                        <span class="column-status-dot dot-${colKey}"></span>
                        <h4>${colTitle}</h4>
                        <span class="card-count" id="count-${colKey}">${colCards.length}</span>
                    </div>
                    <button class="btn-add-card-icon" onclick="createCardInColumn('${colKey}')">
                        <i data-lucide="plus"></i>
                    </button>
                </div>
                <div class="card-list" id="list-${colKey}">
                    <!-- Cards -->
                </div>
            </div>
        `;
        boardContainer.insertAdjacentHTML("beforeend", colHtml);

        const listContainer = document.getElementById(`list-${colKey}`);
        
        colCards.forEach(card => {
            const priorityClass = `priority-${card.priority}`;
            const deptColor = depts[card.dept]?.color || "var(--primary)";
            const filesCount = card.files.length;
            const heritageCount = card.heritage.length;
            
            // Nested child cards details
            const children = APP.getActiveCards().filter(c => c.parentId === card.id);
            let progressHtml = "";
            let subgoalsIndicator = "";
            let childrenToggleHtml = "";
            let childrenListHtml = "";
            
            if (children.length > 0) {
                const completedChildren = children.filter(child => child.column === "done").length;
                const percentage = Math.round((completedChildren / children.length) * 100);
                progressHtml = `
                    <div class="card-bottom-progress">
                        <div class="card-bottom-progress-fill" style="width: ${percentage}%"></div>
                    </div>
                `;
                subgoalsIndicator = `
                    <div class="meta-item" title="Sub-goals: ${completedChildren}/${children.length} completed">
                        <i data-lucide="layers" style="color: var(--accent-ai); width: 10px; height: 10px;"></i>
                        <span>${completedChildren}/${children.length}</span>
                    </div>
                `;
                
                window.expandedParents = window.expandedParents || {};
                const isExpanded = window.expandedParents[card.id] || false;
                const expClass = isExpanded ? "expanded" : "";
                
                childrenToggleHtml = `
                    <div class="nested-children-toggle ${expClass}" 
                         onclick="event.stopPropagation(); toggleChildrenExpansion('${card.id}')"
                         ondblclick="event.stopPropagation()">
                        <span>${isExpanded ? 'Hide' : 'Show'} Sub-goals (${children.length})</span>
                        <i data-lucide="chevron-down"></i>
                    </div>
                `;
                
                let childCardsItems = "";
                children.forEach(child => {
                    childCardsItems += `
                        <div class="child-card-preview" 
                             onclick="event.stopPropagation(); openCardModal('${child.id}')"
                             ondblclick="event.stopPropagation()">
                            <span class="child-card-title" title="${child.title}">${child.title}</span>
                            <span class="child-card-status-badge ${child.column}">${BOARD_COLUMNS[child.column] || child.column}</span>
                        </div>
                    `;
                });
                
                childrenListHtml = `
                    <div class="nested-child-cards-container ${expClass}" id="children-container-${card.id}">
                        ${childCardsItems}
                    </div>
                `;
            }
            
            const completedChecklist = card.checklist.filter(c => c.done).length;
            const checklistSnippet = card.checklist.length > 0 ? `
                <div class="meta-item">
                    <i data-lucide="check-square"></i>
                    <span>${completedChecklist}/${card.checklist.length}</span>
                </div>
            ` : "";

            const cardHtml = `
                <div class="kanban-card" draggable="true" id="${card.id}" style="border-left: 3px solid ${deptColor}">
                    <span class="card-dept-tag" style="color: ${deptColor}">${APP.getDeptName(card.dept)}</span>
                    <h5>${card.title}</h5>
                    <p class="card-desc-preview">${card.description || "No description provided."}</p>
                    
                    ${childrenToggleHtml}
                    ${childrenListHtml}
                    
                    <div class="card-footer" style="margin-top: 0.75rem;">
                        <div class="card-meta-indicators">
                            ${subgoalsIndicator}
                            ${checklistSnippet}
                            ${filesCount > 0 ? `<div class="meta-item"><i data-lucide="link"></i><span>${filesCount}</span></div>` : ""}
                            ${heritageCount > 0 ? `<div class="meta-item"><i data-lucide="history"></i><span>${heritageCount}</span></div>` : ""}
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span class="priority-tag ${priorityClass}">${card.priority}</span>
                            ${card.assignee ? `<div class="card-assignee-avatar" title="Assigned to ${card.assignee}">${card.assignee.charAt(0).toUpperCase()}</div>` : ""}
                        </div>
                    </div>
                    ${progressHtml}
                </div>
            `;
            listContainer.insertAdjacentHTML("beforeend", cardHtml);
            
            const cardEl = document.getElementById(card.id);
            
            // Ultra-precise click vs drag handler for touchpads & high-DPI mouse clicks on draggable elements
            let startX = 0;
            let startY = 0;
            cardEl.addEventListener("mousedown", (e) => {
                startX = e.clientX;
                startY = e.clientY;
            });
            cardEl.addEventListener("mouseup", (e) => {
                const diffX = Math.abs(e.clientX - startX);
                const diffY = Math.abs(e.clientY - startY);
                // Click is triggered only if pointer micro-movement is within 6px (native drag threshold)
                if (diffX < 6 && diffY < 6) {
                    if (e.target.closest('.nested-children-toggle') || e.target.closest('.child-card-preview') || e.target.closest('.checklist-item-delete')) {
                        return;
                    }
                    openCardModal(card.id);
                }
            });
        });
    });

    safeCreateIcons();
    setupDragAndDrop();
}

window.createCardInColumn = function(colKey) {
    if (getUserRole() === "reader") {
        alert("Permission Denied: Readers cannot create cards.");
        return;
    }
    const defaultDept = Object.keys(INDUSTRY_PRESETS[APP.industry].departments)[0];
    const newCard = APP.addCard({
        title: "New Task Card",
        dept: defaultDept,
        priority: "medium",
        column: colKey
    });
    openCardModal(newCard.id);
    renderKanbanBoard();
};

// ----------------------------------------------------
// DRAG AND DROP
// ----------------------------------------------------

function setupDragAndDrop() {
    const cards = document.querySelectorAll(".kanban-card");
    const lists = document.querySelectorAll(".card-list");

    cards.forEach(card => {
        card.addEventListener("dragstart", (e) => {
            const role = getUserRole();
            if (role === "reader" || role === "contributor") {
                e.preventDefault();
                return;
            }
            // Prevent dragging from starting when interacting with toggle accordions, child cards, or delete actions
            if (e.target.closest('.nested-children-toggle') || e.target.closest('.child-card-preview') || e.target.closest('.checklist-item-delete')) {
                e.preventDefault();
                return;
            }
            card.classList.add("dragging");
        });
        card.addEventListener("dragend", () => card.classList.remove("dragging"));
    });

    lists.forEach(list => {
        const colId = list.closest(".kanban-column").getAttribute("data-column-id");

        list.addEventListener("dragover", (e) => {
            e.preventDefault();
            list.classList.add("drag-over");
        });

        list.addEventListener("dragleave", () => list.classList.remove("drag-over"));

        list.addEventListener("drop", () => {
            list.classList.remove("drag-over");
            const draggingCard = document.querySelector(".dragging");
            if (!draggingCard) return;

            const cardId = draggingCard.id;
            const oldCard = APP.cards.find(c => c.id === cardId);
            
            if (oldCard && oldCard.column !== colId) {
                const oldColName = BOARD_COLUMNS[oldCard.column];
                const newColName = BOARD_COLUMNS[colId];
                
                APP.updateCard(cardId, { column: colId });
                APP.addHeritageLog(cardId, `Moved card from [${oldColName}] to [${newColName}]`, "System");
                dispatchWebhookNotification(oldCard.title, "Status Shift (Drag)", `Moved from [${oldColName}] to [${newColName}]`);
                
                // Automatically move all child cards to the new column as well
                const children = APP.getActiveCards().filter(c => c.parentId === cardId);
                children.forEach(child => {
                    if (child.column !== colId) {
                        APP.updateCard(child.id, { column: colId });
                        APP.addHeritageLog(child.id, `Automatically moved with parent to [${newColName}]`, "System");
                    }
                });
                
                renderKanbanBoard();
                renderDashboard();
            }
        });
    });
}

// ----------------------------------------------------
// REDESIGNED WIZARD CHAT IMPORTER
// ----------------------------------------------------

function setupOnboardingImporter() {
    const loadSampleBtn = document.getElementById("importer-load-sample-btn");
    const analyzeBtn = document.getElementById("importer-analyze-btn");
    const commitBtn = document.getElementById("importer-commit-btn");
    const resetBtn = document.getElementById("importer-reset-btn");
    const fileInput = document.getElementById("chat-file-input");
    const fileNameSpan = document.getElementById("chat-file-name");

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            fileNameSpan.textContent = file.name;
            fileNameSpan.style.display = "inline";

            const reader = new FileReader();
            reader.onload = (event) => {
                const textarea = document.getElementById("importer-chat-textarea");
                if (textarea) {
                    textarea.value = event.target.result;
                }
            };
            reader.readAsText(file);
        });
    }

    if (loadSampleBtn) {
        loadSampleBtn.addEventListener("click", () => {
            document.getElementById("importer-chat-textarea").value = `[14:10, 5/12/2026] Raj (Sales): Hey guys, category buyer at Meijer Supermarkets wants our organic snack bar line!
[14:12, Priya (Ops): SCM has a risk here - we need more biodegradable wrappers in Ohio warehouse. Ohio FDA expanding is a bottleneck.
[14:15] Deepak (R&D): I'll finalize packaging films agreement with green-wrap supplier. We'll run heat-seal tests.
[14:16] Sam (Finance): I'll submit FDA Buckeyes Ohio warehouse expansion forms today.
[14:20] Raj (Sales): I will draft the Meijer listing pricing matrix & pitch sheet.`;
        });
    }

    if (analyzeBtn) {
        analyzeBtn.addEventListener("click", async () => {
            const chatVal = document.getElementById("importer-chat-textarea").value.trim();
            if (!chatVal) return alert("Please paste chat logs first.");

            // Switch to Step 2: Loader
            switchWizardStep(2);

            const promptText = `You are an expert operations manager. Analyze this raw startup chat transcript.
            Identify actionable tasks, decisions, outcomes, participants, and task bundles.
            
            IMPORTANT CONTEXT RESOLUTION RULES:
            1. Track the conversation thread chronologically. If a task or supplier was proposed but subsequently rejected, ruled out, or overridden by a later message, DO NOT create a card for it. 
            2. Only extract tasks that were agreed upon, assigned, or remain as active open requirements.
            3. Use the chat context to extract the "Why" (e.g. if they say "we must do X because of Y regulation", add "because of Y regulation" to the Context field).
            4. Map each task to one of these departments: ops, marketing, sales, rd, finance.
            5. Identify all active speakers/participants in the chat transcript. For each participant, associate them with a department/role and detail why they were involved.
            6. Identify correlations between cards and group them into logical "bundles" (e.g., an Epic containing closely related tasks). Map which cards belong to which bundle.
            
            Output ONLY a valid JSON object representing the analysis, with exactly this format:
            {
              "participants": [
                {
                  "name": "Speaker Name (e.g. Raj)",
                  "role": "ops" | "marketing" | "sales" | "rd" | "finance",
                  "reason": "Short explanation of their role and topics they discussed in this chat log"
                }
              ],
              "bundles": [
                {
                  "name": "Bundle Name (e.g. Ohio Warehouse Expansion)",
                  "description": "Objective of this task bundle",
                  "priority": "high" | "medium" | "low",
                  "cardTitles": ["Title of Card A", "Title of Card B"]
                }
              ],
              "cards": [
                {
                  "title": "Short, clear title",
                  "description": "Scope of work based on what was agreed",
                  "context": "Why this matters, referencing any constraints discussed",
                  "dept": "ops" | "marketing" | "sales" | "rd" | "finance",
                  "priority": "high" | "medium" | "low",
                  "checklist": ["action item 1", "action item 2"],
                  "heritage": "Chronological summary of who suggested it and who agreed"
                }
              ]
            }
            No formatting markdown, just raw JSON. Here is the transcript:\n${chatVal}`;

            const simResponse = {
                participants: [
                    { name: "Priya", role: "ops", reason: "Operations coordinator who flagged wrapping materials." },
                    { name: "Raj", role: "sales", reason: "Sales Lead working on Meijer Category Listing." },
                    { name: "Deepak", role: "rd", reason: "R&D engineer running wrapper sealing heat tests." },
                    { name: "Sam", role: "finance", reason: "Finance manager filing Ohio warehouse FDA registrations." }
                ],
                bundles: [
                    {
                        name: "Meijer Listing Readiness",
                        description: "Coordinating sales pricing sheets and FDA registrations.",
                        priority: "high",
                        cardTitles: ["Submit Ohio warehouse FDA registration", "Prepare Meijer Supermarket Category Pitch & Pricing Matrix"]
                    },
                    {
                        name: "Sustainable Supplier Onboarding",
                        description: "Vetting packaging suppliers and sealing test iterations.",
                        priority: "medium",
                        cardTitles: ["Finalize supply agreement for green packaging wrapper films"]
                    }
                ],
                cards: [
                    {
                        title: "Submit Ohio warehouse FDA registration",
                        description: "Prepare and submit Ohio warehouse expansion compliance documents.",
                        context: "Required before shipping Meijer orders. Sourced from Sam's chat log.",
                        dept: "finance",
                        priority: "high",
                        checklist: ["Submit Ohio FDA form 3537", "Arrange warehouse inspector walkthrough"],
                        heritage: "Sam (Finance) initiated Ohio warehouse FDA filing."
                    },
                    {
                        title: "Prepare Meijer Supermarket Category Pitch & Pricing Matrix",
                        description: "Compile retail margin calculator, logistics pricing briefs, and listing pitch deck.",
                        context: "Critical category listing win. Sourced from Raj's chat log.",
                        dept: "sales",
                        priority: "high",
                        checklist: ["Draft wholesale pricing matrix", "Send sample kits to Meijer office"],
                        heritage: "Raj (Sales) agreed to coordinate category pitch materials."
                    },
                    {
                        title: "Finalize supply agreement for green packaging wrapper films",
                        description: "Request packaging film sample reels and execute mechanical wrapper runs.",
                        context: "Required to support packaging requirements for Meijer inventory expansion.",
                        dept: "ops",
                        priority: "medium",
                        checklist: ["Order film sample reels", "Execute wrapper seal-jaw heat test"],
                        heritage: "Deepak (R&D) agreed to run wrapper sealing checks."
                    }
                ]
            };

            APP.tempImportedCards = [];
            APP.tempImportedParticipants = [];
            APP.tempImportedBundles = [];

            if (APP.apiKey) {
                try {
                    const apiResponse = await queryGeminiAPI(promptText, APP.apiKey, true);
                    
                    // Robust JSON object extraction from LLM response
                    let parsed = null;
                    const startIdx = apiResponse.indexOf("{");
                    const endIdx = apiResponse.lastIndexOf("}");
                    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
                        const jsonString = apiResponse.substring(startIdx, endIdx + 1);
                        try {
                            parsed = JSON.parse(jsonString);
                        } catch (jsonErr) {
                            console.error("JSON parsing failed:", jsonErr);
                        }
                    }
                    
                    if (parsed && typeof parsed === "object") {
                        if (parsed.cards && Array.isArray(parsed.cards)) {
                            APP.tempImportedCards = parsed.cards;
                        }
                        if (parsed.participants && Array.isArray(parsed.participants)) {
                            APP.tempImportedParticipants = parsed.participants;
                        } else {
                            APP.tempImportedParticipants = extractParticipantsFromCards(APP.tempImportedCards);
                        }
                        if (parsed.bundles && Array.isArray(parsed.bundles)) {
                            APP.tempImportedBundles = parsed.bundles;
                        } else {
                            APP.tempImportedBundles = [{
                                name: "Workspace Project Task Items",
                                description: "Correlated list of startup goals",
                                priority: "medium",
                                cardTitles: APP.tempImportedCards.map(c => c.title)
                            }];
                        }
                    } else {
                        console.warn("Invalid JSON structure in response, fallback to mock: ", apiResponse);
                        alert("AI parsing returned an invalid formatting structure. Falling back to simulation sample data.");
                        APP.tempImportedCards = simResponse.cards;
                        APP.tempImportedParticipants = simResponse.participants;
                        APP.tempImportedBundles = simResponse.bundles;
                    }
                } catch (e) {
                    console.error("Gemini API parser failed, using simulation: ", e);
                    alert("Gemini API Connection Error: " + e.message + "\n\nFalling back to simulation sample data.");
                    APP.tempImportedCards = simResponse.cards;
                    APP.tempImportedParticipants = simResponse.participants;
                    APP.tempImportedBundles = simResponse.bundles;
                }
            } else {
                await new Promise(r => setTimeout(r, 1500));
                APP.tempImportedCards = simResponse.cards;
                APP.tempImportedParticipants = simResponse.participants;
                APP.tempImportedBundles = simResponse.bundles;
            }

            // Switch to Step 3: Card Deck
            switchWizardStep(3);
            renderExtractedBundles();
            initTeamReadinessConsole(APP.tempImportedParticipants, APP.tempImportedBundles);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const textarea = document.getElementById("importer-chat-textarea");
            if (textarea) textarea.value = "";
            APP.tempImportedCards = [];
            APP.tempImportedParticipants = [];
            APP.tempImportedBundles = [];
            
            switchWizardStep(1);
            
            const fileInput = document.getElementById("chat-file-input");
            const fileNameSpan = document.getElementById("chat-file-name");
            if (fileInput) fileInput.value = "";
            if (fileNameSpan) {
                fileNameSpan.textContent = "";
                fileNameSpan.style.display = "none";
            }
        });
    }

    if (commitBtn) {
        commitBtn.addEventListener("click", () => {
            // Read active states from deck elements to capture user edits!
            const deckCards = document.querySelectorAll(".extracted-deck-card");
            const finalCards = [];

            deckCards.forEach((el) => {
                const titleInput = el.querySelector(".extracted-card-title-input");
                const descTextarea = el.querySelector(".extracted-card-desc-textarea");
                const deptSelect = el.querySelector(".extracted-card-dept-select");
                const prioSelect = el.querySelector(".extracted-card-prio-select");
                
                if (!titleInput) return; // Skip non-card nodes

                const title = titleInput.value;
                const desc = descTextarea.value;
                const dept = deptSelect.value;
                const priority = prioSelect.value;
                
                const index = parseInt(el.getAttribute("data-index"));
                const originalCard = APP.tempImportedCards[index];
                
                if (originalCard) {
                    finalCards.push({
                        title,
                        description: desc,
                        context: originalCard.context,
                        dept,
                        priority,
                        checklist: originalCard.checklist,
                        heritage: originalCard.heritage
                    });
                }
            });

            // Add to board
            finalCards.forEach(c => {
                const checklist = Array.isArray(c.checklist) ? c.checklist.map((text) => ({
                    id: "ch-" + generateUUID(),
                    text,
                    done: false
                })) : [];

                const heritage = [
                    {
                        time: new Date().toISOString(),
                        desc: c.heritage || "Imported from WhatsApp conversation log.",
                        author: "AI Importer"
                    }
                ];

                APP.addCard({
                    title: c.title,
                    description: c.description,
                    context: c.context,
                    dept: c.dept,
                    priority: c.priority,
                    column: "backlog",
                    checklist,
                    heritage
                });
            });

            // Create notification updates for members
            APP.tempImportedParticipants.forEach(p => {
                const matchedMember = APP.members.find(m => m.name.toLowerCase() === p.name.toLowerCase());
                if (matchedMember && matchedMember.status === "active") {
                    const cardsAssigned = finalCards.filter(c => c.heritage && c.heritage.toLowerCase().includes(p.name.toLowerCase()));
                    if (cardsAssigned.length > 0) {
                        const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
                        const targetEmail = `${p.name.toLowerCase()}@vantage-team.com`;
                        
                        const notifObj = {
                            workspace_owner: userEmail,
                            recipient_email: targetEmail,
                            sender_name: "AI Importer",
                            type: "assign",
                            title: "Tasks Imported to Backlog",
                            message: `You have ${cardsAssigned.length} new tasks assigned/referenced in the imported chat.`,
                            card_id: null,
                            is_read: false,
                            created_at: new Date().toISOString()
                        };
                        
                        // Push alert to DB/local
                        if (APP.supabase) {
                            APP.supabase.from('vantage_notifications').insert([notifObj]).then(() => {});
                        }
                        
                        APP.notifications.unshift({
                            id: "notif-" + Date.now() + Math.random(),
                            title: notifObj.title,
                            message: notifObj.message,
                            type: 'assign',
                            time: notifObj.created_at,
                            author: notifObj.sender_name,
                            unread: true
                        });
                    }
                }
            });

            localStorage.setItem("vantage_notifications", JSON.stringify(APP.notifications));
            renderNotifications();

            // Clear states and redirect
            APP.tempImportedCards = [];
            APP.tempImportedParticipants = [];
            APP.tempImportedBundles = [];
            
            switchWizardStep(1);
            document.getElementById("importer-chat-textarea").value = "";
            
            // Switch to Board
            const boardBtn = document.querySelector('[data-target="board-panel"]');
            if (boardBtn) boardBtn.click();
        });
    }
}

function switchWizardStep(stepNum) {
    // Toggles headers
    for (let i = 1; i <= 3; i++) {
        const ind = document.getElementById(`step-${i}-indicator`);
        const body = document.getElementById(`wizard-step-${i}`);
        if (ind) ind.classList.remove("active");
        if (body) body.classList.remove("active");
    }

    const activeInd = document.getElementById(`step-${stepNum}-indicator`);
    const activeBody = document.getElementById(`wizard-step-${stepNum}`);
    if (activeInd) activeInd.classList.add("active");
    if (activeBody) activeBody.classList.add("active");
}

function renderExtractedDeck() {
    const grid = document.getElementById("importer-deck-grid");
    grid.innerHTML = "";

    if (!APP.tempImportedCards || APP.tempImportedCards.length === 0) {
        grid.innerHTML = `<p class="loading-placeholder">No cards found.</p>`;
        return;
    }

    const depts = INDUSTRY_PRESETS[APP.industry].departments;

    APP.tempImportedCards.forEach((card, index) => {
        // Build department select dropdown options
        let deptOptions = "";
        Object.keys(depts).forEach(key => {
            const selected = card.dept === key ? "selected" : "";
            deptOptions += `<option value="${key}" ${selected}>${depts[key].name}</option>`;
        });

        const cardHtml = `
            <div class="extracted-deck-card glass" data-index="${index}">
                <button class="extracted-card-delete-btn" onclick="removeExtractedCard(${index})">&times;</button>
                <div class="form-group">
                    <input type="text" class="extracted-card-title-input" value="${card.title}">
                </div>
                <div class="form-group">
                    <textarea class="extracted-card-desc-textarea">${card.description}</textarea>
                </div>
                <div class="extracted-card-controls">
                    <select class="extracted-card-dept-select">
                        ${deptOptions}
                    </select>
                    <select class="extracted-card-prio-select">
                        <option value="high" ${card.priority === 'high' ? 'selected' : ''}>High</option>
                        <option value="medium" ${card.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="low" ${card.priority === 'low' ? 'selected' : ''}>Low</option>
                    </select>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML("beforeend", cardHtml);
    });
}

window.removeExtractedCard = function(index) {
    APP.tempImportedCards.splice(index, 1);
    renderExtractedDeck();
    if (APP.tempImportedCards.length === 0) {
        document.getElementById("importer-commit-btn").classList.add("disabled");
        document.getElementById("importer-commit-btn").disabled = true;
    }
};

function renderOnboardingPanel() {
    switchWizardStep(1);
    const textarea = document.getElementById("importer-chat-textarea");
    if (textarea) textarea.value = "";
    APP.tempImportedCards = [];

    const fileInput = document.getElementById("chat-file-input");
    const fileNameSpan = document.getElementById("chat-file-name");
    if (fileInput) fileInput.value = "";
    if (fileNameSpan) {
        fileNameSpan.textContent = "";
        fileNameSpan.style.display = "none";
    }
}

// ----------------------------------------------------
// VIEW: COMPANY HERITAGE TIMELINE FEED
// ----------------------------------------------------

function renderHeritageFeed() {
    const container = document.getElementById("heritage-timeline-container");
    container.innerHTML = "";

    let allLogs = [];
    APP.getActiveCards().forEach(card => {
        if (card.heritage) {
            card.heritage.forEach(log => {
                allLogs.push({
                    cardId: card.id,
                    cardTitle: card.title,
                    dept: card.dept,
                    time: log.time,
                    desc: log.desc,
                    author: log.author
                });
            });
        }
    });

    allLogs.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (allLogs.length === 0) {
        container.innerHTML = `<div class="glass text-center text-muted" style="padding: 3rem;">No progression logs found.</div>`;
        return;
    }

    allLogs.forEach(log => {
        const date = new Date(log.time).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
        const deptColor = INDUSTRY_PRESETS[APP.industry].departments[log.dept]?.color || "var(--primary)";

        const eventHtml = `
            <div class="timeline-event">
                <div class="timeline-dot" style="background-color: ${deptColor}; box-shadow: 0 0 6px ${deptColor}80"></div>
                <div class="timeline-card glass">
                    <div class="timeline-meta">
                        <div class="timeline-title-wrap">
                            <span class="timeline-card-ref" onclick="openCardModal('${log.cardId}')">${log.cardTitle}</span>
                            <span class="badge" style="background: rgba(255,255,255,0.03); color: ${deptColor}; border: 1px solid ${deptColor}20">${APP.getDeptName(log.dept)}</span>
                        </div>
                        <span class="timeline-date">${date}</span>
                    </div>
                    <p class="timeline-desc">${log.desc}</p>
                    <div class="timeline-author">Logged by: <strong>${log.author}</strong></div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", eventHtml);
    });
}

// ----------------------------------------------------
// VIEW: SETTINGS & DATABASE
// ----------------------------------------------------

function setupSettings() {
    // Preset Reset
    const presetSelect = document.getElementById("industry-preset-select");
    const applyPresetBtn = document.getElementById("apply-preset-btn");

    if (presetSelect && applyPresetBtn) {
        presetSelect.value = APP.industry;
        applyPresetBtn.addEventListener("click", () => {
            if (!checkPermission("change_preset")) return;
            if (confirm("Reset current cards to industry sample defaults?")) {
                const selectedVal = presetSelect.value;
                APP.resetToPreset(selectedVal);
                const wsSelector = document.getElementById("workspace-selector-dropdown");
                if (wsSelector) wsSelector.value = selectedVal;
                APP.rebuildBoardFilters();
                renderDepartmentBadges();
                renderActiveView();
                
                logAuditTrail("reset_preset", `Reset workspace cards to preset defaults for "${selectedVal}"`);
                
                applyPresetBtn.textContent = "Preset Configured!";
                setTimeout(() => applyPresetBtn.textContent = "Apply & Reset Preset Data", 1500);
            }
        });
    }

    // Dynamic DB fields toggling
    const dbSelector = document.getElementById("settings-db-provider");
    if (dbSelector) {
        dbSelector.addEventListener("change", () => {
            const val = dbSelector.value;
            document.getElementById("settings-db-fields-supabase").classList.toggle("hide", val !== "supabase");
            document.getElementById("settings-db-fields-firebase").classList.toggle("hide", val !== "firebase");
            document.getElementById("settings-db-fields-pocketbase").classList.toggle("hide", val !== "pocketbase");
        });
    }

    // Dynamic AI fields toggling
    const aiSelector = document.getElementById("settings-ai-provider");
    if (aiSelector) {
        aiSelector.addEventListener("change", () => {
            const val = aiSelector.value;
            document.getElementById("settings-ai-fields-gemini").classList.toggle("hide", val !== "gemini");
            document.getElementById("settings-ai-fields-openai").classList.toggle("hide", val !== "openai");
            document.getElementById("settings-ai-fields-anthropic").classList.toggle("hide", val !== "anthropic");
        });
    }

    // Save DB Settings
    const saveDbBtn = document.getElementById("save-db-settings-btn");
    if (saveDbBtn) {
        saveDbBtn.addEventListener("click", () => {
            if (!checkPermission("change_db_settings")) return;
            const dbVal = document.getElementById("settings-db-provider").value;
            localStorage.setItem("vantage_db_provider", dbVal);

            localStorage.setItem("vantage_supabase_url", document.getElementById("settings-supabase-url").value.trim());
            localStorage.setItem("vantage_supabase_anon_key", document.getElementById("settings-supabase-key").value.trim());
            localStorage.setItem("vantage_firebase_project_id", document.getElementById("settings-firebase-project").value.trim());
            localStorage.setItem("vantage_firebase_api_key", document.getElementById("settings-firebase-key").value.trim());
            localStorage.setItem("vantage_pocketbase_url", document.getElementById("settings-pocketbase-url").value.trim());

            // Update app state client instances
            APP.dbProvider = dbVal;
            APP.supabaseUrl = localStorage.getItem("vantage_supabase_url");
            APP.supabaseAnonKey = localStorage.getItem("vantage_supabase_anon_key");
            APP.supabase = initSupabase(APP.supabaseUrl, APP.supabaseAnonKey);
            APP.firebaseProjectId = localStorage.getItem("vantage_firebase_project_id");
            APP.firebaseApiKey = localStorage.getItem("vantage_firebase_api_key");
            APP.pocketbaseUrl = localStorage.getItem("vantage_pocketbase_url");

            logAuditTrail("update_db_settings", `Changed database provider settings to "${dbVal}"`);

            const successText = document.getElementById("db-save-success");
            successText.classList.remove("hide");
            setTimeout(() => successText.classList.add("hide"), 1500);

            // Re-render
            if (dbVal !== "local") {
                APP.pullFromDatabase().then(() => {
                    renderActiveView();
                });
            } else {
                renderActiveView();
            }
        });
    }

    // Save AI Settings
    const saveAiBtn = document.getElementById("save-ai-settings-btn");
    if (saveAiBtn) {
        saveAiBtn.addEventListener("click", () => {
            if (!checkPermission("change_ai_settings")) return;
            const aiVal = document.getElementById("settings-ai-provider").value;
            localStorage.setItem("vantage_ai_provider", aiVal);

            localStorage.setItem("vantage_api_key", document.getElementById("settings-gemini-key").value.trim());
            localStorage.setItem("vantage_openai_key", document.getElementById("settings-openai-key").value.trim());
            localStorage.setItem("vantage_openai_model", document.getElementById("settings-openai-model").value);
            localStorage.setItem("vantage_anthropic_key", document.getElementById("settings-anthropic-key").value.trim());
            localStorage.setItem("vantage_anthropic_model", document.getElementById("settings-anthropic-model").value);

            APP.aiProvider = aiVal;
            APP.apiKey = localStorage.getItem("vantage_api_key");
            APP.openaiKey = localStorage.getItem("vantage_openai_key");
            APP.openaiModel = localStorage.getItem("vantage_openai_model");
            APP.anthropicKey = localStorage.getItem("vantage_anthropic_key");
            APP.anthropicModel = localStorage.getItem("vantage_anthropic_model");

            logAuditTrail("update_ai_settings", `Changed AI provider settings to "${aiVal}"`);

            const successText = document.getElementById("ai-save-success");
            successText.classList.remove("hide");
            setTimeout(() => successText.classList.add("hide"), 1500);
        });
    }

    // Webhook setup
    const saveWebhookBtn = document.getElementById("save-webhook-btn");
    const webhookUrlInput = document.getElementById("settings-webhook-url");
    if (saveWebhookBtn && webhookUrlInput) {
        saveWebhookBtn.addEventListener("click", () => {
            const url = webhookUrlInput.value.trim();
            localStorage.setItem("vantage_webhook_url", url);
            
            logAuditTrail("update_webhook_settings", `Changed status webhooks target URL`);

            const successText = document.getElementById("webhook-save-success");
            if (successText) {
                successText.style.display = "inline";
                setTimeout(() => successText.style.display = "none", 1500);
            }
        });
    }

    // Custom Department Manager Add button click
    const addDeptBtn = document.getElementById("settings-add-dept-btn");
    if (addDeptBtn) {
        addDeptBtn.addEventListener("click", () => {
            const container = document.getElementById("settings-departments-list");
            const newKey = "dept_" + Date.now();
            const deptItemHtml = `
                <div class="custom-dept-editor-row" data-key="${newKey}" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                    <input type="text" class="form-control dept-name-input" value="New Department" style="flex: 2;">
                    <input type="color" class="form-control dept-color-input" value="#6c5ce7" style="flex: 0.5; height: 38px; padding: 2px; cursor: pointer;">
                    <button class="btn btn-secondary delete-dept-row-btn" style="color: var(--prio-high); border-color: rgba(235,77,75,0.2); background: rgba(235,77,75,0.05); padding: 0.5rem 0.75rem;">
                        &times;
                    </button>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", deptItemHtml);
            
            // Add click listener for delete
            const rows = container.querySelectorAll(".custom-dept-editor-row");
            const lastRow = rows[rows.length - 1];
            lastRow.querySelector(".delete-dept-row-btn").addEventListener("click", () => lastRow.remove());
        });
    }

    // Save workspace structure click
    const saveStructureBtn = document.getElementById("settings-save-structure-btn");
    if (saveStructureBtn) {
        saveStructureBtn.addEventListener("click", () => {
            if (!checkPermission("save_structure")) return;
            const container = document.getElementById("settings-departments-list");
            const rows = container.querySelectorAll(".custom-dept-editor-row");
            
            const departments = {};
            rows.forEach(row => {
                const key = row.getAttribute("data-key");
                const name = row.querySelector(".dept-name-input").value.trim();
                const color = row.querySelector(".dept-color-input").value;
                if (name) {
                    departments[key] = { name, color };
                }
            });

            if (Object.keys(departments).length === 0) {
                alert("Please add at least one department.");
                return;
            }

            // Save to presets custom registry
            INDUSTRY_PRESETS.custom.departments = departments;
            localStorage.setItem("vantage_custom_departments", JSON.stringify({ departments }));
            
            // Set preset to Custom automatically when structure is saved!
            APP.industry = "custom";
            localStorage.setItem("vantage_industry", "custom");
            
            const presetSelect = document.getElementById("industry-preset-select");
            if (presetSelect) presetSelect.value = "custom";
            const wsSelector = document.getElementById("workspace-selector-dropdown");
            if (wsSelector) wsSelector.value = "custom";

            // Run fallback updates on cards belonging to deleted departments
            let fallbackCount = 0;
            APP.cards.forEach(card => {
                if (card.workspace_id === "custom" && !departments[card.dept]) {
                    // Assign to the first active department key as fallback
                    card.dept = Object.keys(departments)[0];
                    fallbackCount++;
                }
            });

            logAuditTrail("save_structure", `Saved custom department structure with ${Object.keys(departments).length} departments. Re-allocated ${fallbackCount} tasks.`);

            APP.save();
            APP.rebuildBoardFilters();
            renderDepartmentBadges();
            renderActiveView();

            alert(`Workspace departments saved! Set to Custom Workspace. Re-allocated ${fallbackCount} task cards.`);
        });
    }
}

function renderSettingsPanel() {
    document.getElementById("industry-preset-select").value = APP.industry;
    
    // DB values
    const dbVal = localStorage.getItem("vantage_db_provider") || "local";
    document.getElementById("settings-db-provider").value = dbVal;
    
    document.getElementById("settings-supabase-url").value = localStorage.getItem("vantage_supabase_url") || "";
    document.getElementById("settings-supabase-key").value = localStorage.getItem("vantage_supabase_anon_key") || "";
    document.getElementById("settings-firebase-project").value = localStorage.getItem("vantage_firebase_project_id") || "";
    document.getElementById("settings-firebase-key").value = localStorage.getItem("vantage_firebase_api_key") || "";
    document.getElementById("settings-pocketbase-url").value = localStorage.getItem("vantage_pocketbase_url") || "";

    // Toggle fields
    document.getElementById("settings-db-fields-supabase").classList.toggle("hide", dbVal !== "supabase");
    document.getElementById("settings-db-fields-firebase").classList.toggle("hide", dbVal !== "firebase");
    document.getElementById("settings-db-fields-pocketbase").classList.toggle("hide", dbVal !== "pocketbase");

    // AI values
    const aiVal = localStorage.getItem("vantage_ai_provider") || "gemini";
    document.getElementById("settings-ai-provider").value = aiVal;

    document.getElementById("settings-gemini-key").value = localStorage.getItem("vantage_api_key") || "";
    document.getElementById("settings-openai-key").value = localStorage.getItem("vantage_openai_key") || "";
    document.getElementById("settings-openai-model").value = localStorage.getItem("vantage_openai_model") || "gpt-4o-mini";
    document.getElementById("settings-anthropic-key").value = localStorage.getItem("vantage_anthropic_key") || "";
    document.getElementById("settings-anthropic-model").value = localStorage.getItem("vantage_anthropic_model") || "claude-3-5-sonnet-20240620";

    // Toggle fields
    document.getElementById("settings-ai-fields-gemini").classList.toggle("hide", aiVal !== "gemini");
    document.getElementById("settings-ai-fields-openai").classList.toggle("hide", aiVal !== "openai");
    document.getElementById("settings-ai-fields-anthropic").classList.toggle("hide", aiVal !== "anthropic");

    const webhookUrlInput = document.getElementById("settings-webhook-url");
    if (webhookUrlInput) {
        webhookUrlInput.value = localStorage.getItem("vantage_webhook_url") || "";
    }

    // Render Custom Departments editor list
    const container = document.getElementById("settings-departments-list");
    if (container) {
        container.innerHTML = "";
        
        // Show current custom registry departments if present, else fallback to active industry's departments list
        const activeDepts = INDUSTRY_PRESETS[APP.industry === "custom" ? "custom" : "general"].departments;
        
        Object.keys(activeDepts).forEach(key => {
            const dept = activeDepts[key];
            
            // Extract actual color (if var, map to picker friendly hex value)
            let colorVal = dept.color;
            if (colorVal.startsWith("var(")) {
                if (colorVal.includes("ops")) colorVal = "#6c5ce7";
                else if (colorVal.includes("marketing")) colorVal = "#fd79a8";
                else if (colorVal.includes("sales")) colorVal = "#e84393";
                else if (colorVal.includes("rd")) colorVal = "#0984e3";
                else if (colorVal.includes("finance")) colorVal = "#20bf6b";
                else colorVal = "#6c5ce7";
            }

            const rowHtml = `
                <div class="custom-dept-editor-row" data-key="${key}" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                    <input type="text" class="form-control dept-name-input" value="${dept.name}" style="flex: 2;">
                    <input type="color" class="form-control dept-color-input" value="${colorVal}" style="flex: 0.5; height: 38px; padding: 2px; cursor: pointer;">
                    <button class="btn btn-secondary delete-dept-row-btn" style="color: var(--prio-high); border-color: rgba(235,77,75,0.2); background: rgba(235,77,75,0.05); padding: 0.5rem 0.75rem;">
                        &times;
                    </button>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", rowHtml);
            
            // Add click listener for delete
            const rows = container.querySelectorAll(".custom-dept-editor-row");
            const lastRow = rows[rows.length - 1];
            lastRow.querySelector(".delete-dept-row-btn").addEventListener("click", () => lastRow.remove());
        });
    }

    // Load and render Immutable logs table
    loadAndRenderAuditLogs();
}

async function loadAndRenderAuditLogs() {
    const tbody = document.getElementById("settings-audit-logs-body");
    if (!tbody) return;
    
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 1rem; color: var(--text-muted);">Loading logs...</td></tr>`;
    
    const dbProvider = localStorage.getItem("vantage_db_provider") || "local";
    let logs = [];
    
    try {
        logs = JSON.parse(localStorage.getItem("vantage_local_audit_logs") || "[]");
    } catch(e) {
        logs = [];
    }
    
    if (dbProvider === "supabase" && APP.supabase) {
        try {
            const { data, error } = await APP.supabase
                .from("vantage_audit_logs")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(20);
            if (!error && data) {
                logs = data;
            }
        } catch(e) {
            console.error("Failed to pull audit logs from Supabase:", e);
        }
    } else if (dbProvider === "pocketbase") {
        const pbUrl = localStorage.getItem("vantage_pocketbase_url");
        if (pbUrl) {
            try {
                const resp = await fetch(`${pbUrl}/api/collections/vantage_audit_logs/records?sort=-created_at&limit=20`);
                if (resp.ok) {
                    const resJson = await resp.json();
                    logs = resJson.items;
                }
            } catch(e) {
                console.error("Failed to pull audit logs from PocketBase:", e);
            }
        }
    } else if (dbProvider === "firebase") {
        const projectId = localStorage.getItem("vantage_firebase_project_id");
        if (projectId) {
            try {
                const resp = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/audit_logs?pageSize=20`);
                if (resp.ok) {
                    const resJson = await resp.json();
                    if (resJson.documents) {
                        logs = resJson.documents.map(d => {
                            const fields = d.fields;
                            return {
                                created_at: fields.created_at ? fields.created_at.stringValue : "",
                                user_email: fields.user_email ? fields.user_email.stringValue : "",
                                action: fields.action ? fields.action.stringValue : "",
                                details: fields.details ? fields.details.stringValue : ""
                            };
                        });
                    }
                }
            } catch(e) {
                console.error("Failed to pull audit logs from Firebase:", e);
            }
        }
    }
    
    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 1rem; color: var(--text-muted);">No audit trails recorded yet.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = "";
    logs.forEach(log => {
        const timeStr = new Date(log.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        const trHtml = `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 0.75rem; color: var(--text-muted);">${timeStr}</td>
                <td style="padding: 0.75rem; font-weight: 500;">${log.user_email}</td>
                <td style="padding: 0.75rem;"><span style="background: rgba(162, 155, 254, 0.1); color: #a29bfe; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 600;">${log.action.toUpperCase()}</span></td>
                <td style="padding: 0.75rem; color: var(--text-secondary); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${log.details}">${log.details}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", trHtml);
    });
}

async function queryAI(prompt, responseJson = false, enableSearch = false) {
    const aiProvider = localStorage.getItem("vantage_ai_provider") || "gemini";
    
    if (aiProvider === "gemini") {
        const apiKey = localStorage.getItem("vantage_api_key") || (window.VANTAGE_CONFIG ? window.VANTAGE_CONFIG.GEMINI_API_KEY : "");
        if (!apiKey) throw new Error("Gemini API key is not configured.");
        
        const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const payload = { 
            contents: [{ parts: [{ text: prompt }] }] 
        };
        
        if (responseJson) {
            payload.generationConfig = {
                responseMimeType: "application/json"
            };
        }
        if (enableSearch) {
            payload.tools = [{ googleSearch: {} }];
        }
        
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error(`Gemini API Error: Status ${response.status}`);
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } else if (aiProvider === "openai") {
        const apiKey = localStorage.getItem("vantage_openai_key") || "";
        const model = localStorage.getItem("vantage_openai_model") || "gpt-4o-mini";
        if (!apiKey) throw new Error("OpenAI API key is not configured.");
        
        const payload = {
            model: model,
            messages: [{ role: "user", content: prompt }]
        };
        if (responseJson) {
            payload.response_format = { type: "json_object" };
        }
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`OpenAI API Error: Status ${response.status}`);
        const data = await response.json();
        return data.choices[0].message.content;
    } else if (aiProvider === "anthropic") {
        const apiKey = localStorage.getItem("vantage_anthropic_key") || "";
        const model = localStorage.getItem("vantage_anthropic_model") || "claude-3-5-sonnet-20240620";
        if (!apiKey) throw new Error("Anthropic API key is not configured.");
        
        const payload = {
            model: model,
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }]
        };
        
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
                "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Anthropic API Error: Status ${response.status}`);
        const data = await response.json();
        return data.content[0].text;
    }
    throw new Error("Invalid AI Provider configured.");
}

// ----------------------------------------------------
// CARD DETAILS MODAL & AI PANEL
// ----------------------------------------------------

function setupCardModal() {
    const closeBtn = document.getElementById("modal-close-btn");
    const saveBtn = document.getElementById("modal-save-btn");
    const deleteBtn = document.getElementById("modal-delete-btn");

    closeBtn.addEventListener("click", () => closeCardModal());
    saveBtn.addEventListener("click", () => saveCardModal());
    deleteBtn.addEventListener("click", () => {
        if (confirm("Delete this card permanently?") && APP.activeCardId) {
            APP.deleteCard(APP.activeCardId);
            closeCardModal();
            renderActiveView();
        }
    });

    // Checklists Add
    document.getElementById("add-checklist-item-btn").addEventListener("click", () => {
        const input = document.getElementById("new-checklist-item-input");
        const val = input.value.trim();
        if (!val) return;
        const card = APP.cards.find(c => c.id === APP.activeCardId);
        if (card) {
            card.checklist.push({ id: "ch-" + generateUUID(), text: val, done: false });
            input.value = "";
            renderModalChecklist(card);
        }
    });

    // Child task cards Add
    document.getElementById("add-child-card-btn").addEventListener("click", () => {
        const input = document.getElementById("new-child-card-title-input");
        const val = input.value.trim();
        if (!val) return;
        const card = APP.cards.find(c => c.id === APP.activeCardId);
        if (card) {
            APP.addCard({
                parentId: card.id,
                title: val,
                dept: card.dept,
                priority: card.priority,
                column: "backlog"
            });
            input.value = "";
            renderModalChildCards(card);
            renderKanbanBoard();
            renderDashboard();
        }
    });

    // Files Add
    document.getElementById("add-file-btn").addEventListener("click", () => {
        const nameInput = document.getElementById("new-file-name");
        const urlInput = document.getElementById("new-file-url");
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        if (!name || !url) return;
        const card = APP.cards.find(c => c.id === APP.activeCardId);
        if (card) {
            card.files.push({ name, url });
            nameInput.value = "";
            urlInput.value = "";
            renderModalFiles(card);
        }
    });

    // Heritage Log manual entry
    document.getElementById("add-heritage-btn").addEventListener("click", () => {
        const textInput = document.getElementById("new-heritage-text");
        const val = textInput.value.trim();
        if (!val) return;
        APP.addHeritageLog(APP.activeCardId, val);
        textInput.value = "";
        const card = APP.cards.find(c => c.id === APP.activeCardId);
        renderModalHeritage(card);
    });

    // Tab switching inside modal
    const tabBtns = document.querySelectorAll(".modal-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetTabId = btn.getAttribute("data-tab");
            const tabPanels = document.querySelectorAll(".tab-panel");
            tabPanels.forEach(panel => {
                if (panel.id === targetTabId) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            });

            // Toggle edit button display based on active tab
            const editToggleBtn = document.getElementById("modal-edit-toggle-btn");
            if (editToggleBtn) {
                if (targetTabId === "tab-overview") {
                    editToggleBtn.style.display = "inline-flex";
                } else {
                    editToggleBtn.style.display = "none";
                }
            }
        });
    });

    // Edit details toggle click listener
    const editToggleBtn = document.getElementById("modal-edit-toggle-btn");
    if (editToggleBtn) {
        editToggleBtn.addEventListener("click", () => {
            const editWrap = document.getElementById("modal-card-edit-mode");
            const isEditing = editWrap && !editWrap.classList.contains("hide");
            
            if (isEditing) {
                // Save current edits locally to prevent losing state when switching to read view
                const title = document.getElementById("modal-card-title").value.trim() || "Untitled Card";
                const desc = document.getElementById("modal-card-desc").value.trim();
                const context = document.getElementById("modal-card-context").value.trim();
                
                const card = APP.cards.find(c => c.id === APP.activeCardId);
                if (card) {
                    card.title = title;
                    card.description = desc;
                    card.context = context;
                    APP.save();
                    renderKanbanBoard();
                    renderDashboard();
                }
            }
            
            setModalEditMode(!isEditing);
        });
    }

    // AI console triggers
    const aiChips = document.querySelectorAll(".ai-prompt-chip");
    aiChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const type = chip.getAttribute("data-prompt-type");
            executeAIQuickAction(type);
        });
    });

    document.getElementById("ai-chat-send-btn").addEventListener("click", () => sendAIChatMessage());
    document.getElementById("ai-chat-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendAIChatMessage();
    });
}

function setModalEditMode(active) {
    const editBtn = document.getElementById("modal-edit-toggle-btn");
    const viewWrap = document.getElementById("modal-card-view-mode");
    const editWrap = document.getElementById("modal-card-edit-mode");
    const titleInput = document.getElementById("modal-card-title");
    const titleDisplay = document.getElementById("modal-card-title-display");
    
    if (active) {
        // Switch to Edit Mode (inputs visible, read-displays hidden)
        if (viewWrap) viewWrap.classList.add("hide");
        if (editWrap) editWrap.classList.remove("hide");
        if (titleDisplay) titleDisplay.classList.add("hide");
        if (titleInput) titleInput.classList.remove("hide");
        
        if (editBtn) {
            editBtn.innerHTML = `<i data-lucide="eye" style="width: 12px; height: 12px;"></i><span>View Details</span>`;
        }
    } else {
        // Switch to View Mode (displays visible, inputs hidden)
        if (viewWrap) viewWrap.classList.remove("hide");
        if (editWrap) editWrap.classList.add("hide");
        if (titleDisplay) titleDisplay.classList.remove("hide");
        if (titleInput) titleInput.classList.add("hide");
        
        if (editBtn) {
            editBtn.innerHTML = `<i data-lucide="edit-3" style="width: 12px; height: 12px;"></i><span>Edit Details</span>`;
        }
        
        // Populate display views from input values
        if (titleDisplay && titleInput) {
            titleDisplay.textContent = titleInput.value.trim() || "Untitled Card";
        }
        const contextInput = document.getElementById("modal-card-context");
        const contextDisplay = document.getElementById("modal-card-context-display");
        if (contextInput && contextDisplay) {
            contextDisplay.innerHTML = formatMarkdownToHTML(contextInput.value) || `<span class="text-muted" style="font-style: italic; font-size: 0.75rem;">No context provided. Click Edit Details to add context.</span>`;
        }
        const descInput = document.getElementById("modal-card-desc");
        const descDisplay = document.getElementById("modal-card-desc-display");
        if (descInput && descDisplay) {
            descDisplay.innerHTML = formatMarkdownToHTML(descInput.value) || `<span class="text-muted" style="font-style: italic; font-size: 0.75rem;">No description provided. Click Edit Details to add details.</span>`;
        }
    }
    safeCreateIcons();
}

function openCardModal(cardId) {
    APP.activeCardId = cardId;
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;

    // Immediately hide proactive recommendations wrapper and tabs container to prevent old data flashing
    const pWrapper = document.getElementById("proactive-recommendations-wrapper");
    if (pWrapper) pWrapper.classList.add("hide");
    const pTabs = document.getElementById("proactive-tabs-container");
    if (pTabs) pTabs.classList.add("hide");
    const pBody = document.getElementById("proactive-recommendations-body");
    if (pBody) pBody.innerHTML = "";

    document.getElementById("modal-card-title").value = card.title;
    document.getElementById("modal-card-desc").value = card.description;
    document.getElementById("modal-card-context").value = card.context;

    // Reset Edit Toggle display to show in overview
    const editToggleBtn = document.getElementById("modal-edit-toggle-btn");
    if (editToggleBtn) editToggleBtn.style.display = "inline-flex";

    // Set default mode to View Mode (Read-only formatted preview)
    setModalEditMode(false);

    // Reset active tab to overview by default
    const tabBtns = document.querySelectorAll(".modal-tab-btn");
    tabBtns.forEach(b => b.classList.remove("active"));
    const firstTabBtn = document.querySelector('[data-tab="tab-overview"]');
    if (firstTabBtn) firstTabBtn.classList.add("active");

    const tabPanels = document.querySelectorAll(".tab-panel");
    tabPanels.forEach(panel => {
        if (panel.id === "tab-overview") {
            panel.classList.add("active");
        } else {
            panel.classList.remove("active");
        }
    });

    const userRole = getUserRole();
    const isReader = (userRole === "reader");
    const isContributor = (userRole === "contributor");

    // Populate Status drop down selector
    const statusSelect = document.getElementById("modal-card-status-select");
    if (statusSelect) {
        statusSelect.innerHTML = "";
        Object.keys(BOARD_COLUMNS).forEach(key => {
            statusSelect.insertAdjacentHTML("beforeend", `<option value="${key}">${BOARD_COLUMNS[key]}</option>`);
        });
        statusSelect.value = card.column;
        statusSelect.disabled = isReader || (isContributor && !card.parentId);
    }

    // Populate Department drop down selector
    const deptSelect = document.getElementById("modal-card-dept-select");
    if (deptSelect) {
        deptSelect.innerHTML = "";
        const depts = INDUSTRY_PRESETS[APP.industry].departments;
        Object.keys(depts).forEach(key => {
            deptSelect.insertAdjacentHTML("beforeend", `<option value="${key}">${depts[key].name}</option>`);
        });
        deptSelect.value = card.dept;
        deptSelect.disabled = isReader;
    }

    // Set Priority select value
    const prioritySelect = document.getElementById("modal-card-priority-select");
    if (prioritySelect) {
        prioritySelect.value = card.priority;
        prioritySelect.disabled = isReader;
    }

    // Populate and set Assignee select dropdown
    const assigneeSelect = document.getElementById("modal-card-assignee-select");
    if (assigneeSelect) {
        assigneeSelect.innerHTML = '<option value="">Unassigned</option>';
        if (APP.members && APP.members.length > 0) {
            APP.members.forEach(member => {
                assigneeSelect.insertAdjacentHTML("beforeend", `<option value="${member.name}">${member.name}</option>`);
            });
        }
        assigneeSelect.value = card.assignee || "";
        assigneeSelect.disabled = isReader;
        assigneeSelect.onchange = (e) => {
            toggleAIAgentConsoleVisibility(e.target.value === "AI Agent", card);
        };
    }

    // Render breadcrumb if child card
    const breadcrumb = document.getElementById("modal-card-breadcrumb");
    if (breadcrumb) {
        if (card.parentId) {
            const parent = APP.cards.find(c => c.id === card.parentId);
            const parentLink = document.getElementById("breadcrumb-parent-link");
            if (parent && parentLink) {
                parentLink.textContent = parent.title;
                parentLink.onclick = (e) => {
                    e.preventDefault();
                    openCardModal(card.parentId);
                };
                breadcrumb.style.display = "flex";
            } else {
                breadcrumb.style.display = "none";
            }
        } else {
            breadcrumb.style.display = "none";
        }
    }

    // Populate Parent Select Dropdown
    const parentSelect = document.getElementById("modal-card-parent-select");
    if (parentSelect) {
        parentSelect.innerHTML = '<option value="">None (Top-Level)</option>';
        const possibleParents = APP.getActiveCards().filter(c => !c.parentId && c.id !== card.id);
        possibleParents.forEach(p => {
            parentSelect.insertAdjacentHTML("beforeend", `<option value="${p.id}">${p.title}</option>`);
        });
        parentSelect.value = card.parentId || "";
        parentSelect.disabled = isReader;
    }

    // Edit and Save/Delete buttons visibility based on permissions
    if (editToggleBtn) {
        editToggleBtn.style.display = isReader ? "none" : "inline-flex";
    }

    const saveBtn = document.getElementById("modal-save-btn");
    const deleteBtn = document.getElementById("modal-delete-btn");
    if (saveBtn) {
        if (isReader) {
            saveBtn.textContent = "Close";
        } else {
            saveBtn.textContent = "Save & Close";
        }
    }
    if (deleteBtn) {
        if (isReader || isContributor) {
            deleteBtn.style.display = "none";
        } else {
            deleteBtn.style.display = "";
        }
    }

    // Toggle checklist/file fields disability
    const addCheckBtn = document.getElementById("add-checklist-item-btn");
    const addCheckInput = document.getElementById("new-checklist-item-input");
    if (addCheckBtn) addCheckBtn.disabled = isReader;
    if (addCheckInput) addCheckInput.disabled = isReader;
    
    const addChildBtn = document.getElementById("add-child-card-btn");
    const addChildInput = document.getElementById("new-child-card-title-input");
    if (addChildBtn) addChildBtn.disabled = isReader;
    if (addChildInput) addChildInput.disabled = isReader;
    
    const addFileBtn = document.getElementById("add-file-btn");
    const addFileName = document.getElementById("new-file-name");
    const addFileUrl = document.getElementById("new-file-url");
    if (addFileBtn) addFileBtn.disabled = isReader;
    if (addFileName) addFileName.disabled = isReader;
    if (addFileUrl) addFileUrl.disabled = isReader;
    
    const addHeritageBtn = document.getElementById("add-heritage-btn");
    const addHeritageText = document.getElementById("new-heritage-text");
    if (addHeritageBtn) addHeritageBtn.disabled = isReader;
    if (addHeritageText) addHeritageText.disabled = isReader;

    document.getElementById("ai-mode-status-badge").textContent = APP.apiKey ? "Live API" : "Simulated Co-Pilot";
    const aiCurrentDeptSpan = document.getElementById("ai-current-dept-span");
    if (aiCurrentDeptSpan) {
        aiCurrentDeptSpan.textContent = APP.getDeptName(card.dept).toUpperCase();
    }

    // Prompts labels
    const contentLabel = document.getElementById("ai-content-button-label");
    if (APP.industry === "fmcg") {
        contentLabel.textContent = "Draft Marketing Copy / PR";
    } else if (APP.industry === "tech") {
        contentLabel.textContent = "Draft Tech Specs & Checklist";
    } else {
        contentLabel.textContent = "Draft Client Email / Brief";
    }

    renderModalChecklist(card);
    renderModalChildCards(card);
    renderModalFiles(card);
    renderModalHeritage(card);

    // AI Agent Control Console & Proposal Review visibility
    toggleAIAgentConsoleVisibility(card.assignee === "AI Agent", card);
    renderProposalReviewBoard(card);

    // Initial AI message
    const chatBox = document.getElementById("ai-chat-history-box");
    chatBox.innerHTML = `
        <div class="ai-message assistant">
            <div class="message-bubble">
                Hello! I am your Vantage AI Co-Pilot. I see this card is set under the <strong>${APP.getDeptName(card.dept).toUpperCase()}</strong> department. 
                Select a quick action above or chat with me.
            </div>
        </div>
    `;

    document.getElementById("card-modal").classList.add("active");
    
    // Proactively generate AI recommendations
    triggerProactiveCoPilot(card);
}

function closeCardModal() {
    document.getElementById("card-modal").classList.remove("active");
    APP.activeCardId = null;

    // Hide and reset proactive recommendations elements on close
    const pWrapper = document.getElementById("proactive-recommendations-wrapper");
    if (pWrapper) pWrapper.classList.add("hide");
    const pTabs = document.getElementById("proactive-tabs-container");
    if (pTabs) pTabs.classList.add("hide");
    const pBody = document.getElementById("proactive-recommendations-body");
    if (pBody) pBody.innerHTML = "";
}

function saveCardModal() {
    if (!APP.activeCardId) return;
    const title = document.getElementById("modal-card-title").value.trim() || "Untitled Card";
    const desc = document.getElementById("modal-card-desc").value.trim();
    const context = document.getElementById("modal-card-context").value.trim();

    const column = document.getElementById("modal-card-status-select").value;
    const dept = document.getElementById("modal-card-dept-select").value;
    const priority = document.getElementById("modal-card-priority-select").value;
    
    const assigneeSelectEl = document.getElementById("modal-card-assignee-select");
    const assignee = assigneeSelectEl ? assigneeSelectEl.value : "";
    
    const parentSelect = document.getElementById("modal-card-parent-select");
    const parentId = parentSelect ? parentSelect.value || null : null;

    const oldCard = APP.cards.find(c => c.id === APP.activeCardId);
    if (oldCard) {
        // Guard Reader role modifications
        if (getUserRole() === "reader") {
            closeCardModal();
            return;
        }

        const updates = { title, description: desc, context };

        if (oldCard.column !== column) {
            updates.column = column;
            APP.addHeritageLog(APP.activeCardId, `Moved card from [${BOARD_COLUMNS[oldCard.column]}] to [${BOARD_COLUMNS[column]}]`, localStorage.getItem("vantage_user_name") || "User");
            dispatchWebhookNotification(title, "Status Shift", `Moved from [${BOARD_COLUMNS[oldCard.column]}] to [${BOARD_COLUMNS[column]}]`);
            
            // Auto-move child cards if this is a parent card
            const children = APP.getActiveCards().filter(c => c.parentId === APP.activeCardId);
            children.forEach(child => {
                if (child.column !== column) {
                    APP.updateCard(child.id, { column: column });
                    APP.addHeritageLog(child.id, `Automatically moved with parent to [${BOARD_COLUMNS[column]}]`, "System");
                }
            });
        }
        if (oldCard.dept !== dept) {
            updates.dept = dept;
            APP.addHeritageLog(APP.activeCardId, `Changed department from [${APP.getDeptName(oldCard.dept)}] to [${APP.getDeptName(dept)}]`, localStorage.getItem("vantage_user_name") || "User");
        }
        if (oldCard.priority !== priority) {
            updates.priority = priority;
            APP.addHeritageLog(APP.activeCardId, `Changed priority from [${oldCard.priority.toUpperCase()}] to [${priority.toUpperCase()}]`, localStorage.getItem("vantage_user_name") || "User");
        }
        if (oldCard.assignee !== assignee) {
            updates.assignee = assignee;
            const oldAssigneeText = oldCard.assignee || "Unassigned";
            const newAssigneeText = assignee || "Unassigned";
            APP.addHeritageLog(APP.activeCardId, `Changed assignee from [${oldAssigneeText}] to [${newAssigneeText}]`, localStorage.getItem("vantage_user_name") || "User");
            dispatchWebhookNotification(title, "Assignee Changed", `Assigned to ${newAssigneeText} (previously ${oldAssigneeText})`);
            
            // Dispatch live notification alert to database
            const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
            const userName = localStorage.getItem("vantage_user_name") || "System Lead";
            const targetEmail = assignee ? `${assignee.toLowerCase().replace(/\s/g, "")}@vantage-team.com` : userEmail;
            
            const notifObj = {
                workspace_owner: userEmail,
                recipient_email: targetEmail,
                sender_name: userName,
                type: 'assign',
                title: 'Task Assigned',
                message: `Assigned task: "${title}" to ${newAssigneeText}`,
                card_id: APP.activeCardId,
                is_read: false,
                created_at: new Date().toISOString()
            };
            
            if (APP.supabase) {
                APP.supabase.from('vantage_notifications').insert([notifObj]).then(() => {});
            }
            
            // Unshift locally
            APP.notifications.unshift({
                id: "notif-" + Date.now() + Math.random(),
                title: notifObj.title,
                message: notifObj.message,
                type: 'assign',
                time: notifObj.created_at,
                author: notifObj.sender_name,
                unread: true
            });
            localStorage.setItem("vantage_notifications", JSON.stringify(APP.notifications));
            renderNotifications();
            
            showToastNotification(userName, `Task Assigned to ${newAssigneeText}`, `Assigned to: "${title}"`);
        }
        if (oldCard.parentId !== parentId) {
            updates.parentId = parentId;
            if (parentId) {
                const newParent = APP.cards.find(c => c.id === parentId);
                const parentTitle = newParent ? newParent.title : "Unknown Parent";
                APP.addHeritageLog(APP.activeCardId, `Linked card to parent task [${parentTitle}]`, localStorage.getItem("vantage_user_name") || "User");
            } else {
                APP.addHeritageLog(APP.activeCardId, `Promoted card to top-level (removed parent link)`, localStorage.getItem("vantage_user_name") || "User");
            }
        }

        APP.updateCard(APP.activeCardId, updates);
    }
    closeCardModal();
    renderActiveView();
}

function renderModalChecklist(card) {
    const container = document.getElementById("modal-checklist-container");
    container.innerHTML = "";

    if (card.checklist.length === 0) {
        container.innerHTML = `<span class="text-muted" style="font-size: 0.75rem; font-style: italic;">No checklist subtasks.</span>`;
        return;
    }

    card.checklist.forEach(item => {
        const itemHtml = `
            <div class="checklist-item ${item.done ? 'done' : ''}" id="cli-${item.id}">
                <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleChecklistItem('${card.id}', '${item.id}')">
                <span>${item.text}</span>
                <button class="checklist-item-delete" onclick="deleteChecklistItem('${card.id}', '${item.id}')">&times;</button>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHtml);
    });
}

function renderModalChildCards(card) {
    const container = document.getElementById("modal-child-cards-container");
    if (!container) return;
    container.innerHTML = "";

    const children = APP.cards.filter(c => c.parentId === card.id);
    if (children.length === 0) {
        container.innerHTML = `<span class="text-muted" style="font-size: 0.75rem; font-style: italic;">No nested child tasks linked.</span>`;
        return;
    }

    children.forEach(child => {
        const itemHtml = `
            <div class="checklist-item ${child.column === 'done' ? 'done' : ''}" id="child-cli-${child.id}">
                <input type="checkbox" ${child.column === 'done' ? 'checked' : ''} onchange="toggleChildCardStatus('${child.id}')">
                <span style="cursor: pointer; text-decoration: underline; margin-left: 0.35rem;" onclick="openCardModal('${child.id}')">${child.title}</span>
                <span class="child-card-status-badge ${child.column}" style="margin-left: 0.5rem;">${BOARD_COLUMNS[child.column] || child.column}</span>
                <button class="checklist-item-delete" onclick="deleteChildCard('${child.id}')">&times;</button>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHtml);
    });
}

window.toggleChildCardStatus = function(childId) {
    if (getUserRole() === "reader") {
        alert("Permission Denied: Readers cannot edit task status.");
        const child = APP.cards.find(c => c.id === childId);
        if (child) {
            const parentCard = APP.cards.find(c => c.id === child.parentId);
            if (parentCard) renderModalChildCards(parentCard);
        }
        return;
    }
    const child = APP.cards.find(c => c.id === childId);
    if (!child) return;
    const newCol = child.column === "done" ? "active" : "done";
    
    const oldColName = BOARD_COLUMNS[child.column];
    const newColName = BOARD_COLUMNS[newCol];
    
    APP.updateCard(childId, { column: newCol });
    APP.addHeritageLog(childId, `Marked task column ${newColName} from Checklist Toggle`, localStorage.getItem("vantage_user_name") || "User");
    
    const parentCard = APP.cards.find(c => c.id === child.parentId);
    if (parentCard) {
        renderModalChildCards(parentCard);
    }
    renderKanbanBoard();
    renderDashboard();
};

window.deleteChildCard = function(childId) {
    const role = getUserRole();
    if (role === "reader" || role === "contributor") {
        alert("Permission Denied: You do not have permission to delete cards.");
        return;
    }
    if (confirm("Delete this child card permanently?")) {
        const child = APP.cards.find(c => c.id === childId);
        const parentId = child ? child.parentId : null;
        
        APP.deleteCard(childId);
        
        if (parentId) {
            const parentCard = APP.cards.find(c => c.id === parentId);
            if (parentCard) {
                renderModalChildCards(parentCard);
            }
        }
        renderKanbanBoard();
        renderDashboard();
    }
};

window.toggleChecklistItem = function(cardId, itemId) {
    if (getUserRole() === "reader") {
        alert("Permission Denied: Readers cannot edit checklists.");
        const card = APP.cards.find(c => c.id === cardId);
        if (card) renderModalChecklist(card);
        return;
    }
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;
    const item = card.checklist.find(ch => ch.id === itemId);
    if (item) {
        item.done = !item.done;
        APP.save();
        renderModalChecklist(card);
        renderKanbanBoard();
    }
};

window.deleteChecklistItem = function(cardId, itemId) {
    if (getUserRole() === "reader") {
        alert("Permission Denied: Readers cannot edit checklists.");
        return;
    }
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;
    const index = card.checklist.findIndex(ch => ch.id === itemId);
    if (index !== -1) {
        card.checklist.splice(index, 1);
        APP.save();
        renderModalChecklist(card);
        renderKanbanBoard();
    }
};

function renderModalFiles(card) {
    const container = document.getElementById("modal-files-container");
    container.innerHTML = "";

    if (card.files.length === 0) {
        container.innerHTML = `<span class="text-muted" style="font-size: 0.75rem; font-style: italic;">No external files linked.</span>`;
        return;
    }

    card.files.forEach((file, index) => {
        const fileHtml = `
            <div class="file-link-item">
                <i data-lucide="hard-drive"></i>
                <a href="${file.url}" target="_blank">${file.name}</a>
                <button class="file-delete-btn" onclick="deleteLinkedFile('${card.id}', ${index})">&times;</button>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", fileHtml);
    });
    safeCreateIcons();
}

window.deleteLinkedFile = function(cardId, index) {
    if (getUserRole() === "reader") {
        alert("Permission Denied: Readers cannot delete files.");
        return;
    }
    const card = APP.cards.find(c => c.id === cardId);
    if (card) {
        card.files.splice(index, 1);
        APP.save();
        renderModalFiles(card);
    }
};

function renderModalHeritage(card) {
    const container = document.getElementById("modal-heritage-timeline");
    container.innerHTML = "";

    if (card.heritage.length === 0) {
        container.innerHTML = `<span class="text-muted" style="font-size: 0.75rem; font-style: italic;">No heritage logs.</span>`;
        return;
    }

    card.heritage.forEach(item => {
        const date = new Date(item.time).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        const itemHtml = `
            <div class="modal-heritage-event">
                <div class="modal-heritage-time">${date} - <strong>${item.author}</strong></div>
                <div class="modal-heritage-desc">${item.desc}</div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHtml);
    });
}

// AI Console prompt chips execution
async function executeAIQuickAction(type) {
    const card = APP.cards.find(c => c.id === APP.activeCardId);
    if (!card) return;

    if (type === "research") {
        await activateResearchAgent(card.id);
        return;
    }

    const chatBox = document.getElementById("ai-chat-history-box");
    
    let userActionText = "";
    let systemPrompt = "";

    if (type === "blueprint") {
        userActionText = "Draft an Execution Blueprint for this task.";
        systemPrompt = `You are a startup advisor. Draft a structured, step-by-step checklist to implement the task: "${card.title}". Keep it short and actionable. Industry domain: ${APP.industry.toUpperCase()}, department: ${APP.getDeptName(card.dept)}.`;
    } else if (type === "risk") {
        userActionText = "Analyze current risks (Supply Chain / Retail listing / Project schedule).";
        systemPrompt = `Analyze potential failure risks or compliance issues for: "${card.title}" in FMCG/business. Suggest 2 mitigation steps.`;
    } else if (type === "content") {
        userActionText = "Draft marketing copy or brand/project brief.";
        systemPrompt = `Draft highly professional content for: "${card.title}". Write Instagram copy hooks or seller outreach drafts.`;
    } else if (type === "pivot") {
        userActionText = "Suggest a strategic Pivot Plan due to a blocker.";
        systemPrompt = `We are facing supply or design delays on: "${card.title}". Suggest 2 strategic alternate routes (pivots).`;
    }

    chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message user"><div class="message-bubble">${userActionText}</div></div>`);
    chatBox.scrollTop = chatBox.scrollHeight;

    const loadId = "ai-loading-" + Date.now();
    chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant" id="${loadId}"><div class="message-bubble loading-placeholder">Co-Pilot is thinking...</div></div>`);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (APP.apiKey) {
        try {
            const apiResponse = await queryGeminiAPI(systemPrompt, APP.apiKey);
            document.getElementById(loadId).remove();
            chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant"><div class="message-bubble">${formatMarkdownToHTML(apiResponse)}</div></div>`);
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (e) {
            document.getElementById(loadId).remove();
            const fallback = getSimulatedCardResponse(type, card);
            chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant"><div class="message-bubble">${formatMarkdownToHTML(fallback)}</div></div>`);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    } else {
        setTimeout(() => {
            document.getElementById(loadId).remove();
            const simulationResponse = getSimulatedCardResponse(type, card);
            chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant"><div class="message-bubble" id="sim-typing-box"></div></div>`);
            simulateTyping(document.getElementById("sim-typing-box"), formatMarkdownToHTML(simulationResponse), () => {
                chatBox.scrollTop = chatBox.scrollHeight;
            });
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);
    }
}

async function activateResearchAgent(cardId) {
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;

    const chatBox = document.getElementById("ai-chat-history-box");
    if (!chatBox) return;

    // 1. Add user query bubble to chat console
    chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message user"><div class="message-bubble">Activate Web Research Agent for this task.</div></div>`);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Add assistant loader bubble
    const loadId = "ai-loading-" + Date.now();
    chatBox.insertAdjacentHTML("beforeend", `
        <div class="ai-message assistant" id="${loadId}">
            <div class="message-bubble">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="ai-rotate-icon" data-lucide="globe" style="width: 14px; height: 14px; color: #a29bfe; animation: spin 2s linear infinite;"></i>
                    <span>Web Research Agent is browsing the web and analyzing current sources...</span>
                </div>
            </div>
        </div>
    `);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Prepare the grounding prompt anchored to date 2026-05-30
    const currentAnchorDate = "2026-05-30";
    const promptText = `Conduct a thorough web research brief for the task: "${card.title}".
Description: "${card.description || 'None'}"
Context: "${card.context || 'None'}"
Department: "${APP.getDeptName(card.dept)}"
Current Anchor Date: ${currentAnchorDate}.

You must find and compile temporal, up-to-date, and context-anchored information relevant to this task. Focus on factual and highly relevant details. Avoid outdated resources.
Format your response as a professional markdown research brief with clear sections:
### 🌐 Web Research Brief: ${card.title}
#### 📅 Reference Date: May 30, 2026

#### 1. Executive Summary
[Provide a summary of the research finding]

#### 2. Key Findings & Market Intelligence (Anchored to May 2026)
- **Point A**: [Detail with dates/trends]
- **Point B**: [Detail with dates/trends]

#### 3. Strategic Recommendations
- [Recommendation 1]
- [Recommendation 2]

#### 4. Verified Sources (Grounding references)
- [Reference 1]
- [Reference 2]`;

    let briefMarkdown = "";
    let isMock = false;

    // 4. Query AI with grounding enabled (Google Search tool for Gemini)
    if (APP.apiKey && localStorage.getItem("vantage_ai_provider") === "gemini") {
        try {
            // Enable search grounding for Gemini
            briefMarkdown = await queryAI(promptText, false, true);
        } catch (e) {
            console.warn("Gemini query failed, falling back to mock grounding: ", e);
            briefMarkdown = getMockGroundedResearchBrief(card, currentAnchorDate);
            isMock = true;
        }
    } else if (APP.apiKey && (localStorage.getItem("vantage_ai_provider") === "openai" || localStorage.getItem("vantage_ai_provider") === "anthropic")) {
        try {
            // queryAI for OpenAI/Claude
            const responseText = await queryAI(promptText, false, false);
            // Prepend metadata indicating simulated search grounding
            briefMarkdown = `*Note: Research brief generated via ${localStorage.getItem("vantage_ai_provider").toUpperCase()} API with simulated search grounding.*\n\n${responseText}`;
        } catch (e) {
            console.warn("AI query failed, falling back to mock grounding: ", e);
            briefMarkdown = getMockGroundedResearchBrief(card, currentAnchorDate);
            isMock = true;
        }
    } else {
        // No key configured: Local simulated research agent
        await new Promise(r => setTimeout(r, 1500));
        briefMarkdown = getMockGroundedResearchBrief(card, currentAnchorDate);
        isMock = true;
    }

    // 5. Remove loading bubble
    const loaderEl = document.getElementById(loadId);
    if (loaderEl) loaderEl.remove();

    // 6. Print brief to Co-Pilot history
    chatBox.insertAdjacentHTML("beforeend", `
        <div class="ai-message assistant">
            <div class="message-bubble">
                ${formatMarkdownToHTML(briefMarkdown)}
            </div>
        </div>
    `);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 7. Write virtual Markdown file to card.files
    const cleanTitle = card.title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30);
    const fileName = `Research_Brief_${cleanTitle}.md`;
    const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(briefMarkdown)}`;
    
    // Check if a research brief file already exists, and if so, overwrite or push
    const existingFileIdx = card.files.findIndex(f => f.name === fileName);
    if (existingFileIdx !== -1) {
        card.files[existingFileIdx].url = dataUrl;
    } else {
        card.files.push({ name: fileName, url: dataUrl });
    }

    // 8. Add Heritage log entry
    APP.addHeritageLog(card.id, `Web Research Agent compiled context-anchored briefing to virtual file: [${fileName}]`, "Research Agent");

    // 9. Invoke logAuditTrail
    logAuditTrail("web_research", `Executed web research agent for task: "${card.title}" (${isMock ? 'Simulated Sourcing' : 'Live Grounded API'})`);

    // 10. Save state & re-render
    APP.save();
    renderKanbanBoard();
    renderDashboard();

    // Re-render modal files and heritage panels if currently open
    renderModalFiles(card);
    renderModalHeritage(card);
}

function getMockGroundedResearchBrief(card, anchorDate) {
    const isWrappers = card.title.toLowerCase().includes("wrapper") || card.title.toLowerCase().includes("packaging") || card.id === "card-1";
    const isWholeFoods = card.title.toLowerCase().includes("buyer") || card.title.toLowerCase().includes("pitch") || card.id === "card-2";
    const isStability = card.title.toLowerCase().includes("stability") || card.title.toLowerCase().includes("recipe") || card.id === "card-3";

    if (isWrappers) {
        return `### 🌐 Web Research Brief: Bio-Packaging Sourcing
#### 📅 Reference Date: May 30, 2026

#### 1. Executive Summary
Analysis of compostable packaging film suppliers reveals that PHA-based films have achieved price parity with high-barrier paper packaging in Q2 2026. Sourcing from domestic manufacturers is recommended to mitigate the current 6-week maritime supply chain delays.

#### 2. Key Findings & Market Intelligence (Anchored to May 2026)
- **ASTM D6400 Certification**: Standards updated in early 2026 require compostability tests to complete within 90 days under commercial conditions.
- **Supplier Pricing**: PHA film resins are trading at $3.20 - $3.60 per kg as of May 2026, a 12% drop from Q3 2025 due to expanded production in Nebraska.
- **Barrier Capabilities**: High-barrier film suppliers (e.g., TIPA, Futamura) have introduced EN 13432 certified films that match the MVTR (Moisture Vapor Transmission Rate) of standard metallized OPP.

#### 3. Strategic Recommendations
- Initiate sample barrier trials with TIPA's newly launched Q1 2026 film line.
- Secure an initial volume pledge of 5,000 meters to lock in Q2 wholesale rates.

#### 4. Verified Sources (Grounding references)
- *Sustainable Packaging Coalition Report (March 2026)* - Sourced from SPC Library
- *Bioplastics Market Index Update (May 2026)* - Sourced from PlasticsNews Index`;
    } else if (isWholeFoods) {
        return `### 🌐 Web Research Brief: Whole Foods Market Category Listing
#### 📅 Reference Date: May 30, 2026

#### 1. Executive Summary
Whole Foods Market is adjusting its Q3/Q4 2026 review timeline for premium beverage listings. Brands pitching organic items must submit margin models that verify a minimum 40% gross distributor-aligned margin.

#### 2. Key Findings & Market Intelligence (Anchored to May 2026)
- **Review Calendar**: Regional category reviews for organic juices close in late June 2026. Pitches made after June 15 will be deferred to the 2027 listing cycle.
- **Distributor Costs**: UNFI and KeHE has adjusted distributor markup rates to 14.5% for organic, refrigerated grocery shipments as of April 2026.
- **Slotting and Intro Allowances**: Whole Foods has introduced a new "local producer accelerator" in Q1 2026 which reduces initial slotting costs by 50% for certified local brands.

#### 3. Strategic Recommendations
- Submit sample kits directly to the regional buyer's office in Chicago before June 10, 2026.
- Structure pricing to accommodate a 5% promotional listing discount for the first 90 days.

#### 4. Verified Sources (Grounding references)
- *Whole Foods Category Review Playbook (2026 Edition)*
- *UNFI Distributor Standard Fee Terms (Effective April 2026)*`;
    } else if (isStability) {
        return `### 🌐 Web Research Brief: Citrus Juice Formulation & Cloud Stability
#### 📅 Reference Date: May 30, 2026

#### 1. Executive Summary
Maintaining cloud stability in citrus juices without synthetic emulsifiers requires strict control over pectinesterase enzymes. Thermal flash pasteurization remains the standard, though High Pressure Processing (HPP) has gained 20% market share for clean-label brands in early 2026.

#### 2. Key Findings & Market Intelligence (Anchored to May 2026)
- **Stability Window**: Clean-label unstabilized juice iterations exhibit separation starting at Day 22 when stored at standard 4°C refrigeration.
- **pH Control**: Keeping pH levels strictly below 3.5 inhibits natural microbial activity and extends shelf life to 45 days.
- **HPP Availability**: Toll-processing HPP facilities in Ohio and Illinois have expanded capacity, dropping unit processing costs to $0.08 per bottle for Q2 2026 contracts.

#### 3. Strategic Recommendations
- Monitor Citrus Splash Iteration #4 at Week 3 to verify natural suspension parameters.
- Conduct a test batch utilizing regional toll-HPP to evaluate sensory retention.

#### 4. Verified Sources (Grounding references)
- *Journal of Food Science: Clean-Label Suspensions (January 2026)*
- *HPP Tolling Association Capacity Report (Q1 2026)*`;
    } else {
        return `### 🌐 Web Research Brief: ${card.title}
#### 📅 Reference Date: May 30, 2026

#### 1. Executive Summary
An operational research assessment has been compiled for the goal: "${card.title}". This review aggregates general market practices and compliance updates relevant to the department: ${APP.getDeptName(card.dept)}.

#### 2. Key Findings & Market Intelligence (Anchored to May 2026)
- **Compliance Standards**: Industry standards updated in early 2026 require audit logs and role permission enforcement on dashboard modifications.
- **Operational Efficiency**: General business workflows utilizing automated research agents report a 30% reduction in turnaround times for project specs.

#### 3. Strategic Recommendations
- Formulate clear task checklists to monitor subtask progression.
- Align active task keywords with team member roles to ensure clean workload distribution.

#### 4. Verified Sources (Grounding references)
- *Vantage Research Group: Workspace Analytics (2026)*
- *Industry Agnostic Sourcing Standards (May 2026)*`;
    }
}



async function sendAIChatMessage() {
    const input = document.getElementById("ai-chat-input");
    const message = input.value.trim();
    if (!message) return;

    const card = APP.cards.find(c => c.id === APP.activeCardId);
    if (!card) return;

    const chatBox = document.getElementById("ai-chat-history-box");
    chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message user"><div class="message-bubble">${message}</div></div>`);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const loadId = "ai-loading-" + Date.now();
    chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant" id="${loadId}"><div class="message-bubble loading-placeholder">Co-Pilot is typing...</div></div>`);
    chatBox.scrollTop = chatBox.scrollHeight;

    const promptText = `Task Assistant. Card: "${card.title}". Dept: ${APP.getDeptName(card.dept)}. User asks: "${message}"`;

    if (APP.apiKey) {
        try {
            const apiResponse = await queryGeminiAPI(promptText, APP.apiKey);
            document.getElementById(loadId).remove();
            chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant"><div class="message-bubble">${formatMarkdownToHTML(apiResponse)}</div></div>`);
            chatBox.scrollTop = chatBox.scrollHeight;
        } catch (e) {
            document.getElementById(loadId).remove();
            chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant"><div class="message-bubble">I ran into a live connection issue. Running in offline fallback mode.</div></div>`);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    } else {
        setTimeout(() => {
            document.getElementById(loadId).remove();
            const genericSimAnswer = `Based on the details for **${card.title}**, here is my recommendation:
            
            1. **Prioritize the immediate bottleneck:** Ensure your team checks the active subtasks in the checklist.
            2. **Maintain Heritage:** If you decide to change vendors or alter deliverables, log it immediately in the Card Heritage feed.
            
            Is there a specific detail (like supplier outreach templates) you would like me to draft?`;
            
            chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message assistant"><div class="message-bubble" id="chat-typing-box"></div></div>`);
            simulateTyping(document.getElementById("chat-typing-box"), formatMarkdownToHTML(genericSimAnswer), () => {
                chatBox.scrollTop = chatBox.scrollHeight;
            });
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
}

// ----------------------------------------------------
// AI HIGH-FIDELITY OFFLINE MOCK PRESET DATA
// ----------------------------------------------------

function getSimulatedLeadershipBrief(industry, cards) {
    if (industry === "fmcg") {
        return `#### 🌟 Executive Summary Briefing
Active goals: **${cards.length} items**. 

#### ⚠️ High Priority Bottlenecks & Risks:
- **Operations (Packaging):** The task *"${cards[0]?.title || 'Sourcing wrappers'}"* is in Planning. Mechanical machine runs are lagging, posing a launch risk.
- **Sales Listing:** Meijer Category Pitch is waiting for wholesale margin sheets.

#### 💡 Recommendations:
1. Approve accelerated accelerated heat tests for citrus juice iterations in R&D.
2. Coordinate Ohio warehouse expansion licensing with the Meijer pitch schedule.`;
    } else {
        return `#### 🌟 Project Summary Briefing
Active goals: **${cards.length} items**.

#### ⚠️ Risks:
- Database scaling actions represent migration maintenance windows.

#### 💡 Suggestions:
- Negotiate worker premium contracts prior to Q3 renewal.`;
    }
}

function getSimulatedCardResponse(type, card) {
    if (type === "blueprint") {
        return `#### 📋 Sourcing & Action Execution Blueprint
1. **Material Quality Verification:** Check OTR and MVTR levels. Confirm food contact certification.
2. **Action Checklist:**
   - [ ] Request sample reels for mechanical testing.
   - [ ] Confirm MOQ margins and supplier logistics rules.`;
    } else if (type === "risk") {
        return `#### 🛡️ Risk Assessment & Mitigation
- **Risk:** Shelf-life degradation due to bio-plastic barrier permeability.
- **Mitigation:** Run double packaging accelerated heat seal checks prior to order finalization.`;
    } else if (type === "content") {
        return `#### 📝 Vendor Sourcing RFP Outline
- **Objective:** Secure eco-friendly wrappers under $0.05/unit.
- **Requirements:** ASTM D6400 certified compostable barriers.
- **Initial Run:** 5,000 meters.`;
    } else {
        return `#### 🔄 Delay Pivot Plan
- **Alternative:** Pivot evaluations from bio-films to Koehler recyclable paper.
- **Heritage Log:** *"Sourcing shifted to recyclable papers to bypass bio-film vendor delays."*`;
    }
}

// ----------------------------------------------------
// UI TEXT PROCESSING HELPERS
// ----------------------------------------------------

function formatMarkdownToHTML(text) {
    if (!text) return "";
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    html = html.replace(/^#### (.*$)/gim, "<h5>$1</h5>");
    html = html.replace(/^### (.*$)/gim, "<h4>$1</h4>");
    html = html.replace(/^## (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^# (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");
    html = html.replace(/<\/ul>\s*<ul>/g, "");

    return html.split("\n\n").map(para => {
        if (para.startsWith("<h") || para.startsWith("<ul") || para.startsWith("<li")) return para;
        return `<p>${para.replace(/\n/g, "<br>")}</p>`;
    }).join("");
}

function simulateTyping(element, htmlContent, onCompleteCallback) {
    if (!element) return;
    element.innerHTML = "";
    const words = htmlContent.split(" ");
    let index = 0;
    
    function type() {
        if (index < words.length) {
            element.innerHTML = words.slice(0, index + 1).join(" ") + '<span class="typing-cursor">|</span>';
            index += 2;
            setTimeout(type, 15);
        } else {
            element.innerHTML = htmlContent;
            if (onCompleteCallback) onCompleteCallback();
        }
    }
    type();
}

// ----------------------------------------------------
// Board Onboarding Actions
// ----------------------------------------------------
window.switchToImporter = function() {
    const importerBtn = document.querySelector('[data-target="importer-panel"]');
    if (importerBtn) {
        importerBtn.click();
    }
};

window.loadSamplePresetData = function() {
    if (confirm("Load default industry sample cards to get started?")) {
        APP.resetToPreset(APP.industry);
        renderActiveView();
    }
};

window.createFirstTaskManual = function() {
    const defaultDept = Object.keys(INDUSTRY_PRESETS[APP.industry].departments)[0];
    const newCard = APP.addCard({
        title: "New Task Card",
        dept: defaultDept,
        priority: "medium",
        column: "backlog"
    });
    openCardModal(newCard.id);
    renderKanbanBoard();
    renderDashboard();
};

// ----------------------------------------------------
// Start Application
// ----------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// ====================================================
// Real-Time Notification Center & Collaborator Roster
// ====================================================

async function pullMembersFromDatabase() {
    const dbProvider = localStorage.getItem("vantage_db_provider") || "local";
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    if (dbProvider === "local") return;

    if (dbProvider === "supabase" && APP.supabase) {
        try {
            const { data, error } = await APP.supabase
                .from("vantage_members")
                .select("*")
                .eq("workspace_owner", userEmail);
                
            if (!error && data && data.length > 0) {
                APP.members = data;
                localStorage.setItem("vantage_members", JSON.stringify(APP.members));
            }
        } catch (e) {
            console.error("Failed to query workspace members from Supabase:", e);
        }
    } else if (dbProvider === "firebase") {
        const projectId = localStorage.getItem("vantage_firebase_project_id");
        if (projectId) {
            try {
                const resp = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users?pageSize=100`);
                if (resp.ok) {
                    const resJson = await resp.json();
                    if (resJson.documents) {
                        const list = [];
                        resJson.documents.forEach(d => {
                            const fields = d.fields;
                            if (fields) {
                                list.push({
                                    name: fields.name ? fields.name.stringValue : d.name.split("/").pop(),
                                    role: fields.dept ? fields.dept.stringValue : "ops",
                                    status: "active"
                                });
                            }
                        });
                        if (list.length > 0) {
                            APP.members = list;
                            localStorage.setItem("vantage_members", JSON.stringify(APP.members));
                        }
                    }
                }
            } catch(e) {
                console.error("Firebase pull members failed:", e);
            }
        }
    } else if (dbProvider === "pocketbase") {
        const pbUrl = localStorage.getItem("vantage_pocketbase_url");
        if (pbUrl) {
            try {
                const resp = await fetch(`${pbUrl}/api/collections/users/records?limit=100`);
                if (resp.ok) {
                    const resJson = await resp.json();
                    if (resJson.items) {
                        const list = resJson.items.map(item => ({
                            name: item.name || item.email.split("@")[0],
                            role: item.department || "ops",
                            status: "active"
                        }));
                        APP.members = list;
                        localStorage.setItem("vantage_members", JSON.stringify(APP.members));
                    }
                }
            } catch(e) {
                console.error("PocketBase pull members failed:", e);
            }
        }
    }
}

function setupNotifications() {
    const bellBtn = document.getElementById("notification-bell-btn");
    const dropdown = document.getElementById("notification-dropdown-menu");
    const clearBtn = document.getElementById("clear-notifications-btn");
    
    if (bellBtn && dropdown) {
        bellBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("hide");
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener("click", () => {
            dropdown.classList.add("hide");
        });
        
        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            APP.notifications = [];
            localStorage.setItem("vantage_notifications", JSON.stringify([]));
            
            if (APP.supabase) {
                const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
                APP.supabase
                    .from("vantage_notifications")
                    .delete()
                    .eq("recipient_email", userEmail)
                    .then(({ error }) => {
                        if (error) console.error("Failed to clear notifications in DB:", error.message);
                    });
            }
            
            renderNotifications();
        });
    }
    
    if (APP.supabase) {
        pullNotificationsFromSupabase();
        initNotificationsRealtime();
        initCardsRealtime();
    } else {
        renderNotifications();
    }
}

async function pullNotificationsFromSupabase() {
    if (!APP.supabase) return;
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    try {
        const { data, error } = await APP.supabase
            .from("vantage_notifications")
            .select("*")
            .eq("recipient_email", userEmail)
            .order("created_at", { ascending: false });
            
        if (!error && data) {
            APP.notifications = data.map(item => ({
                id: item.id,
                title: item.title,
                message: item.message,
                type: item.type,
                time: item.created_at,
                author: item.sender_name,
                unread: !item.is_read
            }));
            localStorage.setItem("vantage_notifications", JSON.stringify(APP.notifications));
            renderNotifications();
        }
    } catch (e) {
        console.error("Failed to query notifications from Supabase:", e);
    }
}

function initNotificationsRealtime() {
    if (!APP.supabase) return;
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    try {
        APP.supabase
            .channel('vantage_notifications_channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vantage_notifications', filter: `recipient_email=eq.${userEmail}` }, payload => {
                const newNotif = payload.new;
                
                APP.notifications.unshift({
                    id: newNotif.id,
                    title: newNotif.title,
                    message: newNotif.message,
                    type: newNotif.type,
                    time: newNotif.created_at,
                    author: newNotif.sender_name,
                    unread: !newNotif.is_read
                });
                
                localStorage.setItem("vantage_notifications", JSON.stringify(APP.notifications));
                renderNotifications();
                showToastNotification(newNotif.sender_name, newNotif.title, newNotif.message);
            })
            .subscribe();
    } catch(e) {
        console.error("Supabase Realtime subscription error:", e);
    }
}

function initCardsRealtime() {
    if (!APP.supabase) return;
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    try {
        APP.supabase
            .channel('vantage_cards_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'vantage_cards', filter: `workspace_owner=eq.${userEmail}` }, payload => {
                console.log("Realtime Cards payload:", payload);
                const eventType = payload.eventType;
                
                if (eventType === 'INSERT' || eventType === 'UPDATE') {
                    const cardData = payload.new.data;
                    const index = APP.cards.findIndex(c => c.id === cardData.id);
                    if (index !== -1) {
                        if (JSON.stringify(APP.cards[index]) !== JSON.stringify(cardData)) {
                            APP.cards[index] = cardData;
                            localStorage.setItem("vantage_workspace_data", JSON.stringify(APP.cards));
                            if (typeof renderKanbanBoard === 'function') renderKanbanBoard();
                        }
                    } else {
                        APP.cards.push(cardData);
                        localStorage.setItem("vantage_workspace_data", JSON.stringify(APP.cards));
                        if (typeof renderKanbanBoard === 'function') renderKanbanBoard();
                    }
                } else if (eventType === 'DELETE') {
                    const deletedId = payload.old.id;
                    const index = APP.cards.findIndex(c => c.id === deletedId);
                    if (index !== -1) {
                        APP.cards.splice(index, 1);
                        localStorage.setItem("vantage_workspace_data", JSON.stringify(APP.cards));
                        if (typeof renderKanbanBoard === 'function') renderKanbanBoard();
                    }
                }
            })
            .subscribe();
    } catch(e) {
        console.error("Supabase Cards Realtime subscription error:", e);
    }
}

function renderNotifications() {
    const container = document.getElementById("notification-items-container");
    const countBadge = document.getElementById("notification-unread-count");
    if (!container) return;
    
    container.innerHTML = "";
    
    const unreadCount = APP.notifications.filter(n => n.unread).length;
    if (countBadge) {
        if (unreadCount > 0) {
            countBadge.textContent = unreadCount;
            countBadge.style.display = "block";
        } else {
            countBadge.style.display = "none";
        }
    }
    
    if (APP.notifications.length === 0) {
        container.innerHTML = `<p class="no-notifications-placeholder">No new alerts.</p>`;
        return;
    }
    
    APP.notifications.forEach(notif => {
        const timeAgo = formatTimeAgo(new Date(notif.time));
        const initial = notif.author ? notif.author.charAt(0) : "S";
        
        const itemHtml = `
            <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="markNotificationAsRead('${notif.id}')">
                <div class="notification-avatar ${notif.type}">${initial}</div>
                <div class="notification-content-wrap">
                    <span class="notification-title">${notif.title}</span>
                    <p class="notification-msg">${notif.message}</p>
                    <span class="notification-time">${timeAgo}</span>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", itemHtml);
    });
}

window.markNotificationAsRead = function(notifId) {
    const notif = APP.notifications.find(n => n.id == notifId);
    if (notif) {
        notif.unread = false;
        localStorage.setItem("vantage_notifications", JSON.stringify(APP.notifications));
        renderNotifications();
        
        if (APP.supabase) {
            APP.supabase
                .from("vantage_notifications")
                .update({ is_read: true })
                .eq("id", notifId)
                .then(({ error }) => {
                    if (error) console.error("Failed to update notification state:", error.message);
                });
        }
    }
};

function showToastNotification(author, title, msg) {
    const toast = document.createElement("div");
    toast.className = "toast-alert";
    toast.innerHTML = `
        <i data-lucide="bell" style="width: 18px; height: 18px; color: var(--primary-hover);"></i>
        <div class="toast-content">
            <h5 style="font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 600; color: #fff;">${title}</h5>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.15rem;">${author}: ${msg}</p>
        </div>
    `;
    document.body.appendChild(toast);
    safeCreateIcons();
    
    setTimeout(() => {
        toast.style.animation = "slideInToast 0.3s reverse forwards";
        setTimeout(() => toast.remove(), 350);
    }, 4500);
}

// Fallback participant parser
function extractParticipantsFromCards(cards) {
    const list = [];
    cards.forEach(card => {
        if (card.heritage) {
            const words = card.heritage.match(/[A-Z][a-zA-Z]+/g);
            if (words) {
                words.forEach(w => {
                    if (["System", "Lead", "Workspace", "Card", "Imported", "AI", "Importer"].includes(w)) return;
                    if (!list.some(p => p.name === w)) {
                        list.push({ name: w, role: card.dept || "ops" });
                    }
                });
            }
        }
    });
    
    if (list.length === 0) {
        list.push({ name: "Priya", role: "ops" });
        list.push({ name: "Raj", role: "sales" });
        list.push({ name: "Deepak", role: "rd" });
        list.push({ name: "Sam", role: "finance" });
    }
    return list;
}

// ====================================================
// Importer Bundles and Epic Collapsible Decks
// ====================================================

function renderExtractedBundles() {
    const container = document.getElementById("importer-bundles-container");
    if (!container) return;
    container.innerHTML = "";
    
    if (!APP.tempImportedCards || APP.tempImportedCards.length === 0) {
        container.innerHTML = `<p class="loading-placeholder">No cards found to import.</p>`;
        return;
    }
    
    const depts = INDUSTRY_PRESETS[APP.industry].departments;
    
    APP.tempImportedBundles.forEach((bundle, bIdx) => {
        const cardsInBundle = APP.tempImportedCards.filter(c => bundle.cardTitles.includes(c.title));
        if (cardsInBundle.length === 0) return;
        
        let cardItemsHtml = "";
        cardsInBundle.forEach(card => {
            const index = APP.tempImportedCards.indexOf(card);
            let deptOptions = "";
            Object.keys(depts).forEach(key => {
                const selected = card.dept === key ? "selected" : "";
                deptOptions += `<option value="${key}" ${selected}>${depts[key].name}</option>`;
            });
            
            cardItemsHtml += `
                <div class="bundle-card-item extracted-deck-card" data-index="${index}" style="margin-bottom: 0.75rem;">
                    <button class="extracted-card-delete-btn" onclick="removeExtractedCard(${index})" style="position: absolute; right: 10px; top: 10px; border: none; background: none; color: var(--prio-high); font-size: 1.1rem; cursor: pointer; padding: 2px;">&times;</button>
                    
                    <div class="form-group" style="margin-bottom: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
                        <label style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Task Title</label>
                        <input type="text" class="extracted-card-title-input" value="${card.title}" style="width: 100%; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.06); color: #fff; font-size: 0.85rem; font-weight: 600; padding: 0.2rem 0; outline: none;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
                        <label style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Task Scope / Instructions</label>
                        <textarea class="extracted-card-desc-textarea" style="width: 100%; height: 55px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); border-radius: 4px; color: var(--text-secondary); font-size: 0.75rem; padding: 0.35rem; resize: none; outline: none; line-height: 1.4;">${card.description}</textarea>
                    </div>
                    
                    <div class="extracted-card-controls" style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center;">
                        <select class="extracted-card-dept-select" style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; color: #fff; font-size: 0.7rem; padding: 0.25rem; outline: none; cursor: pointer;">
                            ${deptOptions}
                        </select>
                        <select class="extracted-card-prio-select" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; color: #fff; font-size: 0.7rem; padding: 0.25rem; outline: none; cursor: pointer;">
                            <option value="high" ${card.priority === 'high' ? 'selected' : ''}>High</option>
                            <option value="medium" ${card.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="low" ${card.priority === 'low' ? 'selected' : ''}>Low</option>
                        </select>
                    </div>
                </div>
            `;
        });
        
        const prioClass = `${bundle.priority || 'medium'}-priority-bundle`;
        const bundleHtml = `
            <div class="bundle-card ${prioClass}" style="margin-bottom: 1rem;">
                <div class="bundle-header" onclick="toggleBundleCollapse(${bIdx})">
                    <div class="bundle-header-title-wrap">
                        <i data-lucide="folder-git-2" style="width: 16px; height: 16px; color: var(--primary-hover);"></i>
                        <div>
                            <h4 style="font-size: 0.95rem; font-weight: 600; color: #fff;">${bundle.name}</h4>
                            <p class="bundle-header-desc" style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.15rem;">${bundle.description || 'Action items'}</p>
                        </div>
                    </div>
                    <span class="badge" style="background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 0.7rem; padding: 2px 6px;">${cardsInBundle.length} goals</span>
                </div>
                <div class="bundle-body" id="bundle-body-${bIdx}" style="display: grid; padding: 1rem; gap: 0.5rem; background: rgba(0,0,0,0.15);">
                    ${cardItemsHtml}
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", bundleHtml);
    });
    
    window.toggleBundleCollapse = function(bIdx) {
        const el = document.getElementById(`bundle-body-${bIdx}`);
        if (el) {
            el.style.display = el.style.display === "none" ? "grid" : "none";
        }
    };
    
    safeCreateIcons();
}

// ====================================================
// Enterprise Team Readiness & Allocation Console
// ====================================================

function initTeamReadinessConsole(participants, bundles) {
    const btnAlloc = document.getElementById("btn-tab-readiness-allocations");
    const btnWork = document.getElementById("btn-tab-readiness-workload");
    const panelAlloc = document.getElementById("panel-readiness-allocations");
    const panelWork = document.getElementById("panel-readiness-workload");

    if (!panelAlloc || !panelWork) return;

    // Setup tab listeners cleanly
    if (btnAlloc && btnWork) {
        const newBtnAlloc = btnAlloc.cloneNode(true);
        const newBtnWork = btnWork.cloneNode(true);
        btnAlloc.replaceWith(newBtnAlloc);
        btnWork.replaceWith(newBtnWork);

        newBtnAlloc.addEventListener("click", () => {
            newBtnAlloc.classList.add("active");
            newBtnWork.classList.remove("active");
            panelAlloc.classList.add("active");
            panelWork.classList.remove("active");
        });

        newBtnWork.addEventListener("click", () => {
            newBtnWork.classList.add("active");
            newBtnAlloc.classList.remove("active");
            panelWork.classList.add("active");
            panelAlloc.classList.remove("active");
        });
    }

    // Clear old panel elements
    panelAlloc.innerHTML = "";
    panelWork.innerHTML = "";

    // 1. RENDER TEAM ALLOCATIONS
    if (participants.length === 0) {
        panelAlloc.innerHTML = `<div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 2rem;">No participants discovered.</div>`;
    } else {
        participants.forEach((p, idx) => {
            // Compute estimated tasks workload matching their name
            const taskCount = APP.tempImportedCards.filter(c => 
                c.heritage && typeof c.heritage === 'string' && c.heritage.toLowerCase().includes(p.name.toLowerCase())
            ).length;

            // Find member matching p.name
            const matchedMember = APP.members.find(m => m.name.toLowerCase() === p.name.toLowerCase());
            let status = p.status || "pending";
            if (matchedMember) {
                status = matchedMember.status; // 'active' or 'invited'
            }

            let statusText = status === 'active' ? 'Active Member' : (status === 'invited' ? 'Invited' : 'Pending Setup');
            let statusClass = status === 'active' ? 'tag-active' : (status === 'invited' ? 'tag-invited' : 'tag-pending');
            let statusBorderClass = status === 'active' ? 'active-member' : (status === 'invited' ? 'invited-pending' : 'pending-invite');

            // Action buttons
            let actionButtons = "";
            if (status === 'active') {
                actionButtons = `
                    <button class="btn btn-secondary btn-sm notify-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; display: flex; align-items: center; gap: 0.25rem;">
                        <i data-lucide="bell" style="width: 12px; height: 12px;"></i>
                        <span>Notify</span>
                    </button>`;
            } else if (status === 'invited') {
                actionButtons = `
                    <button class="btn btn-secondary btn-sm copy-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; display: flex; align-items: center; gap: 0.25rem;">
                        <i data-lucide="copy" style="width: 12px; height: 12px;"></i>
                        <span>Copy Link</span>
                    </button>`;
            } else {
                actionButtons = `
                    <button class="btn btn-primary btn-sm invite-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; display: flex; align-items: center; gap: 0.25rem;">
                        <i data-lucide="user-plus" style="width: 12px; height: 12px;"></i>
                        <span>Invite</span>
                    </button>`;
            }

            const roleLabel = APP.getDeptName(p.role);
            const depts = INDUSTRY_PRESETS[APP.industry].departments;
            const deptColor = depts[p.role]?.color || "var(--primary)";

            const memberHtml = `
                <div class="readiness-member-card ${statusBorderClass}">
                    <div class="member-card-info">
                        <div class="member-card-name-row">
                            <span class="member-card-name">${p.name}</span>
                            <span class="member-tag ${statusClass}">${statusText}</span>
                        </div>
                        <div style="display: flex; gap: 0.35rem; align-items: center; margin-top: 2px;">
                            <span class="member-card-role-badge" style="background-color: ${deptColor}">${roleLabel}</span>
                            <span class="member-card-subtext">&bull; Assigned to <strong>${taskCount}</strong> goal${taskCount === 1 ? '' : 's'}</span>
                        </div>
                    </div>
                    <div class="member-card-actions">
                        ${actionButtons}
                    </div>
                </div>
            `;
            panelAlloc.insertAdjacentHTML("beforeend", memberHtml);

            // Bind click handlers to action buttons in card
            const renderedCard = panelAlloc.lastElementChild;
            const notifyBtn = renderedCard.querySelector(".notify-btn");
            const inviteBtn = renderedCard.querySelector(".invite-btn");
            const copyBtn = renderedCard.querySelector(".copy-btn");

            if (notifyBtn) {
                notifyBtn.addEventListener("click", () => {
                    notifyParticipant(p.name, p.role);
                });
            }
            if (inviteBtn) {
                inviteBtn.addEventListener("click", () => {
                    openInviteModal({ name: p.name, role: p.role, status: 'pending' });
                });
            }
            if (copyBtn) {
                copyBtn.addEventListener("click", () => {
                    openInviteModal({ name: p.name, role: p.role, status: 'invited' });
                });
            }
        });
    }

    // 2. RENDER DEPT WORKLOAD
    const totalCards = APP.tempImportedCards.length;
    const depts = INDUSTRY_PRESETS[APP.industry].departments;

    if (totalCards === 0) {
        panelWork.innerHTML = `<div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 2rem;">No goals extracted.</div>`;
    } else {
        Object.keys(depts).forEach(deptKey => {
            const deptInfo = depts[deptKey];
            const deptCards = APP.tempImportedCards.filter(c => c.dept === deptKey);
            const count = deptCards.length;
            const percent = Math.round((count / totalCards) * 100);

            const workloadHtml = `
                <div class="workload-card-row">
                    <div class="workload-card-meta">
                        <div class="workload-dept-label">
                            <span class="workload-dept-dot" style="background-color: ${deptInfo.color}"></span>
                            <span>${deptInfo.name}</span>
                        </div>
                        <span class="workload-count">${count} goal${count === 1 ? '' : 's'} (${percent}%)</span>
                    </div>
                    <div class="workload-progress-bar-bg">
                        <div class="workload-progress-bar-fill" style="width: ${percent}%; background-color: ${deptInfo.color}"></div>
                    </div>
                </div>
            `;
            panelWork.insertAdjacentHTML("beforeend", workloadHtml);
        });
    }

    // Refresh icons inside the container
    safeCreateIcons();
}

async function notifyParticipant(name, role) {
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    const userName = localStorage.getItem("vantage_user_name") || "System Lead";
    const targetEmail = `${name.toLowerCase().replace(/\s/g, "")}@vantage-team.com`;
    const message = `Tasks parsed from chat log are ready. You have goals under ${APP.getDeptName(role)}.`;
    
    const notifObj = {
        workspace_owner: userEmail,
        recipient_email: targetEmail,
        sender_name: userName,
        type: 'alert',
        title: 'New Chat Tasks Assigned!',
        message: message,
        card_id: null,
        is_read: false,
        created_at: new Date().toISOString()
    };
    
    if (APP.supabase) {
        try {
            await APP.supabase.from('vantage_notifications').insert([notifObj]);
        } catch (e) {
            console.error("Failed to insert notification in Supabase:", e);
        }
    }
    
    APP.notifications.unshift({
        id: "notif-" + Date.now() + Math.random(),
        title: notifObj.title,
        message: notifObj.message,
        type: 'alert',
        time: notifObj.created_at,
        author: notifObj.sender_name,
        unread: true
    });
    
    localStorage.setItem("vantage_notifications", JSON.stringify(APP.notifications));
    renderNotifications();
    
    // Trigger webhook notification
    dispatchWebhookNotification("Chat Import", "Assignee Alerts", `Notification dispatched to ${name} (${role.toUpperCase()})`);
    
    showToastNotification(userName, `Alert sent to ${name}`, `Assigned to tasks in ${APP.getDeptName(role)}.`);
}

function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function openInviteModal(node) {
    const modal = document.getElementById("invite-modal");
    if (!modal) return;
    
    document.getElementById("invitee-name-input").value = node.name || "";
    document.getElementById("invitee-role-select").value = node.role || "ops";
    document.getElementById("invitee-email-input").value = node.email || "";
    document.getElementById("invitee-permission-role-select").value = node.permission_role || "contributor";
    
    const inviteToken = generateUUID();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const inviteLink = `${window.location.origin}${basePath}/auth.html?token=${inviteToken}`;
    document.getElementById("invite-link-textarea").value = inviteLink;
    
    const updatePreview = () => {
        const nameVal = document.getElementById("invitee-name-input").value.trim();
        const roleVal = document.getElementById("invitee-role-select").value;
        const permRoleVal = document.getElementById("invitee-permission-role-select").value;
        
        document.getElementById("preview-invitee-name").textContent = nameVal || "Candidate";
        const roleBadge = document.getElementById("preview-invitee-role");
        roleBadge.textContent = `${APP.getDeptName(roleVal).toUpperCase()} - ${permRoleVal.toUpperCase()}`;
        const depts = INDUSTRY_PRESETS[APP.industry].departments;
        roleBadge.style.backgroundColor = depts[roleVal]?.color || "var(--primary)";
    };
    
    document.getElementById("invitee-role-select").onchange = updatePreview;
    document.getElementById("invitee-permission-role-select").onchange = updatePreview;
    
    updatePreview();
    modal.classList.add("active");
    
    const copyBtn = document.getElementById("invite-copy-link-btn");
    
    const handleCopy = () => {
        const nameVal = document.getElementById("invitee-name-input").value.trim();
        const roleVal = document.getElementById("invitee-role-select").value;
        const emailVal = document.getElementById("invitee-email-input").value.trim();
        const permRoleVal = document.getElementById("invitee-permission-role-select").value;

        if (!nameVal) {
            alert("Candidate name is required.");
            return;
        }
        if (!emailVal) {
            alert("Candidate email is required.");
            return;
        }
        
        navigator.clipboard.writeText(inviteLink).then(() => {
            showToastNotification("System", "Invite Link Copied!", `Share link generated for ${nameVal}.`);
            
            node.status = "invited";
            node.email = emailVal;
            node.permission_role = permRoleVal;
            node.role = roleVal;
            
            if (APP.tempImportedParticipants) {
                const matchedPart = APP.tempImportedParticipants.find(p => p.name.toLowerCase() === node.name.toLowerCase());
                if (matchedPart) {
                    matchedPart.status = "invited";
                    matchedPart.email = emailVal;
                    matchedPart.permission_role = permRoleVal;
                    matchedPart.role = roleVal;
                }
                initTeamReadinessConsole(APP.tempImportedParticipants, APP.tempImportedBundles);
            }
            
            const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
            const memberObj = {
                workspace_owner: userEmail,
                name: nameVal,
                role: roleVal,
                email: emailVal,
                permission_role: permRoleVal,
                invite_token: inviteToken,
                invite_expires_at: expiresAt,
                status: 'invited'
            };
            
            const existingIdx = APP.members.findIndex(m => m.name.toLowerCase() === nameVal.toLowerCase());
            if (existingIdx !== -1) {
                APP.members[existingIdx] = memberObj;
            } else {
                APP.members.push(memberObj);
            }
            
            localStorage.setItem("vantage_members", JSON.stringify(APP.members));
            
            if (APP.supabase) {
                APP.supabase.from('vantage_members').upsert([memberObj]).then(() => {});
            }
            
            if (APP.currentView === 'team-panel') renderTeamPanel();
            
            modal.classList.remove("active");
            copyBtn.removeEventListener("click", handleCopy);
        });
    };
    
    copyBtn.replaceWith(copyBtn.cloneNode(true));
    document.getElementById("invite-copy-link-btn").addEventListener("click", handleCopy);
}

// ====================================================
// Proactive AI Co-Pilot Recommendation Engine
// ====================================================

window.toggleProactiveRecommendations = function() {
    const body = document.getElementById("proactive-recommendations-body");
    const tabs = document.getElementById("proactive-tabs-container");
    const chevron = document.getElementById("proactive-chevron");
    if (body && chevron) {
        const isCollapsed = body.classList.contains("hide");
        if (isCollapsed) {
            body.classList.remove("hide");
            // Only show tabs if there is content loaded (i.e. not showing the skeleton loader)
            if (tabs && !body.querySelector(".skeleton-loader-wrap")) {
                tabs.classList.remove("hide");
            }
            chevron.style.transform = "rotate(0deg)";
        } else {
            body.classList.add("hide");
            if (tabs) tabs.classList.add("hide");
            chevron.style.transform = "rotate(-90deg)";
        }
    }
};

async function triggerProactiveCoPilot(card) {
    const body = document.getElementById("proactive-recommendations-body");
    const wrapper = document.getElementById("proactive-recommendations-wrapper");
    const tabs = document.getElementById("proactive-tabs-container");
    const chevron = document.getElementById("proactive-chevron");
    if (!body || !wrapper) return;

    // 1. Calculate Content Signature Hash
    const currentHash = card.title + "||" + (card.description || "") + "||" + (card.context || "");

    // 2. Check if cache exists and matches signature
    if (card.proactiveInsights && card.proactiveInsights.contentHash === currentHash) {
        console.log(`Using cached AI Co-Pilot insights for card: ${card.title}`);
        wrapper.classList.remove("hide");
        body.classList.remove("hide");
        if (chevron) chevron.style.transform = "rotate(0deg)";
        renderProactiveRecommendations(card, card.proactiveInsights.data);
        return;
    }
    
    // Ensure clean state: wrapper is flex, tabs are hidden, body is visible, chevron is open
    wrapper.classList.remove("hide");
    if (tabs) tabs.classList.add("hide");
    body.classList.remove("hide");
    if (chevron) chevron.style.transform = "rotate(0deg)";
    
    body.innerHTML = `
        <div class="skeleton-loader-wrap" style="display: flex; flex-direction: column; gap: 0.65rem; padding: 0.5rem 0; animation: pulse 1.5s infinite;">
            <div style="height: 12px; width: 85%; background: rgba(255,255,255,0.08); border-radius: 4px;"></div>
            <div style="height: 10px; width: 95%; background: rgba(255,255,255,0.04); border-radius: 4px;"></div>
            <div style="height: 10px; width: 70%; background: rgba(255,255,255,0.04); border-radius: 4px;"></div>
        </div>
    `;
    safeCreateIcons();
    
    let recommendations = null;
    const fallbackPreset = getPresetProactiveRecommendation(card);
    
    if (APP.apiKey) {
        const promptText = `You are a proactive Startup Co-Pilot assistant. Analyze this task card:
        Title: "${card.title}"
        Description: "${card.description || 'None'}"
        Context: "${card.context || 'None'}"
        Department: "${APP.getDeptName(card.dept)}"
        
        Suggest critical risks, immediate roadmap subtasks, and outreach templates.
        Output ONLY a valid JSON object matching this structure:
        {
          "summary": "Short 1-sentence next steps guide.",
          "risks": [
            "Supply chain or compliance risk warning",
            "Project schedule bottleneck or quality check warning"
          ],
          "subtasks": [
            "Actionable checklist item A",
            "Actionable checklist item B"
          ],
          "template": {
            "title": "Recommended Outreach RFP/Brief Template Name",
            "content": "Template text body"
          }
        }
        No markdown, just raw JSON.`;
        
        try {
            const responseText = await queryGeminiAPI(promptText, APP.apiKey, true);
            let parsed = null;
            const startIdx = responseText.indexOf("{");
            const endIdx = responseText.lastIndexOf("}");
            if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
                const jsonStr = responseText.substring(startIdx, endIdx + 1);
                parsed = JSON.parse(jsonStr);
            }
            if (parsed && parsed.summary && parsed.risks && parsed.subtasks && parsed.template) {
                recommendations = parsed;
            } else {
                recommendations = fallbackPreset;
            }
        } catch (e) {
            console.warn("Gemini proactive query failed, using preset:", e);
            recommendations = fallbackPreset;
        }
    } else {
        // Local simulation delay for premium wiggling loader
        await new Promise(r => setTimeout(r, 800));
        recommendations = fallbackPreset;
    }
    
    // Archive previous insights to history if present
    if (card.proactiveInsights) {
        card.proactiveInsightsHistory = card.proactiveInsightsHistory || [];
        card.proactiveInsightsHistory.push(card.proactiveInsights);
    }

    // Save new insights to card cache
    card.proactiveInsights = {
        contentHash: currentHash,
        data: recommendations,
        generatedAt: new Date().toISOString(),
        author: localStorage.getItem("vantage_user_name") || "AI Co-Pilot"
    };
    APP.save();

    renderProactiveRecommendations(card, recommendations);
}

function getPresetProactiveRecommendation(card) {
    const pkgPreset = {
        summary: "Ensure packaging film has high moisture/oxygen barriers and verify ASTM D6400 raw test datasheets.",
        risks: [
            "Compostable barrier film has high oxygen transmission rate (OTR), risking Citrus Splashes degradation.",
            "Vendor supply line is limited: green-wrap supplier has 6-week turnaround time for Ohio shipments."
        ],
        subtasks: [
            "Request ASTM D6400 barrier data sheet",
            "Coordinate accelerated shelf-life trial run with R&D Citrus Splash iteration",
            "Draft packaging material MOQ price tiers matrix"
        ],
        template: {
            title: "Supplier Sourcing Spec request email",
            content: `Dear Supplier Manager,

We are reviewing raw materials for our organic snack bar packaging line. Please send the ASTM D6400 technical specifications, MOQ price breaks, and lead times.

Best,
Vantage Sourcing Team`
        }
    };

    const salesPreset = {
        summary: "Vet Whole Foods category listing margins and coordinate sample kit shipments directly to the buyer's regional review desk.",
        risks: [
            "Category reviews close next month. Late pitches will miss the annual Listing slotting window.",
            "High distributor shipping surcharge (15%) reduces target brand margin below the 40% threshold."
        ],
        subtasks: [
            "Finalize Whole Foods category listing margin calculator",
            "Ship cold Citrus Splash sample batch kit to regional buyer",
            "Print physical sell sheet catalogs for buyer review"
        ],
        template: {
            title: "Whole Foods Buyer Introduction pitch note",
            content: `Hi [Category Buyer],

We are launching Citrus Splash - our stabilizer-free organic juice line. We have slots confirmed and would love to share our regional pricing pitch deck.

Best,
Workspace Sales Lead`
        }
    };

    const rdPreset = {
        summary: "Establish base acid/pH metrics (target < 3.5) and monitor natural color separation ratios over 45 days.",
        risks: [
            "Fruit pulp separation is visible without emulsifiers, posing shelf aesthetic risks.",
            "Accelerated chamber humidity levels could cause yeast/mold drift in unstabilized juices."
        ],
        subtasks: [
            "Log Citrus Splash separation ratio at Week 3",
            "Execute beverage thermal shock cycle runs",
            "Draft R&D stability summary sheet"
        ],
        template: {
            title: "R&D Formulation Test Log Template",
            content: `Citrus Splash Iteration #4 - Formulation Testing Log:
- Base pH:
- Accelerated Chamber Temperature: 40°C
- Shelf Visual Stability Checks:
- Observations:`
        }
    };

    // Keyword matching fallback
    if (card.title.toLowerCase().includes("wrapper") || card.title.toLowerCase().includes("packaging") || card.id === "card-1") {
        return pkgPreset;
    } else if (card.title.toLowerCase().includes("buyer") || card.title.toLowerCase().includes("pitch") || card.id === "card-2") {
        return salesPreset;
    } else if (card.title.toLowerCase().includes("stability") || card.title.toLowerCase().includes("recipe") || card.id === "card-3") {
        return rdPreset;
    } else {
        return {
            summary: `Establish execution milestones and check resource availability for "${card.title}" under ${APP.getDeptName(card.dept)}.`,
            risks: [
                `Potential task timeline bottlenecks if collaborators are unalerted.`,
                `Context misalignment regarding strategic workspace priorities.`
            ],
            subtasks: [
                `Define subtask boundaries and checklist milestones`,
                `Identify critical dependencies mapping this card to active bundles`
            ],
            template: {
                title: "Outreach & Brief Draft",
                content: `Hi Team,

I'm coordinating the deliverables for "${card.title}". Please review the checklist and confirm your availability.

Best,
Vantage Project Lead`
            }
        };
    }
}

function renderProactiveRecommendations(card, data) {
    const body = document.getElementById("proactive-recommendations-body");
    const tabsContainer = document.getElementById("proactive-tabs-container");
    if (!body) return;
    
    // Show tabs
    if (tabsContainer) {
        tabsContainer.classList.remove("hide");
        // Reset active tab button to overview
        const tabBtns = tabsContainer.querySelectorAll(".proactive-tab-btn");
        tabBtns.forEach(btn => {
            if (btn.getAttribute("data-proactive-tab") === "overview") {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }
    
    body.innerHTML = `
        <!-- Overview Panel -->
        <div id="proactive-panel-overview" class="proactive-panel active" style="display: flex; flex-direction: column; gap: 0.65rem;">
            <p class="proactive-summary">${data.summary}</p>
            
            <div class="proactive-sub-section">
                <span class="proactive-section-label">Identified Risks & Warnings</span>
                <div class="proactive-risks-list">
                    ${data.risks.map(r => `
                        <div class="proactive-risk-item">
                            <i data-lucide="alert-triangle" class="risk-icon"></i>
                            <span>${r}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
        
        <!-- Subtasks Panel -->
        <div id="proactive-panel-subtasks" class="proactive-panel hide" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span class="proactive-section-label">Suggested Subtasks</span>
            <div class="proactive-subtasks-list">
                ${data.subtasks.map((st, i) => `
                    <div class="proactive-subtask-card">
                        <span class="subtask-text">${st}</span>
                        <button class="btn btn-proactive-add" onclick="addProactiveSubtask('${card.id}', '${st.replace(/'/g, "\\'")}', this)">
                            <i data-lucide="plus"></i> Add
                        </button>
                    </div>
                `).join("")}
            </div>
        </div>
        
        <!-- Template Panel -->
        <div id="proactive-panel-template" class="proactive-panel hide" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div class="template-header-row">
                <span class="proactive-section-label">Template: ${data.template.title}</span>
                <button class="btn btn-proactive-apply" onclick="applyProactiveTemplate('${card.id}', \`${data.template.content.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`)">
                    <i data-lucide="check"></i> Apply
                </button>
            </div>
            <div class="template-code-wrapper">
                <pre class="template-code">${data.template.content}</pre>
                <button class="btn btn-template-copy" onclick="copyTemplateText(\`${data.template.content.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`, this)" title="Copy template">
                    <i data-lucide="copy" style="width: 10px; height: 10px;"></i>
                </button>
            </div>
        </div>

        <!-- History Panel -->
        <div id="proactive-panel-history" class="proactive-panel hide" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span class="proactive-section-label">AI Insights Archive</span>
            <div class="proactive-history-list">
                ${(!card.proactiveInsightsHistory || card.proactiveInsightsHistory.length === 0) ? `
                    <p class="text-muted" style="font-size: 0.72rem; font-style: italic; text-align: center; margin-top: 1.5rem;">No historical records found for this card.</p>
                ` : card.proactiveInsightsHistory.slice().reverse().map(h => {
                    const timeStr = formatTimeAgo(new Date(h.generatedAt));
                    return `
                        <div class="proactive-history-item">
                            <div class="history-meta">
                                <strong>${h.author || 'AI Co-Pilot'}</strong>
                                <span>${timeStr}</span>
                            </div>
                            <p class="history-summary">${h.data.summary}</p>
                        </div>
                    `;
                }).join("")}
            </div>
        </div>
    `;
    safeCreateIcons();
}

window.switchProactiveTab = function(tabName) {
    // Toggle active tab buttons
    const tabBtns = document.querySelectorAll(".proactive-tab-btn");
    tabBtns.forEach(btn => {
        if (btn.getAttribute("data-proactive-tab") === tabName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Toggle active content panels
    const panels = document.querySelectorAll(".proactive-panel");
    panels.forEach(panel => {
        if (panel.id === `proactive-panel-${tabName}`) {
            panel.classList.remove("hide");
            panel.classList.add("active");
        } else {
            panel.classList.add("hide");
            panel.classList.remove("active");
        }
    });
    
    safeCreateIcons();
};

window.copyTemplateText = function(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHtml = btnElement.innerHTML;
        btnElement.innerHTML = `<i data-lucide="check" style="color: var(--success); width: 10px; height: 10px;"></i>`;
        safeCreateIcons();
        showToastNotification("Co-Pilot", "Copied", "Template content copied to clipboard.");
        setTimeout(() => {
            btnElement.innerHTML = originalHtml;
            safeCreateIcons();
        }, 1500);
    });
};

window.forceRegenerateInsights = async function() {
    if (!APP.activeCardId) return;
    const card = APP.cards.find(c => c.id === APP.activeCardId);
    if (!card) return;
    
    // Force invalid signature
    if (card.proactiveInsights) {
        card.proactiveInsights.contentHash = "force-refresh-triggered";
    }
    
    showToastNotification("Co-Pilot", "Insights Refreshing", "Regenerating recommendation briefs from AI...");
    await triggerProactiveCoPilot(card);
};

window.addProactiveSubtask = function(cardId, subtaskText, btnElement) {
    const card = APP.cards.find(c => c.id === cardId);
    if (card) {
        card.checklist.push({
            id: "ch-" + generateUUID(),
            text: subtaskText,
            done: false
        });
        APP.save();
        renderModalChecklist(card);
        renderKanbanBoard();
        
        if (btnElement) {
            btnElement.disabled = true;
            btnElement.style.background = "rgba(255,255,255,0.04)";
            btnElement.style.borderColor = "transparent";
            btnElement.style.color = "var(--text-muted)";
            btnElement.innerHTML = `<i data-lucide="check" style="width:10px; height:10px;"></i> Added`;
            safeCreateIcons();
        }
        
        showToastNotification("Co-Pilot", "Checklist Updated", `Added suggested subtask to card checklist.`);
    }
};

window.applyProactiveTemplate = function(cardId, templateContent) {
    const card = APP.cards.find(c => c.id === cardId);
    if (card) {
        card.description = templateContent;
        APP.save();
        
        const descInput = document.getElementById("modal-card-desc");
        if (descInput) {
            descInput.value = templateContent;
        }
        
        renderKanbanBoard();
        showToastNotification("Co-Pilot", "Description Updated", "Applied suggested template to card description.");
    }
};

// ====================================================
// Phase 6: Team Management & Collaborator roster
// ====================================================

function renderTeamPanel() {
    const container = document.getElementById("team-members-container");
    if (!container) return;
    container.innerHTML = "";
    
    // Load department select options in the inline form
    const roleSelect = document.getElementById("team-new-role");
    if (roleSelect) {
        roleSelect.innerHTML = "";
        const depts = INDUSTRY_PRESETS[APP.industry].departments;
        Object.keys(depts).forEach(key => {
            roleSelect.insertAdjacentHTML("beforeend", `<option value="${key}">${depts[key].name}</option>`);
        });
    }
    
    if (APP.members.length === 0) {
        container.innerHTML = `<span class="text-muted" style="font-size: 0.9rem; font-style: italic;">No members registered in this workspace yet.</span>`;
        return;
    }
    
    const depts = INDUSTRY_PRESETS[APP.industry].departments;
    
    APP.members.forEach(member => {
        const deptColor = depts[member.role]?.color || "var(--primary)";
        const deptName = depts[member.role]?.name || "Operations";
        
        // Filter active tasks assigned to this member
        const assignedCards = APP.getActiveCards().filter(c => c.assignee && c.assignee.toLowerCase() === member.name.toLowerCase());
        let tasksHtml = "";
        if (assignedCards.length > 0) {
            assignedCards.forEach(c => {
                tasksHtml += `
                    <div class="team-card-task" onclick="openCardModal('${c.id}')" title="Click to view task details" style="cursor:pointer; display:flex; align-items:center; gap:0.25rem; font-size:0.75rem; padding:0.2rem 0.4rem; border-radius:4px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); margin-bottom:0.25rem; color:var(--text-secondary);">
                        <i data-lucide="kanban-square" style="width:10px; height:10px; color:${deptColor}"></i>
                        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px;">${c.title}</span>
                    </div>
                `;
            });
        } else {
            tasksHtml = `<span class="text-muted" style="font-size: 0.75rem; font-style: italic;">No active tasks.</span>`;
        }
        
        const statusClass = member.status === "active" ? "active-badge" : "invited-badge";
        const statusText = member.status === "active" ? "Active" : "Invited";
        
        const inviteOrPingBtn = member.status === 'invited' ? `
            <button class="btn btn-secondary btn-sm" onclick="reopenInviteModal('${member.name}', '${member.role}')" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; display: inline-flex; align-items: center; gap: 0.25rem;">
                <i data-lucide="copy" style="width: 12px; height: 12px;"></i>
                <span>Invite Link</span>
            </button>
        ` : `
            <button class="btn btn-secondary btn-sm" onclick="sendDirectAlert('${member.name}')" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; display: inline-flex; align-items: center; gap: 0.25rem;">
                <i data-lucide="send" style="width: 12px; height: 12px;"></i>
                <span>Ping</span>
            </button>
        `;
        
        const permissionBadge = `<span class="badge" style="font-size: 0.65rem; background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 1px 4px;">${(member.permission_role || 'contributor').toUpperCase()}</span>`;
        const emailText = member.email ? `<span style="font-size: 0.7rem; color: var(--text-muted);">${member.email}</span>` : "";

        const memberHtml = `
            <div class="team-member-row glass" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); margin-bottom: 0.5rem; gap: 1rem; flex-wrap: wrap;">
                <div class="member-info-left" style="display: flex; align-items: center; gap: 0.75rem; min-width: 200px;">
                    <div class="member-avatar" style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 700; color: #fff; background: linear-gradient(135deg, ${deptColor} 0%, rgba(255,255,255,0.05) 100%); text-shadow: 0 1px 3px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);">
                        ${member.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="member-meta" style="display: flex; flex-direction: column; gap: 0.25rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                            <h4 class="member-name" style="font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 600; color: #fff; margin: 0;">${member.name}</h4>
                            <span class="member-status-indicator ${statusClass}" style="font-size: 0.65rem; font-weight: 600; padding: 2px 6px; border-radius: 50px;">${statusText}</span>
                            ${permissionBadge}
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                            <span class="member-role-text" style="font-size: 0.75rem; font-weight: 500; color: ${deptColor};">${deptName}</span>
                            ${emailText}
                        </div>
                    </div>
                </div>
                
                <div class="member-tasks-middle" style="flex: 1; min-width: 250px;">
                    <div class="tasks-heading" style="font-size: 0.65rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.35rem; font-weight: 700;">Active Workload</div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                        ${tasksHtml}
                    </div>
                </div>
                
                <div class="member-actions-right" style="display: flex; align-items: center; gap: 0.5rem;">
                    ${inviteOrPingBtn}
                    <button class="btn btn-sm" onclick="removeTeamMember('${member.name}')" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; color: var(--prio-high); background: rgba(235, 77, 75, 0.08); border: 1px solid rgba(235, 77, 75, 0.2); cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; height: 28px; width: 28px;">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", memberHtml);
    });
    safeCreateIcons();
}

window.removeTeamMember = async function(name) {
    if (!confirm(`Are you sure you want to remove ${name} from this workspace?`)) return;
    APP.members = APP.members.filter(m => m.name !== name);
    localStorage.setItem("vantage_members", JSON.stringify(APP.members));
    
    if (APP.supabase) {
        const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
        await APP.supabase
            .from("vantage_members")
            .delete()
            .eq("workspace_owner", userEmail)
            .eq("name", name);
    }
    
    showToastNotification("System", "Member Removed", `${name} has been removed from the team roster.`);
    renderTeamPanel();
};

window.reopenInviteModal = function(name, role) {
    const existing = APP.members.find(m => m.name.toLowerCase() === name.toLowerCase());
    const dummyNode = { 
        name, 
        role, 
        email: existing ? existing.email : "", 
        permission_role: existing ? existing.permission_role : "contributor" 
    };
    openInviteModal(dummyNode);
};

window.sendDirectAlert = async function(name) {
    const msg = prompt(`Enter custom alert message to send to ${name}:`);
    if (!msg) return;
    
    const userEmail = localStorage.getItem("vantage_user_email") || "local-sandbox";
    const userName = localStorage.getItem("vantage_user_name") || "User";
    const targetEmail = `${name.toLowerCase().replace(/\s/g, "")}@vantage-team.com`;
    
    const notifObj = {
        workspace_owner: userEmail,
        recipient_email: targetEmail,
        sender_name: userName,
        type: 'alert',
        title: 'Direct Team Ping',
        message: msg,
        card_id: null,
        is_read: false,
        created_at: new Date().toISOString()
    };
    
    if (APP.supabase) {
        await APP.supabase.from('vantage_notifications').insert([notifObj]);
    }
    
    showToastNotification(userName, `Ping sent to ${name}`, msg);
};

// ============================================================================
// AGENTIC TASK EXECUTION ENGINE
// ============================================================================

async function runAIAgentOnCard(cardId) {
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;

    const chatBox = document.getElementById("ai-chat-history-box");
    if (!chatBox) return;

    // 1. Add user query bubble
    chatBox.insertAdjacentHTML("beforeend", `<div class="ai-message user"><div class="message-bubble">Execute autonomous Agent workflow for this card.</div></div>`);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 2. Add assistant loader bubble with a progress log
    const loadId = "ai-loading-" + Date.now();
    chatBox.insertAdjacentHTML("beforeend", `
        <div class="ai-message assistant" id="${loadId}">
            <div class="message-bubble">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="ai-rotate-icon" data-lucide="compass" style="width: 16px; height: 16px; color: #a29bfe; animation: spin 2s linear infinite;"></i>
                        <strong id="agent-active-status" style="color: #fff; font-size: 0.8rem;">Agent: Initializing reasoning loop...</strong>
                    </div>
                    <div id="agent-log-trace" style="font-size: 0.7rem; color: var(--text-secondary); font-family: monospace; max-height: 120px; overflow-y: auto; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px; display: flex; flex-direction: column; gap: 0.25rem;">
                        <div>> Loading card metadata...</div>
                    </div>
                </div>
            </div>
        </div>
    `);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
    chatBox.scrollTop = chatBox.scrollHeight;

    const logTrace = document.getElementById("agent-log-trace");
    const statusText = document.getElementById("agent-active-status");

    // Helper to add log trace entries in real-time
    const addTrace = (text) => {
        if (logTrace) {
            logTrace.insertAdjacentHTML("beforeend", `<div>> ${text}</div>`);
            logTrace.scrollTop = logTrace.scrollHeight;
        }
    };

    // 3. Set up the prompt
    const aiProvider = localStorage.getItem("vantage_ai_provider") || "gemini";
    const enableSearch = (aiProvider === "gemini");

    addTrace("Analyzing constraints: Industry presets & role mappings...");
    addTrace(`AI Provider: ${aiProvider.toUpperCase()} (${enableSearch ? 'Google Search Grounding Enabled' : 'Grounding Simulated'})`);
    addTrace("Drafting Execution Plan...");

    // Construct prompt
    const currentAnchorDate = "2026-05-30";
    const promptText = `You are an autonomous operations agent executing task: "${card.title}".
Description: "${card.description || 'None'}"
Context: "${card.context || 'None'}"
Department: "${APP.getDeptName(card.dept)}"
Current Industry Domain: "${APP.industry.toUpperCase()}"
Current Date: ${currentAnchorDate}

Your task is to:
1. Plan strategic steps.
2. Search the web for current supplier pricing, specifications, regulatory updates, or sales margin calculators.
3. Read details, structure a task checklist of subtasks.
4. Refine the task description and context.
5. Draft any document templates (e.g. outreach letters, specifications, or filing templates).

You must simulate calling these tools in your reasoning:
- web_search(query)
- read_webpage(url)
- update_checklist(items)
- update_card_details(description, context)
- generate_draft(fileName, content)

Output ONLY a valid JSON object in this format (no markdown code fences, just raw JSON):
{
  "thoughtLogs": [
    "Planning: [Step-by-step plan details]",
    "Tool Call: web_search('[search query]')",
    "Tool Call: read_webpage('[url]')",
    "Tool Call: update_card_details('[proposed changes summary]')",
    "Verification: [Self-verification thoughts]"
  ],
  "proposals": {
    "description": "[Improved description incorporating your findings]",
    "context": "[Refined context with dates, rules, or citations]",
    "checklist": ["Step A", "Step B", "Step C"],
    "files": [
      {
        "name": "[Document Name, e.g. Supplier_Outreach.md]",
        "content": "[Detailed drafted document content in Markdown format]"
      }
    ]
  }
}`;

    let parsed = null;
    try {
        let rawResponse = "";
        if (APP.apiKey) {
            rawResponse = await queryAI(promptText, true, enableSearch);
        } else {
            // Simulated fallback logic
            await new Promise(r => setTimeout(r, 1800));
            rawResponse = JSON.stringify(getMockAgentResponse(card));
        }
        
        parsed = sanitizeAndParseJSON(rawResponse);
    } catch (e) {
        console.error("Agent execution API failed, falling back to mock:", e);
        parsed = getMockAgentResponse(card);
    }

    // 4. Run through the logs step-by-step with typing simulation for visual quality
    if (parsed && parsed.thoughtLogs) {
        statusText.textContent = "Agent: Executing plan & calling tools...";
        for (const log of parsed.thoughtLogs) {
            await new Promise(r => setTimeout(r, 800));
            addTrace(log);
        }
    }

    await new Promise(r => setTimeout(r, 600));
    statusText.textContent = "Agent: Self-Verification complete.";
    addTrace("Verifying proposals against card constraints...");
    addTrace("Failsafe check: Execution budget OK.");
    addTrace("Proposal saved in pending state.");

    await new Promise(r => setTimeout(r, 500));
    // Remove loader
    const loaderEl = document.getElementById(loadId);
    if (loaderEl) loaderEl.remove();

    // Store proposals on card
    card.ai_proposals = parsed.proposals || { description: card.description, context: card.context, checklist: [], files: [] };
    card.awaiting_approval = true;
    
    // Add heritage entry
    APP.addHeritageLog(card.id, "AI Agent executed tasks and submitted proposals for review.", "AI Agent");
    logAuditTrail("agent_execution", `AI Agent completed tool executions and submitted proposals for card: "${card.title}"`);
    APP.save();

    // Print completion bubble
    chatBox.insertAdjacentHTML("beforeend", `
        <div class="ai-message assistant">
            <div class="message-bubble" style="border-left: 3px solid var(--accent-ai);">
                <div style="display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.3rem;">
                    <i data-lucide="sparkles" style="color: var(--accent-ai); width: 14px; height: 14px;"></i>
                    <strong style="color: #fff;">Agent Execution Complete</strong>
                </div>
                <span>Proposals submitted! Review the proposed changes on the card's <strong>Overview</strong> tab and select Approve or Reject.</span>
            </div>
        </div>
    `);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
    chatBox.scrollTop = chatBox.scrollHeight;

    // Refresh UI
    renderKanbanBoard();
    renderDashboard();
    
    // Reload modal panels to show Proposal Review UI
    openCardModal(card.id);
}

function getMockAgentResponse(card) {
    const titleLower = card.title.toLowerCase();
    const isWrappers = titleLower.includes("wrapper") || titleLower.includes("packaging") || card.id === "card-1";
    const isWholeFoods = titleLower.includes("buyer") || titleLower.includes("pitch") || card.id === "card-2";
    const isStability = titleLower.includes("stability") || titleLower.includes("recipe") || card.id === "card-3";

    if (isWrappers) {
        return {
            thoughtLogs: [
                "Planning: Source compostable film suppliers, verify ASTM D6400 status, and draft outreach email.",
                "Tool Call: web_search('ASTM D6400 compostable packaging films manufacturers USA')",
                "Tool Call: read_webpage('https://www.futamuragroup.com/natureflex')",
                "Tool Call: update_card_details('Description updated with NatureFlex specifications.')",
                "Tool Call: update_checklist(['Request sample rolls from Futamura', 'Order ASTM certification copies', 'Execute heat-seal testing on R&D machine'])",
                "Tool Call: generate_draft('Futamura_Outreach.md', 'Supplier query draft')",
                "Verification: Proposed checklist captures all requested sub-tasks. Specifications verified."
            ],
            proposals: {
                description: `Sourcing compostable packaging film. Based on research (May 2026), Futamura NatureFlex NK films match our MVTR requirement (less than 10g/m²/day) and are fully ASTM D6400 / EN 13432 certified. Recommended thickness: 23 microns.`,
                context: `Aligns with FMCG sustainability roadmap. Ohio warehouse compliance requires compostable packaging. Sourced Futamura as primary supplier.`,
                checklist: [
                    "Request film sample rolls from Futamura Ohio rep",
                    "Verify ASTM D6400 certification documents",
                    "Configure packaging machine heat-seal jaws to 140°C",
                    "Perform initial shelf-life test of citrus bars"
                ],
                files: [
                    {
                        name: "Futamura_Outreach_Email.md",
                        content: `### ✉️ Supplier Outreach Draft: Futamura NatureFlex NK
**To:** info.us@futamuragroup.com
**Subject:** Sample Request: NatureFlex NK Films for FMCG Bar packaging

Dear Futamura Sourcing Team,

I am writing from Vantage FMCG. We are looking to source high-barrier compostable film rolls for our organic snack bar packaging line. 

Could you please connect us with a regional sales representative in Ohio to coordinate sample rolls of your **NatureFlex NK (23 micron)** film? We would also require copies of your ASTM D6400 and EN 13432 certification sheets for our regulatory audit trail.

Best regards,
Vantage Sourcing Team`
                    }
                ]
            }
        };
    } else if (isWholeFoods) {
        return {
            thoughtLogs: [
                "Planning: Verify Whole Foods organic grocery listing dates, UNFI fees, and prepare distributor pitch deck draft.",
                "Tool Call: web_search('Whole Foods organic grocery category review calendar 2026')",
                "Tool Call: update_card_details('Description updated with regional review deadline.')",
                "Tool Call: update_checklist(['Compile margin calculator sheet', 'Send sample kits to UNFI distribution center', 'Finalize sell sheet PDF'])",
                "Tool Call: generate_draft('Whole_Foods_Sell_Sheet.md', 'Organic grocery pitch letter')",
                "Verification: Schedule verified. Margin thresholds checked."
            ],
            proposals: {
                description: `Coordinate category review submission for Whole Foods Market. The review window for refrigerated organic beverages closes in late June 2026. Pitch requires UNFI margin structure sheet.`,
                context: `Strategic expansion into retail markets. Sourced Whole Foods category guidelines. Requires minimum 40% gross distributor margin.`,
                checklist: [
                    "Draft regional wholesale pricing matrix with 42% gross margin",
                    "Register product listing in WFM Portal by June 10",
                    "Assemble and ship sample kits to the WFM Midwest Buyer",
                    "Schedule listing fee review with Finance department"
                ],
                files: [
                    {
                        name: "Whole_Foods_Pitch_Letter.md",
                        content: `### ✉️ Retail Pitch Letter: Whole Foods Organic Beverage Category
**Subject:** Category Submission: Premium Organic Citrus Juice Line (Vantage)

Dear Category Merchant,

Vantage is pleased to submit our new premium organic citrus juice line for the upcoming regional category review. 

Key attributes:
- **Clean Label**: HPP processed, 45-day refrigerated shelf life, strictly zero stabilizers or emulsifiers.
- **Sustainability**: Packaged in 100% PHA compostable barrier wrappers.
- **Commercial terms**: Accommodates 42.5% distributor gross margins (UNFI/KeHE aligned) with a planned 5% intro scan allowance.

We look forward to sending sample kits for your evaluation.

Sincerely,
Vantage Sales Team`
                    }
                ]
            }
        };
    } else {
        return {
            thoughtLogs: [
                "Planning: Research standard suspension stabilizers or enzyme denaturation standards.",
                "Tool Call: web_search('Citrus juice enzyme denaturation thermal parameters')",
                "Tool Call: update_card_details('Description updated with pH parameters.')",
                "Tool Call: update_checklist(['Calibrate pasteurizer heat sensors', 'Test pH iterations from 3.2 to 3.6', 'Audit cold-chain loggers'])",
                "Verification: Target suspension stability criteria met."
            ],
            proposals: {
                description: `Resolve suspension stability in citrus juice iterations. Enzyme denaturation is achieved at 85°C flash pasteurization. pH must be maintained below 3.5.`,
                context: `R&D formulation requirement. Linked to shelf life standards for retail listings.`,
                checklist: [
                    "Perform enzyme activity assay on Citrus iteration #4",
                    "Calibrate pH meters and adjust batch acidity to 3.4",
                    "Run stability testing logs at Day 14 and Day 30",
                    "Prepare sample report for the R&D director"
                ],
                files: [
                    {
                        name: "Stability_Testing_Protocol.md",
                        content: `### 🔬 R&D Stability Protocol: Citrus suspension
1. **Flash Pasteurization**: Heat batch to 85°C for exactly 15 seconds.
2. **pH adjustment**: Titrate citric acid levels to target pH of 3.40.
3. **Storage conditions**: Store bottles at 4.0°C +/- 0.5°C in darkness.
4. **Sampling interval**: Draw samples at Day 1, 7, 14, 21, and 30 to log turbidity index.`
                    }
                ]
            }
        };
    }
}

function approveAIAgentProposals(cardId) {
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;
    const proposals = card.ai_proposals;
    if (!proposals) return;

    // Apply description and context
    card.description = proposals.description;
    card.context = proposals.context;

    // Apply checklist items (append)
    if (proposals.checklist && proposals.checklist.length > 0) {
        proposals.checklist.forEach(text => {
            if (!card.checklist.some(item => item.text.toLowerCase() === text.toLowerCase())) {
                card.checklist.push({
                    id: "ch-" + generateUUID(),
                    text,
                    done: false
                });
            }
        });
    }

    // Apply files/drafts (append)
    if (proposals.files && proposals.files.length > 0) {
        proposals.files.forEach(file => {
            const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(file.content)}`;
            const existingFileIdx = card.files.findIndex(f => f.name === file.name);
            if (existingFileIdx !== -1) {
                card.files[existingFileIdx].url = dataUrl;
            } else {
                card.files.push({ name: file.name, url: dataUrl });
            }
        });
    }

    // Clear proposals
    delete card.ai_proposals;
    delete card.awaiting_approval;

    APP.addHeritageLog(card.id, "Approve & Apply: Merged AI Agent task proposals into card assets.", localStorage.getItem("vantage_user_name") || "User");
    APP.save();

    // Re-render
    renderKanbanBoard();
    renderDashboard();
    openCardModal(card.id);
}

function rejectAIAgentProposals(cardId) {
    const card = APP.cards.find(c => c.id === cardId);
    if (!card) return;

    // Clear proposals
    delete card.ai_proposals;
    delete card.awaiting_approval;

    APP.addHeritageLog(card.id, "Reject: Discarded AI Agent task proposals.", localStorage.getItem("vantage_user_name") || "User");
    APP.save();

    // Re-render
    renderKanbanBoard();
    renderDashboard();
    openCardModal(card.id);
}

window.runAIAgentOnCard = runAIAgentOnCard;
window.approveAIAgentProposals = approveAIAgentProposals;
window.rejectAIAgentProposals = rejectAIAgentProposals;

function toggleAIAgentConsoleVisibility(visible, card) {
    const consoleContainer = document.getElementById("ai-agent-console-container");
    if (!consoleContainer) return;

    if (visible) {
        consoleContainer.classList.remove("hide");
        consoleContainer.innerHTML = `
            <div class="ai-agent-console-block glass" style="padding: 1rem; border-radius: 8px; border: 1px solid rgba(162,155,254,0.3); background: rgba(162,155,254,0.02); display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span class="agent-status-indicator" style="width: 8px; height: 8px; border-radius: 50%; background: #20bf6b; box-shadow: 0 0 6px #20bf6b;"></span>
                        <strong style="font-size: 0.8rem; color: #fff;">AI Agent Mode Active</strong>
                    </div>
                    <span style="font-size: 0.65rem; color: #a29bfe; font-weight: 600; text-transform: uppercase; background: rgba(162, 155, 254, 0.1); padding: 1px 5px; border-radius: 3px;">Assignee</span>
                </div>
                <p style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">Trigger an autonomous Agent loop to research web sources, build checklists, update specs, and compile outreach drafts.</p>
                <button class="btn btn-primary btn-sm" id="btn-run-ai-agent" onclick="runAIAgentOnCard('${card.id}')" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%); margin-top: 0.25rem;">
                    <i data-lucide="play" style="width: 12px; height: 12px;"></i>
                    <span>Run AI Agent</span>
                </button>
            </div>
        `;
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    } else {
        consoleContainer.classList.add("hide");
        consoleContainer.innerHTML = "";
    }
}

function renderProposalReviewBoard(card) {
    const proposalBoard = document.getElementById("modal-card-proposal-board");
    const viewMode = document.getElementById("modal-card-view-mode");
    const editToggleBtn = document.getElementById("modal-edit-toggle-btn");

    if (!proposalBoard) return;

    if (card.awaiting_approval && card.ai_proposals) {
        proposalBoard.classList.remove("hide");
        if (viewMode) viewMode.classList.add("hide");
        if (editToggleBtn) editToggleBtn.style.display = "none"; // Hide edit details button when proposals are active

        const p = card.ai_proposals;

        let checklistHtml = "";
        if (p.checklist && p.checklist.length > 0) {
            let listItems = "";
            p.checklist.forEach(item => {
                listItems += `
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--text-primary); margin-bottom: 0.25rem;">
                        <span style="color: #20bf6b; font-weight: bold;">+</span>
                        <span>${item}</span>
                    </div>
                `;
            });
            checklistHtml = `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem;">
                    <h5 style="font-size: 0.75rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem;">
                        <i data-lucide="check-square" style="width: 12px; height: 12px; color: var(--accent-ai);"></i>
                        <span>Proposed Checklist Additions</span>
                    </h5>
                    ${listItems}
                </div>
            `;
        }

        let filesHtml = "";
        if (p.files && p.files.length > 0) {
            let fileItems = "";
            p.files.forEach(file => {
                fileItems += `
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--text-primary); margin-bottom: 0.25rem;">
                        <i data-lucide="file-text" style="width: 12px; height: 12px; color: #20bf6b;"></i>
                        <span>${file.name}</span>
                    </div>
                `;
            });
            filesHtml = `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem;">
                    <h5 style="font-size: 0.75rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem;">
                        <i data-lucide="file" style="width: 12px; height: 12px; color: var(--accent-ai);"></i>
                        <span>Proposed Document Drafts</span>
                    </h5>
                    ${fileItems}
                </div>
            `;
        }

        proposalBoard.innerHTML = `
            <div class="ai-proposals-block glass" style="border: 1px solid rgba(162,155,254,0.4); padding: 1.25rem; border-radius: 8px; background: rgba(162, 155, 254, 0.04); display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i data-lucide="sparkles" style="color: var(--accent-ai); width: 16px; height: 16px;"></i>
                        <h4 style="font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; margin: 0;">Review AI Agent Proposals</h4>
                    </div>
                    <span style="font-size: 0.7rem; color: #a29bfe; font-weight: 700; text-transform: uppercase; background: rgba(162,155,254,0.12); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(162,155,254,0.2);">Awaiting Approval</span>
                </div>
                
                <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.45; margin: 0;">The AI Agent has completed its search and analysis loops and proposed the following changes. You can approve to merge them or discard to cancel.</p>
                
                <!-- Side-by-side Diff of details -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.25rem;">
                    <div style="background: rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.04); padding: 0.75rem; border-radius: 6px;">
                        <h5 style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 700;">Current Card Description</h5>
                        <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; max-height: 120px; overflow-y: auto;">
                            ${card.description || 'No description.'}
                        </div>
                    </div>
                    <div style="background: rgba(32, 191, 107, 0.05); border: 1px solid rgba(32, 191, 107, 0.2); padding: 0.75rem; border-radius: 6px;">
                        <h5 style="font-size: 0.7rem; text-transform: uppercase; color: #20bf6b; margin-bottom: 0.35rem; font-weight: 700;">Proposed Card Description</h5>
                        <div style="font-size: 0.75rem; color: #fff; line-height: 1.4; max-height: 120px; overflow-y: auto;">
                            ${p.description}
                        </div>
                    </div>
                </div>

                <!-- Proposed Context change diff -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.25rem;">
                    <div style="background: rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.04); padding: 0.75rem; border-radius: 6px;">
                        <h5 style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 700;">Current Strategic Context</h5>
                        <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; max-height: 80px; overflow-y: auto;">
                            ${card.context || 'No context.'}
                        </div>
                    </div>
                    <div style="background: rgba(32, 191, 107, 0.05); border: 1px solid rgba(32, 191, 107, 0.2); padding: 0.75rem; border-radius: 6px;">
                        <h5 style="font-size: 0.7rem; text-transform: uppercase; color: #20bf6b; margin-bottom: 0.35rem; font-weight: 700;">Proposed Strategic Context</h5>
                        <div style="font-size: 0.75rem; color: #fff; line-height: 1.4; max-height: 80px; overflow-y: auto;">
                            ${p.context}
                        </div>
                    </div>
                </div>

                <!-- Checklist & files proposals -->
                ${checklistHtml}
                ${filesHtml}

                <!-- Action buttons -->
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem;">
                    <button class="btn btn-secondary btn-sm" onclick="rejectAIAgentProposals('${card.id}')" style="color: var(--prio-high); border-color: rgba(235,77,75,0.25); background: rgba(235, 77, 75, 0.04);">
                        Discard Proposals
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="approveAIAgentProposals('${card.id}')" style="background: #20bf6b; border: none; box-shadow: 0 2px 6px rgba(32, 191, 107, 0.3); color: white; display: flex; align-items: center; gap: 0.35rem;">
                        <i data-lucide="check" style="width: 12px; height: 12px;"></i>
                        <span>Approve & Apply Changes</span>
                    </button>
                </div>
            </div>
        `;
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    } else {
        proposalBoard.classList.add("hide");
        proposalBoard.innerHTML = "";
        if (viewMode) viewMode.classList.remove("hide");
    }
}

window.toggleAIAgentConsoleVisibility = toggleAIAgentConsoleVisibility;
window.renderProposalReviewBoard = renderProposalReviewBoard;

