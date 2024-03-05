export interface RemoteConfigItem {
    name: string;
    description: string;
    value: any;
    data_type: string;
}

export interface RemoteConfigTypes {
    items: RemoteConfigItem[];
}
