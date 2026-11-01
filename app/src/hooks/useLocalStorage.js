import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key))
      return Array.isArray(stored) ? stored : initialValue
    } catch {
      return initialValue
    }
  })

  function saveValue(nextValue) {
    // Simpan dahulu agar kegagalan penyimpanan tidak mengubah tampilan.
    localStorage.setItem(key, JSON.stringify(nextValue))
    setValue(nextValue)
  }

  return [value, saveValue]
}
