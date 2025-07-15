"use client"

import { useState } from "react"
import { Code, Database, Download, FileText, Table } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { getProcessedRepositories } from "@/lib/data/real-data"

export function DataExporter() {
    const [selectedFormat, setSelectedFormat] = useState("json")
    const [selectedFields, setSelectedFields] = useState<string[]>(["name", "description", "url", "source", "subjects"])
    const [isExporting, setIsExporting] = useState(false)

    const repositories = getProcessedRepositories()

    const exportFormats = [
        { id: "json", name: "JSON", icon: Code, description: "JavaScript Object Notation" },
        { id: "csv", name: "CSV", icon: Table, description: "Comma Separated Values" },
        { id: "xml", name: "XML", icon: FileText, description: "Extensible Markup Language" },
        { id: "xlsx", name: "Excel", icon: Database, description: "Microsoft Excel Spreadsheet" },
    ]

    const availableFields = [
        { id: "name", label: "Repository Name" },
        { id: "description", label: "Description" },
        { id: "url", label: "URL" },
        { id: "source", label: "Data Source" },
        { id: "subjects", label: "Subject Areas" },
        { id: "institutions", label: "Institutions" },
        { id: "contentTypes", label: "Content Types" },
        { id: "dataAccess", label: "Data Access" },
        { id: "size", label: "Repository Size" },
        { id: "startDate", label: "Start Date" },
        { id: "lastUpdate", label: "Last Update" },
        { id: "api", label: "API Information" },
        { id: "certificates", label: "Certificates" },
        { id: "contacts", label: "Contact Information" },
    ]

    const handleFieldToggle = (fieldId: string) => {
        setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
    }

    const handleExport = async () => {
        setIsExporting(true)

        // Filter data based on selected fields
        const filteredData = repositories.map((repo) => {
            const filtered: any = {}
            selectedFields.forEach((field) => {
                if (repo[field] !== undefined) {
                    filtered[field] = repo[field]
                }
            })
            return filtered
        })

        try {
            let content: string
            let filename: string
            let mimeType: string

            switch (selectedFormat) {
                case "json":
                    content = JSON.stringify(filteredData, null, 2)
                    filename = "repositories.json"
                    mimeType = "application/json"
                    break
                case "csv":
                    const headers = selectedFields.join(",")
                    const rows = filteredData.map((repo) =>
                        selectedFields
                            .map((field) => {
                                const value = repo[field]
                                if (Array.isArray(value)) {
                                    return `"${value.join("; ")}"`
                                }
                                if (typeof value === "object" && value !== null) {
                                    return `"${JSON.stringify(value).replace(/"/g, '""')}"`
                                }
                                return `"${String(value || "").replace(/"/g, '""')}"`
                            })
                            .join(","),
                    )
                    content = [headers, ...rows].join("\n")
                    filename = "repositories.csv"
                    mimeType = "text/csv"
                    break
                case "xml":
                    const xmlRows = filteredData
                        .map((repo) => {
                            const fields = selectedFields
                                .map((field) => {
                                    const value = repo[field]
                                    if (Array.isArray(value)) {
                                        return `    <${field}>${value.map((v) => `<item>${v}</item>`).join("")}</${field}>`
                                    }
                                    if (typeof value === "object" && value !== null) {
                                        return `    <${field}>${JSON.stringify(value)}</${field}>`
                                    }
                                    return `    <${field}>${String(value || "")}</${field}>`
                                })
                                .join("\n")
                            return `  <repository>\n${fields}\n  </repository>`
                        })
                        .join("\n")
                    content = `<?xml version="1.0" encoding="UTF-8"?>\n<repositories>\n${xmlRows}\n</repositories>`
                    filename = "repositories.xml"
                    mimeType = "application/xml"
                    break
                default:
                    throw new Error("Unsupported format")
            }

            // Create and download file
            const blob = new Blob([content], { type: mimeType })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Export failed:", error)
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-foreground">Data Export</h1>
                <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
                    Export repository data in various formats for analysis and integration
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Export Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Format Selection */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Export Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {exportFormats.map((format) => (
                                    <div
                                        key={format.id}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                            selectedFormat === format.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                        }`}
                                        onClick={() => setSelectedFormat(format.id)}
                                    >
                                        <div className="flex items-center mb-2">
                                            <format.icon className="h-5 w-5 mr-2 text-primary" />
                                            <span className="font-medium text-card-foreground">{format.name}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{format.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Field Selection */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Select Fields to Export</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {availableFields.map((field) => (
                                    <div key={field.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={field.id}
                                            checked={selectedFields.includes(field.id)}
                                            onCheckedChange={() => handleFieldToggle(field.id)}
                                        />
                                        <label
                                            htmlFor={field.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground"
                                        >
                                            {field.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedFields(availableFields.map((f) => f.id))}
                                    className="border-border text-foreground"
                                >
                                    Select All
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedFields([])}
                                    className="border-border text-foreground"
                                >
                                    Clear All
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Export Summary */}
                <div className="space-y-6">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Export Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="text-sm font-medium text-card-foreground">Total Repositories:</span>
                                <Badge variant="secondary" className="ml-2 bg-secondary text-secondary-foreground">
                                    {repositories.length}
                                </Badge>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-card-foreground">Selected Fields:</span>
                                <Badge variant="secondary" className="ml-2 bg-secondary text-secondary-foreground">
                                    {selectedFields.length}
                                </Badge>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-card-foreground">Export Format:</span>
                                <Badge variant="outline" className="ml-2 border-primary text-primary">
                                    {exportFormats.find((f) => f.id === selectedFormat)?.name}
                                </Badge>
                            </div>

                            <Button
                                onClick={handleExport}
                                disabled={selectedFields.length === 0 || isExporting}
                                className="w-full bg-primary text-primary-foreground"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isExporting ? "Exporting..." : "Export Data"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-card-foreground">Export History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                                    <div>
                                        <p className="text-sm font-medium text-card-foreground">repositories.json</p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                        JSON
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                                    <div>
                                        <p className="text-sm font-medium text-card-foreground">repositories.csv</p>
                                        <p className="text-xs text-muted-foreground">1 day ago</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                        CSV
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
