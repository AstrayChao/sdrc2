export type Source = "re3data" | "FAIRsharing" | "GCBR"

export function isSource(value: any): value is Source {
    if (typeof value !== 'string') return false
    const normalized = value.trim().toLowerCase()
    return ['re3data', 'fairsharing', 'gcbr'].includes(normalized)
}

export interface Repository {
    id: string
    name: string
    description: string
    url: string
    from: Source[]
    subjects?: string[]
    institutions?: Institution[]
    contentTypes?: string[]
    dataAccess?: DataAccess[]
    dataLicense?: DataLicense[]
    api?: ApiInfo[]
    identifiers?: string[]
    size?: string
    startDate?: string
    lastUpdate?: string
    contacts?: string[]
    certificates?: string[]
    additionalNames?: string[]
    keywords?: string[]
    deprecationReason?: string
}

export interface Institution {
    institutionName: string
    institutionType?: string
    institutionCountry?: string
    institutionAdditionalName?: string[]
    responsibilityType?: string[]
    coordinates?: [number, number]
}


export interface DataLicense {
    dataLicenseName: string
    dataLicenseURL?: string
}

export interface ApiInfo {
    apiType?: string
    value: string
}

export interface DataAccess {
    dataAccessType: "open" | "restricted" | "closed"
    dataAccessRestriction?: string[]
}
