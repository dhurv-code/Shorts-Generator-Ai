import { useEffect, useState } from 'react'
import { SettingsState } from '../types'

interface SettingsPanelProps {
  settings: SettingsState
  setSettings: (settings: SettingsState) => void
}

export default function SettingsPanel({ settings, setSettings }: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<SettingsState>(settings)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleChange = (field: keyof SettingsState, value: string) => {
    const updatedSettings = {
      ...localSettings,
      [field]: field === 'geminiApiKey' ? value : Number(value),
    } as SettingsState
    setLocalSettings(updatedSettings)
    setSettings(updatedSettings)
  }

  return (
    <section className="settings-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Platform settings</p>
          <h2>Control defaults and API access</h2>
        </div>
        <p className="section-note">Save your Gemini API key and configure the clip generation defaults used for every upload.</p>
      </div>

      <div className="card settings-card">
        <label className="field-label" htmlFor="gemini-key">
          Gemini API key
        </label>
        <input
          id="gemini-key"
          type="password"
          value={localSettings.geminiApiKey}
          onChange={(event) => handleChange('geminiApiKey', event.target.value)}
          placeholder="Enter your Gemini API key"
        />

        <div className="settings-grid">
          <div>
            <label className="field-label" htmlFor="default-clip-count">
              Default clips count
            </label>
            <input
              id="default-clip-count"
              type="number"
              min={1}
              value={localSettings.defaultClipsCount}
              onChange={(event) => handleChange('defaultClipsCount', event.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="default-clip-length">
              Default clip length (sec)
            </label>
            <input
              id="default-clip-length"
              type="number"
              min={5}
              value={localSettings.defaultClipLength}
              onChange={(event) => handleChange('defaultClipLength', event.target.value)}
            />
          </div>
        </div>

        <p className="form-note">These values will be used automatically for future video processing runs.</p>
      </div>
    </section>
  )
}
