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
    type?: string
    countries?: string[]
    institutions?: Institution[]
    contentTypes?: string[]
    dataAccess?: DataAccess[]
    dataLicense?: DataLicense[]
    api?: ApiInfo[]
    repositoryIdentifier?: string[]
    size?: string
    startDate?: string
    endDate?: string | null
    lastUpdate?: string
    repositoryContact?: string[]
    certificates?: string[]
    additionalNames?: string[]
    keywords?: string[]
    dataUploadLicense?: DataUploadLicense[]
    deprecationReason?: string
    policy?: Policy[]
    versioning?: string
    databaseLicense?: DatabaseLicense[]
    dataUpload?: DataUpload[]
    pidSystem?: string[]
    aidSystem?: string[]
    qualityManagement?: string
    metadataStandard?: MetadataStandard[]
}

export interface MetadataStandard {
    metadataStandardName: string
    metadataStandardURL: string
}

export interface DataUpload {
    dataUploadType: string
    dataUploadRestriction: string[]
}

export interface DatabaseLicense {
    databaseLicenseName: string
    databaseLicenseURL: string
}

export interface DataUploadLicense {
    dataUploadLicenseName: string
    dataUploadLicenseURL?: string
}

export interface Policy {
    policyName: string
    policyURL: string
}


export interface Institution {
    institutionName: string
    institutionType?: string
    institutionCountry?: string
    institutionURL?: string
    institutionIdentifier?: string[]
    institutionContact?: string[]
    institutionAdditionalNames?: string[]
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
