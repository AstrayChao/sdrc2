import { ObjectId } from "mongodb";

export type Source = "re3data" | "FAIRsharing" | "GCBR"

export interface Repository {
    id?: string
    re3dataId?: string
    repositoryName: string
    additionalName?: string[]
    repositoryURL: string
    repositoryIdentifier?: string[]
    description: string
    repositoryContact?: string[]
    type?: string[]
    countries?: string[]
    size?: {value: string; updated?: string}
    startDate?: string | null
    endDate?: string | null
    repositoryLanguage?: string[]
    subject?: string[]
    missionStatementURL?: string
    contentType?: string[]
    providerType?: string[]
    keyword?: string[]
    institution?: Array<{
        institutionName: string
        institutionAdditionalName?: string[]
        institutionCountry?: string
        responsibilityType?: string[]
        institutionType?: string
        institutionURL?: string
        institutionIdentifier?: string[]
        responsibilityStartDate?: string | null
        responsibilityEndDate?: string | null
        institutionContact?: string[]
    }>
    policy?: Array<{
        policyName: string
        policyURL: string
    }>
    databaseAccess?: {
        databaseAccessType: "open" | "restricted" | "closed"
        databaseAccessRestriction?: string[]
    }
    databaseLicense?: Array<{
        databaseLicenseName: string
        databaseLicenseURL?: string
    }>
    dataAccess?: Array<{
        dataAccessType: "open" | "restricted" | "closed"
        dataAccessRestriction?: string[]
    }>
    dataLicense?: Array<{
        dataLicenseName: string
        dataLicenseURL?: string
    }>
    dataUpload?: Array<{
        dataUploadType: string
        dataUploadRestriction?: string[]
    }>
    dataUploadLicense?: Array<{
        dataUploadLicenseName: string
        dataUploadLicenseURL?: string
    }>
    software?: Array<{
        softwareName: string
    }>
    versioning?: string
    api?: Array<{
        value: string
        apiType?: string
    }>
    pidSystem?: string[]
    citationGuidelineURL?: string
    aidSystem?: string[]
    enhancedPublication?: string
    qualityManagement?: string
    certificate?: string[]
    metadataStandard?: Array<{
        metadataStandardName: string
        metadataStandardURL?: string
    }>
    syndication?: string[]
    remarks?: string
    entryDate?: string
    lastUpdate?: string
    from: Source[]
    deprecationReason?: string
}

export interface RepositoryDocument {
    _id: ObjectId;
    id?: string;
    re3dataId?: string;
    repositoryName: {value: string; language?: string} | string;
    additionalName?: Array<{value: string; language?: string}>;
    repositoryURL: string;
    repositoryIdentifier?: string[];
    description: {value: string; language?: string} | string;
    repositoryContact?: string[];
    type?: string[];
    countries?: string[];
    size?: {value: string; updated?: string};
    startDate?: string | null;
    endDate?: string | null;
    repositoryLanguage?: string[];
    subject?: Array<{
        value: string;
        subjectScheme?: string;
    }>;
    missionStatementURL?: string;
    contentType?: Array<{
        value: string;
        contentTypeScheme?: string;
    }>;
    providerType?: string[];
    keyword?: string[];
    institution?: Array<{
        institutionName: {value: string; language?: string};
        institutionAdditionalName?: Array<{value: string; language?: string}>;
        institutionCountry?: string;
        responsibilityType?: string[];
        institutionType?: string;
        institutionURL?: string;
        institutionIdentifier?: string[];
        responsibilityStartDate?: string | null;
        responsibilityEndDate?: string | null;
        institutionContact?: string[];
    }>;
    policy?: Array<{
        policyName: string;
        policyURL: string;
    }>;
    databaseAccess?: {
        databaseAccessType: "open" | "restricted" | "closed";
        databaseAccessRestriction?: string[];
    };
    databaseLicense?: Array<{
        databaseLicenseName: string;
        databaseLicenseURL?: string;
    }>;
    dataAccess?: Array<{
        dataAccessType: "open" | "restricted" | "closed";
        dataAccessRestriction?: string[];
    }>;
    dataLicense?: Array<{
        dataLicenseName: string;
        dataLicenseURL?: string;
    }>;
    dataUpload?: Array<{
        dataUploadType: string;
        dataUploadRestriction?: string[];
    }>;
    dataUploadLicense?: Array<{
        dataUploadLicenseName: string;
        dataUploadLicenseURL?: string;
    }>;
    software?: Array<{
        softwareName: string;
    }>;
    versioning?: string;
    api?: Array<{
        value: string;
        apiType?: string;
    }>;
    pidSystem?: string[];
    citationGuidelineURL?: string;
    aidSystem?: string[];
    enhancedPublication?: string;
    qualityManagement?: string;
    certificate?: string[];
    metadataStandard?: Array<{
        metadataStandardName: {value: string; metadataStandardScheme?: string};
        metadataStandardURL?: string;
    }>;
    fairsharing?: any;
    syndication?: string[];
    remarks?: string;
    entryDate?: string;
    lastUpdate?: string;
    from: Source[];
    deprecationReason?: string;
}


export function isSource(value: any): value is Source {
    if (typeof value !== 'string') return false
    const normalized = value.trim().toLowerCase()
    return ['re3data', 'fairsharing', 'gcbr'].includes(normalized)
}
