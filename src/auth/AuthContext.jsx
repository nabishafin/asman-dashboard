import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ROLES } from './roles.js'

// Mock user directory. In a real app this comes from a backend auth API.
// Passwords here are demo-only and NOT secure.
const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Asman Admin',
    email: 'admin@asman.com',
    password: 'admin123',
    role: ROLES.SUPER_ADMIN,
    fleetId: null, // super admin is not tied to a single fleet
  },
  {
    id: 'u2',
    name: 'Karim Owner',
    email: 'owner@asman.com',
    password: 'owner123',
    role: ROLES.FLEET_OWNER,
    fleetId: 'f1', // owns fleet f1
  },
]

const STORAGE_KEY = 'asman.auth.user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = (email, password) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    )
    if (!found) return { ok: false, error: 'Invalid email or password' }
    // strip the password before storing in app state
    const safeUser = { ...found }
    delete safeUser.password
    setUser(safeUser)
    return { ok: true }
  }

  // Provisioned by a Super Admin from the Users page — does not sign the
  // admin out or switch the current session to the new account.
  const createFleetOwner = ({ name, email, password, fleetId }) => {
    const cleanEmail = email.trim().toLowerCase()
    if (MOCK_USERS.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists' }
    }
    const newUser = {
      id: `u${MOCK_USERS.length + 1}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role: ROLES.FLEET_OWNER,
      fleetId,
    }
    MOCK_USERS.push(newUser)
    return { ok: true, user: newUser }
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, login, createFleetOwner, logout, isAuthenticated: !!user }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

export { MOCK_USERS }
