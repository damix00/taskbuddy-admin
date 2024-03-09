import getApp from "@/lib/database/firebase";
import RemoteConfigData from "./RemoteConfigData";
import { RemoteConfigTypes } from "./types";

async function fetchData(): Promise<RemoteConfigTypes | null> {
    try {
        const admin = getApp();
        const config = admin.remoteConfig();

        const template = await config.getTemplate();

        return {
            items: Object.keys(template.parameters).map((key) => {
                const parameter = template.parameters[key];

                return {
                    name: key,
                    description: parameter.description || "",
                    // @ts-ignore
                    value: parameter.defaultValue!.value || "",
                    data_type: parameter.valueType || "",
                };
            }),
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function RemoteConfig() {
    const data = await fetchData();

    return <RemoteConfigData data={data} />;
}
