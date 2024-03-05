"use server";

import getApp from "@/lib/database/firebase";

export async function saveRemoteConfigValue(
    key: string,
    value: number
): Promise<boolean> {
    const admin = getApp();

    const remoteConfig = admin.remoteConfig();

    const template = await remoteConfig.getTemplate();

    try {
        // @ts-ignore
        template.parameters[key] = {
            defaultValue: {
                // @ts-ignore
                value: value,
            },
            description: template.parameters[key].description,
            valueType: template.parameters[key].valueType,
        };

        const validated = await remoteConfig.validateTemplate(template);

        const result = await remoteConfig.publishTemplate(validated);

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
