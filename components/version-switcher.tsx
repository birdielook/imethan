"use client"

import * as React from "react"

interface VersionSwitcherProps {
  versions: string[]
  defaultVersion: string
}

export function VersionSwitcher({ versions, defaultVersion }: VersionSwitcherProps) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)

  return (
    <div className="flex items-center gap-2 p-2">
      <select
        value={selectedVersion}
        onChange={(e) => setSelectedVersion(e.target.value)}
        className="w-full px-2 py-1 text-sm border rounded-md bg-background"
      >
        {versions.map((version) => (
          <option key={version} value={version}>
            v{version}
          </option>
        ))}
      </select>
    </div>
  )
}

