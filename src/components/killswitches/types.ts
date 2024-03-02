enum KillswitchTypes {
    DISABLE_ROUTES = "disable_routes",
    DISABLE_AUTH = "disable_auth",
    DISABLE_REGISTRATION = "disable_registration",
    DISABLE_LOGIN = "disable_login",
    DISABLE_ALL = "disable_all",
    DISABLE_FAKE_DELAY = "disable_fake_delay",
    DISABLE_TWILIO = "disable_twilio",
    DISABLE_POSTING = "disable_posting",
    DISABLE_CHAT = "disable_chat",
}

type KillswitchEntry = {
    key: KillswitchTypes;
    description: string;
    enabled: boolean;
    added_by: string;
    enabled_at: string;
};

interface KillswitchesData {
    killswitches: KillswitchEntry[];
}

export type { KillswitchesData, KillswitchEntry };
export { KillswitchTypes };
