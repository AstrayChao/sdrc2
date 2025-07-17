// 真实的科学数据仓库数据
import { Repository, Source } from "@/types/repository";

// 生成随机数量的Source类型
function getRandomSources(): Source[] {
    const sources: Source[] = ["re3data", "FAIRsharing", "GCBR"];
    const count = Math.floor(Math.random() * 3) + 1; // 1-3个来源
    const selectedSources = new Set<Source>();

    while (selectedSources.size < count) {
        const randomIndex = Math.floor(Math.random() * sources.length);
        selectedSources.add(sources[randomIndex]);
    }

    return Array.from(selectedSources);
}

const realRepositories: Repository[] = [
    {
        id: "10.25504/FAIRsharing.g56qnp",
        name: "HIstome",
        additionalNames: ["The Histone Infobase"],
        url: "http://www3.iiserpune.ac.in/~coee/histome/",
        repositoryIdentifier: ["10.25504/FAIRsharing.g56qnp", "OMICS_03500", "SCR_006972", "nlx_151419"],
        description:
            "HIstome: The Histone Infobase is a database of human histones, their post-translational modifications and modifying enzymes. HIstome is a combined effort of researchers from two institutions, Advanced Center for Treatment, Research and Education in Cancer (ACTREC), Navi Mumbai and Center of Excellence in Epigenetics, Indian Institute of Science Education and Research (IISER), Pune.",
        repositoryContact: ["histome@iiserpune.ac.in", "http://www3.iiserpune.ac.in/~coee/histome/contact_us.php"],
        type: "disciplinary",
        size: "Informations about ~50 histone proteins and ~150 histone modifying enzymes",
        startDate: "2011",
        endDate: null,
        subjects: ["2 Life Sciences", "20103 Cell Biology"],
        contentTypes: ["Plain text", "Raw data", "Scientific and statistical data formats"],
        keywords: ["RNA", "biology"],
        institutions: [
            {
                institutionName: "Indian Institute of Science Education and Research",
                institutionAdditionalNames: ["IISER", "भारतीय विज्ञान शिक्षा एवं अनुसंधान संस्थान"],
                institutionCountry: "IND",
                responsibilityType: ["funding", "general", "technical"],
                institutionType: "non-profit",
                institutionURL: "https://www.iiserpune.ac.in/institute/about",
                institutionIdentifier: ["ROR:028qa3n13"],
                institutionContact: [],
                coordinates: [18.5204, 73.8567], // Pune, India coordinates
            },
        ],
        policy: [
            {
                policyName: "ACTREC Internet and electronic access policy",
                policyURL: "https://www.actrec.gov.in/policies",
            },
            {
                policyName: "ACTREC Terms of Use",
                policyURL: "https://www.actrec.gov.in/terms-use",
            },
            {
                policyName: "TMC Policies and Terms of Use",
                policyURL: "https://tmc.gov.in/index.php/en/policies-terms-of-use",
            },
        ],
        databaseLicense: [],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Public Domain",
                dataLicenseURL: "http://www3.iiserpune.ac.in/~coee/histome/",
            },
        ],
        dataUpload: [
            {
                dataUploadType: "restricted",
                dataUploadRestriction: ["registration"],
            },
        ],
        dataUploadLicense: [
            {
                dataUploadLicenseName: "Public Domain",
                dataUploadLicenseURL: "http://www3.iiserpune.ac.in/~coee/histome/",
            },
        ],
        versioning: "",
        api: [
            {
                value: "http://spidr.ionosonde.net/spidr/tools.do",
                apiType: "REST",
            },
        ],
        pidSystem: ["none"],
        aidSystem: [],
        qualityManagement: "yes",
        certificates: ["WDS"],
        metadataStandard: [
            {
                metadataStandardName: "Repository-Developed Metadata Schemas",
                metadataStandardURL: "http://www.dcc.ac.uk/resources/metadata-standards/repository-developed-metadata-schemas",
            },
        ],
        lastUpdate: "2024-03-05",
        from: ["FAIRsharing", "re3data"],
    },

    // FAIRsharing 映射数据示例
    {
        id: "10.25504/FAIRsharing.g56qnp1",
        certificates: ["FAIRsharing"],
        name: "Histone Infobase",
        additionalNames: ["HIstome"],
        url: "http://www3.iiserpune.ac.in/~coee/histome/",
        description:
            "HIstome (Human histone database) is a freely available, specialist, electronic database dedicated to display information about human histone variants, sites of their post-translational modifications and about various histone modifying enzymes.",
        repositoryContact: ["sanjeev@iiserpune.ac.in"],
        startDate: "2011",
        endDate: "2025-02-26",
        deprecationReason:
            "The resource homepage is no longer available, and a new one cannot be found. Please let us know if you have any information.",
        subjects: ["Life Science", "Epigenetics"],
        contentTypes: ["dataset"],
        keywords: ["Gene name", "histone", "enzyme"],
        versioning: "not found",
        countries: ["India"],
        institutions: [
            {
                institutionName: "Indian Institute of Science Education and Research Pune, India",
                responsibilityType: ["funding"],
                institutionType: "Government body",
                coordinates: [18.5204, 73.8567], // Pune, India coordinates
            },
        ],
        repositoryIdentifier: ["re3data:r3d100010977", "SciCrunch:RRID:SCR_006972", "DOI:10.25504/FAIRsharing.g56qnp"],
        dataAccess: [
            {
                dataAccessType: "open",
            },
        ],
        dataUploadLicense: [
            {
                dataUploadLicenseURL: "https://doi.org/10.1093/nar/gkr1125",
                dataUploadLicenseName: "not applicable",
            },
        ],
        lastUpdate: "2024-03-05",
        from: ["FAIRsharing"],
    },
    {
        id: "10.18150/re3data.00005.1",
        name: "GenBank",
        url: "https://www.ncbi.nlm.nih.gov/genbank/",
        description:
            "GenBank is the NIH genetic sequence database, an annotated collection of all publicly available DNA sequences.",
        subjects: ["Life Sciences", "Genomics", "Genetics"],
        contentTypes: ["DNA sequence", "RNA sequence", "Genomic data"],
        institutions: [
            {
                institutionName: "National Center for Biotechnology Information",
                institutionAdditionalNames: ["NCBI"],
                institutionCountry: "USA",
                institutionType: "government",
                coordinates: [38.9072, -77.0369], // Bethesda, MD
            },
        ],
        certificates: ["CoreTrustSeal"],
        startDate: "1982",
        size: "250M+ sequences",
        dataAccess: [{ dataAccessType: "open" }],
        api: [{ apiType: "REST", value: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/" }],
        lastUpdate: "2024-01-15",
        from: ["re3data"],
    },

    {
        id: "10.25504/FAIRsharing.g56qn2p",
        name: "UniProt",
        url: "https://www.uniprot.org/",
        description:
            "The Universal Protein Resource (UniProt) is a comprehensive resource for protein sequence and annotation data.",
        subjects: ["Life Sciences", "Proteomics", "Bioinformatics"],
        contentTypes: ["Protein sequence", "Protein structure", "Functional annotation"],
        institutions: [
            {
                institutionName: "European Molecular Biology Laboratory - European Bioinformatics Institute",
                institutionAdditionalNames: ["EMBL-EBI"],
                institutionCountry: "GBR",
                coordinates: [52.0799, 0.1873], // Cambridge, UK
            },
            {
                institutionName: "Swiss Institute of Bioinformatics",
                institutionAdditionalNames: ["SIB"],
                institutionCountry: "CHE",
                coordinates: [46.5197, 6.6323], // Lausanne, Switzerland
            },
        ],
        certificates: ["FAIR", "CoreTrustSeal"],
        startDate: "2002",
        size: "220M+ protein entries",
        dataAccess: [{ dataAccessType: "open" }],
        api: [{ apiType: "REST", value: "https://rest.uniprot.org/" }],
        lastUpdate: "2024-02-01",
        from: ["FAIRsharing"],
    },
    {
        id: "genbank",
        name: "GenBank",
        description:
            "GenBank is the NIH genetic sequence database, an annotated collection of all publicly available DNA sequences.",
        url: "https://www.ncbi.nlm.nih.gov/genbank/",
        from: getRandomSources(), // 新的from字段
        subjects: ["Genomics", "Genetics", "Bioinformatics", "Molecular Biology"],
        contentTypes: ["DNA sequence", "RNA sequence", "Protein sequence", "Genome annotation"],
        keywords: ["DNA", "RNA", "sequences", "genetics", "genomics", "NCBI"],
        institutions: [
            {
                institutionName: "National Center for Biotechnology Information (NCBI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["info@ncbi.nlm.nih.gov"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Public Domain",
                dataLicenseURL: "https://www.ncbi.nlm.nih.gov/home/about/policies/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_002760"],
        size: "> 400 million sequences",
        startDate: "1988-01-01",
        lastUpdate: "2024-01-15",
    },
    {
        id: "uniprot",
        name: "UniProt",
        additionalNames: ["Universal Protein Resource"],
        description:
            "UniProt is a comprehensive resource for protein sequence and annotation data. The UniProt databases are the UniProt Knowledgebase (UniProtKB), the UniProt Reference Clusters (UniRef), and the UniProt Archive (UniParc).",
        url: "https://www.uniprot.org/",
        // from: ["GCBR"], // 原来的from字段已更新
        from: getRandomSources(), // 新的from字段
        subjects: ["Proteomics", "Biochemistry", "Structural Biology", "Bioinformatics"],
        contentTypes: ["Protein sequence", "Protein annotation", "Functional annotation", "Structural data"],
        keywords: ["proteins", "sequences", "annotation", "biochemistry", "proteomics"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
            {
                institutionName: "Swiss Institute of Bioinformatics (SIB)",
                institutionCountry: "CHE",
                institutionType: "Research institute",
                responsibilityType: ["General contact"],
                coordinates: [46.5197, 6.6323], // Lausanne, Switzerland
            },
            {
                institutionName: "Protein Information Resource (PIR)",
                institutionCountry: "USA",
                institutionType: "Research institute",
                responsibilityType: ["General contact"],
                coordinates: [39.9526, -75.1652], // Philadelphia, PA
            },
        ],
        repositoryContact: ["help@uniprot.org"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://rest.uniprot.org/",
            },
            {
                apiType: "SPARQL",
                value: "https://sparql.uniprot.org/sparql",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_002380"],
        size: "> 200 million protein sequences",
        startDate: "2003-01-01",
        lastUpdate: "2024-01-10",
    },
    {
        id: "pdb",
        name: "Protein Data Bank",
        additionalNames: ["PDB", "wwPDB"],
        description:
            "The Protein Data Bank (PDB) is a database for the three-dimensional structural data of large biological molecules, such as proteins and nucleic acids.",
        url: "https://www.rcsb.org/",
        from: getRandomSources(),
        subjects: ["Structural Biology", "Biochemistry", "Biophysics", "Molecular Biology"],
        contentTypes: ["3D structure", "Protein structure", "Nucleic acid structure", "Experimental data"],
        keywords: ["protein structure", "3D structure", "crystallography", "NMR", "cryo-EM"],
        institutions: [
            {
                institutionName: "Research Collaboratory for Structural Bioinformatics (RCSB)",
                institutionCountry: "USA",
                institutionType: "Research consortium",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [40.7589, -73.9851], // New York, NY
            },
            {
                institutionName: "Protein Data Bank Europe (PDBe)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
            {
                institutionName: "Protein Data Bank Japan (PDBj)",
                institutionCountry: "JPN",
                institutionType: "Research institute",
                responsibilityType: ["General contact"],
                coordinates: [35.6762, 139.6503], // Tokyo, Japan
            },
        ],
        repositoryContact: ["info@rcsb.org"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "CC0 1.0 Universal",
                dataLicenseURL: "https://creativecommons.org/publicdomain/zero/1.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://data.rcsb.org/",
            },
            {
                apiType: "GraphQL",
                value: "https://data.rcsb.org/graphql",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_012820"],
        size: "> 200,000 structures",
        startDate: "1971-01-01",
        lastUpdate: "2024-01-12",
    },
    {
        id: "chembl",
        name: "ChEMBL",
        description:
            "ChEMBL is a manually curated database of bioactive molecules with drug-like properties. It brings together chemical, bioactivity and genomic data to aid the translation of genomic information into effective new drugs.",
        url: "https://www.ebi.ac.uk/chembl/",
        from: getRandomSources(),
        subjects: ["Chemistry", "Drug Discovery", "Pharmacology", "Biochemistry"],
        contentTypes: ["Chemical structures", "Bioactivity data", "Drug data", "Target data"],
        keywords: ["drugs", "bioactivity", "chemical compounds", "pharmacology", "medicinal chemistry"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["chembl-help@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution-ShareAlike 3.0 Unported",
                dataLicenseURL: "https://creativecommons.org/licenses/by-sa/3.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/chembl/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_014042"],
        size: "> 2 million compounds",
        startDate: "2009-01-01",
        lastUpdate: "2024-01-08",
    },
    {
        id: "arrayexpress",
        name: "ArrayExpress",
        description:
            "ArrayExpress is a database of functional genomics experiments including gene expression where you can query and download data collected to MIAME and MINSEQE standards.",
        url: "https://www.ebi.ac.uk/arrayexpress/",
        from: getRandomSources(),
        subjects: ["Gene Expression", "Genomics", "Transcriptomics", "Functional Genomics"],
        contentTypes: ["Gene expression data", "Microarray data", "RNA-seq data", "Experimental metadata"],
        keywords: ["gene expression", "microarray", "RNA-seq", "transcriptomics", "functional genomics"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["arrayexpress@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Various licenses",
                dataLicenseURL: "https://www.ebi.ac.uk/arrayexpress/help/data_availability.html",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/arrayexpress/json/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_002964"],
        size: "> 100,000 experiments",
        startDate: "2003-01-01",
        lastUpdate: "2024-01-05",
    },
    {
        id: "sra",
        name: "Sequence Read Archive",
        additionalNames: ["SRA"],
        description:
            "The Sequence Read Archive (SRA) stores raw sequencing data and alignment information from high-throughput sequencing platforms, including Illumina, 454, IonTorrent, Complete Genomics, PacBio and Oxford Nanopore.",
        url: "https://www.ncbi.nlm.nih.gov/sra",
        from: getRandomSources(),
        subjects: ["Sequencing", "Genomics", "Bioinformatics", "NGS"],
        contentTypes: ["Raw sequencing data", "NGS data", "Sequencing metadata", "Quality scores"],
        keywords: ["sequencing", "NGS", "raw data", "Illumina", "PacBio", "Oxford Nanopore"],
        institutions: [
            {
                institutionName: "National Center for Biotechnology Information (NCBI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["sra@ncbi.nlm.nih.gov"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
            {
                dataAccessType: "restricted",
                dataAccessRestriction: ["dbGaP controlled access"],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "NCBI Data Usage Policies",
                dataLicenseURL: "https://www.ncbi.nlm.nih.gov/home/about/policies/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_004891"],
        size: "> 40 petabytes",
        startDate: "2007-01-01",
        lastUpdate: "2024-01-14",
    },
    {
        id: "ena",
        name: "European Nucleotide Archive",
        additionalNames: ["ENA"],
        description:
            "The European Nucleotide Archive (ENA) provides a comprehensive record of the world's nucleotide sequencing information, covering raw sequencing data, sequence assembly information and functional annotation.",
        url: "https://www.ebi.ac.uk/ena/",
        from: getRandomSources(),
        subjects: ["Genomics", "Sequencing", "Bioinformatics", "Nucleotide sequences"],
        contentTypes: ["Nucleotide sequences", "Raw sequencing data", "Genome assemblies", "Functional annotation"],
        keywords: ["nucleotide", "sequencing", "genome", "assembly", "annotation"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["ena-support@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Various licenses",
                dataLicenseURL: "https://www.ebi.ac.uk/ena/submit/data-formats",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/ena/portal/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_004891"],
        size: "> 30 petabytes",
        startDate: "2008-01-01",
        lastUpdate: "2024-01-13",
    },
    {
        id: "pride",
        name: "PRIDE",
        additionalNames: ["PRoteomics IDEntifications database"],
        description:
            "PRIDE is a centralized, standards compliant, public data repository for proteomics data, including protein and peptide identifications, post-translational modifications and supporting spectral evidence.",
        url: "https://www.ebi.ac.uk/pride/",
        from: getRandomSources(),
        subjects: ["Proteomics", "Mass Spectrometry", "Biochemistry", "Bioinformatics"],
        contentTypes: ["Proteomics data", "Mass spectrometry data", "Protein identifications", "Spectral data"],
        keywords: ["proteomics", "mass spectrometry", "proteins", "peptides", "spectra"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["pride-support@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/pride/ws/archive/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_003411"],
        size: "> 25,000 datasets",
        startDate: "2004-01-01",
        lastUpdate: "2024-01-11",
    },
    {
        id: "metabolights",
        name: "MetaboLights",
        description:
            "MetaboLights is a database for metabolomics experiments and derived information. The database is cross-species, cross-technique and covers metabolite structures and their reference spectra as well as their biological roles, locations and concentrations, and experimental data from metabolic experiments.",
        url: "https://www.ebi.ac.uk/metabolights/",
        from: getRandomSources(),
        subjects: ["Metabolomics", "Biochemistry", "Systems Biology", "Bioinformatics"],
        contentTypes: ["Metabolomics data", "Metabolite data", "Spectral data", "Experimental metadata"],
        keywords: ["metabolomics", "metabolites", "metabolism", "small molecules", "spectra"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["metabolights-help@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/metabolights/ws/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_007688"],
        size: "> 2,000 studies",
        startDate: "2012-01-01",
        lastUpdate: "2024-01-09",
    },
    {
        id: "biostudies",
        name: "BioStudies",
        description:
            "BioStudies is a database that holds descriptions of biological studies, links to data from these studies in other databases at EMBL-EBI or outside, as well as data that do not fit in the structured archives at EMBL-EBI.",
        url: "https://www.ebi.ac.uk/biostudies/",
        from: getRandomSources(),
        subjects: ["Bioinformatics", "Life Sciences", "Data Integration", "Multi-omics"],
        contentTypes: ["Study metadata", "Multi-omics data", "Supplementary data", "Research data"],
        keywords: ["studies", "metadata", "multi-omics", "research data", "supplementary data"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["biostudies@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Various licenses",
                dataLicenseURL: "https://www.ebi.ac.uk/biostudies/help",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/biostudies/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_017650"],
        size: "> 100,000 studies",
        startDate: "2017-01-01",
        lastUpdate: "2024-01-07",
    },
    {
        id: "geo",
        name: "Gene Expression Omnibus",
        additionalNames: ["GEO"],
        description:
            "Gene Expression Omnibus (GEO) is a public functional genomics data repository supporting MIAME-compliant data submissions. Array- and sequence-based data are accepted. Tools are provided to help users query and download experiments and curated gene expression profiles.",
        url: "https://www.ncbi.nlm.nih.gov/geo/",
        from: getRandomSources(),
        subjects: ["Gene Expression", "Genomics", "Transcriptomics", "Functional Genomics"],
        contentTypes: ["Gene expression data", "Microarray data", "RNA-seq data", "ChIP-seq data"],
        keywords: ["gene expression", "microarray", "RNA-seq", "ChIP-seq", "functional genomics"],
        institutions: [
            {
                institutionName: "National Center for Biotechnology Information (NCBI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["geo@ncbi.nlm.nih.gov"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "NCBI Data Usage Policies",
                dataLicenseURL: "https://www.ncbi.nlm.nih.gov/home/about/policies/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_005012"],
        size: "> 150,000 series",
        startDate: "2000-01-01",
        lastUpdate: "2024-01-16",
    },
    {
        id: "dbgap",
        name: "Database of Genotypes and Phenotypes",
        additionalNames: ["dbGaP"],
        description:
            "The database of Genotypes and Phenotypes (dbGaP) was developed to archive and distribute the data and results from studies that have investigated the interaction of genotype and phenotype in Humans.",
        url: "https://www.ncbi.nlm.nih.gov/gap/",
        from: getRandomSources(),
        subjects: ["Human Genetics", "GWAS", "Phenomics", "Population Genetics"],
        contentTypes: ["Genotype data", "Phenotype data", "GWAS data", "Clinical data"],
        keywords: ["genotype", "phenotype", "GWAS", "human genetics", "clinical data"],
        institutions: [
            {
                institutionName: "National Center for Biotechnology Information (NCBI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["dbgap-help@ncbi.nlm.nih.gov"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "restricted",
                dataAccessRestriction: ["Controlled access", "IRB approval required"],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "dbGaP Data Use Certification",
                dataLicenseURL: "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/GetPdf.cgi?document_name=HowToApply.pdf",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_002709"],
        size: "> 1,000 studies",
        startDate: "2007-01-01",
        lastUpdate: "2024-01-17",
    },
    {
        id: "clinvar",
        name: "ClinVar",
        description:
            "ClinVar is a freely accessible, public archive of reports of the relationships among human variations and phenotypes, with supporting evidence. ClinVar thus facilitates access to and communication about the relationships asserted between human variation and observed health status, and the history of that interpretation.",
        url: "https://www.ncbi.nlm.nih.gov/clinvar/",
        from: getRandomSources(),
        subjects: ["Clinical Genetics", "Human Genetics", "Genetic Variants", "Medical Genetics"],
        contentTypes: ["Genetic variants", "Clinical interpretations", "Phenotype data", "Evidence data"],
        keywords: ["clinical genetics", "variants", "pathogenicity", "medical genetics", "interpretation"],
        institutions: [
            {
                institutionName: "National Center for Biotechnology Information (NCBI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["clinvar@ncbi.nlm.nih.gov"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "NCBI Data Usage Policies",
                dataLicenseURL: "https://www.ncbi.nlm.nih.gov/home/about/policies/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_006169"],
        size: "> 2 million variants",
        startDate: "2013-01-01",
        lastUpdate: "2024-01-18",
    },
    {
        id: "omim",
        name: "Online Mendelian Inheritance in Man",
        additionalNames: ["OMIM"],
        description:
            "OMIM is a comprehensive, authoritative compendium of human genes and genetic phenotypes that is freely available and updated daily. The full-text, referenced overviews in OMIM contain information on all known mendelian disorders and over 15,000 genes.",
        url: "https://www.omim.org/",
        from: getRandomSources(),
        subjects: ["Medical Genetics", "Human Genetics", "Genetic Disorders", "Mendelian Genetics"],
        contentTypes: ["Gene data", "Phenotype data", "Disease data", "Literature references"],
        keywords: ["mendelian", "genetic disorders", "genes", "phenotypes", "medical genetics"],
        institutions: [
            {
                institutionName: "Johns Hopkins University School of Medicine",
                institutionCountry: "USA",
                institutionType: "University",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [39.2904, -76.6122], // Baltimore, MD
            },
        ],
        repositoryContact: ["omim@jhmi.edu"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: ["Registration required for full access"],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "OMIM License",
                dataLicenseURL: "https://www.omim.org/help/agreement",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://api.omim.org/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_006437"],
        size: "> 25,000 entries",
        startDate: "1985-01-01",
        lastUpdate: "2024-01-19",
    },
    {
        id: "cosmic",
        name: "Catalogue of Somatic Mutations in Cancer",
        additionalNames: ["COSMIC"],
        description:
            "COSMIC, the Catalogue Of Somatic Mutations In Cancer, is the world's largest and most comprehensive resource for exploring the impact of somatic mutations in human cancer.",
        url: "https://cancer.sanger.ac.uk/",
        from: getRandomSources(),
        type: "学科型",
        countries: ["United Kingdom"],
        subjects: ["Cancer Genomics", "Somatic Mutations", "Oncology", "Medical Genetics"],
        contentTypes: ["Mutation data", "Cancer genomics data", "Clinical data", "Drug sensitivity data"],
        keywords: ["cancer", "somatic mutations", "oncology", "genomics", "tumors"],
        institutions: [
            {
                institutionName: "Wellcome Sanger Institute",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        dataUpload: [
            {
                dataUploadType: "Open",
                dataUploadRestriction: ["Data access"],
            },
        ],
        metadataStandard: [
            {
                metadataStandardName: "COSMIC Metadata Standard",
                metadataStandardURL: "https://cancer.sanger.ac.uk/cosmic/help/metadata",
            },
        ],
        databaseLicense: [
            {
                databaseLicenseName: "CC BY 4.0",
                databaseLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            }
        ],
        dataUploadLicense: [
            {
                dataUploadLicenseName: "CC BY 4.0",
                dataUploadLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            }
        ],
        policy: [
            {
                policyName: "Data Access Policy",
                policyURL: "https://www.cosmic.sanger.ac.uk/data-access-policy/",
            }
        ],
        repositoryContact: ["cosmic@sanger.ac.uk", "dxclmrl@outlook.com"],
        certificates: ["Trusted Digital Repository", "中国科学院总中心"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: ["Registration required"],
            },
            {
                dataAccessType: "restricted",
                dataAccessRestriction: ["Commercial license required for full data"],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "COSMIC License",
                dataLicenseURL: "https://cancer.sanger.ac.uk/cosmic/license",
            },
            {
                dataLicenseName: "License",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://cancer.sanger.ac.uk/cosmic/api",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_002260", "DOI:10.22222.333/sf"],
        pidSystem: ["DOI", "CSTR"],
        aidSystem: ["CSTR", "ORCID"],
        qualityManagement: "yes",
        size: "> 6 million mutations",
        startDate: "2004-01-01",
        lastUpdate: "2024-01-20",
    },
    {
        id: "tcga",
        name: "The Cancer Genome Atlas",
        additionalNames: ["TCGA"],
        description:
            "The Cancer Genome Atlas (TCGA), a landmark cancer genomics program, molecularly characterized over 20,000 primary cancer and matched normal samples spanning 33 cancer types.",
        url: "https://www.cancer.gov/tcga",
        from: getRandomSources(),
        subjects: ["Cancer Genomics", "Oncology", "Multi-omics", "Translational Research"],
        contentTypes: ["Genomic data", "Transcriptomic data", "Epigenomic data", "Proteomic data", "Clinical data"],
        keywords: ["cancer", "genomics", "multi-omics", "TCGA", "oncology"],
        institutions: [
            {
                institutionName: "National Cancer Institute (NCI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
            {
                institutionName: "National Human Genome Research Institute (NHGRI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["General contact"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["tcga@mail.nih.gov"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
            {
                dataAccessType: "restricted",
                dataAccessRestriction: ["Controlled access for germline variants"],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "NIH Data Sharing Policy",
                dataLicenseURL: "https://www.cancer.gov/tcga/using-tcga/citing-tcga",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://api.gdc.cancer.gov/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_003193"],
        size: "> 2.5 petabytes",
        startDate: "2006-01-01",
        lastUpdate: "2024-01-21",
        deprecationReason: "TCGA data collection has ended, but data remains available through GDC",
    },
    {
        id: "encode",
        name: "Encyclopedia of DNA Elements",
        additionalNames: ["ENCODE"],
        description:
            "The Encyclopedia of DNA Elements (ENCODE) Consortium is an international collaboration of research groups funded by the National Human Genome Research Institute (NHGRI). The goal of ENCODE is to build a comprehensive parts list of functional elements in the human genome.",
        url: "https://www.encodeproject.org/",
        from: getRandomSources(),
        subjects: ["Functional Genomics", "Epigenomics", "Transcriptomics", "Regulatory Elements"],
        contentTypes: ["ChIP-seq data", "RNA-seq data", "ATAC-seq data", "Hi-C data", "Annotation data"],
        keywords: ["functional genomics", "epigenomics", "regulatory elements", "ChIP-seq", "ENCODE"],
        institutions: [
            {
                institutionName: "Stanford University",
                institutionCountry: "USA",
                institutionType: "University",
                responsibilityType: ["Data Coordination Center"],
                coordinates: [37.4275, -122.1697], // Stanford, CA
            },
            {
                institutionName: "National Human Genome Research Institute (NHGRI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["Funding"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["encode-help@lists.stanford.edu"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "ENCODE Data Use Policy",
                dataLicenseURL: "https://www.encodeproject.org/help/citing-encode/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.encodeproject.org/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_015482"],
        size: "> 10,000 experiments",
        startDate: "2003-01-01",
        lastUpdate: "2024-01-22",
    },
    {
        id: "1000genomes",
        name: "1000 Genomes Project",
        description:
            "The 1000 Genomes Project was an international research effort to establish by far the most detailed catalogue of human genetic variation. Scientists planned to sequence the genomes of at least one thousand anonymous participants from a number of different ethnic groups within the following populations.",
        url: "https://www.internationalgenome.org/",
        from: getRandomSources(),
        type: "disciplinary",
        subjects: ["Population Genetics", "Human Genetics", "Genomic Variation", "Evolution"],
        contentTypes: ["Genome sequences", "Variant data", "Population data", "Haplotype data"],
        keywords: ["population genetics", "human variation", "genomes", "variants", "evolution"],
        institutions: [
            {
                institutionName: "Wellcome Sanger Institute",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["Data coordination"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
            {
                institutionName: "National Human Genome Research Institute (NHGRI)",
                institutionCountry: "USA",
                institutionType: "Government agency",
                responsibilityType: ["Funding agency"],
                coordinates: [39.0458, -76.9413], // Bethesda, MD
            },
        ],
        repositoryContact: ["info@1000genomes.org"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Fort Lauderdale Agreement",
                dataLicenseURL: "https://www.internationalgenome.org/IGSR_disclaimer",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.internationalgenome.org/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_006828"],
        size: "> 2,500 genomes",
        startDate: "2008-01-01",
        lastUpdate: "2024-01-23",
        deprecationReason: "Project completed in 2015, but data remains available",
    },
    {
        id: "gnomad",
        name: "Genome Aggregation Database",
        additionalNames: ["gnomAD"],
        description:
            "The Genome Aggregation Database (gnomAD) is a resource developed by an international coalition of investigators, with the goal of aggregating and harmonizing both exome and genome sequencing data from a wide variety of large-scale sequencing projects.",
        url: "https://gnomad.broadinstitute.org/",
        from: getRandomSources(),
        subjects: ["Population Genetics", "Human Genetics", "Genomic Variation", "Medical Genetics"],
        contentTypes: ["Variant data", "Population frequencies", "Constraint data", "Quality metrics"],
        keywords: ["population genetics", "variants", "allele frequencies", "constraint", "gnomAD"],
        institutions: [
            {
                institutionName: "Broad Institute",
                institutionCountry: "USA",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [42.3601, -71.0589], // Cambridge, MA
            },
        ],
        repositoryContact: ["gnomad@broadinstitute.org"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Zero v1.0 Universal",
                dataLicenseURL: "https://creativecommons.org/publicdomain/zero/1.0/",
            },
        ],
        api: [
            {
                apiType: "GraphQL",
                value: "https://gnomad.broadinstitute.org/api",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_014964"],
        size: "> 125,000 exomes and 15,000 genomes",
        startDate: "2016-01-01",
        lastUpdate: "2024-01-24",
    },
    {
        id: "reactome",
        name: "Reactome",
        description:
            "Reactome is a free, open-source, curated and peer-reviewed pathway database. The goal of Reactome is to provide intuitive bioinformatics tools for the visualization, interpretation and analysis of pathway knowledge to support basic and clinical research, genome analysis, modeling, systems biology and education.",
        url: "https://reactome.org/",
        from: getRandomSources(),
        subjects: ["Systems Biology", "Pathways", "Biochemistry", "Molecular Biology"],
        contentTypes: ["Pathway data", "Reaction data", "Protein interactions", "Regulatory networks"],
        keywords: ["pathways", "reactions", "systems biology", "networks", "biochemistry"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
            {
                institutionName: "Ontario Institute for Cancer Research",
                institutionCountry: "CAN",
                institutionType: "Research institute",
                responsibilityType: ["General contact"],
                coordinates: [43.6532, -79.3832], // Toronto, Canada
            },
        ],
        repositoryContact: ["help@reactome.org"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://reactome.org/ContentService/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_003485"],
        size: "> 2,500 pathways",
        startDate: "2003-01-01",
        lastUpdate: "2024-01-25",
    },
    {
        id: "string",
        name: "STRING",
        additionalNames: ["Search Tool for the Retrieval of Interacting Genes/Proteins"],
        description:
            "STRING is a database of known and predicted protein-protein interactions. The interactions include direct (physical) and indirect (functional) associations; they stem from computational prediction, from knowledge transfer between organisms, and from interactions aggregated from other (primary) databases.",
        url: "https://string-db.org/",
        from: getRandomSources(),
        subjects: ["Protein Interactions", "Systems Biology", "Bioinformatics", "Network Biology"],
        contentTypes: ["Protein interaction data", "Network data", "Functional associations", "Orthology data"],
        keywords: ["protein interactions", "networks", "functional associations", "systems biology"],
        institutions: [
            {
                institutionName: "University of Zurich",
                institutionCountry: "CHE",
                institutionType: "University",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [47.3769, 8.5417], // Zurich, Switzerland
            },
            {
                institutionName: "European Molecular Biology Laboratory (EMBL)",
                institutionCountry: "DEU",
                institutionType: "Research institute",
                responsibilityType: ["General contact"],
                coordinates: [49.3988, 8.6724], // Heidelberg, Germany
            },
        ],
        repositoryContact: ["string@string-db.org"],
        certificates: ["Trusted Digital Repository"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://string-db.org/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_005223"],
        size: "> 24 million proteins",
        startDate: "2003-01-01",
        lastUpdate: "2024-01-26",
    },
    {
        id: "intact",
        name: "IntAct",
        description:
            "IntAct provides a freely available, open source database system and analysis tools for molecular interaction data. All interactions are derived from literature curation or direct user submissions and are freely available.",
        url: "https://www.ebi.ac.uk/intact/",
        from: getRandomSources(),
        subjects: ["Protein Interactions", "Molecular Interactions", "Systems Biology", "Bioinformatics"],
        contentTypes: [
            "Molecular interaction data",
            "Protein-protein interactions",
            "Experimental evidence",
            "Literature curation",
        ],
        keywords: ["molecular interactions", "protein interactions", "curation", "experimental data"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["intact-help@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/intact/ws/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_006706"],
        size: "> 1 million interactions",
        startDate: "2004-01-01",
        lastUpdate: "2024-01-27",
    },
    {
        id: "pfam",
        name: "Pfam",
        description:
            "The Pfam database is a large collection of protein families, each represented by multiple sequence alignments and hidden Markov models (HMMs). Proteins are generally composed of one or more functional regions, commonly termed domains.",
        url: "http://pfam.xfam.org/",
        from: getRandomSources(),
        subjects: ["Protein Families", "Structural Biology", "Bioinformatics", "Evolution"],
        contentTypes: ["Protein family data", "Domain data", "Multiple sequence alignments", "Hidden Markov models"],
        keywords: ["protein families", "domains", "HMM", "sequence alignments", "evolution"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["pfam-help@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Zero v1.0 Universal",
                dataLicenseURL: "https://creativecommons.org/publicdomain/zero/1.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://pfam.xfam.org/search/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_004726"],
        size: "> 19,000 families",
        startDate: "1997-01-01",
        lastUpdate: "2024-01-28",
    },
    {
        id: "interpro",
        name: "InterPro",
        description:
            "InterPro provides functional analysis of proteins by classifying them into families and predicting domains and important sites. To classify proteins in this way, InterPro uses predictive models, known as signatures, provided by several different databases.",
        url: "https://www.ebi.ac.uk/interpro/",
        from: getRandomSources(),
        subjects: ["Protein Function", "Protein Families", "Bioinformatics", "Structural Biology"],
        contentTypes: ["Protein signatures", "Functional annotations", "Domain predictions", "Family classifications"],
        keywords: ["protein function", "signatures", "domains", "families", "annotation"],
        institutions: [
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["General contact", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["interhelp@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://www.ebi.ac.uk/interpro/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_006695"],
        size: "> 38,000 signatures",
        startDate: "1999-01-01",
        lastUpdate: "2024-01-29",
    },
    {
        id: "alphafold",
        name: "AlphaFold Protein Structure Database",
        additionalNames: ["AlphaFold DB"],
        description:
            "AlphaFold DB provides open access to protein structure predictions for the human proteome and 20 other key organisms. The database is built by DeepMind and EMBL-EBI.",
        url: "https://alphafold.ebi.ac.uk/",
        from: getRandomSources(),
        subjects: ["Structural Biology", "Protein Structure", "AI/ML", "Bioinformatics"],
        contentTypes: ["Protein structure predictions", "Confidence scores", "3D coordinates", "Structural annotations"],
        keywords: ["protein structure", "AlphaFold", "AI", "machine learning", "structural prediction"],
        institutions: [
            {
                institutionName: "DeepMind",
                institutionCountry: "GBR",
                institutionType: "Private company",
                responsibilityType: ["Structure prediction"],
                coordinates: [51.5074, -0.1278], // London, UK
            },
            {
                institutionName: "European Bioinformatics Institute (EMBL-EBI)",
                institutionCountry: "GBR",
                institutionType: "Research institute",
                responsibilityType: ["Database hosting", "Technical contact"],
                coordinates: [52.0799, 0.1873], // Hinxton, UK
            },
        ],
        repositoryContact: ["alphafold@ebi.ac.uk"],
        certificates: ["CoreTrustSeal"],
        dataAccess: [
            {
                dataAccessType: "open",
                dataAccessRestriction: [],
            },
        ],
        dataLicense: [
            {
                dataLicenseName: "Creative Commons Attribution 4.0 International",
                dataLicenseURL: "https://creativecommons.org/licenses/by/4.0/",
            },
        ],
        api: [
            {
                apiType: "REST",
                value: "https://alphafold.ebi.ac.uk/api/",
            },
        ],
        repositoryIdentifier: ["RRID:SCR_021400"],
        size: "> 200 million structures",
        startDate: "2021-01-01",
        lastUpdate: "2024-01-30",
    },
]

// 处理数据的函数
export function getProcessedRepositories(): Repository[] {
    return realRepositories.map((repo) => ({
        ...repo,
        // 确保所有必需字段都存在
        subjects: repo.subjects || [],
        contentTypes: repo.contentTypes || [],
        keywords: repo.keywords || [],
        institutions: repo.institutions || [],
        repositoryContact: repo.repositoryContact || [],
        certificates: repo.certificates || [],
        dataAccess: repo.dataAccess || [],
        dataLicense: repo.dataLicense || [],
        api: repo.api || [],
        repositoryIdentifier: repo.repositoryIdentifier || [],
    }))
}

export function getRepositoryById(id: string) {
    return getProcessedRepositories().find((repo) => repo.id === id)
}

// 获取统计数据
export function getRepositoryStats() {
    const repos = getProcessedRepositories()

    const subjectCounts: Record<string, number> = {}
    const countryCounts: Record<string, number> = {}
    const sourceCounts: Record<Source, number> = { re3data: 0, FAIRsharing: 0, GCBR: 0 }


    repos.forEach((repo) => {
        // 统计主题
        repo.subjects?.forEach((subject) => {
            subjectCounts[subject] = (subjectCounts[subject] || 0) + 1
        })

        // 统计国家
        repo.institutions?.forEach((inst) => {
            if (inst.institutionCountry) {
                countryCounts[inst.institutionCountry] = (countryCounts[inst.institutionCountry] || 0) + 1
            }
        })

        // 统计数据源
        repo.from?.forEach((source) => {
            sourceCounts[source] = (sourceCounts[source] || 0) + 1
        })
    })

    return {
        totalRepositories: repos.length,
        subjectDistribution: Object.entries(subjectCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([name, count]) => ({ name, count })),
        countryDistribution: Object.entries(countryCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([name, count]) => ({ name, count })),
        sourceDistribution: Object.entries(sourceCounts).map(([name, count]) => ({ name, count })),
    }
}

export const sourcePriority: Record<string, number> = {
    re3data: 0,
    FAIRsharing: 1,
    GCBR: 2,
}
export const getSourceInfo = (source: string) => {
    const normalSource = source.toLowerCase()
    switch (normalSource) {
        case "re3data":
            return {
                label: "re3data",
                color: "bg-orange-50 text-orange-700 border-orange-200",
                avatar: "R",
            }
        case "fairsharing":
            return {
                label: "FAIRsharing",
                color: "bg-blue-50 text-blue-700 border-blue-200",
                avatar: "F",
            }
        case "gcbr":
            return {
                label: "GCBR",
                color: "bg-purple-50 text-purple-700 border-purple-200",
                avatar: "G",
            }
        default:
            return {
                label: source,
                color: "bg-gray-50 text-gray-700 border-gray-200",
                avatar: source.charAt(0).toUpperCase(),
            }
    }
}

// 搜索功能
export function searchRepositories(query: string, filters: any = {}) {
    let repos = getProcessedRepositories()

    // 基础文本搜索
    if (query) {
        const searchTerm = query.toLowerCase()
        repos = repos.filter(
            (repo) =>
                repo.name.toLowerCase().includes(searchTerm) ||
                repo.description.toLowerCase().includes(searchTerm) ||
                repo.subjects?.some((s) => s.toLowerCase().includes(searchTerm)) ||
                repo.keywords?.some((k) => k.toLowerCase().includes(searchTerm)) ||
                repo.institutions?.some((inst) => inst.institutionName.toLowerCase().includes(searchTerm)),
        )
    }

    // 应用过滤器
    if (filters.from && filters.from.length > 0) {
        repos = repos.filter((repo) => repo.from?.some((s) => filters.from.includes(s.toLowerCase())))
    }

    if (filters.subjects && filters.subjects.length > 0) {
        repos = repos.filter((repo) => repo.subjects?.some((s) => filters.subjects.includes(s)))
    }

    if (filters.contentTypes && filters.contentTypes.length > 0) {
        repos = repos.filter((repo) => repo.contentTypes?.some((type) => filters.contentTypes.includes(type)))
    }

    return repos
}
